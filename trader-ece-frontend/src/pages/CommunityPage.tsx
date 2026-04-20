import { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  Flame,
  Heart,
  MessageCircle,
  PenSquare,
  RefreshCw,
  Send,
  TrendingUp,
  Users,
  LogOut,
  Shield,
  Mail,
} from "lucide-react";
import { useSupabaseAuth } from "../hooks/useSupabaseAuth";
import { useCommunityDatabase, DatabasePost, DatabaseComment } from "../hooks/useCommunityDatabase";
import "./CommunityPage.css";

type CommunityLocale = "tr" | "en" | "th" | "id" | "zh" | "vi";

interface TrendingTopic {
  id: string;
  title: string;
  description: string;
  momentum: string;
}

interface CommunityCopy {
  badge: string;
  title: string;
  subtitle: string;
  constructionTitle: string;
  constructionMessage: string;
  constructionButton: string;
  composerTitle: string;
  composerSubtitle: string;
  titleLabel: string;
  titlePlaceholder: string;
  contentLabel: string;
  contentPlaceholder: string;
  categoryLabel: string;
  categoryPlaceholder: string;
  publishButton: string;
  trendTitle: string;
  trendSubtitle: string;
  feedTitle: string;
  feedSubtitle: string;
  refreshButton: string;
  likeButton: string;
  commentButton: string;
  commentPlaceholder: string;
  sendComment: string;
  categoryChip: string;
  emptyFeed: string;
  loading: string;
  statsMembers: string;
  statsPosts: string;
  statsPulse: string;
  categories: string[];
  signInPrompt: string;
  signInButton: string;
  signOutButton: string;
  banNotice: string;
  banUser: string;
  admin: string;
}

function resolveLocale(language: string): CommunityLocale {
  const normalized = language.toLowerCase();
  if (normalized.startsWith("tr")) return "tr";
  if (normalized.startsWith("th")) return "th";
  if (normalized.startsWith("id")) return "id";
  if (normalized.startsWith("zh")) return "zh";
  if (normalized.startsWith("vi")) return "vi";
  return "en";
}

