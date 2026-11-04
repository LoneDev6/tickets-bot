import { useCallback, useEffect, useRef, useState } from "react"
import type { ReactNode } from "react"
import { ArrowLeft, ArrowRight, ExternalLink, LogOut, RefreshCw, Search } from "lucide-react"
import { ApiError, apiGet, type PrivacyPolicy, type Session, type SyncState, type Ticket, type TicketList, type TicketMessage, type TicketMessages, type TicketStatus } from "@/api"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

type AuthState =
  | { state: "loading" }
  | { state: "signed-out"; expired: boolean }
  | { state: "forbidden" }
  | { state: "error"; message: string }
  | { state: "ready"; session: Session }

const statusLabels: Record<TicketStatus | "all", string> = {
  all: "Tutti",
  open: "Aperto",
  closed: "Chiuso",
  locked: "Bloccato",
  deleted: "Eliminato",
}

const statusValues: (TicketStatus | "all")[] = ["all", "open", "closed", "locked", "deleted"]

function formatDate(value: number | string | null | undefined) {
  if (!value) return "—"
  const date = new Date(value)
  return Number.isNaN(date.getTime())
    ? "—"
    : new Intl.DateTimeFormat("it-IT", { dateStyle: "medium", timeStyle: "short" }).format(date)
}

function statusBadge(status: TicketStatus) {
  const variant = status === "open" ? "default" : status === "closed" ? "secondary" : status === "locked" ? "destructive" : "outline"
  return <Badge variant={variant}>{statusLabels[status]}</Badge>
}

function ticketTypeLabel(type: Ticket["type"]) {
  return type === "Payment" ? "Pagamento" : type === "Generic" ? "Generica" : "Sconosciuto"
}

function ticketName(ticket: Ticket) {
  return ticket.name || `Ticket ${ticket.threadId}`
}

function mergeMessages(...pages: TicketMessage[][]) {
  const unique = new Map(pages.flat().map((message) => [message.id, message]))
  return [...unique.values()].sort((a, b) => a.createdAt - b.createdAt || a.id.localeCompare(b.id))
}

function statusFromUrl(value: string | null): TicketStatus | "all" {
  return statusValues.includes(value as TicketStatus | "all") ? (value as TicketStatus | "all") : "open"
}

function updateQuery(params: URLSearchParams) {
  const search = params.toString()
  window.history.pushState(null, "", search ? `/?${search}` : "/")
  window.dispatchEvent(new PopStateEvent("popstate"))
}

function SyncNotice({ sync, connection, onReconnect }: { sync: SyncState; connection: "connecting" | "live" | "reconnecting"; onReconnect: () => void }) {
  if (sync.error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Sincronizzazione non riuscita</AlertTitle>
        <AlertDescription>{sync.error}</AlertDescription>
      </Alert>
    )
  }
  if (!sync.ready) {
    return (
      <Alert>
        <AlertTitle>Sincronizzazione in corso</AlertTitle>
        <AlertDescription>Le richieste potrebbero non essere ancora aggiornate.</AlertDescription>
      </Alert>
    )
  }
  if (connection === "reconnecting") {
    return (
      <Alert>
        <AlertTitle>Connessione agli aggiornamenti interrotta</AlertTitle>
        <AlertDescription className="flex flex-wrap items-center justify-between gap-3">
          <span>La pagina tenterà di riconnettersi. Ultimo aggiornamento: {formatDate(sync.updatedAt)}.</span>
          <Button variant="outline" size="sm" onClick={onReconnect}>
            <RefreshCw /> Riconnetti
          </Button>
        </AlertDescription>
      </Alert>
    )
  }
  return <p className="text-sm text-muted-foreground">Ultimo aggiornamento: {formatDate(sync.updatedAt)}</p>
}

