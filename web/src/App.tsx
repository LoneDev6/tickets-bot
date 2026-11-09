import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react"
import type {
  ComponentProps,
  CSSProperties,
  MouseEvent,
  ReactNode,
} from "react"
import {
  ArrowLeft,
  ChevronDown,
  ArrowUpRight,
  GripVertical,
  LogOut,
  RefreshCw,
  Search,
  UserRound,
} from "lucide-react"
import {
  ApiError,
  apiGet,
  apiPost,
  type MentionNames,
  type PrivacyPolicy,
  type Session,
  type SyncState,
  type Ticket,
  type TicketList,
  type TicketMessage,
  type TicketMessages,
  type TicketStatus,
} from "@/api"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "@/components/ui/textarea"
import type { ReadPosition } from "@/components/ticket-conversation"

const TicketConversation = lazy(() =>
  import("@/components/ticket-conversation").then((module) => ({
    default: module.TicketConversation,
  }))
)

type AuthState =
  | { state: "loading" }
  | { state: "signed-out"; expired: boolean }
  | { state: "forbidden" }
  | { state: "error"; message: string }
  | { state: "ready"; session: Session }

const statusLabels: Record<TicketStatus | "all", string> = {
  all: "All",
  open: "Open",
  closed: "Closed",
  locked: "Locked",
  deleted: "Deleted",
}

const statusValues: (TicketStatus | "all")[] = [
  "all",
  "open",
  "closed",
  "locked",
  "deleted",
]

function formatDate(value: number | string | null | undefined) {
  if (!value) return "—"
  const date = new Date(value)
  return Number.isNaN(date.getTime())
    ? "—"
    : new Intl.DateTimeFormat("en-GB", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(date)
}

function statusBadge(status: TicketStatus) {
  const variant = status === "open" ? "secondary" : "outline"
  return <Badge variant={variant}>{statusLabels[status]}</Badge>
}

function ticketTypeLabel(type: Ticket["type"]) {
  return type === "Payment"
    ? "Payment"
    : type === "Generic"
      ? "General"
      : "Unknown"
}

type TicketAction =
  "close" | "close-lock" | "reopen" | "escalate" | "resolve-escalation"
const actionLabels: Record<TicketAction, string> = {
  close: "Close ticket",
  "close-lock": "Close and lock ticket",
  reopen: "Reopen ticket",
  escalate: "Escalate to owner",
  "resolve-escalation": "Resolve escalation",
}

function TicketOwner({ ticket }: { ticket: Ticket }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <Avatar>
        <AvatarImage
          src={ticket.openerAvatarUrl || undefined}
          alt=""
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <AvatarFallback>
          {ticket.openerName ? (
            ticket.openerName.slice(0, 2).toUpperCase()
          ) : (
            <UserRound className="size-4" />
          )}
        </AvatarFallback>
      </Avatar>
      <div className="min-w-0 break-words">
        <p>{ticket.openerName || ticket.openerId || "Unknown requester"}</p>
        {ticket.openerName && ticket.openerId && (
          <p className="mt-1 text-xs text-muted-foreground">
            {ticket.openerId}
          </p>
        )}
      </div>
    </div>
  )
}

function TicketPreview({
  ticket,
  href,
  selected,
}: {
  ticket: Ticket
  href: string
  selected?: boolean
}) {
  const text =
    ticket.description?.replace(/\s+/g, " ").trim() ||
    "Initial message unavailable"
  return (
    <AppLink
      data-ticket-link
      aria-current={selected ? "page" : undefined}
      href={href}
      title={text}
      className="block font-medium break-words underline-offset-4 hover:underline focus-visible:underline"
    >
      <span className="line-clamp-3">{text}</span>
    </AppLink>
  )
}

function openTicketRow(event: MouseEvent<HTMLElement>) {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    (event.target as Element).closest("a, button, input, textarea, select") ||
    window.getSelection()?.toString()
  )
    return
  const link = event.currentTarget.querySelector<HTMLAnchorElement>(
    "a[data-ticket-link]"
  )
  if (!link) return
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
    window.open(link.href, "_blank", "noopener,noreferrer")
  else link.click()
}

function mergeMessages(...pages: TicketMessage[][]) {
  const unique = new Map(pages.flat().map((message) => [message.id, message]))
  return [...unique.values()].sort(
    (a, b) => a.createdAt - b.createdAt || a.id.localeCompare(b.id)
  )
}

function statusFromUrl(value: string | null): TicketStatus | "all" {
  return statusValues.includes(value as TicketStatus | "all")
    ? (value as TicketStatus | "all")
    : "open"
}

function navigate(href: string) {
  if (new URL(href, window.location.href).href === window.location.href) return
  window.history.pushState(null, "", href)
  window.dispatchEvent(new PopStateEvent("popstate"))
}

function subscribeLocation(onChange: () => void) {
  window.addEventListener("popstate", onChange)
  return () => window.removeEventListener("popstate", onChange)
}

function locationSnapshot() {
  return window.location.href
}

function AppLink({ onClick, ...props }: ComponentProps<"a">) {
  return (
    <a
      {...props}
      onClick={(event) => {
        onClick?.(event)
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey ||
          props.download !== undefined ||
          (props.target && props.target !== "_self")
        )
          return
        const url = new URL(event.currentTarget.href)
        if (
          url.origin !== window.location.origin ||
          !/^\/(?:privacy\/?|tickets\/[^/]+\/?)?$/.test(url.pathname)
        )
          return
        event.preventDefault()
        navigate(`${url.pathname}${url.search}${url.hash}`)
        window.scrollTo(0, 0)
      }}
    />
  )
}

function ticketListParams() {
  const url = new URL(window.location.href)
  const from = url.pathname.startsWith("/tickets/")
    ? url.searchParams.get("from")
    : null
  if (from?.startsWith("/")) {
    try {
      const source = new URL(from, window.location.origin)
      if (source.origin === window.location.origin && source.pathname === "/")
        return source.searchParams
    } catch {
      /* Ignore an invalid return location. */
    }
  }
  return url.pathname === "/" ? url.searchParams : new URLSearchParams()
}

function updateQuery(params: URLSearchParams) {
  const search = params.toString()
  const url = new URL(window.location.href)
  if (url.pathname.startsWith("/tickets/")) {
    url.searchParams.set("from", search ? `/?${search}` : "/")
    navigate(`${url.pathname}${url.search}`)
  } else navigate(search ? `/?${search}` : "/")
}

function SyncNotice({
  sync,
  connection,
  onReconnect,
}: {
  sync: SyncState
  connection: "connecting" | "live" | "reconnecting"
  onReconnect: () => void
}) {
  if (sync.error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Synchronization failed</AlertTitle>
        <AlertDescription>{sync.error}</AlertDescription>
      </Alert>
    )
  }
  if (!sync.ready) {
    return (
      <Alert>
        <AlertTitle>Synchronization in progress</AlertTitle>
        <AlertDescription>Tickets may not be up to date yet.</AlertDescription>
      </Alert>
    )
  }
  if (connection === "reconnecting") {
    return (
      <Alert>
        <AlertTitle>Live updates disconnected</AlertTitle>
        <AlertDescription className="flex flex-wrap items-center justify-between gap-3">
          <span>
            The page will try to reconnect. Last synchronized:{" "}
            {formatDate(sync.updatedAt)}.
          </span>
          <Button variant="outline" size="sm" onClick={onReconnect}>
            <RefreshCw /> Reconnect
          </Button>
        </AlertDescription>
      </Alert>
    )
  }
  return (
    <p className="text-sm text-muted-foreground">
      Last synchronized: {formatDate(sync.updatedAt)}
    </p>
  )
}

