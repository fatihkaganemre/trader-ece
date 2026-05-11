import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import "./NewsFeed.css";

interface TelegramPost {
  id: number;
  message_id: number;
  text: string | null;
  photo_url: string | null;
  has_media: boolean;
  posted_at: string;
}

function formatDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleString("tr-TR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatText(text: string): string[] {
  return text.split("\n").filter((line) => line.trim() !== "");
}

export default function NewsFeed() {
  const [posts, setPosts] = useState<TelegramPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial fetch
    supabase
      .from("telegram_posts")
      .select("*")
      .order("posted_at", { ascending: false })
      .limit(30)
      .then(({ data }) => {
        setPosts(data ?? []);
        setLoading(false);
      });

    // Realtime subscription — new posts appear instantly
    const channel = supabase
      .channel("telegram_posts_feed")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "telegram_posts" },
        (payload) => {
          setPosts((prev) => [payload.new as TelegramPost, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) {
    return (
      <div className="newsfeed">
        <div className="newsfeed__header">
          <span className="newsfeed__dot" />
          <span className="newsfeed__live">LIVE</span>
          <span className="newsfeed__title">Trader ECE Kanal</span>
        </div>
        <div className="newsfeed__skeleton">
          {[1, 2, 3].map((i) => (
            <div key={i} className="newsfeed__skeleton-card" />
          ))}
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="newsfeed">
        <div className="newsfeed__header">
          <span className="newsfeed__dot" />
          <span className="newsfeed__live">LIVE</span>
          <span className="newsfeed__title">Trader ECE Kanal</span>
        </div>
        <div className="newsfeed__empty">
          <p>Henüz paylaşım yok. Telegram kanalına ilk mesajı gönder!</p>
          <a
            href="https://t.me/tradereceteam"
            target="_blank"
            rel="noopener noreferrer"
            className="newsfeed__cta"
          >
            Kanala Git →
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="newsfeed">
      <div className="newsfeed__header">
        <span className="newsfeed__dot" />
        <span className="newsfeed__live">LIVE</span>
        <span className="newsfeed__title">Trader ECE Kanal</span>
        <a
          href="https://t.me/tradereceteam"
          target="_blank"
          rel="noopener noreferrer"
          className="newsfeed__follow"
        >
          Kanala Katıl
        </a>
      </div>

      <div className="newsfeed__list">
        {posts.map((post) => (
          <article key={post.message_id} className="newsfeed__card">
            <div className="newsfeed__card-header">
              <div className="newsfeed__avatar">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z" />
                </svg>
              </div>
              <div className="newsfeed__meta">
                <span className="newsfeed__author">Trader ECE</span>
                <span className="newsfeed__time">{formatDate(post.posted_at)}</span>
              </div>
            </div>

            {post.photo_url && (
              <div className="newsfeed__image-wrap">
                <img
                  src={post.photo_url}
                  alt="Paylaşım görseli"
                  className="newsfeed__image"
                  loading="lazy"
                />
              </div>
            )}

            {post.text && (
              <div className="newsfeed__body">
                {formatText(post.text).map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            )}

            <div className="newsfeed__card-footer">
              <a
                href={`https://t.me/tradereceteam/${post.message_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="newsfeed__view-link"
              >
                Telegram'da Gör →
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
