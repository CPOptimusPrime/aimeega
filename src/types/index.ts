// ─── Database types ──────────────────────────────────────────────────────────

export type UserRole = 'viewer' | 'creator' | 'studio' | 'admin'
export type VideoStatus = 'pending' | 'processing' | 'live' | 'rejected' | 'draft'
export type PayoutStatus = 'pending' | 'processing' | 'paid' | 'failed'

export interface Profile {
  id: string
  clerk_id: string
  username: string
  display_name: string
  bio: string | null
  avatar_url: string | null
  banner_url: string | null
  role: UserRole
  verified: boolean
  country: string | null
  ai_tools: string[]
  genres: string[]
  follower_count: number
  following_count: number
  video_count: number
  total_views: number
  total_earnings: number
  created_at: string
  updated_at: string
}

export interface Video {
  id: string
  uploader_id: string
  title: string
  description: string | null
  status: VideoStatus
  // Cloudflare Stream
  cf_uid: string | null          // Cloudflare video UID
  cf_thumbnail: string | null    // Cloudflare thumbnail URL
  cf_duration: number | null     // seconds
  cf_ready_to_stream: boolean
  // Metadata
  genre: string
  ai_tool: string
  music_source: string | null
  voice_source: string | null
  has_real_people: boolean
  has_brand_ip: boolean
  // Stats
  view_count: number
  like_count: number
  comment_count: number
  // Relations
  uploader?: Profile
  liked_by_me?: boolean
  saved_by_me?: boolean
  created_at: string
  updated_at: string
}

export interface Comment {
  id: string
  video_id: string
  author_id: string
  parent_id: string | null
  content: string
  like_count: number
  liked_by_me?: boolean
  author?: Profile
  replies?: Comment[]
  created_at: string
}

export interface Follow {
  follower_id: string
  following_id: string
  created_at: string
}

export interface Like {
  user_id: string
  video_id: string
  created_at: string
}

export interface Save {
  user_id: string
  video_id: string
  created_at: string
}

export interface Notification {
  id: string
  user_id: string
  type: 'follow' | 'like' | 'comment' | 'milestone' | 'payout' | 'approved'
  actor_id: string | null
  video_id: string | null
  message: string
  read: boolean
  actor?: Profile
  video?: Video
  created_at: string
}

export interface Payout {
  id: string
  creator_id: string
  amount: number
  currency: string
  period: string
  status: PayoutStatus
  stripe_transfer_id: string | null
  created_at: string
}

// ─── API response types ──────────────────────────────────────────────────────

export interface PaginatedResponse<T> {
  data: T[]
  count: number
  page: number
  per_page: number
  has_more: boolean
}

export interface ApiError {
  error: string
  message: string
  status: number
}

// ─── Upload types ────────────────────────────────────────────────────────────

export interface UploadFormData {
  title: string
  description: string
  genre: string
  ai_tool: string
  music_source: string
  voice_source: string
  has_real_people: boolean
  has_brand_ip: boolean
}

export interface CloudflareUploadResponse {
  uid: string
  uploadURL: string
}

// ─── Feed types ──────────────────────────────────────────────────────────────

export type FeedType = 'all' | 'trending' | 'following' | string

export interface FeedParams {
  feed: FeedType
  page?: number
  per_page?: number
  genre?: string
  search?: string
}