const copyByLocale: Record<CommunityLocale, CommunityCopy> = {
  tr: {
    badge: "Trader Tartışma Panosu",
    title: "Topluluğun Konuştuğu Konular",
    subtitle: "Trend başlıkları takip edin, giriş yaparak yeni post açın ve piyasaya dair yorumları tek bir profesyonel akışta görün.",
    constructionTitle: "Topluluk Sayfası Yapım Aşamasında",
    constructionMessage: "Bu alan şu anda geliştiriliyor. Çok yakında topluluk paylaşımları, yorumlar ve canlı etkileşim özellikleri aktif olacak.",
    constructionButton: "Anladım",
    composerTitle: "Yeni Tartışma Başlat",
    composerSubtitle: "Supabase entegrasyonu ile canlı yayın akışı hazır.",
    titleLabel: "Başlık",
    titlePlaceholder: "Örn: Altında haftalık görünüm nasıl?",
    contentLabel: "Post İçeriği",
    contentPlaceholder: "Toplulukla paylaşmak istediğiniz değerlendirmeyi yazın...",
    categoryLabel: "Kategori",
    categoryPlaceholder: "Kategori seçin",
    publishButton: "Post Yayınla",
    trendTitle: "Trend Başlıklar",
    trendSubtitle: "Topluluk içinde en çok etkileşim alan gündemler.",
    feedTitle: "Tartışma Postları",
    feedSubtitle: "Kullanıcıların açtığı başlıklar ve son yorum akışı.",
    refreshButton: "Akışı Yenile",
    likeButton: "Beğen",
    commentButton: "Yorum Yap",
    commentPlaceholder: "Yorumunuzu yazın...",
    sendComment: "Gönder",
    categoryChip: "Kategori",
    emptyFeed: "Henüz post yok. İlk tartışmayı siz başlatın.",
    loading: "Akış yükleniyor...",
    statsMembers: "Aktif topluluk",
    statsPosts: "Bugünün postları",
    statsPulse: "Canlı tartışma temposu",
    categories: ["Forex", "Altın", "Endeks", "Eğitim", "Platform"],
    signInPrompt: "Post ve yorum yapabilmek için Google ile giriş yapın.",
    signInButton: "Google ile Giriş Yap",
    signOutButton: "Çıkış Yap",
    banNotice: "Bu kullanıcı engellendi.",
    banUser: "Engelle",
    admin: "Admin",
  },
  en: {
    badge: "Trader Discussion Board",
    title: "What The Community Is Discussing",
    subtitle: "Track trending topics, sign in to share posts and engage in market discussions in one professional feed.",
    constructionTitle: "Community Page Under Construction",
    constructionMessage: "This area is currently being built. Community posts, comments, and live interaction features will be available soon.",
    constructionButton: "Got it",
    composerTitle: "Start A New Discussion",
    composerSubtitle: "Supabase integration ready for live discussions.",
    titleLabel: "Title",
    titlePlaceholder: "Example: Where is gold headed this week?",
    contentLabel: "Post Content",
    contentPlaceholder: "Write the market view you want to share with the community...",
    categoryLabel: "Category",
    categoryPlaceholder: "Choose a category",
    publishButton: "Publish Post",
    trendTitle: "Trending Topics",
    trendSubtitle: "The most active themes across the community.",
    feedTitle: "Discussion Feed",
    feedSubtitle: "User-created posts with recent replies and engagement.",
    refreshButton: "Refresh Feed",
    likeButton: "Like",
    commentButton: "Comment",
    commentPlaceholder: "Write your comment...",
    sendComment: "Send",
    categoryChip: "Category",
    emptyFeed: "No posts yet. Be the first to start a discussion.",
    loading: "Loading feed...",
    statsMembers: "Active community",
    statsPosts: "Posts today",
    statsPulse: "Live discussion pulse",
    categories: ["Forex", "Gold", "Indices", "Education", "Platform"],
    signInPrompt: "Sign in with Google to post and comment.",
    signInButton: "Sign In With Google",
    signOutButton: "Sign Out",
    banNotice: "This user has been banned.",
    banUser: "Ban User",
    admin: "Admin",
  },
  th: {
    badge: "กระดานสนทนานักเทรด",
    title: "ประเด็นที่ชุมชนกำลังพูดถึง",
    subtitle: "ติดตามหัวข้อที่กำลังมาแรง เข้าสู่ระบบเพื่อเปิดโพสต์และมีส่วนร่วมในทั้งหมด",
    constructionTitle: "หน้าชุมชนกำลังอยู่ระหว่างการพัฒนา",
    constructionMessage: "พื้นที่นี้กำลังถูกพัฒนา เร็ว ๆ นี้จะมีระบบโพสต์ คอมเมนต์ และการโต้ตอบแบบสดให้ใช้งาน",
    constructionButton: "เข้าใจแล้ว",
    composerTitle: "เริ่มหัวข้อสนทนาใหม่",
    composerSubtitle: "Supabase ผสานรวมพร้อมสำหรับการอภิปรายแบบสด",
    titleLabel: "หัวข้อ",
    titlePlaceholder: "เช่น สัปดาห์นี้ทองคำมีแนวโน้มอย่างไร?",
    contentLabel: "เนื้อหาโพสต์",
    contentPlaceholder: "เขียนมุมมองตลาดที่คุณต้องการแชร์กับชุมชน...",
    categoryLabel: "หมวดหมู่",
    categoryPlaceholder: "เลือกหมวดหมู่",
    publishButton: "โพสต์หัวข้อ",
    trendTitle: "หัวข้อมาแรง",
    trendSubtitle: "ประเด็นที่ได้รับความสนใจมากที่สุดในชุมชนตอนนี้",
    feedTitle: "ฟีดกระทู้สนทนา",
    feedSubtitle: "กระทู้จากผู้ใช้ พร้อมคอมเมนต์ล่าสุดและการมีส่วนร่วม",
    refreshButton: "รีเฟรชฟีด",
    likeButton: "ถูกใจ",
    commentButton: "แสดงความคิดเห็น",
    commentPlaceholder: "พิมพ์ความคิดเห็นของคุณ...",
    sendComment: "ส่ง",
    categoryChip: "หมวด",
    emptyFeed: "ยังไม่มีโพสต์ เริ่มต้นกระทู้แรกได้เลย",
    loading: "กำลังโหลดฟีด...",
    statsMembers: "ชุมชนที่กำลังใช้งาน",
    statsPosts: "โพสต์วันนี้",
    statsPulse: "จังหวะการสนทนาแบบสด",
    categories: ["Forex", "ทองคำ", "ดัชนี", "การเรียนรู้", "แพลตฟอร์ม"],
    signInPrompt: "เข้าสู่ระบบด้วย Google เพื่อโพสต์และแสดงความคิดเห็น",
    signInButton: "เข้าสู่ระบบด้วย Google",
    signOutButton: "ออกจากระบบ",
    banNotice: "ผู้ใช้รายนี้ถูกแบน",
    banUser: "แบนผู้ใช้",
    admin: "ผู้ดูแล",
  },
  id: {
    badge: "Papan Diskusi Trader",
    title: "Topik Yang Sedang Dibahas Komunitas",
    subtitle: "Pantau topik yang sedang tren, masuk untuk membagikan posting dan terlibat dalam diskusi pasar.",
    constructionTitle: "Halaman Komunitas Sedang Dalam Pengembangan",
    constructionMessage: "Bagian ini sedang dibangun. Postingan komunitas, komentar, dan fitur interaksi langsung akan segera tersedia.",
    constructionButton: "Mengerti",
    composerTitle: "Mulai Diskusi Baru",
    composerSubtitle: "Integrasi Supabase siap untuk diskusi langsung.",
    titleLabel: "Judul",
    titlePlaceholder: "Contoh: Bagaimana arah emas minggu ini?",
    contentLabel: "Isi Post",
    contentPlaceholder: "Tulis pandangan pasar yang ingin Anda bagikan ke komunitas...",
    categoryLabel: "Kategori",
    categoryPlaceholder: "Pilih kategori",
    publishButton: "Publikasikan Post",
    trendTitle: "Topik Tren",
    trendSubtitle: "Tema yang paling aktif di komunitas saat ini.",
    feedTitle: "Feed Diskusi",
    feedSubtitle: "Post dari pengguna dengan balasan terbaru dan tingkat engagement.",
    refreshButton: "Muat Ulang Feed",
    likeButton: "Suka",
    commentButton: "Komentar",
    commentPlaceholder: "Tulis komentar Anda...",
    sendComment: "Kirim",
    categoryChip: "Kategori",
    emptyFeed: "Belum ada post. Jadilah orang pertama yang memulai diskusi.",
    loading: "Memuat feed...",
    statsMembers: "Komunitas aktif",
    statsPosts: "Post hari ini",
    statsPulse: "Ritme diskusi langsung",
    categories: ["Forex", "Emas", "Indeks", "Edukasi", "Platform"],
    signInPrompt: "Masuk dengan Google untuk memposting dan berkomentar.",
    signInButton: "Masuk Dengan Google",
    signOutButton: "Keluar",
    banNotice: "Pengguna ini telah dilarang.",
    banUser: "Larang Pengguna",
    admin: "Admin",
  },
  zh: {
    badge: "交易者讨论板",
    title: "社区正在讨论的话题",
    subtitle: "查看趋势主题，登录以分享帖子并参与市场讨论。",
    constructionTitle: "社区页面正在建设中",
    constructionMessage: "该区域目前正在开发中。社区帖子、评论和实时互动功能将很快开放。",
    constructionButton: "知道了",
    composerTitle: "发起新的讨论",
    composerSubtitle: "Supabase 集成已准备好进行实时讨论。",
    titleLabel: "标题",
    titlePlaceholder: "例如：本周黄金可能走向哪里？",
    contentLabel: "帖子内容",
    contentPlaceholder: "写下您希望与社区分享的市场观点...",
    categoryLabel: "分类",
    categoryPlaceholder: "选择分类",
    publishButton: "发布帖子",
    trendTitle: "趋势话题",
    trendSubtitle: "当前社区中互动最高的话题。",
    feedTitle: "讨论信息流",
    feedSubtitle: "用户发布的主题帖，以及最新回复与互动。",
    refreshButton: "刷新信息流",
    likeButton: "点赞",
    commentButton: "评论",
    commentPlaceholder: "输入您的评论...",
    sendComment: "发送",
    categoryChip: "分类",
    emptyFeed: "暂时还没有帖子，欢迎率先发起讨论。",
    loading: "正在加载信息流...",
    statsMembers: "活跃社区",
    statsPosts: "今日帖子",
    statsPulse: "实时讨论热度",
    categories: ["Forex", "黄金", "指数", "教育", "平台"],
    signInPrompt: "使用谷歌登录以发布和评论。",
    signInButton: "使用谷歌登录",
    signOutButton: "登出",
    banNotice: "该用户已被禁用。",
    banUser: "禁用用户",
    admin: "管理员",
  },
  vi: {
    badge: "Bảng Thảo Luận Trader",
    title: "Những Chủ Đề Cộng Đồng Đang Bàn",
    subtitle: "Theo dõi các chủ đề đang nổi, đăng nhập để chia sẻ bài viết và tham gia thảo luận thị trường.",
    constructionTitle: "Trang Cộng Đồng Đang Được Xây Dựng",
    constructionMessage: "Khu vực này hiện đang được phát triển. Bài đăng cộng đồng, bình luận và các tính năng tương tác trực tiếp sẽ sớm xuất hiện.",
    constructionButton: "Đã hiểu",
    composerTitle: "Bắt Đầu Một Chủ Đề Mới",
    composerSubtitle: "Tích hợp Supabase sẵn sàng cho các cuộc thảo luận trực tiếp.",
    titleLabel: "Tiêu đề",
    titlePlaceholder: "Ví dụ: Vàng tuần này có thể đi về đâu?",
    contentLabel: "Nội dung bài viết",
    contentPlaceholder: "Viết góc nhìn thị trường bạn muốn chia sẻ với cộng đồng...",
    categoryLabel: "Danh mục",
    categoryPlaceholder: "Chọn danh mục",
    publishButton: "Đăng Bài",
    trendTitle: "Chủ Đề Xu Hướng",
    trendSubtitle: "Những chủ đề tương tác cao nhất trong cộng đồng.",
    feedTitle: "Luồng Thảo Luận",
    feedSubtitle: "Bài viết do người dùng đăng cùng phản hồi gần đây và mức độ tương tác.",
    refreshButton: "Làm Mới Luồng",
    likeButton: "Thích",
    commentButton: "Bình luận",
    commentPlaceholder: "Nhập bình luận của bạn...",
    sendComment: "Gửi",
    categoryChip: "Danh mục",
    emptyFeed: "Chưa có bài viết nào. Hãy là người đầu tiên mở chủ đề.",
    loading: "Đang tải luồng bài viết...",
    statsMembers: "Cộng đồng đang hoạt động",
    statsPosts: "Bài viết hôm nay",
    statsPulse: "Nhịp thảo luận trực tiếp",
    categories: ["Forex", "Vàng", "Chỉ số", "Đào tạo", "Nền tảng"],
    signInPrompt: "Đăng nhập bằng Google để đăng bài và bình luận.",
    signInButton: "Đăng Nhập Bằng Google",
    signOutButton: "Đăng Xuất",
    banNotice: "Người dùng này đã bị cấm.",
    banUser: "Cấm Người Dùng",
    admin: "Quản Trị Viên",
  },
};

