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
import { ApiError, apiPost, type Session, type Ticket, type TicketMessage } from "@/api"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Hash, Send } from "lucide-react"

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

function markdownNodes(nodes: ReturnType<typeof parse>, authors: Map<string, string>): ReactNode {
  return nodes.map((node, index) => {
    const content = Array.isArray(node.content) ? markdownNodes(node.content, authors) : String(node.content ?? "")
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
      case "user": result = <DiscordMention>{authors.get(String(node.id)) || String(node.id)}</DiscordMention>; break
      case "role": result = <DiscordMention type="role">{String(node.id)}</DiscordMention>; break
      case "channel": result = <DiscordMention type="channel">{String(node.id)}</DiscordMention>; break
      case "everyone": case "here": result = <DiscordMention>{node.type}</DiscordMention>; break
      case "link": case "url": case "autolink": {
        const href = safeUrl(node.target)
        result = href ? <a href={href} target="_blank" rel="noopener noreferrer" className="underline">{content}</a> : content
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

function Markdown({ content, authors }: { content: string; authors: Map<string, string> }) {
  const nodes = useMemo(() => parse(content, "extended"), [content])
  return <>{markdownNodes(nodes, authors)}</>
}

const Message = memo(function Message({ message, previous, authors }: { message: TicketMessage; previous?: TicketMessage; authors: Map<string, string> }) {
  const grouped = previous?.authorId === message.authorId && previous.webhookId === message.webhookId && previous.bot === message.bot && !message.replyTo && message.createdAt - previous.createdAt < 300_000 && new Date(previous.createdAt).toDateString() === new Date(message.createdAt).toDateString()
  return <DiscordMessage author={message.authorName || "Unknown user"} avatar={safeUrl(message.authorAvatarUrl) || avatar(message.authorId)} bot={!!message.bot} roleColor={/^#[0-9a-f]{6}$/i.test(message.authorRoleColor || "") ? message.authorRoleColor! : undefined} data-message-id={message.id} style={grouped ? { marginTop: 0 } : undefined} title={new Date(message.createdAt).toLocaleString("en-GB")} timestamp={new Date(message.createdAt).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })} twentyFour edited={!!message.editedAt} messageBodyOnly={grouped}>
    {message.replyTo && <DiscordReply slot="reply" author={message.replyTo.authorName} avatar={avatar(message.replyTo.authorId)} bot={!!message.replyTo.bot}><Markdown content={message.replyTo.content} authors={authors} /></DiscordReply>}
    <Markdown content={message.content} authors={authors} />
    {!!message.attachments.length && <DiscordAttachments slot="attachments">{message.attachments.map((attachment, index) => {
      const url = safeUrl(attachment.url)
      if (!url) return <span key={index}>{attachment.name}</span>
      return attachment.contentType?.startsWith("image/") || /\.(png|jpe?g|gif|webp)(\?|$)/i.test(url)
        ? <DiscordImageAttachment key={index} url={url} alt={attachment.name} />
        : <DiscordFileAttachment key={index} name={attachment.name} href={url} bytes={attachment.size || 0} target="_blank" rel="noopener noreferrer" />
    })}</DiscordAttachments>}
    {message.embeds?.map((embed, index) => <DiscordEmbed key={index} slot="embeds" embedTitle={embed.title || ""} url={safeUrl(embed.url)} color={typeof embed.color === "number" ? `#${embed.color.toString(16).padStart(6, "0")}` : undefined} image={safeUrl(embed.image)} thumbnail={safeUrl(embed.thumbnail)} authorName={embed.author?.name} authorUrl={safeUrl(embed.author?.url)} authorImage={safeUrl(embed.author?.iconUrl)}>
      {embed.description && <DiscordEmbedDescription slot="description"><Markdown content={embed.description} authors={authors} /></DiscordEmbedDescription>}
      {!!embed.fields?.length && <DiscordEmbedFields slot="fields">{embed.fields.map((field, fieldIndex) => <DiscordEmbedField key={fieldIndex} fieldTitle={field.name} inline={!!field.inline}><Markdown content={field.value} authors={authors} /></DiscordEmbedField>)}</DiscordEmbedFields>}
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
}

export function TicketConversation({ ticket, session, messages, onRead, onUnauthorized, hasOlder, loadingOlder, onLoadOlder, historyError }: ConversationProps) {
  const [light, setLight] = useState(() => !window.matchMedia("(prefers-color-scheme: dark)").matches)
  const [readyTheme, setReadyTheme] = useState<boolean | null>(null)
  const [content, setContent] = useState("")
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState("")
  const [newMessages, setNewMessages] = useState(false)
  const viewport = useRef<HTMLDivElement>(null)
  const composer = useRef<HTMLTextAreaElement>(null)
  const end = useRef<HTMLDivElement>(null)
  const stickToBottom = useRef(true)
  const anchor = useRef<{ id: string; top: number } | null>(null)
  const restoredScrollTop = useRef<number | null>(null)
  const readPosition = useRef("")
  const sending = useRef(false)
  const latest = messages.at(-1)
  const previousLatest = useRef(latest?.id)
  const authors = useMemo(() => new Map(messages.map(message => [message.authorId, message.authorName])), [messages])

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
    if (stickToBottom.current) { anchor.current = null; setNewMessages(false); return }
    const top = element.getBoundingClientRect().top
    const first = [...element.querySelectorAll<HTMLElement>("[data-message-id]")].find(message => message.getBoundingClientRect().bottom > top)
    anchor.current = first ? { id: first.dataset.messageId!, top: first.getBoundingClientRect().top - top } : null
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

  useLayoutEffect(() => { restoreScroll() }, [messages, readyTheme, restoreScroll])

  useEffect(() => {
    const previous = previousLatest.current
    previousLatest.current = latest?.id
    if (previous && previous !== latest?.id && !stickToBottom.current) setNewMessages(true)
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

  async function send(sender: "staff" | "requester") {
    const draft = content
    const text = sender === "requester" ? "I have an update on this request. Could you take another look?" : draft.trim()
    if (!text || sending.current || ticket.status !== "open") return
    sending.current = true
    setBusy(true); setError("")
    const focused = document.activeElement
    try {
      const endpoint = sender === "staff" ? `/api/tickets/${encodeURIComponent(ticket.threadId)}/reply` : `/api/mock/tickets/${encodeURIComponent(ticket.threadId)}/messages`
      await apiPost(endpoint, session.csrfToken, sender === "staff" ? { content: text } : { content: text, sender })
      if (sender === "staff") {
        setContent(current => current === draft ? "" : current)
        stickToBottom.current = true
        anchor.current = null
        setNewMessages(false)
        restoreScroll()
        if (document.activeElement === focused && (focused === composer.current || focused?.getAttribute("aria-label") === "Send message")) composer.current?.focus({ preventScroll: true })
      }
    } catch (reason) {
      if (reason instanceof ApiError && [401, 403].includes(reason.status)) onUnauthorized()
      setError(reason instanceof Error ? reason.message : "Unable to send the mock message. Your draft has been kept.")
    } finally { sending.current = false; setBusy(false) }
  }

  return <div className="ticket-chat" data-theme={light ? "light" : "dark"}>
    <header className="ticket-chat-header">
      <div className="flex min-w-0 items-center gap-2"><Hash className="size-5 shrink-0" aria-hidden="true" /><h2 className="truncate font-semibold">{ticket.openerName || "private-ticket"}</h2></div>
      {session.capabilities.mockChat && <Button type="button" variant="ghost" size="sm" className="ticket-chat-control shrink-0" disabled={busy || ticket.status !== "open"} onClick={() => void send("requester")}>Simulate incoming</Button>}
    </header>
    <div className="relative flex min-h-0 flex-1 flex-col">
      <div ref={viewport} className="ticket-chat-scroll" role="region" aria-label="Ticket conversation" tabIndex={0} onScroll={rememberScroll}>
        <DiscordMessages key={light ? "light" : "dark"} lightTheme={light} className="ticket-chat-transcript">
          {readyTheme === light && <>
            {hasOlder && <div className="px-4 py-2"><Button variant="ghost" size="sm" className="ticket-chat-control" disabled={loadingOlder} onClick={() => { rememberScroll(); void onLoadOlder() }}>{loadingOlder ? "Loading older messages…" : "Load older messages"}</Button></div>}
            {messages.map((message, index) => {
              const previous = messages[index - 1]
              const date = new Date(message.createdAt).toDateString()
              return <Fragment key={message.id}>
                {(!previous || new Date(previous.createdAt).toDateString() !== date) && <div className="ticket-chat-date" role="separator"><span>{new Date(message.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span></div>}
                <Message message={message} previous={previous} authors={authors} />
              </Fragment>
            })}
            {!messages.length && <p className="p-6">This is the beginning of this ticket conversation.</p>}
          </>}
        </DiscordMessages>
        <div ref={end} className="h-px" />
      </div>
      {newMessages && <Button className="ticket-chat-new" size="sm" onClick={() => { stickToBottom.current = true; anchor.current = null; restoreScroll(); setNewMessages(false) }}>New messages — jump to present</Button>}
      {(error || historyError) && <Alert variant="destructive" className="absolute inset-x-3 bottom-3 z-10 w-auto"><AlertDescription>{error || historyError}</AlertDescription></Alert>}
    </div>
    {session.capabilities.canReply ? <form className="ticket-chat-composer" onSubmit={event => { event.preventDefault(); void send("staff") }}>
      <div className="ticket-chat-input-row">
        <label htmlFor="mock-message" className="sr-only">Message</label>
        <Textarea ref={composer} id="mock-message" className="ticket-chat-input" placeholder={ticket.status === "open" ? `Message #${ticket.openerName || "private-ticket"}` : "This ticket is closed"} value={content} maxLength={2000} disabled={ticket.status !== "open"} onChange={event => setContent(event.target.value)} onKeyDown={event => {
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