function App() {
  const isPrivacy = window.location.pathname === "/privacy"
  const [auth, setAuth] = useState<AuthState>({ state: isPrivacy ? "signed-out" : "loading", expired: false })
  const [sync, setSync] = useState<SyncState>({ ready: false, updatedAt: null, error: null })
  const [revision, setRevision] = useState<number | null>(null)
  const [connection, setConnection] = useState<"connecting" | "live" | "reconnecting">("connecting")
  const [sessionRetry, setSessionRetry] = useState(0)
  const [eventRetry, setEventRetry] = useState(0)
  const [logoutError, setLogoutError] = useState("")
  const onUnauthorized = useCallback(() => setAuth({ state: "signed-out", expired: true }), [])

  useEffect(() => {
    if (isPrivacy) return
    const controller = new AbortController()
    apiGet<Session>("/api/session", controller.signal)
      .then((session) => {
        setSync(session.sync)
        setAuth({ state: "ready", session })
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        if (error instanceof ApiError && error.status === 401) setAuth({ state: "signed-out", expired: false })
        else if (error instanceof ApiError && error.status === 403) setAuth({ state: "forbidden" })
        else setAuth({ state: "error", message: error instanceof Error ? error.message : "Errore di connessione." })
      })
    return () => controller.abort()
  }, [isPrivacy, sessionRetry])

  useEffect(() => {
    if (auth.state !== "ready") return
    const source = new EventSource("/api/events")
    source.onopen = () => setConnection("live")
    source.onerror = () => setConnection("reconnecting")
    source.addEventListener("tickets", (event) => {
      try {
        const revision = (JSON.parse(event.data) as { revision?: unknown }).revision
        if (typeof revision === "number") setRevision(revision)
      } catch {
        // Ignore malformed invalidation events; the next event will refresh the snapshot.
      }
    })
    source.addEventListener("sync", (event) => {
      try {
        setSync(JSON.parse(event.data) as SyncState)
      } catch {
        // Keep the last valid sync state if an event is malformed.
      }
    })
    source.addEventListener("session-expired", () => {
      source.close()
      setAuth({ state: "signed-out", expired: true })
    })
    return () => source.close()
  }, [auth.state, eventRetry])

  async function logout() {
    if (auth.state !== "ready") return
    setLogoutError("")
    try {
      const response = await fetch("/auth/logout", {
        method: "POST",
        headers: { "X-CSRF-Token": auth.session.csrfToken },
      })
      if (!response.ok) throw new Error(`Errore ${response.status}`)
      setAuth({ state: "signed-out", expired: false })
    } catch {
      setLogoutError("Impossibile terminare la sessione. Riprova.")
    }
  }

  if (isPrivacy) return <PrivacyPage />

  if (auth.state === "loading") {
    return (
      <PageShell>
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-72 w-full" />
      </PageShell>
    )
  }
  if (auth.state === "signed-out") {
    return (
      <PageShell>
        <Card className="mx-auto w-full max-w-lg">
          <CardHeader>
            <CardTitle>{auth.expired ? "Sessione scaduta" : "Accedi"}</CardTitle>
            <CardDescription>{auth.expired ? "Accedi di nuovo per continuare." : "Accedi con Discord per consultare le richieste."}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Button asChild>
              <a href="/auth/discord">Accedi con Discord</a>
            </Button>
            <a className="text-sm text-muted-foreground underline underline-offset-4" href="/privacy">Informativa sulla privacy</a>
          </CardContent>
        </Card>
      </PageShell>
    )
  }
  if (auth.state === "forbidden") {
    return <StatePage title="Accesso non consentito" description="Il tuo account non ha accesso a questo pannello." />
  }
  if (auth.state === "error") {
    return (
      <PageShell>
        <Alert variant="destructive">
          <AlertTitle>Impossibile collegarsi al servizio</AlertTitle>
          <AlertDescription className="flex flex-wrap items-center justify-between gap-3">
            <span>{auth.message}</span>
            <Button variant="outline" size="sm" onClick={() => { setAuth({ state: "loading" }); setSessionRetry((retry) => retry + 1) }}>Riprova</Button>
          </AlertDescription>
        </Alert>
        <a className="text-sm text-muted-foreground underline underline-offset-4" href="/privacy">Informativa sulla privacy</a>
      </PageShell>
    )
  }

  const path = window.location.pathname
  const detailMatch = path.match(/^\/tickets\/([^/]+)\/?$/)
  let ticketId: string | null = null
  if (detailMatch) {
    try {
      ticketId = decodeURIComponent(detailMatch[1])
    } catch {
      return <StatePage title="Richiesta non valida" description="Il collegamento alla richiesta non è valido." />
    }
  }
  if (path.startsWith("/tickets/") && !ticketId) return <StatePage title="Richiesta non trovata" description="Il collegamento alla richiesta non è valido." />
  return (
    <>
      <Header username={auth.session.user.username} onLogout={logout} />
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        {logoutError && <Alert variant="destructive"><AlertDescription>{logoutError}</AlertDescription></Alert>}
        <SyncNotice sync={sync} connection={connection} onReconnect={() => { setConnection("connecting"); setEventRetry((retry) => retry + 1) }} />
        {ticketId ? (
          <TicketDetail id={ticketId} session={auth.session} revision={revision} sync={sync} onUnauthorized={onUnauthorized} />
        ) : (
          <TicketsPage revision={revision} onSync={setSync} onUnauthorized={onUnauthorized} />
        )}
      </main>
    </>
  )
}

