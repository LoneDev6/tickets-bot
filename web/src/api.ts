export type TicketStatus = "open" | "closed" | "locked" | "deleted"
export type TicketType = "Generic" | "Payment"

export type SyncState = {
  ready: boolean
  updatedAt: number | null
  error: string | null
}

export type Session = {
  user: { id: string; username: string; displayName?: string; avatarUrl?: string | null }
  csrfToken: string
  capabilities: {
    canReadConversation: boolean
    canArchiveConversation: boolean
    canReply: boolean
    canManageTicket: boolean
    replyClientNonce?: boolean
    mentionNames?: boolean
    mockChat?: boolean
    chatDebug?: boolean
    reason: string
  }
  sync: SyncState
}

export type Ticket = {
  threadId: string
  parentName?: string | null
  name: string | null
  openerId: string | null
  openerName: string | null
  openerAvatarUrl: string | null
  type: TicketType | null
  description: string | null
  createdAt: number | null
  updatedAt: number
  statusChangedAt: number | null
  status: TicketStatus
  lastMessageAuthorId: string | null
  lastMessageAuthorName: string | null
  lastMessageAt: number | null
  lastMessageId: string | null
  unread: boolean
  teamReadAt: number | null
  teamReadMessageId: string | null
  joinedUserIds: string[]
  verificationThreadId: string | null
  lastAction: { action: string; reason: string | null; actorId: string | null; at: number | null } | null
  deletedAt: number | null
  discordUrl: string | null
  recordedParticipantsOnly: boolean
  contentExcluded: boolean
  imported: boolean
  escalatedAt: number | null
  escalatedBy: string | null
  escalationReason: string | null
}

export type TicketList = {
  tickets: Ticket[]
  total: number
  page: number
  pageSize: number
  counts: Record<TicketStatus, number>
  revision: number
  sync: SyncState
  nextCursor: string | null
}

export type TicketMessage = {
  clientNonce?: string
  id: string
  authorId: string
  authorName: string
  content: string
  createdAt: number
  editedAt: number | null
  authorAvatarUrl?: string | null
  authorRoleColor?: string | null
  bot?: boolean
  webhookId?: string | null
  staffAuthorId?: string
  replyTo?: { id: string; authorId: string; authorName: string; authorAvatarUrl?: string | null; content: string; bot?: boolean }
  reactions?: { emoji: string; count: number; reacted?: boolean }[]
  attachments: { name: string; url: string; contentType?: string; size?: number }[]
  embeds?: { title?: string | null; description?: string | null; url?: string; color?: number; image?: string; thumbnail?: string; footer?: { text: string; iconUrl?: string }; author?: { name: string; url?: string; iconUrl?: string }; fields?: { name: string; value: string; inline?: boolean }[] }[]
}

export type MentionNames = { users: Record<string, string>; roles: Record<string, string>; roleColors?: Record<string, string> }

export type TicketMessages = {
  mentions?: MentionNames
  messages: TicketMessage[]
  nextBefore: string | null
  available: boolean
  reason: string | null
  cached?: boolean
  syncing?: boolean
}

export type PrivacyPolicy = {
  title: string
  updatedAt: number
  contactEmail: string | null
  sections: { title: string; paragraphs: string[]; items?: string[] }[]
  configured: boolean
}

export class ApiError extends Error {
  readonly status: number

  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

export async function apiGet<T>(path: string, signal?: AbortSignal, viewId?: string): Promise<T> {
  let response: Response
  try {
    response = await fetch(path, { signal, headers: { Accept: "application/json", ...(viewId ? { "X-Chat-View": viewId } : {}) } })
  } catch (error) {
    if (signal?.aborted) throw error
    throw new ApiError("The server connection is unavailable. Please try again.", 503)
  }
  if (!response.ok) {
    let message = `Error ${response.status}`
    try {
      const body = (await response.json()) as { error?: string }
      if (body.error) message = body.error
    } catch {
      // Keep the HTTP status when the server does not return a JSON error body.
    }
    throw new ApiError(message, response.status)
  }
  return (await response.json()) as T
}

export async function apiPost<T>(path: string, csrfToken: string, body: unknown): Promise<T> {
  let response: Response
  try {
    response = await fetch(path, { method: "POST", headers: { Accept: "application/json", "Content-Type": "application/json", "X-CSRF-Token": csrfToken }, body: JSON.stringify(body) })
  } catch {
    throw new ApiError("The server connection is unavailable. Please try again.", 503)
  }
  if (!response.ok) {
    let message = `Error ${response.status}`
    try {
      const result = (await response.json()) as { error?: string }
      if (result.error) message = result.error
    } catch {
      // Keep the HTTP status when the server does not return a JSON error body.
    }
    throw new ApiError(message, response.status)
  }
  return (await response.json()) as T
}