export default function CommunityPage() {
  const { i18n } = useTranslation();
  const locale = resolveLocale(i18n.language);
  const copy = copyByLocale[locale];

  const { user, profile, loading: authLoading, signInWithGoogle, signOut, isAdmin, isBanned } = useSupabaseAuth();
  const { loading: dbLoading, error: dbError, fetchTrendingTopics, fetchPosts, fetchUserLikes, createPost, addComment, toggleLike, banUser } = useCommunityDatabase();

  const [trendingTopics, setTrendingTopics] = useState<TrendingTopic[]>([]);
  const [posts, setPosts] = useState<DatabasePost[]>([]);
  const [likedPostIds, setLikedPostIds] = useState<Set<string>>(new Set());
  const [draftTitle, setDraftTitle] = useState("");
  const [draftContent, setDraftContent] = useState("");
  const [draftCategory, setDraftCategory] = useState(copy.categories[0] ?? "");
  const [commentDrafts, setCommentDrafts] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [postError, setPostError] = useState<string | null>(null);
  const [showConstructionPopup, setShowConstructionPopup] = useState(true);

  // Load trends and posts on mount
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const [trends, postList] = await Promise.all([fetchTrendingTopics(), fetchPosts()]);
      setTrendingTopics(trends);
      setPosts(postList);
      setLoading(false);
    };

    void load();
  }, [fetchTrendingTopics, fetchPosts]);

  // Load user's liked posts whenever the user changes
  useEffect(() => {
    if (!user) {
      setLikedPostIds(new Set());
      return;
    }
    fetchUserLikes(user.id).then(setLikedPostIds);
  }, [user, fetchUserLikes]);

  const handleCreatePost = async () => {
    if (!draftTitle.trim() || !draftContent.trim() || !draftCategory.trim()) {
      setPostError("All fields are required.");
      return;
    }

    if (!user) {
      setPostError("You must be signed in to create a post.");
      return;
    }

    try {
      setPostError(null);
      await createPost(user.id, draftTitle.trim(), draftContent.trim(), draftCategory);
      setDraftTitle("");
      setDraftContent("");
      setDraftCategory(copy.categories[0] ?? "");

      // Refresh posts
      const updatedPosts = await fetchPosts();
      setPosts(updatedPosts);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to create post";
      setPostError(msg);
    }
  };

  const handleAddComment = async (postId: string) => {
    const content = commentDrafts[postId]?.trim();
    if (!content) return;

    if (!user) {
      setPostError("You must be signed in to comment.");
      return;
    }

    try {
      setPostError(null);
      await addComment(postId, user.id, content);
      setCommentDrafts((prev) => ({ ...prev, [postId]: "" }));

      // Refresh posts to show new comment
      const updatedPosts = await fetchPosts();
      setPosts(updatedPosts);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to add comment";
      setPostError(msg);
    }
  };

  const handleLike = async (postId: string) => {
    if (!user) {
      setPostError("You must be signed in to like posts.");
      return;
    }

    const alreadyLiked = likedPostIds.has(postId);

    // Optimistic update
    setLikedPostIds((prev) => {
      const next = new Set(prev);
      if (alreadyLiked) next.delete(postId); else next.add(postId);
      return next;
    });
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, likes: p.likes + (alreadyLiked ? -1 : 1) } : p
      )
    );

    try {
      setPostError(null);
      await toggleLike(postId, user.id);
    } catch {
      // Revert on failure
      setLikedPostIds((prev) => {
        const next = new Set(prev);
        if (alreadyLiked) next.add(postId); else next.delete(postId);
        return next;
      });
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId ? { ...p, likes: p.likes + (alreadyLiked ? 1 : -1) } : p
        )
      );
      setPostError("Failed to update like.");
    }
  };

  const handleBanUser = async (userId: string) => {
    if (!isAdmin) return;

    try {
      setPostError(null);
      await banUser(userId);

      // Refresh posts to remove content from banned users
      const updatedPosts = await fetchPosts();
      setPosts(updatedPosts);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to ban user";
      setPostError(msg);
    }
  };

  const handleRefresh = async () => {
    setLoading(true);
    const updatedPosts = await fetchPosts();
    setPosts(updatedPosts);
    setLoading(false);
  };

  return (
    <div className="community-page">
      {showConstructionPopup && (
        <div className="community-popup-backdrop" role="presentation">
          <div
            className="community-popup"
            role="dialog"
            aria-modal="true"
            aria-labelledby="community-construction-title"
          >
            <div className="community-popup__badge">
              <Flame size={18} />
              {copy.badge}
            </div>
            <h2 id="community-construction-title" className="community-popup__title">
              {copy.constructionTitle}
            </h2>
            <p className="community-popup__text">{copy.constructionMessage}</p>
            <button
              type="button"
              className="community-button community-button--primary community-popup__button"
              onClick={() => setShowConstructionPopup(false)}
            >
              {copy.constructionButton}
            </button>
          </div>
        </div>
      )}

      {/* Auth Header */}
      <div className="community-auth-header">
        <div className="container community-auth-header__inner">
          <div className="community-auth-header__prompt">
            {!user ? (
              <span>{copy.signInPrompt}</span>
            ) : (
              <div className="community-auth-header__profile">
                {profile && (
                  <>
                    <Mail size={16} />
                    <span className="community-auth-header__name">{profile.display_name}</span>
                    {isAdmin && (
                      <span className="community-auth-header__tag community-auth-header__tag--admin">
                        <Shield size={14} />
                        {copy.admin}
                      </span>
                    )}
                    {isBanned && (
                      <span className="community-auth-header__tag community-auth-header__tag--banned">
                        ⛔ {copy.banNotice}
                      </span>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
          <div className="community-auth-header__actions">
            {!user ? (
              <button onClick={signInWithGoogle} className="community-button community-button--primary community-auth-header__button">
                {copy.signInButton}
              </button>
            ) : (
              <button onClick={signOut} className="community-button community-button--ghost community-auth-header__button community-auth-header__button--logout">
                <LogOut size={14} />
                {copy.signOutButton}
              </button>
            )}
          </div>
        </div>
      </div>

      <section className="community-hero">
        <div className="community-hero__glow community-hero__glow--left" />
        <div className="community-hero__glow community-hero__glow--right" />
        <div className="community-hero__grid container">
          <span className="community-badge">
            <Flame size={16} />
            {copy.badge}
          </span>

          <div className="community-hero__shell">
            <div className="community-hero__content">
              <h1 className="community-hero__title">{copy.title}</h1>
              <p className="community-hero__subtitle">{copy.subtitle}</p>
            </div>

            <div className="community-stats">
              <div className="community-stat-card">
                <div className="community-stat-card__label">
                  <Users size={18} />
                  <span>{copy.statsMembers}</span>
                </div>
                <div className="community-stat-card__value">12.4K</div>
              </div>
              <div className="community-stat-card">
                <div className="community-stat-card__label">
                  <PenSquare size={18} />
                  <span>{copy.statsPosts}</span>
                </div>
                <div className="community-stat-card__value">{posts.length}</div>
              </div>
              <div className="community-stat-card">
                <div className="community-stat-card__label">
                  <TrendingUp size={18} />
                  <span>{copy.statsPulse}</span>
                </div>
                <div className="community-stat-card__value">Live</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="community-section">
        <div className="community-layout container">
          <div className="community-column">
            {/* Trending Topics */}
            <div className="community-panel">
              <div className="community-panel__header">
                <div>
                  <p className="community-panel__eyebrow">{copy.trendTitle}</p>
                  <h2 className="community-panel__title">{copy.trendSubtitle}</h2>
                </div>
                <div className="community-panel__icon">
                  <Flame size={18} />
                </div>
              </div>

              <div className="community-trend-list">
                {trendingTopics.map((topic, index) => (
                  <div key={topic.id} className="community-trend-card">
                    <div className="community-trend-card__top">
                      <div className="community-trend-card__lead">
                        <span className="community-trend-card__index">0{index + 1}</span>
                        <div>
                          <h3 className="community-trend-card__title">{topic.title}</h3>
                          <p className="community-trend-card__description">{topic.description}</p>
                        </div>
                      </div>
                      <span className="community-trend-card__momentum">{topic.momentum}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Post Composer */}
            {user && !isBanned && (
              <div className="community-panel community-panel--composer">
                <p className="community-panel__eyebrow">{copy.composerTitle}</p>
                <h2 className="community-panel__title">{copy.composerSubtitle}</h2>

                <div className="community-form">
                  <label className="community-field">
                    <span className="community-field__label">{copy.titleLabel}</span>
                    <input
                      value={draftTitle}
                      onChange={(event) => setDraftTitle(event.target.value)}
                      placeholder={copy.titlePlaceholder}
                      className="community-input"
                    />
                  </label>

                  <label className="community-field">
                    <span className="community-field__label">{copy.categoryLabel}</span>
                    <select
                      value={draftCategory}
                      onChange={(event) => setDraftCategory(event.target.value)}
                      className="community-input"
                    >
                      <option value="">{copy.categoryPlaceholder}</option>
                      {copy.categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="community-field">
                    <span className="community-field__label">{copy.contentLabel}</span>
                    <textarea
                      value={draftContent}
                      onChange={(event) => setDraftContent(event.target.value)}
                      placeholder={copy.contentPlaceholder}
                      rows={6}
                      className="community-input community-input--textarea"
                    />
                  </label>

                  {postError && (
                    <div style={{ fontSize: "13px", color: "#fca5a5", padding: "10px 14px", background: "rgba(239, 68, 68, 0.1)", borderRadius: "12px", border: "1px solid rgba(239, 68, 68, 0.2)" }}>
                      {postError}
                    </div>
                  )}

                  <button onClick={handleCreatePost} className="community-button community-button--primary">
                    <PenSquare size={16} />
                    {copy.publishButton}
                  </button>
                </div>
              </div>
            )}

            {!user && (
              <div className="community-panel community-panel--composer">
                <p className="community-panel__eyebrow">Topluluk Erişimi</p>
                <h2 className="community-panel__title">Post ve yorum alanı giriş yaptıktan sonra açılır</h2>
                <p className="community-hero__subtitle" style={{ marginTop: "6px", fontSize: "15px" }}>
                  Devam etmek için üstteki Google ile giriş yap butonunu kullanın.
                </p>
              </div>
            )}
          </div>

          {/* Posts Feed */}
          <div className="community-panel community-panel--feed">
            <div className="community-feed__header">
              <div>
                <p className="community-panel__eyebrow">{copy.feedTitle}</p>
                <h2 className="community-panel__title">{copy.feedSubtitle}</h2>
              </div>
              <button onClick={handleRefresh} className="community-button community-button--ghost">
                <RefreshCw size={16} />
                {copy.refreshButton}
              </button>
            </div>

            <div className="community-feed">
              {loading && <div className="community-state-card">{copy.loading}</div>}

              {!loading && posts.length === 0 && <div className="community-state-card">{copy.emptyFeed}</div>}

              {!loading &&
                posts.map((post) => (
                  <article key={post.id} className="community-post-card">
                    <div className="community-post-card__top">
                      <div>
                        <div className="community-post-card__meta">
                          <span className="community-post-card__author">{post.author.display_name}</span>
                          <span>{post.created_at}</span>
                          {post.author.is_banned && <span style={{ color: "#fca5a5" }}>({copy.banNotice})</span>}
                        </div>
                        <h3 className="community-post-card__title">{post.title}</h3>
                      </div>
                      <span className="community-post-card__chip">{copy.categoryChip}: {post.category}</span>
                    </div>

                    <p className="community-post-card__content">{post.content}</p>

                    <div className="community-post-card__actions">
                      <button
                        onClick={() => handleLike(post.id)}
                        className="community-button community-button--chip"
                        style={likedPostIds.has(post.id) ? { color: "var(--gold)", borderColor: "var(--gold)" } : undefined}
                      >
                        <Heart
                          size={16}
                          fill={likedPostIds.has(post.id) ? "currentColor" : "none"}
                        />
                        {copy.likeButton}
                        <span className="community-post-card__count">{post.likes}</span>
                      </button>
                      <button className="community-button community-button--chip">
                        <MessageCircle size={16} />
                        {copy.commentButton}
                        <span className="community-post-card__count">{post.comment_count}</span>
                      </button>
                      {isAdmin && (
                        <button onClick={() => handleBanUser(post.author_id)} className="community-button community-button--chip" style={{ color: "#fca5a5", borderColor: "rgba(239, 68, 68, 0.3)" }}>
                          <Shield size={16} />
                          {copy.banUser}
                        </button>
                      )}
                    </div>

                    {user && !isBanned && (
                      <div className="community-comment-composer">
                        <input
                          value={commentDrafts[post.id] || ""}
                          onChange={(event) =>
                            setCommentDrafts((prev) => ({ ...prev, [post.id]: event.target.value }))
                          }
                          placeholder={copy.commentPlaceholder}
                          className="community-input"
                        />
                        <button
                          onClick={() => handleAddComment(post.id)}
                          className="community-button community-button--primary"
                        >
                          <Send size={14} />
                          {copy.sendComment}
                        </button>
                      </div>
                    )}
                  </article>
                ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
