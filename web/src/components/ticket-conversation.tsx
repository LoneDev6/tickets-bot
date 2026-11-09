import { Fragment, memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import type { ReactNode } from "react"
import { parse } from "discord-markdown-parser"
import {
  DiscordAttachments, DiscordBold, DiscordCode, DiscordCustomEmoji, DiscordEmbed,
  DiscordEmbedDescription, DiscordEmbedField, DiscordEmbedFields, DiscordEmbedFooter,
  DiscordFileAttachment, DiscordImageAttachment, DiscordItalic, DiscordMention,
  DiscordMessage, DiscordMessages, DiscordPre, DiscordQuote, DiscordReaction,
  DiscordReactions, DiscordReply, DiscordSpoiler, DiscordTime, DiscordUnderlined,
} from "@skyra/discord-components-react"
import { ApiError, apiPost, type MentionNames, type Session, type Ticket, type TicketMessage } from "@/api"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ChevronRight, Hash, Send } from "lucide-react"

export type ReadPosition = { messageAt: number; messageId: string | null }

function safeUrl(value: unknown) {
  if (typeof value !== "string") return undefined
  try {
    const url = new URL(value)
    return ["https:", "http:"].includes(url.protocol) && !url.username && !url.password ? url.href : undefined
  } catch { return undefined }
}

function avatar(id: string) {
  const index = /^\d+$/.test(id) ? Number((BigInt(id) >> 22n) % 6n) : 0
  return `https://cdn.discordapp.com/embed/avatars/${index}.png`
}

function markdownNodes(nodes: ReturnType<typeof parse>, authors: Map<string, string>, mentions?: MentionNames): ReactNode {
  return nodes.map((node, index) => {
    const content = Array.isArray(node.content) ? markdownNodes(node.content, authors, mentions) : String(node.content ?? "")
    let result: ReactNode = content
    switch (node.type) {
      case "strong": result = <DiscordBold>{content}</DiscordBold>; break
      case "em": result = <DiscordItalic>{content}</DiscordItalic>; break
      case "underline": result = <DiscordUnderlined>{content}</DiscordUnderlined>; break
      case "strikethrough": result = <s>{content}</s>; break
      case "spoiler": result = <DiscordSpoiler>{content}</DiscordSpoiler>; break
      case "inlineCode": result = <DiscordCode>{content}</DiscordCode>; break
      case "codeBlock": result = <DiscordPre>{content}</DiscordPre>; break
      case "blockQuote": result = <DiscordQuote>{content}</DiscordQuote>; break
      case "br": result = <br />; break
      case "heading": result = <><DiscordBold>{content}</DiscordBold><br /></>; break
      case "user": result = <DiscordMention>{mentions?.users[String(node.id)] || authors.get(String(node.id)) || String(node.id)}</DiscordMention>; break
      case "role": result = <DiscordMention type="role" color={mentions?.roleColors?.[String(node.id)]}>{mentions?.roles[String(node.id)] || String(node.id)}</DiscordMention>; break
      case "channel": result = <DiscordMention type="channel">{String(node.id)}</DiscordMention>; break
      case "everyone": case "here": result = <DiscordMention>{node.type}</DiscordMention>; break
      case "link": case "url": case "autolink": {
        const href = safeUrl(node.target)
        result = href ? <a href={href} target="_blank" rel="noopener noreferrer" className="ticket-chat-link">{content}</a> : content
        break
      }
      case "emoji": {
        const id = String(node.id)
        result = /^\d{16,22}$/.test(id) ? <DiscordCustomEmoji name={String(node.name)} url={`https://cdn.discordapp.com/emojis/${id}.${node.animated ? "gif" : "png"}`} /> : content
        break
      }
      case "timestamp": {
        const date = new Date(Number(node.timestamp) * 1000)
        result = Number.isNaN(date.getTime()) ? String(node.timestamp) : <DiscordTime title={date.toLocaleString()}>{date.toLocaleString()}</DiscordTime>
        break
      }
    }
    return <Fragment key={index}>{result}</Fragment>
  })
}

function Markdown({ content, authors, mentions }: { content: string; authors: Map<string, string>; mentions?: MentionNames }) {
  const nodes = useMemo(() => parse(content, "extended"), [content])
  return <>{markdownNodes(nodes, authors, mentions)}</>
}