function Header({ username, onLogout }: { username: string; onLogout: () => void }) {
  return (
    <header className="border-b">
      <div className="mx-auto flex min-h-14 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="/" className="font-semibold">Pannello richieste</a>
        <nav aria-label="Navigazione principale" className="flex items-center gap-3">
          <a href="/privacy" className="text-sm text-muted-foreground underline-offset-4 hover:underline">Privacy</a>
          <Separator orientation="vertical" className="h-5" />
          <span className="hidden text-sm text-muted-foreground sm:inline">{username}</span>
          <Button variant="ghost" size="sm" onClick={onLogout} aria-label="Esci">
            <LogOut /> <span className="hidden sm:inline">Esci</span>
          </Button>
        </nav>
      </div>
    </header>
  )
}

function PageShell({ children }: { children: ReactNode }) {
  return <main className="mx-auto flex min-h-svh w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">{children}</main>
}

function StatePage({ title, description }: { title: string; description: string }) {
  return (
    <PageShell>
      <Card className="mx-auto w-full max-w-lg">
        <CardHeader><CardTitle>{title}</CardTitle><CardDescription>{description}</CardDescription></CardHeader>
        <CardContent><a className="text-sm underline underline-offset-4" href="/privacy">Informativa sulla privacy</a></CardContent>
      </Card>
    </PageShell>
  )
}