function App() {
  const location = useSyncExternalStore(subscribeLocation, locationSnapshot)
  const path = new URL(location).pathname
  const isPrivacy = path === "/privacy" || path === "/privacy/"
  const [auth, setAuth] = useState<AuthState>({ state: "loading" })
  const [sync, setSync] = useState<SyncState>({
    ready: false,
    updatedAt: null,
    error: null,
  })
  const [revision, setRevision] = useState<number | null>(null)
  const [connection, setConnection] = useState<
    "connecting" | "live" | "reconnecting"
  >("connecting")
  const [sessionRetry, setSessionRetry] = useState(0)
  const [eventRetry, setEventRetry] = useState(0)
  const [logoutError, setLogoutError] = useState("")
  const onUnauthorized = useCallback(
    () => setAuth({ state: "signed-out", expired: true }),
    []
  )
  const loadSession = !isPrivacy && auth.state === "loading"

  useEffect(() => {
    if (!loadSession) return
    const controller = new AbortController()
    apiGet<Session>("/api/session", controller.signal)
      .then((session) => {
        setSync(session.sync)
        setAuth({ state: "ready", session })
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        if (error instanceof ApiError && error.status === 401)
          setAuth({ state: "signed-out", expired: false })
        else if (error instanceof ApiError && error.status === 403)
          setAuth({ state: "forbidden" })
        else
          setAuth({
            state: "error",
            message:
              error instanceof Error ? error.message : "Connection error.",
          })
      })
    return () => controller.abort()
  }, [loadSession, sessionRetry])

  useEffect(() => {
    if (auth.state !== "ready") return
    const source = new EventSource("/api/events")
    source.onopen = () => setConnection("live")
    source.onerror = () => setConnection("reconnecting")
    source.addEventListener("tickets", (event) => {
      try {
        const revision = (JSON.parse(event.data) as { revision?: unknown })
          .revision
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
      if (!response.ok) throw new Error(`Error ${response.status}`)
      setAuth({ state: "signed-out", expired: false })
    } catch {
      setLogoutError("Unable to end the session. Please try again.")
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
            <CardTitle>
              {auth.expired ? "Session expired" : "Sign in"}
            </CardTitle>
            <CardDescription>
              {auth.expired
                ? "Sign in again to continue."
                : "Sign in with Discord to view tickets."}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Button asChild>
              <a href="/auth/discord">Sign in with Discord</a>
            </Button>
            <AppLink
              className="text-sm text-muted-foreground underline underline-offset-4"
              href="/privacy"
            >
              Privacy policy
            </AppLink>
          </CardContent>
        </Card>
      </PageShell>
    )
  }
  if (auth.state === "forbidden") {
    return (
      <StatePage
        title="Access denied"
        description="Your account cannot access this dashboard."
      />
    )
  }
  if (auth.state === "error") {
    return (
      <PageShell>
        <Alert variant="destructive">
          <AlertTitle>Unable to connect to the service</AlertTitle>
          <AlertDescription className="flex flex-wrap items-center justify-between gap-3">
            <span>{auth.message}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setAuth({ state: "loading" })
                setSessionRetry((retry) => retry + 1)
              }}
            >
              Retry
            </Button>
          </AlertDescription>
        </Alert>
        <AppLink
          className="text-sm text-muted-foreground underline underline-offset-4"
          href="/privacy"
        >
          Privacy policy
        </AppLink>
      </PageShell>
    )
  }

  const detailMatch = path.match(/^\/tickets\/([^/]+)\/?$/)
  let ticketId: string | null = null
  if (detailMatch) {
    try {
      ticketId = decodeURIComponent(detailMatch[1])
    } catch {
      return (
        <StatePage
          title="Invalid ticket"
          description="The ticket link is invalid."
        />
      )
    }
  }
  if (path.startsWith("/tickets/") && !ticketId)
    return (
      <StatePage
        title="Ticket not found"
        description="The ticket link is invalid."
      />
    )
  return (
    <TicketWorkspace
      ticketId={ticketId}
      session={auth.session}
      revision={revision}
      sync={sync}
      connection={connection}
      logoutError={logoutError}
      onLogout={logout}
      onSync={setSync}
      onUnauthorized={onUnauthorized}
      onReconnect={() => {
        setConnection("connecting")
        setEventRetry((retry) => retry + 1)
      }}
    />
  )
}

function TicketWorkspace({
  ticketId,
  session,
  revision,
  sync,
  connection,
  logoutError,
  onLogout,
  onSync,
  onUnauthorized,
  onReconnect,
}: {
  ticketId: string | null
  session: Session
  revision: number | null
  sync: SyncState
  connection: "connecting" | "live" | "reconnecting"
  logoutError: string
  onLogout: () => void
  onSync: (sync: SyncState) => void
  onUnauthorized: () => void
  onReconnect: () => void
}) {
  const [preferredListWidth, setPreferredListWidth] = useState(() => {
    try {
      const saved = Number(localStorage.getItem("tickets.postListWidth"))
      if (Number.isFinite(saved) && saved >= 320 && saved <= 720) return saved
    } catch {
      /* Browser storage may be disabled. */
    }
    return 384
  })
  const workspace = useRef<HTMLDivElement>(null)
  const listPane = useRef<HTMLElement>(null)
  const [workspaceWidth, setWorkspaceWidth] = useState(window.innerWidth)
  const dragOffset = useRef(0)
  const maxListWidth = Math.max(320, Math.min(720, workspaceWidth - 480 - 12))
  const listWidth = Math.min(preferredListWidth, maxListWidth)
  const resizeList = (width: number) =>
    setPreferredListWidth(
      Math.round(Math.max(320, Math.min(maxListWidth, width)))
    )
  useEffect(() => {
    const observer = new ResizeObserver(([entry]) =>
      setWorkspaceWidth(entry.contentRect.width)
    )
    if (workspace.current) observer.observe(workspace.current)
    return () => observer.disconnect()
  }, [])
  useEffect(() => {
    try {
      localStorage.setItem("tickets.postListWidth", String(preferredListWidth))
    } catch {
      /* Keep resizing usable when browser storage is unavailable. */
    }
  }, [preferredListWidth])
  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <Header
        username={session.user.displayName || session.user.username}
        onLogout={onLogout}
      />
      <main className="flex min-h-0 flex-1 flex-col">
        {logoutError && (
          <Alert variant="destructive">
            <AlertDescription>{logoutError}</AlertDescription>
          </Alert>
        )}
        <div
          ref={workspace}
          style={{ "--post-list-width": `${listWidth}px` } as CSSProperties}
          className="min-h-0 flex-1 lg:grid lg:grid-cols-[var(--post-list-width)_0.75rem_minmax(0,1fr)]"
        >
          <section
            id="ticket-list-pane"
            ref={listPane}
            aria-label="Tickets"
            className={`${ticketId ? "hidden lg:block" : ""} h-full min-w-0 space-y-6 overflow-y-auto overscroll-contain px-4 py-6 sm:px-8 lg:px-5`}
          >
            <TicketsPage
              syncNotice={
                <SyncNotice
                  sync={sync}
                  connection={connection}
                  onReconnect={onReconnect}
                />
              }
              selectedId={ticketId}
              scrollPane={listPane}
              revision={revision}
              onSync={onSync}
              onUnauthorized={onUnauthorized}
            />
          </section>
          <div
            role="separator"
            tabIndex={0}
            aria-label="Resize ticket list"
            aria-orientation="vertical"
            aria-controls="ticket-list-pane"
            aria-valuemin={320}
            aria-valuemax={maxListWidth}
            aria-valuenow={listWidth}
            aria-valuetext={`${listWidth} pixels`}
            title="Drag to resize, or use the left and right arrow keys"
            className="relative hidden cursor-col-resize touch-none items-center justify-center select-none hover:bg-muted focus-visible:bg-muted focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring active:bg-muted lg:flex"
            onPointerDown={(event) => {
              if (event.button !== 0 || !event.isPrimary) return
              event.preventDefault()
              event.currentTarget.focus()
              dragOffset.current = event.clientX - listWidth
              event.currentTarget.setPointerCapture(event.pointerId)
            }}
            onPointerMove={(event) => {
              if (event.currentTarget.hasPointerCapture(event.pointerId))
                resizeList(event.clientX - dragOffset.current)
            }}
            onKeyDown={(event) => {
              const widths: Record<string, number> = {
                ArrowLeft: listWidth - 16,
                ArrowRight: listWidth + 16,
                Home: 320,
                End: maxListWidth,
              }
              if (Object.hasOwn(widths, event.key)) {
                event.preventDefault()
                resizeList(widths[event.key])
              }
            }}
          >
            <span className="absolute inset-y-0 left-1/2 w-px bg-border" />
            <GripVertical
              aria-hidden="true"
              className="relative h-6 w-3 bg-background text-muted-foreground"
            />
          </div>
          <section
            aria-label="Selected ticket"
            className={`${ticketId ? "flex" : "hidden lg:flex"} h-full min-h-0 min-w-0 flex-col overflow-hidden px-4 py-4 sm:px-8`}
          >
            {ticketId ? (
              <TicketDetail
                key={ticketId}
                id={ticketId}
                session={session}
                revision={revision}
                sync={sync}
                onUnauthorized={onUnauthorized}
              />
            ) : (
              <div className="flex h-full min-h-64 flex-col items-center justify-center gap-2 text-center">
                <h2 className="text-lg font-semibold">Select a ticket</h2>
                <p className="max-w-sm text-sm text-muted-foreground">
                  Open a ticket from the list to read and manage it here.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>
      <footer className="border-t px-4 py-3 text-sm sm:px-8">
        <a
          href="/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 hover:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          Privacy policy<span className="sr-only"> (opens in a new tab)</span>
        </a>
      </footer>
    </div>
  )
}

function Header({
  username,
  onLogout,
}: {
  username: string
  onLogout: () => void
}) {
  return (
    <header className="shrink-0 border-b">
      <div className="flex w-full flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-8">
        <AppLink href="/" className="font-semibold tracking-tight">
          LoneDev’s Tickets
        </AppLink>
        <div className="flex items-center gap-3">
          <span className="max-w-40 truncate text-sm text-muted-foreground">
            {username}
          </span>
          <Button variant="ghost" onClick={onLogout}>
            <LogOut /> Sign out
          </Button>
        </div>
      </div>
    </header>
  )
}

function PageShell({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto flex min-h-svh w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      {children}
    </main>
  )
}

function StatePage({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <PageShell>
      <Card className="mx-auto w-full max-w-lg">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <AppLink
            className="text-sm underline underline-offset-4"
            href="/privacy"
          >
            Privacy policy
          </AppLink>
        </CardContent>
      </Card>
    </PageShell>
  )
}

function TicketsPage({
  syncNotice,
  selectedId,
  scrollPane,
  revision,
  onSync,
  onUnauthorized,
}: {
  syncNotice: ReactNode
  selectedId: string | null
  scrollPane: React.RefObject<HTMLElement | null>
  revision: number | null
  onSync: (sync: SyncState) => void
  onUnauthorized: () => void
}) {
  const [params, setParams] = useState(() => ticketListParams())
  const [search, setSearch] = useState(params.get("q") ?? "")
  const [opener, setOpener] = useState(params.get("opener") ?? "")
  const [retry, setRetry] = useState(0)
  const [list, setList] = useState<{
    data: TicketList | null
    error: string
    nextError: string
    loadingMore: boolean
    requestKey: string
    query: string
  }>({
    data: null,
    error: "",
    nextError: "",
    loadingMore: false,
    requestKey: "",
    query: "",
  })
  const loadedWindow = useRef({ query: "", count: 25 })
  const sentinel = useRef<HTMLDivElement>(null)
  const listController = useRef<AbortController | null>(null)
  const loadingMoreRef = useRef(false)
  const listRefreshController = useRef<AbortController | null>(null)
  const completedListKey = useRef("")
  const latestListKey = useRef("")
  const [listRefreshTick, setListRefreshTick] = useState(0)
  const listAnchor = useRef<{ id: string; top: number } | null>(null)
  const query = params.toString()
  const status = statusFromUrl(params.get("status"))
  const type = ["all", "Generic", "Payment"].includes(
    params.get("type") ?? "all"
  )
    ? (params.get("type") ?? "all")
    : "all"
  const sort = ["created", "priority"].includes(params.get("sort") ?? "")
    ? params.get("sort")!
    : "updated"
  const requestKey = `${query}|${revision}|${retry}`
  const pending = list.requestKey !== requestKey
  const currentError = pending ? "" : list.error
  const visibleData = list.query === query ? list.data : null

  useLayoutEffect(() => {
    latestListKey.current = requestKey
  }, [requestKey])
  useLayoutEffect(() => {
    const anchor = listAnchor.current
    listAnchor.current = null
    if (!anchor) return
    const row = [
      ...document.querySelectorAll<HTMLElement>("[data-ticket-id]"),
    ].find(
      (node) =>
        node.dataset.ticketId === anchor.id &&
        node.getBoundingClientRect().height > 0
    )
    if (row && scrollPane.current)
      scrollPane.current.scrollTop +=
        row.getBoundingClientRect().top - anchor.top
  }, [list.data, scrollPane])
  useEffect(
    () => () => {
      listRefreshController.current?.abort()
      listRefreshController.current = null
      listController.current?.abort()
    },
    [query]
  )

  useEffect(() => {
    const update = () => {
      const next = ticketListParams()
      setParams(next)
      setSearch(next.get("q") ?? "")
      setOpener(next.get("opener") ?? "")
    }
    window.addEventListener("popstate", update)
    return () => window.removeEventListener("popstate", update)
  }, [])

  useEffect(() => {
    if (
      listRefreshController.current ||
      completedListKey.current === requestKey
    )
      return
    const controller = new AbortController()
    listController.current?.abort()
    listController.current = controller
    listRefreshController.current = controller
    loadingMoreRef.current = false
    const queryParams = new URLSearchParams(query)
    queryParams.set("status", status)
    queryParams.set("type", type)
    queryParams.set("sort", sort)
    queryParams.set("pageSize", "25")
    queryParams.delete("page")
    queryParams.delete("cursor")
    queryParams.delete("revision")
    const targetCount =
      loadedWindow.current.query === query ? loadedWindow.current.count : 25
    async function refresh() {
      let data = await apiGet<TicketList>(
        `/api/tickets?${queryParams}`,
        controller.signal
      )
      while (data.nextCursor && data.tickets.length < targetCount) {
        queryParams.set("cursor", data.nextCursor)
        queryParams.set("revision", String(data.revision))
        const page = await apiGet<TicketList>(
          `/api/tickets?${queryParams}`,
          controller.signal
        )
        data = { ...page, tickets: [...data.tickets, ...page.tickets] }
      }
      return data
    }
    refresh()
      .then((data) => {
        if (controller.signal.aborted) return
        onSync(data.sync)
        loadedWindow.current = { query, count: data.tickets.length }
        if (scrollPane.current && scrollPane.current.scrollTop > 0) {
          const row = [
            ...document.querySelectorAll<HTMLElement>("[data-ticket-id]"),
          ].find((node) => {
            const box = node.getBoundingClientRect()
            return (
              box.height > 0 &&
              box.bottom >
                (scrollPane.current?.getBoundingClientRect().top ?? 0)
            )
          })
          listAnchor.current = row
            ? {
                id: row.dataset.ticketId!,
                top: row.getBoundingClientRect().top,
              }
            : null
        }
        setList({
          data,
          error: "",
          nextError: "",
          loadingMore: false,
          requestKey,
          query,
        })
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        if (error instanceof ApiError && [401, 403].includes(error.status))
          onUnauthorized()
        setList((current) => ({
          ...current,
          data: current.query === query ? current.data : null,
          error:
            error instanceof Error
              ? error.message
              : "The server connection is unavailable.",
          nextError: "",
          loadingMore: false,
          requestKey,
          query,
        }))
      })
      .finally(() => {
        if (listRefreshController.current !== controller) return
        listRefreshController.current = null
        if (listController.current === controller) listController.current = null
        if (!controller.signal.aborted) {
          completedListKey.current = requestKey
          if (latestListKey.current !== requestKey)
            setListRefreshTick((value) => value + 1)
        }
      })
  }, [
    query,
    requestKey,
    scrollPane,
    status,
    type,
    sort,
    onSync,
    onUnauthorized,
    listRefreshTick,
  ])

  const hasMore = !!list.data?.nextCursor
  const loadMore = useCallback(async () => {
    if (
      !list.data?.nextCursor ||
      loadingMoreRef.current ||
      list.loadingMore ||
      list.requestKey !== requestKey
    )
      return
    loadingMoreRef.current = true
    const controller = new AbortController()
    listController.current?.abort()
    listController.current = controller
    setList((current) => ({ ...current, loadingMore: true, nextError: "" }))
    const queryParams = new URLSearchParams(query)
    queryParams.set("status", status)
    queryParams.set("type", type)
    queryParams.set("sort", sort)
    queryParams.set("pageSize", "25")
    queryParams.delete("page")
    queryParams.set("cursor", list.data.nextCursor)
    queryParams.set("revision", String(list.data.revision))
    try {
      const data = await apiGet<TicketList>(
        `/api/tickets?${queryParams}`,
        controller.signal
      )
      if (controller.signal.aborted) return
      onSync(data.sync)
      loadedWindow.current = {
        query,
        count: list.data.tickets.length + data.tickets.length,
      }
      setList((current) => ({
        ...current,
        data: current.data
          ? {
              ...data,
              tickets: [
                ...current.data.tickets,
                ...data.tickets.filter(
                  (ticket) =>
                    !current.data!.tickets.some(
                      (old) => old.threadId === ticket.threadId
                    )
                ),
              ],
            }
          : data,
        loadingMore: false,
        nextError: "",
      }))
    } catch (error) {
      if (controller.signal.aborted) return
      if (error instanceof ApiError && error.status === 409) {
        setList((current) => ({
          ...current,
          requestKey: "",
          loadingMore: false,
        }))
        setRetry((value) => value + 1)
        return
      }
      if (error instanceof ApiError && [401, 403].includes(error.status))
        onUnauthorized()
      setList((current) => ({
        ...current,
        loadingMore: false,
        nextError:
          error instanceof Error
            ? error.message
            : "Unable to load more tickets.",
      }))
    } finally {
      if (listController.current === controller) {
        loadingMoreRef.current = false
        listController.current = null
      }
    }
  }, [
    list.data,
    list.loadingMore,
    list.requestKey,
    requestKey,
    query,
    status,
    type,
    sort,
    onSync,
    onUnauthorized,
  ])
  useEffect(() => {
    const target = sentinel.current
    if (!target || !hasMore || list.nextError) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) void loadMore()
    })
    observer.observe(target)
    return () => observer.disconnect()
  }, [hasMore, loadMore, list.nextError])

  useEffect(() => {
    if (
      search.trim() === (params.get("q") ?? "") &&
      opener.trim() === (params.get("opener") ?? "")
    )
      return
    const timer = setTimeout(() => {
      const next = new URLSearchParams(params)
      if (search.trim()) next.set("q", search.trim())
      else next.delete("q")
      if (opener.trim()) next.set("opener", opener.trim())
      else next.delete("opener")
      next.delete("cursor")
      next.delete("revision")
      next.delete("page")
      setParams(next)
      updateQuery(next)
    }, 250)
    return () => clearTimeout(timer)
  }, [search, opener, params])

  const allCount = list.data
    ? Object.values(list.data.counts).reduce((sum, count) => sum + count, 0)
    : 0
  function changeParams(update: (next: URLSearchParams) => void) {
    const next = new URLSearchParams(params)
    update(next)
    next.delete("cursor")
    next.delete("revision")
    next.delete("page")
    setParams(next)
    updateQuery(next)
  }
  function changeFilter(key: string, value: string) {
    changeParams((next) => {
      if (value) next.set(key, value)
      else next.delete(key)
      next.delete("cursor")
    })
  }
  function hrefFor(ticket: Ticket) {
    const from = query ? `/?${query}` : "/"
    return `/tickets/${encodeURIComponent(ticket.threadId)}?from=${encodeURIComponent(from)}`
  }

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1
            id="tickets-heading"
            className="text-2xl font-semibold tracking-tight"
          >
            Tickets
          </h1>
          <p className="text-sm text-muted-foreground">
            Browse tickets recorded by the bot.
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          {visibleData ? `${visibleData.total} tickets` : ""}
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="ticket-search">Search tickets</Label>
            <div className="relative">
              <Search
                className="pointer-events-none absolute top-2 left-3 size-4 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                id="ticket-search"
                className="pl-9"
                type="search"
                maxLength={200}
                placeholder="Title or ticket ID"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="ticket-owner">Ticket owner</Label>
            <Input
              id="ticket-owner"
              type="search"
              maxLength={200}
              placeholder="Name, ID or mention"
              value={opener}
              onChange={(event) => setOpener(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ticket-type">Type</Label>
            <NativeSelect
              id="ticket-type"
              className="w-full"
              value={type}
              onChange={(event) => changeFilter("type", event.target.value)}
            >
              <NativeSelectOption value="all">All types</NativeSelectOption>
              <NativeSelectOption value="Generic">General</NativeSelectOption>
              <NativeSelectOption value="Payment">Payment</NativeSelectOption>
            </NativeSelect>
          </div>
          <div className="space-y-2">
            <Label htmlFor="ticket-status">Status</Label>
            <NativeSelect
              id="ticket-status"
              className="w-full"
              value={status}
              onChange={(event) => changeFilter("status", event.target.value)}
            >
              {statusValues.map((value) => (
                <NativeSelectOption key={value} value={value}>
                  {value === "all" ? "All statuses" : statusLabels[value]} (
                  {value === "all" ? allCount : (list.data?.counts[value] ?? 0)}
                  )
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </div>
          <div className="space-y-2">
            <Label htmlFor="ticket-sort">Sort by</Label>
            <NativeSelect
              id="ticket-sort"
              className="w-full"
              value={sort}
              onChange={(event) => changeFilter("sort", event.target.value)}
            >
              <NativeSelectOption value="updated">
                Latest activity
              </NativeSelectOption>
              <NativeSelectOption value="created">
                Newest first
              </NativeSelectOption>
              <NativeSelectOption value="priority">
                Escalated first
              </NativeSelectOption>
            </NativeSelect>
          </div>
        </div>

        {syncNotice}
        {currentError && (
          <Alert variant="destructive">
            <AlertTitle>Unable to load tickets</AlertTitle>
            <AlertDescription className="flex flex-wrap items-center justify-between gap-3">
              <span>{currentError}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setRetry((value) => value + 1)}
              >
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        )}
        {!visibleData ? (
          currentError ? null : (
            <TicketListSkeleton />
          )
        ) : visibleData.tickets.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col gap-1 py-8 text-center">
              <p className="font-medium">No tickets found</p>
              <p className="text-sm text-muted-foreground">
                Change the filters or search to see other results.
              </p>
            </CardContent>
          </Card>
        ) : list.data ? (
          <>
            {pending && (
              <p className="sr-only" role="status">
                Updating results…
              </p>
            )}
            <ul
              className="flex flex-col divide-y rounded-xl border"
              aria-label="Ticket list"
            >
              {list.data.tickets.map((ticket) => (
                <li
                  key={ticket.threadId}
                  data-ticket-id={ticket.threadId}
                  className={`min-w-0 cursor-pointer p-4 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-ring ${selectedId === ticket.threadId ? "bg-muted ring-1 ring-ring ring-inset" : ""} ${ticket.unread ? "post-unread-row" : "hover:bg-muted/50"}`}
                  onClick={openTicketRow}
                >
                  <TicketPreview
                    ticket={ticket}
                    href={hrefFor(ticket)}
                    selected={selectedId === ticket.threadId}
                  />
                  <div className="mt-3 text-sm text-muted-foreground">
                    <TicketOwner ticket={ticket} />
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
                    {statusBadge(ticket.status)}
                    <Badge variant="outline">
                      {ticketTypeLabel(ticket.type)}
                    </Badge>
                    {ticket.unread && (
                      <Badge variant="outline" className="post-unread-badge">
                        Unread
                      </Badge>
                    )}
                    {ticket.escalatedAt && (
                      <Badge variant="destructive">Escalated</Badge>
                    )}
                    <span className="text-xs text-muted-foreground">
                      Updated {formatDate(ticket.lastMessageAt)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground">
                {list.data.tickets.length} of {list.data.total} tickets
              </p>
              {list.nextError && (
                <Alert variant="destructive">
                  <AlertDescription>
                    {list.nextError}{" "}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => void loadMore()}
                    >
                      Retry
                    </Button>
                  </AlertDescription>
                </Alert>
              )}
              {hasMore && (
                <Button
                  variant="outline"
                  size="sm"
                  disabled={list.loadingMore}
                  onClick={() => void loadMore()}
                >
                  {list.loadingMore ? "Loading…" : "Load more"}
                </Button>
              )}
            </div>
            <div ref={sentinel} aria-hidden="true" />
          </>
        ) : null}
      </div>
    </section>
  )
}

function TicketListSkeleton() {
  return (
    <div
      className="flex flex-col gap-3"
      aria-label="Loading tickets"
      aria-busy="true"
    >
      {Array.from({ length: 5 }, (_, index) => (
        <Skeleton key={index} className="h-12 w-full" />
      ))}
    </div>
  )
}

function TicketDetail({
  id,
  session,
  revision,
  sync,
  onUnauthorized,
}: {
  id: string
  session: Session
  revision: number | null
  sync: SyncState
  onUnauthorized: () => void
}) {
  const [retry, setRetry] = useState(0)
  const [ticket, setTicket] = useState<{
    data: Ticket | null
    error: string
    requestKey: string
  }>({ data: null, error: "", requestKey: "" })
  const [messages, setMessages] = useState<{
    data: TicketMessages | null
    error: string
    requestKey: string
    loadingMore: boolean
    olderError: string
  }>({
    data: null,
    error: "",
    requestKey: "",
    loadingMore: false,
    olderError: "",
  })
  const olderMessagesController = useRef<AbortController | null>(null)
  const [actionBusy, setActionBusy] = useState(false)
  const [actionNotice, setActionNotice] = useState("")
  const [actionError, setActionError] = useState("")
  const [actionReason, setActionReason] = useState("")
  const [selectedAction, setSelectedAction] = useState<TicketAction | null>(
    null
  )
  const actionTrigger = useRef<HTMLButtonElement | null>(null)
  const [readError, setReadError] = useState("")
  const oldestLoadedMessageId = useRef<string | null>(null)
  const refreshedMessagesKey = useRef("")
  const messagesController = useRef<AbortController | null>(null)
  const latestMessagesKey = useRef("")
  const [messagesRefreshTick, setMessagesRefreshTick] = useState(0)
  const [resolvedMentions, setResolvedMentions] = useState<MentionNames>({
    users: {},
    roles: {},
  })
  const [mentionTick, setMentionTick] = useState(0)
  const mentionAttempts = useRef(new Set<string>())
  const mentionController = useRef<AbortController | null>(null)
  const [debugTiming] = useState(() => ({
    viewId: crypto.randomUUID(),
    started: performance.now(),
    firstDataMs: -1,
    moduleMs: 0,
    reported: false,
  }))
  const debugView = session.capabilities.chatDebug
    ? debugTiming.viewId
    : undefined
  const onConversationReady = useCallback(() => {
    if (
      !session.capabilities.chatDebug ||
      debugTiming.reported ||
      debugTiming.firstDataMs < 0
    )
      return
    debugTiming.reported = true
    void apiPost("/api/debug/chat", session.csrfToken, {
      viewId: debugTiming.viewId,
      readyMs: performance.now() - debugTiming.started,
      firstDataMs: debugTiming.firstDataMs,
      moduleMs: debugTiming.moduleMs,
      count: messages.data?.messages.length ?? 0,
      cached: !!messages.data?.cached,
      visible: document.visibilityState === "visible",
    }).catch(() => {})
  }, [
    session.capabilities.chatDebug,
    session.csrfToken,
    debugTiming,
    messages.data,
  ])
  const markRead = useCallback(
    async (position: ReadPosition) => {
      try {
        await apiPost(
          `/api/tickets/${encodeURIComponent(id)}/read`,
          session.csrfToken,
          position
        )
      } catch (error) {
        if (error instanceof ApiError && [401, 403].includes(error.status))
          onUnauthorized()
        throw error
      }
    },
    [id, session.csrfToken, onUnauthorized]
  )
  const ticketRequestKey = `${id}|${revision}|${retry}`
  const messagesRequestKey = ticketRequestKey
  useLayoutEffect(() => {
    latestMessagesKey.current = messagesRequestKey
  }, [messagesRequestKey])
  const ticketPending = ticket.requestKey !== ticketRequestKey
  const ticketError = ticketPending ? "" : ticket.error
  const conversationAvailable =
    session.capabilities.canReadConversation && !ticket.data?.contentExcluded
  const messagesPending =
    conversationAvailable && messages.requestKey !== messagesRequestKey
  const currentMessagesError =
    messages.requestKey === messagesRequestKey ? messages.error : ""
  const refreshingMessages =
    !currentMessagesError &&
    (messagesPending || !!messages.data?.cached || !!messages.data?.syncing)
  const mentions = useMemo(
    () => ({
      users: { ...messages.data?.mentions?.users, ...resolvedMentions.users },
      roles: { ...messages.data?.mentions?.roles, ...resolvedMentions.roles },
      roleColors: {
        ...messages.data?.mentions?.roleColors,
        ...resolvedMentions.roleColors,
      },
    }),
    [messages.data?.mentions, resolvedMentions]
  )
  useEffect(
    () => () => {
      mentionController.current?.abort()
      mentionController.current = null
    },
    [id]
  )
  useEffect(() => {
    if (
      !session.capabilities.mentionNames ||
      !conversationAvailable ||
      !messages.data?.messages.length ||
      mentionController.current
    )
      return
    const users = new Set<string>()
    const roles = new Set<string>()
    const authors = new Set(
      messages.data.messages.map((message) => message.authorId)
    )
    for (const message of messages.data.messages) {
      const bodies = [
        message.content,
        message.replyTo?.content,
        ...(message.embeds || []).flatMap((embed) => [
          embed.description,
          ...(embed.fields || []).map((field) => field.value),
        ]),
      ]
      for (const body of bodies) {
        if (!body) continue
        for (const match of body.matchAll(
          /<@!?([0-9]{16,22})>|<@&([0-9]{16,22})>/g
        )) {
          const role = !!match[2]
          const mentionId = match[2] || match[1]
          const key = `${role ? "role" : "user"}:${mentionId}`
          if (
            mentionAttempts.current.has(key) ||
            (role
              ? mentions.roles[mentionId]
              : mentions.users[mentionId] || authors.has(mentionId))
          )
            continue
          if (users.size + roles.size < 4) (role ? roles : users).add(mentionId)
        }
      }
    }
    if (!users.size && !roles.size) return
    for (const mentionId of users)
      mentionAttempts.current.add(`user:${mentionId}`)
    for (const mentionId of roles)
      mentionAttempts.current.add(`role:${mentionId}`)
    const controller = new AbortController()
    mentionController.current = controller
    const params = new URLSearchParams()
    if (users.size) params.set("users", [...users].join(","))
    if (roles.size) params.set("roles", [...roles].join(","))
    void apiGet<MentionNames>(
      `/api/tickets/${encodeURIComponent(id)}/mentions?${params}`,
      controller.signal
    )
      .then((names) => {
        if (!controller.signal.aborted)
          setResolvedMentions((current) => ({
            users: { ...current.users, ...names.users },
            roles: { ...current.roles, ...names.roles },
            roleColors: { ...current.roleColors, ...names.roleColors },
          }))
      })
      .catch((error: unknown) => {
        if (
          !controller.signal.aborted &&
          error instanceof ApiError &&
          [401, 403].includes(error.status)
        )
          onUnauthorized()
      })
      .finally(() => {
        if (mentionController.current === controller) {
          mentionController.current = null
          if (!controller.signal.aborted) setMentionTick((value) => value + 1)
        }
      })
  }, [
    conversationAvailable,
    messages.data,
    mentions,
    id,
    onUnauthorized,
    mentionTick,
    session.capabilities.mentionNames,
  ])
  const returnToParam =
    new URLSearchParams(window.location.search).get("from") ?? "/"
  let returnTo = "/"
  try {
    const candidate = new URL(returnToParam, window.location.origin)
    if (
      returnToParam.startsWith("/") &&
      candidate.origin === window.location.origin
    )
      returnTo = `${candidate.pathname}${candidate.search}${candidate.hash}`
  } catch {
    returnTo = "/"
  }

  useEffect(() => {
    const controller = new AbortController()
    apiGet<{ ticket: Ticket }>(
      `/api/tickets/${encodeURIComponent(id)}`,
      controller.signal,
      debugView
    )
      .then(({ ticket: next }) =>
        setTicket({ data: next, error: "", requestKey: ticketRequestKey })
      )
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        if (error instanceof ApiError && [401, 403].includes(error.status))
          onUnauthorized()
        setTicket((current) => ({
          ...current,
          error: error instanceof Error ? error.message : "Connection error.",
          requestKey: ticketRequestKey,
        }))
      })
    return () => controller.abort()
  }, [id, ticketRequestKey, onUnauthorized, debugView])

  useEffect(() => {
    if (!conversationAvailable) return
    const started = performance.now()
    void import("@/components/ticket-conversation")
      .then(() => {
        debugTiming.moduleMs = performance.now() - started
      })
      .catch(() => {})
  }, [conversationAvailable, debugTiming])

  useEffect(
    () => () => {
      messagesController.current?.abort()
      messagesController.current = null
      olderMessagesController.current?.abort()
    },
    [id, conversationAvailable]
  )

  useEffect(() => {
    if (
      !conversationAvailable ||
      messages.loadingMore ||
      messagesController.current ||
      refreshedMessagesKey.current === messagesRequestKey
    )
      return
    const controller = new AbortController()
    messagesController.current = controller
    async function refresh() {
      const endpoint = `/api/tickets/${encodeURIComponent(id)}/messages`
      const oldest = refreshedMessagesKey.current
        ? oldestLoadedMessageId.current
        : null
      if (!oldest) {
        const saved = await apiGet<TicketMessages>(
          `${endpoint}?limit=20&cached=1`,
          controller.signal,
          debugView
        )
        if (saved.messages.length && debugTiming.firstDataMs < 0)
          debugTiming.firstDataMs = performance.now() - debugTiming.started
        if (saved.messages.length && !controller.signal.aborted)
          setMessages((current) => ({
            ...current,
            data: {
              ...saved,
              cached: true,
              messages: mergeMessages(saved.messages),
            },
            error: "",
            requestKey: messagesRequestKey,
          }))
      }
      let syncing: boolean
      do {
        let data = await apiGet<TicketMessages>(
          `${endpoint}?limit=20`,
          controller.signal,
          debugView
        )
        if (controller.signal.aborted) return
        if (debugTiming.firstDataMs < 0)
          debugTiming.firstDataMs = performance.now() - debugTiming.started
        syncing = !!data.syncing
        if (oldest)
          setMessages((current) => ({
            ...current,
            data: {
              ...data,
              syncing: true,
              messages: mergeMessages(
                current.data?.messages || [],
                data.messages
              ),
              nextBefore: current.data?.nextBefore ?? data.nextBefore,
            },
            error: "",
            requestKey: messagesRequestKey,
          }))
        while (
          data.nextBefore &&
          oldest &&
          !data.messages.some((message) => BigInt(message.id) <= BigInt(oldest))
        ) {
          const page = await apiGet<TicketMessages>(
            `${endpoint}?before=${encodeURIComponent(data.nextBefore)}&limit=20`,
            controller.signal,
            debugView
          )
          syncing ||= !!page.syncing
          data = {
            ...page,
            mentions: {
              users: { ...data.mentions?.users, ...page.mentions?.users },
              roles: { ...data.mentions?.roles, ...page.mentions?.roles },
              roleColors: {
                ...data.mentions?.roleColors,
                ...page.mentions?.roleColors,
              },
            },
            messages: mergeMessages(page.messages, data.messages),
          }
        }
        if (controller.signal.aborted) return
        const ordered = mergeMessages(data.messages)
        const retained = oldest
          ? ordered.filter((message) => BigInt(message.id) >= BigInt(oldest))
          : ordered
        oldestLoadedMessageId.current = retained[0]?.id ?? null
        setMessages((current) => ({
          data: {
            ...data,
            cached: false,
            syncing,
            messages: retained,
            nextBefore:
              retained.length < ordered.length
                ? (retained[0]?.id ?? null)
                : data.nextBefore,
          },
          error: "",
          requestKey: messagesRequestKey,
          loadingMore: false,
          olderError: current.olderError,
        }))
      } while (syncing)
      refreshedMessagesKey.current = messagesRequestKey
    }
    refresh()
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        if (error instanceof ApiError && [401, 403].includes(error.status))
          onUnauthorized()
        setMessages((current) => ({
          ...current,
          error: error instanceof Error ? error.message : "Connection error.",
          requestKey: messagesRequestKey,
          loadingMore: false,
        }))
      })
      .finally(() => {
        if (messagesController.current !== controller) return
        messagesController.current = null
        if (!controller.signal.aborted) {
          refreshedMessagesKey.current = messagesRequestKey
          if (latestMessagesKey.current !== messagesRequestKey)
            setMessagesRefreshTick((value) => value + 1)
        }
      })
  }, [
    id,
    messagesRequestKey,
    conversationAvailable,
    onUnauthorized,
    messages.loadingMore,
    debugView,
    debugTiming,
    messagesRefreshTick,
  ])

  useEffect(() => () => olderMessagesController.current?.abort(), [id])

  async function loadOlderMessages() {
    const before = messages.data?.nextBefore
    if (
      !before ||
      messages.loadingMore ||
      refreshingMessages ||
      olderMessagesController.current
    )
      return
    const controller = new AbortController()
    olderMessagesController.current = controller
    setMessages((current) => ({
      ...current,
      loadingMore: true,
      olderError: "",
    }))
    try {
      let page: TicketMessages
      do {
        page = await apiGet<TicketMessages>(
          `/api/tickets/${encodeURIComponent(id)}/messages?before=${encodeURIComponent(before)}&limit=20`,
          controller.signal,
          debugView
        )
        if (controller.signal.aborted) return
        const oldest = mergeMessages(page.messages)[0]?.id
        if (oldest) oldestLoadedMessageId.current = oldest
        setMessages((current) => {
          if (!current.data)
            return {
              ...current,
              data: page,
              loadingMore: !!page.syncing,
              olderError: "",
            }
          return {
            ...current,
            data: {
              ...page,
              mentions: {
                users: {
                  ...current.data.mentions?.users,
                  ...page.mentions?.users,
                },
                roles: {
                  ...current.data.mentions?.roles,
                  ...page.mentions?.roles,
                },
                roleColors: {
                  ...current.data.mentions?.roleColors,
                  ...page.mentions?.roleColors,
                },
              },
              messages: mergeMessages(page.messages, current.data.messages),
            },
            loadingMore: !!page.syncing,
            olderError: "",
          }
        })
      } while (page.syncing)
    } catch (error) {
      if (controller.signal.aborted) return
      if (error instanceof ApiError && [401, 403].includes(error.status))
        onUnauthorized()
      setMessages((current) => ({
        ...current,
        loadingMore: false,
        olderError:
          error instanceof Error
            ? error.message
            : "Unable to load older messages.",
      }))
    } finally {
      if (olderMessagesController.current === controller)
        olderMessagesController.current = null
    }
  }

  async function runAction(action: TicketAction) {
    if (
      !ticket.data ||
      actionBusy ||
      !session.capabilities.canManageTicket ||
      ticket.data.status === "deleted"
    )
      return
    setActionBusy(true)
    setActionError("")
    setActionNotice("")
    try {
      const result = await apiPost<{ ticket: Ticket }>(
        `/api/tickets/${encodeURIComponent(id)}/actions`,
        session.csrfToken,
        {
          action,
          ...(actionReason.trim() ? { reason: actionReason.trim() } : {}),
        }
      )
      setTicket({
        data: result.ticket,
        error: "",
        requestKey: ticketRequestKey,
      })
      setActionReason("")
      setSelectedAction(null)
      setActionNotice("Ticket updated successfully.")
    } catch (error) {
      if (error instanceof ApiError && [401, 403].includes(error.status))
        onUnauthorized()
      setActionError(
        error instanceof Error ? error.message : "Unable to update this ticket."
      )
    } finally {
      setActionBusy(false)
    }
  }

  if (ticketPending && !ticket.data)
    return (
      <>
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-80 w-full" />
      </>
    )
  if (!ticket.data)
    return (
      <Alert variant="destructive">
        <AlertTitle>Unable to load ticket</AlertTitle>
        <AlertDescription className="flex flex-wrap items-center justify-between gap-3">
          <span>{ticketError}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setRetry((value) => value + 1)}
          >
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    )
  const item = ticket.data
  const discordHref = safeDiscordUrl(item.discordUrl)
  const actions: TicketAction[] =
    item.status === "open" ? ["close", "close-lock"] : ["reopen"]
  if (item.escalatedAt) actions.push("resolve-escalation")
  else if (item.status === "open") actions.push("escalate")
  return (
    <section
      className="flex h-full min-h-0 flex-col gap-3"
      aria-labelledby="ticket-heading"
      aria-busy={ticketPending}
    >
      <Button className="self-start" variant="ghost" asChild>
        <AppLink href={returnTo}>
          <ArrowLeft />
          All tickets
        </AppLink>
      </Button>
      {ticketError && (
        <Alert variant="destructive">
          <AlertTitle>Ticket data may be out of date</AlertTitle>
          <AlertDescription>{ticketError}</AlertDescription>
        </Alert>
      )}
      <div className="flex shrink-0 flex-wrap items-start justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-2">
          <h1
            id="ticket-heading"
            tabIndex={-1}
            className="text-lg font-semibold tracking-tight break-words"
          >
            {item.name || "Ticket details"}
          </h1>
          <div className="flex flex-wrap items-center gap-2">
            {statusBadge(item.status)}
            <Badge variant="outline">{ticketTypeLabel(item.type)}</Badge>
            {item.escalatedAt && <Badge variant="destructive">Escalated</Badge>}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {discordHref ? (
            <Button asChild variant="outline">
              <a href={discordHref} target="_blank" rel="noopener noreferrer">
                Open in Discord{" "}
                <span className="sr-only">opens in a new tab</span>
                <ArrowUpRight />
              </a>
            </Button>
          ) : (
            <p className="text-sm text-muted-foreground">
              Discord link unavailable.
            </p>
          )}
          {item.unread && !conversationAvailable && (
            <Button
              variant="outline"
              onClick={() => {
                setReadError("")
                void markRead({
                  messageAt: item.lastMessageAt!,
                  messageId: item.lastMessageId,
                }).catch((error: unknown) =>
                  setReadError(
                    error instanceof Error
                      ? error.message
                      : "Unable to mark as read."
                  )
                )
              }}
            >
              Mark as read
            </Button>
          )}
        </div>
      </div>

      {actionNotice && (
        <p role="status" className="text-sm text-muted-foreground">
          {actionNotice}
        </p>
      )}
      {readError && (
        <Alert variant="destructive">
          <AlertDescription>{readError}</AlertDescription>
        </Alert>
      )}
      {item.escalatedAt && (
        <Alert variant="destructive">
          <AlertTitle>Escalated ticket</AlertTitle>
          <AlertDescription>
            {item.escalationReason || "No escalation reason provided."}
            {item.escalatedBy ? ` · By ${item.escalatedBy}` : ""} ·{" "}
            {formatDate(item.escalatedAt)}
          </AlertDescription>
        </Alert>
      )}
      <Dialog
        open={selectedAction !== null}
        onOpenChange={(open) => {
          if (!open && !actionBusy) {
            setSelectedAction(null)
            setActionReason("")
            setActionError("")
          }
        }}
      >
        <DialogContent
          showCloseButton={!actionBusy}
          onEscapeKeyDown={(event) => {
            if (actionBusy) event.preventDefault()
          }}
          onCloseAutoFocus={(event) => {
            event.preventDefault()
            if (actionTrigger.current?.isConnected)
              actionTrigger.current.focus()
            else document.getElementById("ticket-heading")?.focus()
          }}
        >
          <DialogHeader className="pr-10">
            <DialogTitle>
              {selectedAction ? actionLabels[selectedAction] : "Ticket action"}
            </DialogTitle>
            <DialogDescription>
              Add an optional note. This action will be recorded with your
              account.
            </DialogDescription>
          </DialogHeader>
          <form
            id="ticket-action"
            className="flex flex-col gap-3"
            onSubmit={(event) => {
              event.preventDefault()
              if (selectedAction) void runAction(selectedAction)
            }}
          >
            <label className="text-sm font-medium" htmlFor="action-reason">
              Reason (optional)
            </label>
            <Textarea
              id="action-reason"
              className="min-h-24"
              maxLength={500}
              value={actionReason}
              disabled={actionBusy}
              onChange={(event) => setActionReason(event.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              {actionReason.length}/500 characters
            </p>
            {actionError && (
              <Alert variant="destructive">
                <AlertDescription>{actionError}</AlertDescription>
              </Alert>
            )}
          </form>
          <DialogFooter>
            <Button
              variant="outline"
              disabled={actionBusy}
              onClick={() => {
                setSelectedAction(null)
                setActionReason("")
                setActionError("")
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form="ticket-action"
              variant={
                selectedAction === "close-lock" ? "destructive" : "default"
              }
              disabled={actionBusy}
            >
              {actionBusy
                ? "Updating…"
                : selectedAction
                  ? actionLabels[selectedAction]
                  : "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <details className="post-details-disclosure">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-2 p-3 text-sm font-medium focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring [&::-webkit-details-marker]:hidden">
          Ticket details &amp; management
          <ChevronDown
            aria-hidden="true"
            className="size-4 shrink-0 group-open:rotate-180"
          />
        </summary>
        <div
          id="initial-message-details"
          className="post-details-body space-y-4"
        >
          <p className="text-sm text-muted-foreground">
            Opened by {item.openerName || item.openerId || "Unknown"}
            {item.openerName && item.openerId ? ` · ID ${item.openerId}` : ""}
          </p>
          <div className="flex flex-wrap gap-2">
            {session.capabilities.canManageTicket &&
              item.status !== "deleted" &&
              actions.map((action) => (
                <Button
                  key={action}
                  variant={action === "close-lock" ? "destructive" : "outline"}
                  disabled={actionBusy}
                  onClick={(event) => {
                    actionTrigger.current = event.currentTarget
                    setActionReason("")
                    setActionError("")
                    setActionNotice("")
                    setSelectedAction(action)
                  }}
                >
                  {actionLabels[action]}
                </Button>
              ))}
          </div>
          <p className="break-words whitespace-pre-wrap">
            {item.description || "No description recorded."}
          </p>
          <Separator />
          <dl className="grid gap-x-6 gap-y-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
            <Metadata label="Created" value={formatDate(item.createdAt)} />
            <Metadata
              label="Last updated"
              value={formatDate(item.lastMessageAt)}
            />
            <Metadata
              label="Last status change"
              value={formatDate(item.statusChangedAt)}
            />
            <Metadata
              label="Last message"
              value={`${item.lastMessageAuthorName ?? "—"} · ${item.lastMessageAuthorId ?? "—"} · ${formatDate(item.lastMessageAt)}`}
            />
            <Metadata
              label="Added users"
              value={
                item.joinedUserIds.length
                  ? item.joinedUserIds.join(", ")
                  : "None"
              }
            />
            <Metadata
              label="Verification thread"
              value={item.verificationThreadId ?? "—"}
            />
            <Metadata label="Discord thread" value={item.threadId} />
            <Metadata
              label="Synchronization"
              value={formatDate(sync.updatedAt)}
            />
            <Metadata
              label="Last action"
              value={
                item.lastAction
                  ? `${item.lastAction.action} · ${item.lastAction.actorId ?? "—"} · ${formatDate(item.lastAction.at)}${item.lastAction.reason ? ` · ${item.lastAction.reason}` : ""}`
                  : "—"
              }
            />
            <Metadata
              label="Deletion date"
              value={formatDate(item.deletedAt)}
            />
            <Metadata
              label="Recorded participants only"
              value={item.recordedParticipantsOnly ? "Yes" : "No"}
            />
            <Metadata
              label="Content excluded"
              value={item.contentExcluded ? "Yes" : "No"}
            />
            <Metadata label="Imported" value={item.imported ? "Yes" : "No"} />
          </dl>
        </div>
      </details>

      {conversationAvailable && (
        <section
          aria-label="Conversation"
          aria-busy={messagesPending}
          className="flex min-h-0 min-w-0 flex-1 flex-col"
        >
          {messages.data?.available ? (
            <Suspense fallback={<Skeleton className="ticket-chat w-full" />}>
              <TicketConversation
                ticket={item}
                session={session}
                messages={messages.data.messages}
                mentions={mentions}
                onRead={markRead}
                onUnauthorized={onUnauthorized}
                hasOlder={!!messages.data.nextBefore}
                loadingOlder={messages.loadingMore || refreshingMessages}
                onLoadOlder={loadOlderMessages}
                historyError={currentMessagesError || messages.olderError}
                refreshing={refreshingMessages}
                onReady={
                  session.capabilities.chatDebug
                    ? onConversationReady
                    : undefined
                }
              />
            </Suspense>
          ) : currentMessagesError ? (
            <Alert variant="destructive">
              <AlertTitle>Conversation unavailable</AlertTitle>
              <AlertDescription>{currentMessagesError}</AlertDescription>
            </Alert>
          ) : messages.data ? (
            <p className="text-sm text-muted-foreground">
              {messages.data.reason || "Conversation unavailable."}
            </p>
          ) : (
            <Skeleton
              className="ticket-chat w-full"
              aria-label="Loading conversation"
            />
          )}
        </section>
      )}
    </section>
  )
}

function Metadata({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="mt-1 font-medium break-words">{value}</dd>
    </div>
  )
}

function safeHttpsUrl(value: string | null | undefined) {
  if (!value) return null
  try {
    const url = new URL(value)
    return url.protocol === "https:" && !url.username && !url.password
      ? url.href
      : null
  } catch {
    return null
  }
}

function safeDiscordUrl(value: string | null | undefined) {
  const href = safeHttpsUrl(value)
  if (!href) return null
  const url = new URL(href)
  const hostname = url.hostname
  return !url.port &&
    (hostname === "discord.com" ||
      hostname === "www.discord.com" ||
      hostname === "discordapp.com")
    ? href
    : null
}

function PrivacyPage() {
  const [state, setState] = useState<{
    data: PrivacyPolicy | null
    error: string
    loading: boolean
  }>({ data: null, error: "", loading: true })
  const [retry, setRetry] = useState(0)
  useEffect(() => {
    const controller = new AbortController()
    apiGet<PrivacyPolicy>("/api/privacy", controller.signal)
      .then((data) => setState({ data, error: "", loading: false }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        setState({
          data: null,
          error: error instanceof Error ? error.message : "Connection error.",
          loading: false,
        })
      })
    return () => controller.abort()
  }, [retry])

  return (
    <>
      <header className="border-b">
        <div className="mx-auto flex min-h-14 w-full max-w-4xl items-center justify-between gap-4 px-4 sm:px-6">
          <AppLink href="/" className="font-semibold">
            Ticket dashboard
          </AppLink>
          <AppLink
            href="/"
            className="text-sm text-muted-foreground underline-offset-4 hover:underline"
          >
            Open dashboard
          </AppLink>
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-8 sm:px-6">
        {state.loading ? (
          <>
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-64 w-full" />
          </>
        ) : state.error ? (
          <Alert variant="destructive">
            <AlertTitle>Privacy policy unavailable</AlertTitle>
            <AlertDescription className="flex flex-wrap items-center justify-between gap-3">
              <span>{state.error}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setState((current) => ({
                    ...current,
                    error: "",
                    loading: true,
                  }))
                  setRetry((value) => value + 1)
                }}
              >
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        ) : state.data ? (
          <article className="flex flex-col gap-6">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">
                {state.data.title}
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Updated {formatDate(state.data.updatedAt)}
              </p>
            </div>
            {!state.data.configured && (
              <Alert>
                <AlertTitle>Privacy policy is being configured</AlertTitle>
                <AlertDescription>
                  The final text has not been published yet.
                </AlertDescription>
              </Alert>
            )}
            {state.data.sections.map((section, index) => (
              <section
                key={`${section.title}-${index}`}
                className="flex flex-col gap-3"
              >
                <h2 className="text-lg font-medium">{section.title}</h2>
                {section.paragraphs.map((paragraph, paragraphIndex) => (
                  <p
                    key={paragraphIndex}
                    className="max-w-3xl text-sm leading-6 whitespace-pre-wrap"
                  >
                    {paragraph}
                  </p>
                ))}
                {section.items && (
                  <ul className="ml-5 list-disc space-y-2 text-sm leading-6">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
            {state.data.contactEmail && (
              <p className="text-sm">Contact: {state.data.contactEmail}</p>
            )}
          </article>
        ) : null}
      </main>
    </>
  )
}

export default App
