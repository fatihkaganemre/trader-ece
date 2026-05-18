import express from "express";
import { createClient } from "@supabase/supabase-js";

const router = express.Router();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const WEBHOOK_SECRET = process.env.TELEGRAM_WEBHOOK_SECRET;

/**
 * GET /api/telegram/webhook
 * Health check
 */
router.get("/webhook", (_req, res) => {
  res.json({ ok: true, message: "Telegram webhook is live" });
});

/**
 * POST /api/telegram/webhook
 * Receives updates from Telegram
 */
router.post("/webhook", async (req, res) => {
  // Verify secret token header
  const secret = req.headers["x-telegram-bot-api-secret-token"];
  if (WEBHOOK_SECRET && secret !== WEBHOOK_SECRET) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const update = req.body;

  // We only care about channel posts
  const post = update.channel_post;
  if (!post) return res.json({ ok: true });

  try {
    let photoUrl = null;

    // If the post contains a photo, fetch the file URL from Telegram
    if (post.photo && post.photo.length > 0 && TELEGRAM_BOT_TOKEN) {
      const largest = post.photo[post.photo.length - 1];
      const fileRes = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getFile?file_id=${largest.file_id}`
      );
      const fileData = await fileRes.json();
      if (fileData.ok) {
        photoUrl = `https://api.telegram.org/file/bot${TELEGRAM_BOT_TOKEN}/${fileData.result.file_path}`;
      }
    }

    const text = post.text || post.caption || null;

    // Skip posts with no text and no photo
    if (!text && !photoUrl) return res.json({ ok: true });

    const { error } = await supabase.from("telegram_posts").upsert(
      {
        message_id: post.message_id,
        text,
        photo_url: photoUrl,
        has_media: !!photoUrl,
        posted_at: new Date(post.date * 1000).toISOString(),
      },
      { onConflict: "message_id" }
    );

    if (error) {
      console.error("Supabase insert error:", error);
      return res.status(500).json({ error: "DB error" });
    }

    return res.json({ ok: true });
  } catch (err) {
    console.error("Webhook handler error:", err);
    return res.status(500).json({ error: "Internal error" });
  }
});

/**
 * GET /api/telegram/posts
 * Returns latest posts (used as fallback if Supabase Realtime is unavailable)
 */
router.get("/posts", async (_req, res) => {
  const { data, error } = await supabase
    .from("telegram_posts")
    .select("*")
    .order("posted_at", { ascending: false })
    .limit(30);

  if (error) return res.status(500).json({ error: error.message });
  return res.json(data);
});

export default router;