function TicketsPage({ revision, onSync, onUnauthorized }: { revision: number | null; onSync: (sync: SyncState) => void; onUnauthorized: () => void }) {
  const [params, setParams] = useState(() => new URLSearchParams(window.location.search))
  const [search, setSearch] = useState(params.get("q") ?? "")
  const [retry, setRetry] = useState(0)
  const [list, setList] = useState<{ data: TicketList | null; error: string; requestKey: string }>({ data: null, error: "", requestKey: "" })
  const query = params.toString()
  const status = statusFromUrl(params.get("status"))
  const type = ["all", "Generic", "Payment"].includes(params.get("type") ?? "all") ? (params.get("type") ?? "all") : "all"
  const sort = params.get("sort") === "created" ? "created" : "updated"
  const page = Math.max(1, Number.parseInt(params.get("page") ?? "1", 10) || 1)
  const requestKey = `${query}|${revision}|${retry}`
  const pending = list.requestKey !== requestKey
  const currentError = pending ? "" : list.error

  useEffect(() => {
    const update = () => {
      const next = new URLSearchParams(window.location.search)
      setParams(next)
      setSearch(next.get("q") ?? "")
    }
    window.addEventListener("popstate", update)
    return () => window.removeEventListener("popstate", update)
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    const queryParams = new URLSearchParams(query)
    queryParams.set("status", status)
    queryParams.set("type", type)
    queryParams.set("sort", sort)
    queryParams.set("page", String(page))
    queryParams.set("pageSize", "25")
    apiGet<TicketList>(`/api/tickets?${queryParams.toString()}`, controller.signal)
      .then((data) => {
        onSync(data.sync)
        setList({ data, error: "", requestKey })
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        if (error instanceof ApiError && [401, 403].includes(error.status)) onUnauthorized()
        setList((current) => ({ ...current, error: error instanceof Error ? error.message : "Errore di connessione.", requestKey }))
      })
    return () => controller.abort()
  }, [query, requestKey, status, type, sort, page, onSync, onUnauthorized])

  const totalPages = Math.max(1, Math.ceil((list.data?.total ?? 0) / (list.data?.pageSize ?? 25)))
  const allCount = list.data ? Object.values(list.data.counts).reduce((sum, count) => sum + count, 0) : 0
  function changeParams(update: (next: URLSearchParams) => void) {
    const next = new URLSearchParams(params)
    update(next)
    setParams(next)
    updateQuery(next)
  }
  function changeFilter(key: string, value: string) {
    changeParams((next) => {
      next.set(key, value)
      next.set("page", "1")
    })
  }
  function hrefFor(ticket: Ticket) {
    const from = `${window.location.pathname}${window.location.search}`
    return `/tickets/${encodeURIComponent(ticket.threadId)}?from=${encodeURIComponent(from)}`
  }

  return (
    <section className="flex flex-col gap-6" aria-labelledby="tickets-heading">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 id="tickets-heading" className="text-2xl font-semibold tracking-tight">Richieste</h1>
          <p className="text-sm text-muted-foreground">Consultazione delle richieste registrate dal bot.</p>
        </div>
        <p className="text-sm text-muted-foreground">{list.data && !pending && !currentError ? `${list.data.total} richieste` : ""}</p>
      </div>

      <Tabs value={status} onValueChange={(value) => changeFilter("status", value)}>
        <TabsList className="grid w-full grid-cols-3 gap-1 group-data-horizontal/tabs:h-auto sm:inline-flex sm:w-auto">
          {statusValues.map((value) => (
            <TabsTrigger key={value} value={value} className="h-8 gap-2 px-3 py-1.5">
              {statusLabels[value]}
              <span className="text-xs text-muted-foreground" aria-label={`${value === "all" ? allCount : list.data?.counts[value] ?? 0} richieste`}>
                {value === "all" ? allCount : list.data?.counts[value] ?? 0}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={status} className="flex flex-col gap-6">

      <form className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[minmax(16rem,1fr)_12rem_12rem_auto]" onSubmit={(event) => {
        event.preventDefault()
        changeParams((next) => { next.set("q", search.trim()); next.set("page", "1") })
      }}>
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input aria-label="Cerca richieste" className="pl-9" placeholder="Cerca nome o utente" value={search} onChange={(event) => setSearch(event.target.value)} />
        </div>
        <Select value={type} onValueChange={(value) => changeFilter("type", value)}>
          <SelectTrigger aria-label="Filtra per tipo"><SelectValue placeholder="Tipo" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tutti i tipi</SelectItem>
            <SelectItem value="Generic">Generica</SelectItem>
            <SelectItem value="Payment">Pagamento</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sort} onValueChange={(value) => changeFilter("sort", value)}>
          <SelectTrigger aria-label="Ordina richieste"><SelectValue placeholder="Ordina per" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="updated">Aggiornamento recente</SelectItem>
            <SelectItem value="created">Creazione recente</SelectItem>
          </SelectContent>
        </Select>
        <Button type="submit" className="sm:col-span-2 lg:col-span-1"><Search /> Cerca</Button>
      </form>

      {currentError && <Alert variant="destructive"><AlertTitle>Impossibile caricare le richieste</AlertTitle><AlertDescription className="flex flex-wrap items-center justify-between gap-3"><span>{currentError}</span><Button variant="outline" size="sm" onClick={() => setRetry((value) => value + 1)}>Riprova</Button></AlertDescription></Alert>}
      {currentError ? null : pending || !list.data ? <TicketListSkeleton /> : list.data.tickets.length === 0 ? (
        <Card><CardContent className="flex flex-col gap-1 py-8 text-center"><p className="font-medium">Nessuna richiesta trovata</p><p className="text-sm text-muted-foreground">Modifica i filtri o la ricerca per vedere altri risultati.</p></CardContent></Card>
      ) : list.data ? (
        <>
          {pending && <p className="text-sm text-muted-foreground" role="status">Aggiornamento dei risultati in corso…</p>}
          <div className="hidden md:block">
            <Table>
              <caption className="sr-only">Elenco delle richieste</caption>
              <TableHeader><TableRow><TableHead>Richiesta</TableHead><TableHead>Utente</TableHead><TableHead>Tipo</TableHead><TableHead>Stato</TableHead><TableHead>Ultimo messaggio</TableHead><TableHead>Aggiornata</TableHead></TableRow></TableHeader>
              <TableBody>
                {list.data.tickets.map((ticket) => (
                  <TableRow key={ticket.threadId}>
                    <TableCell><a className="font-medium underline-offset-4 hover:underline" href={hrefFor(ticket)}>{ticketName(ticket)}</a><p className="mt-1 max-w-sm truncate text-xs text-muted-foreground">{ticket.description || "—"}</p></TableCell>
                    <TableCell>{ticket.openerName || ticket.openerId || "Sconosciuto"}<p className="mt-1 text-xs text-muted-foreground">{ticket.openerId || "—"}</p></TableCell>
                    <TableCell>{ticketTypeLabel(ticket.type)}</TableCell>
                    <TableCell>{statusBadge(ticket.status)}</TableCell>
                    <TableCell>{ticket.lastMessageAuthorName ?? "—"}<p className="mt-1 text-xs text-muted-foreground">{formatDate(ticket.lastMessageAt)}</p></TableCell>
                    <TableCell className="whitespace-nowrap">{formatDate(ticket.updatedAt)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <ul className="flex flex-col divide-y rounded-md border md:hidden" aria-label="Elenco delle richieste">
            {list.data.tickets.map((ticket) => (
              <li key={ticket.threadId} className="p-4">
                <a className="font-medium underline-offset-4 hover:underline" href={hrefFor(ticket)}>{ticketName(ticket)}</a>
                <p className="mt-1 text-sm text-muted-foreground">{ticket.openerName || ticket.openerId || "Sconosciuto"} · {ticketTypeLabel(ticket.type)}</p>
                <p className="mt-2 line-clamp-2 text-sm">{ticket.description || "—"}</p>
                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">{statusBadge(ticket.status)}<span className="text-xs text-muted-foreground">Aggiornata {formatDate(ticket.updatedAt)}</span></div>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">Pagina {Math.min(list.data.page, totalPages)} di {totalPages}</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled={page <= 1 || pending} onClick={() => changeParams((next) => next.set("page", String(page - 1)))}><ArrowLeft /> Precedente</Button>
              <Button variant="outline" size="sm" disabled={page >= totalPages || pending} onClick={() => changeParams((next) => next.set("page", String(page + 1)))}>Successiva <ArrowRight /></Button>
            </div>
          </div>
        </>
      ) : null}
        </TabsContent>
      </Tabs>
      <footer className="border-t pt-4 text-xs text-muted-foreground">Le conversazioni e gli allegati sono esclusi dall’elenco. <a className="underline underline-offset-4" href="/privacy">Informativa sulla privacy</a></footer>
    </section>
  )
}

function TicketListSkeleton() {
  return <div className="flex flex-col gap-3" aria-label="Caricamento richieste" aria-busy="true">{Array.from({ length: 5 }, (_, index) => <Skeleton key={index} className="h-12 w-full" />)}</div>
}

function TicketDetail({ id, session, revision, sync, onUnauthorized }: { id: string; session: Session; revision: number | null; sync: SyncState; onUnauthorized: () => void }) {
  const [ticket, setTicket] = useState<{ data: Ticket | null; error: string; requestKey: string }>({ data: null, error: "", requestKey: "" })
  const [messages, setMessages] = useState<{ data: TicketMessages | null; error: string; requestKey: string; loadingMore: boolean; olderError: string }>({ data: null, error: "", requestKey: "", loadingMore: false, olderError: "" })
  const olderMessagesController = useRef<AbortController | null>(null)
  const ticketRequestKey = `${id}|${revision}`
  const messagesRequestKey = ticketRequestKey
  const ticketPending = ticket.requestKey !== ticketRequestKey
  const ticketError = ticketPending ? "" : ticket.error
  const messagesPending = session.capabilities.canReadConversation && messages.requestKey !== messagesRequestKey
  const currentMessagesError = messages.requestKey === messagesRequestKey ? messages.error : ""
  const returnToParam = new URLSearchParams(window.location.search).get("from") ?? "/"
  let returnTo = "/"
  try {
    const candidate = new URL(returnToParam, window.location.origin)
    if (returnToParam.startsWith("/") && candidate.origin === window.location.origin) returnTo = `${candidate.pathname}${candidate.search}${candidate.hash}`
  } catch {
    returnTo = "/"
  }

  useEffect(() => {
    const controller = new AbortController()
    apiGet<{ ticket: Ticket }>(`/api/tickets/${encodeURIComponent(id)}`, controller.signal)
      .then(({ ticket: next }) => setTicket({ data: next, error: "", requestKey: ticketRequestKey }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        if (error instanceof ApiError && [401, 403].includes(error.status)) onUnauthorized()
        setTicket((current) => ({ ...current, error: error instanceof Error ? error.message : "Errore di connessione.", requestKey: ticketRequestKey }))
      })
    return () => controller.abort()
  }, [id, ticketRequestKey, onUnauthorized])

  useEffect(() => {
    if (!session.capabilities.canReadConversation) return
    const controller = new AbortController()
    apiGet<TicketMessages>(`/api/tickets/${encodeURIComponent(id)}/messages`, controller.signal)
      .then((data) => setMessages((current) => {
        if (!data.available) return { data, error: "", requestKey: messagesRequestKey, loadingMore: false, olderError: "" }
        const previous = current.requestKey.startsWith(`${id}|`) && current.data?.available ? current.data.messages : []
        return { data: { ...data, messages: mergeMessages(previous, data.messages) }, error: "", requestKey: messagesRequestKey, loadingMore: false, olderError: "" }
      }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        if (error instanceof ApiError && [401, 403].includes(error.status)) onUnauthorized()
        setMessages({ data: null, error: error instanceof Error ? error.message : "Errore di connessione.", requestKey: messagesRequestKey, loadingMore: false, olderError: "" })
      })
    return () => {
      controller.abort()
      olderMessagesController.current?.abort()
    }
  }, [id, messagesRequestKey, session.capabilities.canReadConversation, onUnauthorized])

  async function loadOlderMessages() {
    const before = messages.data?.nextBefore
    if (!before || messages.loadingMore) return
    const controller = new AbortController()
    olderMessagesController.current?.abort()
    olderMessagesController.current = controller
    setMessages((current) => ({ ...current, loadingMore: true, olderError: "" }))
    try {
      const page = await apiGet<TicketMessages>(`/api/tickets/${encodeURIComponent(id)}/messages?before=${encodeURIComponent(before)}`, controller.signal)
      setMessages((current) => {
        if (!current.data) return { ...current, data: page, loadingMore: false, olderError: "" }
        return { ...current, data: { ...page, messages: mergeMessages(page.messages, current.data.messages) }, loadingMore: false, olderError: "" }
      })
    } catch (error) {
      if (controller.signal.aborted) return
      if (error instanceof ApiError && [401, 403].includes(error.status)) onUnauthorized()
      setMessages({ data: null, error: error instanceof Error ? error.message : "Errore di connessione.", requestKey: messagesRequestKey, loadingMore: false, olderError: "" })
    }
  }

  if (ticketPending && !ticket.data) return <><Skeleton className="h-8 w-64" /><Skeleton className="h-80 w-full" /></>
  if (!ticket.data) return <Alert variant="destructive"><AlertTitle>Impossibile caricare la richiesta</AlertTitle><AlertDescription className="flex flex-wrap items-center justify-between gap-3"><span>{ticketError}</span><Button variant="outline" size="sm" onClick={() => window.location.reload()}>Riprova</Button></AlertDescription></Alert>
  const item = ticket.data
  const discordHref = safeDiscordUrl(item.discordUrl)
  return (
    <section className="flex flex-col gap-6" aria-labelledby="ticket-heading">
      <a href={returnTo} className="inline-flex w-fit items-center gap-2 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"><ArrowLeft className="size-4" />Torna alle richieste</a>
      {ticketError && <Alert variant="destructive"><AlertTitle>Dati non aggiornati</AlertTitle><AlertDescription>{ticketError}</AlertDescription></Alert>}
      {ticketPending && <p className="text-sm text-muted-foreground" role="status">Aggiornamento della richiesta in corso…</p>}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">{statusBadge(item.status)}<Badge variant="outline">{ticketTypeLabel(item.type)}</Badge></div>
          <h1 id="ticket-heading" className="text-2xl font-semibold tracking-tight">{ticketName(item)}</h1>
          <p className="text-sm text-muted-foreground">Aperta da {item.openerName || item.openerId || "Sconosciuto"} · ID {item.openerId || "—"}</p>
        </div>
        {discordHref ? <Button asChild variant="outline"><a href={discordHref} target="_blank" rel="noopener noreferrer">Apri su Discord <span className="sr-only">si apre in una nuova scheda</span><ExternalLink /></a></Button> : <p className="text-sm text-muted-foreground">Collegamento Discord non disponibile.</p>}
      </div>

      <Card>
        <CardHeader><CardTitle>Dettagli della richiesta</CardTitle></CardHeader>
        <CardContent className="flex flex-col gap-5">
          <p className="whitespace-pre-wrap break-words">{item.description || "Nessuna descrizione registrata."}</p>
          <Separator />
          <dl className="grid gap-x-6 gap-y-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
            <Metadata label="Creata" value={formatDate(item.createdAt)} />
            <Metadata label="Ultimo aggiornamento" value={formatDate(item.updatedAt)} />
            <Metadata label="Ultimo cambio di stato" value={formatDate(item.statusChangedAt)} />
            <Metadata label="Ultimo messaggio" value={`${item.lastMessageAuthorName ?? "—"} · ${item.lastMessageAuthorId ?? "—"} · ${formatDate(item.lastMessageAt)}`} />
            <Metadata label="Utenti aggiunti" value={item.joinedUserIds.length ? item.joinedUserIds.join(", ") : "Nessuno"} />
            <Metadata label="Thread di verifica" value={item.verificationThreadId ?? "—"} />
            <Metadata label="Thread Discord" value={item.threadId} />
            <Metadata label="Sincronizzazione" value={formatDate(sync.updatedAt)} />
            <Metadata label="Ultima azione" value={item.lastAction ? `${item.lastAction.action} · ${item.lastAction.actorId ?? "—"} · ${formatDate(item.lastAction.at)}${item.lastAction.reason ? ` · ${item.lastAction.reason}` : ""}` : "—"} />
            <Metadata label="Data di eliminazione" value={formatDate(item.deletedAt)} />
            <Metadata label="Solo partecipanti registrati" value={item.recordedParticipantsOnly ? "Sì" : "No"} />
            <Metadata label="Contenuto escluso" value={item.contentExcluded ? "Sì" : "No"} />
            <Metadata label="Importata" value={item.imported ? "Sì" : "No"} />
          </dl>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Conversazione</CardTitle><CardDescription>I messaggi sono disponibili solo se la sessione ha il permesso di lettura.</CardDescription></CardHeader>
        <CardContent className="flex flex-col gap-4">
          {messagesPending && !messages.data ? <div className="flex flex-col gap-3" aria-label="Caricamento conversazione" aria-busy="true"><Skeleton className="h-20 w-full" /><Skeleton className="h-20 w-4/5" /></div> : !session.capabilities.canReadConversation ? (
            <p className="text-sm text-muted-foreground">{session.capabilities.reason || "La lettura della conversazione non è disponibile."}</p>
          ) : (
            <>
              {currentMessagesError && <Alert variant="destructive"><AlertTitle>Conversazione non disponibile</AlertTitle><AlertDescription>{currentMessagesError}</AlertDescription></Alert>}
              {messagesPending && <p className="text-sm text-muted-foreground" role="status">Aggiornamento della conversazione in corso…</p>}
              {messages.data && !messages.data.available ? <p className="text-sm text-muted-foreground">{messages.data.reason || "Conversazione non disponibile."}</p> : messages.data?.messages.length ? (
                <>
                  {messages.olderError && <Alert variant="destructive"><AlertDescription>{messages.olderError}</AlertDescription></Alert>}
                  {messages.data.nextBefore && <Button variant="outline" className="w-fit" onClick={loadOlderMessages} disabled={messages.loadingMore}>{messages.loadingMore ? "Caricamento…" : "Carica messaggi precedenti"}</Button>}
                  <ol className="flex flex-col gap-4">{messages.data.messages.map((message) => <Message key={message.id} message={message} />)}</ol>
                </>
              ) : !currentMessagesError && <p className="text-sm text-muted-foreground">Nessun messaggio disponibile.</p>}
            </>
          )}
          <Separator />
          <label htmlFor="reply" className="text-sm font-medium">Rispondi</label>
          <Textarea id="reply" disabled aria-describedby="reply-reason" placeholder="La risposta non è disponibile in questa versione." />
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p id="reply-reason" className="text-xs text-muted-foreground">{session.capabilities.reason || "La risposta è disabilitata."}</p>
            <Button disabled>Invia risposta</Button>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

function Metadata({ label, value }: { label: string; value: string }) {
  return <div className="min-w-0"><dt className="text-muted-foreground">{label}</dt><dd className="mt-1 break-words font-medium">{value}</dd></div>
}

function Message({ message }: { message: TicketMessage }) {
  return (
    <li className="flex flex-col gap-2 rounded-md border p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="font-medium">{message.authorName} <span className="font-normal text-muted-foreground">· {message.authorId}</span></p>
        <p className="text-xs text-muted-foreground">{formatDate(message.createdAt)}{message.editedAt ? ` · modificato ${formatDate(message.editedAt)}` : ""}</p>
      </div>
      {message.content && <p className="whitespace-pre-wrap break-words text-sm">{message.content}</p>}
      {message.embeds?.map((embed, index) => <div key={`${message.id}-embed-${index}`} className="flex flex-col gap-2 text-sm">
        {embed.title && <p className="font-medium">{embed.title}</p>}
        {embed.description && <p className="whitespace-pre-wrap break-words">{embed.description}</p>}
        {embed.fields?.map((field, fieldIndex) => <div key={`${message.id}-embed-${index}-field-${fieldIndex}`}><p className="font-medium">{field.name}</p><p className="whitespace-pre-wrap break-words">{field.value}</p></div>)}
      </div>)}
      {message.attachments.length > 0 && <ul className="flex flex-col gap-1">{message.attachments.map((attachment, index) => {
        const href = safeHttpsUrl(attachment.url)
        return <li key={`${attachment.url}-${index}`}>{href ? <a className="inline-flex items-center gap-1 text-sm underline underline-offset-4" href={href} target="_blank" rel="noopener noreferrer">{attachment.name || "Allegato"}<ExternalLink className="size-3" /></a> : <span className="text-sm text-muted-foreground">{attachment.name || "Allegato non disponibile"}</span>}</li>
      })}</ul>}
    </li>
  )
}

function safeHttpsUrl(value: string | null | undefined) {
  if (!value) return null
  try {
    const url = new URL(value)
    return url.protocol === "https:" && !url.username && !url.password ? url.href : null
  } catch {
    return null
  }
}

function safeDiscordUrl(value: string | null | undefined) {
  const href = safeHttpsUrl(value)
  if (!href) return null
  const url = new URL(href)
  const hostname = url.hostname
  return !url.port && (hostname === "discord.com" || hostname === "www.discord.com" || hostname === "discordapp.com") ? href : null
}

function PrivacyPage() {
  const [state, setState] = useState<{ data: PrivacyPolicy | null; error: string; loading: boolean }>({ data: null, error: "", loading: true })
  const [retry, setRetry] = useState(0)
  useEffect(() => {
    const controller = new AbortController()
    apiGet<PrivacyPolicy>("/api/privacy", controller.signal)
      .then((data) => setState({ data, error: "", loading: false }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        setState({ data: null, error: error instanceof Error ? error.message : "Errore di connessione.", loading: false })
      })
    return () => controller.abort()
  }, [retry])

  return (
    <>
      <header className="border-b">
        <div className="mx-auto flex min-h-14 w-full max-w-4xl items-center justify-between gap-4 px-4 sm:px-6">
          <a href="/" className="font-semibold">Pannello richieste</a>
          <a href="/" className="text-sm text-muted-foreground underline-offset-4 hover:underline">Accedi al pannello</a>
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-8 sm:px-6">
        {state.loading ? <><Skeleton className="h-8 w-64" /><Skeleton className="h-64 w-full" /></> : state.error ? (
          <Alert variant="destructive"><AlertTitle>Informativa non disponibile</AlertTitle><AlertDescription className="flex flex-wrap items-center justify-between gap-3"><span>{state.error}</span><Button variant="outline" size="sm" onClick={() => { setState((current) => ({ ...current, error: "", loading: true })); setRetry((value) => value + 1) }}>Riprova</Button></AlertDescription></Alert>
        ) : state.data ? (
          <article className="flex flex-col gap-6">
            <div><h1 className="text-2xl font-semibold tracking-tight">{state.data.title}</h1><p className="mt-2 text-sm text-muted-foreground">Aggiornata il {formatDate(state.data.updatedAt)}</p></div>
            {!state.data.configured && <Alert><AlertTitle>Informativa in configurazione</AlertTitle><AlertDescription>Il testo definitivo non è ancora stato pubblicato.</AlertDescription></Alert>}
            {state.data.sections.map((section, index) => (
              <section key={`${section.title}-${index}`} className="flex flex-col gap-3">
                <h2 className="text-lg font-medium">{section.title}</h2>
                {section.paragraphs.map((paragraph, paragraphIndex) => <p key={paragraphIndex} className="max-w-3xl whitespace-pre-wrap text-sm leading-6">{paragraph}</p>)}
                {section.items && <ul className="ml-5 list-disc space-y-2 text-sm leading-6">{section.items.map((item, itemIndex) => <li key={itemIndex}>{item}</li>)}</ul>}
              </section>
            ))}
            {state.data.contactEmail && <p className="text-sm">Contatto: {state.data.contactEmail}</p>}
          </article>
        ) : null}
      </main>
    </>
  )
}

export default App
