const CF_ACCOUNT = process.env.CLOUDFLARE_ACCOUNT_ID!
const CF_TOKEN = process.env.CLOUDFLARE_STREAM_API_TOKEN!
const CF_BASE = `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT}/stream`

// ─── Request a direct upload URL from Cloudflare Stream ──────────────────────
export async function createDirectUploadUrl(metadata: {
  title: string
  maxDurationSeconds?: number
}): Promise<{ uid: string; uploadURL: string }> {
  const res = await fetch(`${CF_BASE}/direct_upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${CF_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      maxDurationSeconds: metadata.maxDurationSeconds ?? 7200, // 2hr max
      meta: { name: metadata.title },
      requireSignedURLs: false,
    }),
  })

  const data = await res.json()
  if (!data.success) throw new Error('Cloudflare upload URL failed')
  return { uid: data.result.uid, uploadURL: data.result.uploadURL }
}

// ─── Get video details from Cloudflare ───────────────────────────────────────
export async function getStreamVideo(uid: string) {
  const res = await fetch(`${CF_BASE}/${uid}`, {
    headers: { Authorization: `Bearer ${CF_TOKEN}` },
  })
  const data = await res.json()
  if (!data.success) throw new Error('Cloudflare video fetch failed')
  return data.result
}

// ─── Delete a video from Cloudflare ──────────────────────────────────────────
export async function deleteStreamVideo(uid: string) {
  await fetch(`${CF_BASE}/${uid}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${CF_TOKEN}` },
  })
}

// ─── Build player embed URL ───────────────────────────────────────────────────
export function getPlayerUrl(uid: string) {
  return `https://customer-${process.env.NEXT_PUBLIC_CLOUDFLARE_CUSTOMER_SUBDOMAIN}.cloudflarestream.com/${uid}/iframe`
}

// ─── Build thumbnail URL ─────────────────────────────────────────────────────
export function getThumbnailUrl(uid: string, time = '1s') {
  return `https://customer-${process.env.NEXT_PUBLIC_CLOUDFLARE_CUSTOMER_SUBDOMAIN}.cloudflarestream.com/${uid}/thumbnails/thumbnail.jpg?time=${time}&height=400`
}