const Message = memo(function Message({ message, previous, authors, mentions, pending = false }: { message: TicketMessage; previous?: TicketMessage; authors: Map<string, string>; mentions?: MentionNames; pending?: boolean }) {
  const grouped = previous?.authorId === message.authorId && previous.webhookId === message.webhookId && previous.bot === message.bot && !message.replyTo && message.createdAt - previous.createdAt < 300_000 && new Date(previous.createdAt).toDateString() === new Date(message.createdAt).toDateString()
  return <DiscordMessage author={message.authorName || "Unknown user"} avatar={safeUrl(message.authorAvatarUrl) || avatar(message.authorId)} bot={!!message.bot} roleColor={/^#[0-9a-f]{6}$/i.test(message.authorRoleColor || "") ? message.authorRoleColor! : undefined} data-message-id={pending ? undefined : message.id} style={grouped ? { marginTop: 0 } : undefined} title={new Date(message.createdAt).toLocaleString("en-GB")} timestamp={new Date(message.createdAt).toLocaleTimeString("en", { hour: "numeric", minute: "2-digit" })} edited={!!message.editedAt} messageBodyOnly={grouped}>
    {message.replyTo && <DiscordReply slot="reply" author={message.replyTo.authorName} avatar={safeUrl(message.replyTo.authorAvatarUrl) || avatar(message.replyTo.authorId)} roleColor="var(--chat-reply-author)" bot={!!message.replyTo.bot}><Markdown content={message.replyTo.content} authors={authors} mentions={mentions} /></DiscordReply>}
    <Markdown content={message.content} authors={authors} mentions={mentions} />
    {!!message.attachments.length && <DiscordAttachments slot="attachments">{message.attachments.map((attachment, index) => {
      const url = safeUrl(attachment.url)
      if (!url) return <span key={index}>{attachment.name}</span>
      return attachment.contentType?.startsWith("image/") || /\.(png|jpe?g|gif|webp)(\?|$)/i.test(url)
        ? <DiscordImageAttachment key={index} customImageElement className="ticket-chat-attachment"><a href={url} target="_blank" rel="noopener noreferrer" className="ticket-chat-image" aria-label={`Open attachment: ${attachment.name}`}><img src={url} alt={attachment.name} loading="lazy" /></a></DiscordImageAttachment>
        : <DiscordFileAttachment key={index} name={attachment.name} href={url} bytes={attachment.size || 0} target="_blank" rel="noopener noreferrer" />
    })}</DiscordAttachments>}
    {message.embeds?.map((embed, index) => <DiscordEmbed key={index} slot="embeds" embedTitle={embed.title || ""} url={safeUrl(embed.url)} color={typeof embed.color === "number" ? `#${embed.color.toString(16).padStart(6, "0")}` : undefined} image={safeUrl(embed.image)} thumbnail={safeUrl(embed.thumbnail)} authorName={embed.author?.name} authorUrl={safeUrl(embed.author?.url)} authorImage={safeUrl(embed.author?.iconUrl)}>
      {embed.description && <DiscordEmbedDescription slot="description"><Markdown content={embed.description} authors={authors} mentions={mentions} /></DiscordEmbedDescription>}
      {!!embed.fields?.length && <DiscordEmbedFields slot="fields">{embed.fields.map((field, fieldIndex) => <DiscordEmbedField key={fieldIndex} fieldTitle={field.name} inline={!!field.inline}><Markdown content={field.value} authors={authors} mentions={mentions} /></DiscordEmbedField>)}</DiscordEmbedFields>}
      {embed.footer && <DiscordEmbedFooter slot="footer" footerImage={safeUrl(embed.footer.iconUrl)}>{embed.footer.text}</DiscordEmbedFooter>}
    </DiscordEmbed>)}
    {!!message.reactions?.length && <DiscordReactions slot="reactions">{message.reactions.map((reaction, index) => <DiscordReaction key={index} name={reaction.emoji} emoji={reaction.emoji} count={reaction.count} reacted={!!reaction.reacted} interactive={false} />)}</DiscordReactions>}
  </DiscordMessage>
})

type ConversationProps = {
  ticket: Ticket
  session: Session
  messages: TicketMessage[]
  onRead: (position: ReadPosition) => Promise<void>
  onUnauthorized: () => void
  hasOlder: boolean
  loadingOlder: boolean
  onLoadOlder: () => Promise<void>
  historyError: string
  refreshing: boolean
  onReady?: () => void
  mentions?: MentionNames
}

type PendingMessage = { key: string; nonce: string; previousNonces: string[]; message: TicketMessage; state: "sending" | "sent" | "failed"; serverMessageId?: string; error?: string }

export function TicketConversation({ ticket, session, messages, onRead, onUnauthorized, hasOlder, loadingOlder, onLoadOlder, historyError, refreshing, onReady, mentions }: ConversationProps) {
  const [light, setLight] = useState(() => !window.matchMedia("(prefers-color-scheme: dark)").matches)
  const [readyTheme, setReadyTheme] = useState<boolean | null>(null)
  const [content, setContent] = useState("")
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState("")
  const [pendingMessages, setPendingMessages] = useState<PendingMessage[]>([])
  const [showJump, setShowJump] = useState(false)
  const [unreadBoundary] = useState(() => ticket.unread ? { at: ticket.teamReadAt || 0, id: ticket.teamReadMessageId } : null)
  const viewport = useRef<HTMLDivElement>(null)
  const composer = useRef<HTMLTextAreaElement>(null)
  const end = useRef<HTMLDivElement>(null)
  const stickToBottom = useRef(true)
  const anchor = useRef<{ id: string; top: number } | null>(null)
  const restoredScrollTop = useRef<number | null>(null)
  const readPosition = useRef("")
  const sending = useRef(false)
  const firstUnread = unreadBoundary ? messages.findIndex(message => message.createdAt > unreadBoundary.at || (message.createdAt === unreadBoundary.at && unreadBoundary.id != null && BigInt(message.id) > BigInt(unreadBoundary.id))) : -1
  const latest = messages.at(-1)
  const previousLatest = useRef(latest?.id)
  const authors = useMemo(() => new Map(messages.map(message => [message.authorId, message.authorName])), [messages])
  const isConfirmed = (pending: PendingMessage) => messages.some(message =>
    (pending.serverMessageId && message.id === pending.serverMessageId) ||
    ((message.clientNonce === pending.nonce || pending.previousNonces.includes(message.clientNonce || "")) && message.authorId === session.user.id)
  )
  const visiblePendingMessages = pendingMessages.filter(pending => !isConfirmed(pending))
  function updatePendingMessages(update: (current: PendingMessage[]) => PendingMessage[]) {
    setPendingMessages(current => update(current.filter(pending => !isConfirmed(pending))))
  }

  const restoreScroll = useCallback(() => {
    const element = viewport.current
    if (!element) return
    if (stickToBottom.current) element.scrollTop = element.scrollHeight
    else if (anchor.current) {
      const message = element.querySelector<HTMLElement>(`[data-message-id="${anchor.current.id}"]`)
      if (message) element.scrollTop += message.getBoundingClientRect().top - element.getBoundingClientRect().top - anchor.current.top
    }
    restoredScrollTop.current = element.scrollTop
  }, [])

  function rememberScroll() {
    const element = viewport.current
    if (!element) return
    // Our own anchoring scroll must not replace the reader's anchor while Lit is still laying out.
    if (restoredScrollTop.current === element.scrollTop) { restoredScrollTop.current = null; return }
    restoredScrollTop.current = null
    stickToBottom.current = element.scrollHeight - element.scrollTop - element.clientHeight < 32
    if (stickToBottom.current) { anchor.current = null; setShowJump(false); return }
    setShowJump(true)
    const top = element.getBoundingClientRect().top
    const first = [...element.querySelectorAll<HTMLElement>("[data-message-id]")].find(message => message.getBoundingClientRect().bottom > top)
    anchor.current = first ? { id: first.dataset.messageId!, top: first.getBoundingClientRect().top - top } : null
    if (element.scrollTop < 80 && hasOlder && !loadingOlder && !historyError) void onLoadOlder()
  }

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)")
    const update = () => setLight(!media.matches)
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [])

  useEffect(() => {
    // Lit descendants consume the theme only at mount, after React sets the parent's properties.
    const frame = requestAnimationFrame(() => setReadyTheme(light))
    return () => cancelAnimationFrame(frame)
  }, [light])

  useLayoutEffect(() => { restoreScroll() }, [messages, pendingMessages, readyTheme, restoreScroll])

  useEffect(() => {
    if (readyTheme !== light || !onReady) return
    let secondFrame = 0
    const frame = requestAnimationFrame(() => { secondFrame = requestAnimationFrame(onReady) })
    return () => { cancelAnimationFrame(frame); cancelAnimationFrame(secondFrame) }
  }, [readyTheme, light, onReady])

  useEffect(() => {
    const previous = previousLatest.current
    previousLatest.current = latest?.id
    if (previous && previous !== latest?.id && !stickToBottom.current) setShowJump(true)
  }, [latest?.id])

  useEffect(() => {
    const transcript = viewport.current?.querySelector("discord-messages")
    if (!transcript) return
    const observer = new ResizeObserver(restoreScroll)
    observer.observe(transcript)
    if (viewport.current) observer.observe(viewport.current)
    return () => observer.disconnect()
  }, [light, restoreScroll])

  useEffect(() => {
    const target = end.current
    if (!target || readyTheme !== light || !latest) return
    let visible = false
    const acknowledge = () => {
      if (!visible || document.visibilityState !== "visible" || readPosition.current === latest.id) return
      readPosition.current = latest.id
      void onRead({ messageAt: latest.createdAt, messageId: latest.id }).catch((reason: unknown) => {
        readPosition.current = ""
        setError(reason instanceof Error ? reason.message : "Unable to mark this conversation as read.")
      })
    }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; acknowledge() })
    observer.observe(target)
    document.addEventListener("visibilitychange", acknowledge)
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", acknowledge) }
  }, [latest, onRead, readyTheme, light])

  async function send(sender: "staff" | "requester", retry?: { key: string; content: string }) {
    const draft = content
    const text = sender === "requester" ? "I have an update on this request. Could you take another look?" : (retry?.content ?? draft).trim()
    if (!text || sending.current || ticket.status !== "open") return
    if (sender === "staff" && !retry) {
      const failed = visiblePendingMessages.find(item => item.state === "failed" && item.message.content === text)
      if (failed) retry = { key: failed.key, content: failed.message.content }
    }
    sending.current = true
    setBusy(true); setError("")
    let nonce: string | undefined
    if (sender === "staff" && session.capabilities.replyClientNonce) {
      nonce = crypto.randomUUID()
      const message: TicketMessage = {
        id: "pending:" + nonce, authorId: session.user.id, authorName: session.user.displayName || session.user.username,
        authorAvatarUrl: session.user.avatarUrl, content: text, createdAt: Date.now(), editedAt: null, bot: true, attachments: [],
      }
      updatePendingMessages(current => retry
        ? current.map(item => item.key === retry.key ? { ...item, previousNonces: [...item.previousNonces, item.nonce], nonce: nonce!, message, state: "sending", serverMessageId: undefined, error: undefined } : item)
        : [...current, { key: nonce!, nonce: nonce!, previousNonces: [], message, state: "sending" }])
      stickToBottom.current = true
      anchor.current = null
      setShowJump(false)
      restoreScroll()
    }
    const focused = document.activeElement
    try {
      const endpoint = sender === "staff" ? "/api/tickets/" + encodeURIComponent(ticket.threadId) + "/reply" : "/api/mock/tickets/" + encodeURIComponent(ticket.threadId) + "/messages"
      const result = await apiPost<{ messageId: string }>(endpoint, session.csrfToken, sender === "staff" ? { content: text, clientNonce: nonce } : { content: text, sender })
      if (sender === "staff") {
        const messageId = result.messageId
        if (messages.some(message => message.id === messageId || (nonce && message.clientNonce === nonce && message.authorId === session.user.id))) {
          updatePendingMessages(current => current.filter(item => item.nonce !== nonce))
        } else {
          updatePendingMessages(current => current.map(item => item.nonce === nonce
            ? { ...item, message: { ...item.message, id: messageId }, state: "sent", serverMessageId: messageId }
            : item))
        }
        if (!nonce) { stickToBottom.current = true; anchor.current = null; setShowJump(false); restoreScroll() }
        setContent(current => current === draft && draft.trim() === text ? "" : current)
        if (document.activeElement === focused && (focused === composer.current || focused?.getAttribute("aria-label") === "Send message")) composer.current?.focus({ preventScroll: true })
      }
    } catch (reason) {
      if (reason instanceof ApiError && [401, 403].includes(reason.status)) onUnauthorized()
      const message = reason instanceof Error ? reason.message : "Unable to send the message."
      if (sender === "staff" && nonce) updatePendingMessages(current => current.map(item => item.nonce === nonce ? { ...item, state: "failed", error: message } : item))
      else setError(message + " Your draft has been kept.")
    } finally { sending.current = false; setBusy(false) }
  }

  return <div className="ticket-chat" data-theme={light ? "light" : "dark"}>
    <header className="ticket-chat-header">
      <div className="flex min-w-0 items-center gap-2"><Hash className="size-5 shrink-0" aria-hidden="true" />{ticket.parentName && <span className="hidden min-w-0 items-center gap-2 text-sm sm:inline-flex"><span className="truncate">{ticket.parentName}</span><ChevronRight className="size-4 shrink-0" aria-hidden="true" /></span>}<h2 className="truncate font-semibold">{ticket.name || ticket.openerName || "private-ticket"}</h2></div>
      <div className="flex shrink-0 items-center gap-2">
        {refreshing && <span role="status" className="whitespace-nowrap text-xs">Refreshing messages…</span>}
        {session.capabilities.mockChat && <Button type="button" variant="ghost" size="sm" className="ticket-chat-control shrink-0" disabled={busy || ticket.status !== "open"} onClick={() => void send("requester")}>Simulate incoming</Button>}
      </div>
    </header>
    <div className="relative flex min-h-0 flex-1 flex-col">
      <div ref={viewport} className="ticket-chat-scroll" role="region" aria-label="Ticket conversation" tabIndex={0} onScroll={rememberScroll}>
        <DiscordMessages key={light ? "light" : "dark"} lightTheme={light} className="ticket-chat-transcript">
          {readyTheme === light && <>
            {hasOlder && <div className="px-4 py-2"><Button variant="ghost" size="sm" className="ticket-chat-control" disabled={loadingOlder} onClick={() => { rememberScroll(); void onLoadOlder() }}>{loadingOlder ? "Loading older messages…" : "Load older messages"}</Button></div>}
            {messages.map((message, index) => {
              const previous = messages[index - 1]
              const date = new Date(message.createdAt).toDateString()
              const newDay = !previous || new Date(previous.createdAt).toDateString() !== date
              const unread = index === firstUnread && (index > 0 || !hasOlder)
              return <Fragment key={message.id}>
                {(newDay || unread) && <div className={`ticket-chat-date ${unread ? "ticket-chat-unread" : ""}`} role="separator" aria-label={unread ? "New messages" : undefined}><span>{newDay ? new Date(message.createdAt).toLocaleDateString("en", { day: "numeric", month: "long", year: "numeric" }) : "New messages"}</span>{unread && <span className="ticket-chat-unread-label" aria-hidden="true">NEW</span>}</div>}
                <Message message={message} previous={unread ? undefined : previous} authors={authors} mentions={mentions} />
              </Fragment>
            })}
            {visiblePendingMessages.map(item => <div key={item.key} data-pending-message={item.key} style={{ opacity: 0.55 }}>
              <Message message={item.message} authors={authors} mentions={mentions} pending />
              <div className="flex items-center gap-2 px-16 text-xs">
                <span role="status">{item.state === "sending" ? "Sending…" : item.state === "sent" ? "Sent" : "Failed to send: " + (item.error || "Unknown error.")}</span>
                {item.state === "failed" && <Button type="button" variant="ghost" size="sm" className="ticket-chat-control" disabled={busy || ticket.status !== "open"} onClick={() => void send("staff", { key: item.key, content: item.message.content })}>Retry</Button>}
              </div>
            </div>)}
            {!messages.length && !visiblePendingMessages.length && <p className="p-6">This is the beginning of this ticket conversation.</p>}
          </>}
        </DiscordMessages>
        <div ref={end} className="h-px" />
      </div>
      {showJump && <Button className="ticket-chat-new" size="sm" onClick={() => { stickToBottom.current = true; anchor.current = null; restoreScroll(); setShowJump(false) }}><span className="hidden sm:inline">You’re viewing older messages</span><span>Jump to present</span></Button>}
      {(error || historyError) && <Alert variant="destructive" className="absolute inset-x-3 bottom-3 z-10 w-auto"><AlertDescription>{error || historyError}</AlertDescription></Alert>}
    </div>
    {session.capabilities.canReply ? <form className="ticket-chat-composer" onSubmit={event => { event.preventDefault(); void send("staff") }}>
      <div className="ticket-chat-input-row">
        <label htmlFor="mock-message" className="sr-only">Message</label>
        <Textarea ref={composer} id="mock-message" className="ticket-chat-input" placeholder={ticket.status === "open" ? `Message #${ticket.name || ticket.openerName || "private-ticket"}` : "This ticket is closed"} value={content} maxLength={2000} disabled={ticket.status !== "open"} onChange={event => setContent(event.target.value)} onKeyDown={event => {
          if (event.key === "Enter" && !event.shiftKey && !event.altKey && !event.ctrlKey && !event.metaKey && !event.nativeEvent.isComposing) {
            event.preventDefault()
            if (!sending.current) event.currentTarget.form?.requestSubmit()
          }
        }} />
        <Button aria-label="Send message" title="Send message" type="submit" variant="ghost" size="icon" className="ticket-chat-control shrink-0 self-end" disabled={busy || !content.trim() || ticket.status !== "open"}><Send className="size-5" /></Button>
      </div>
      <div className="ticket-chat-hint"><span role="status">{busy ? "Sending…" : "Enter to send · Shift+Enter for a new line"}</span><span>{session.capabilities.mockChat ? "Local mock" : "Your Discord profile"}</span></div>
    </form> : <p className="ticket-chat-readonly">Read-only conversation · Reply in Discord</p>}
  </div>
}
