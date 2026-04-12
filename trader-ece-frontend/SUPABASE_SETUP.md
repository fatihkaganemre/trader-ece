# Supabase Community Page Setup

## 1. Environment Variables (.env.local)

Proje root directory'sine `.env.local` dosyası oluşturun ve şu değişkenleri ekleyin:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## 2. Supabase Proje Oluşturma

1. https://supabase.com adresine gidin
2. "New Project" tıklayın
3. Bir proje adı girin ve region seçin
4. Database password oluşturun ve not edin
5. Proje oluşturulduktan sonra Dashboard'a gidin

## 3. Google OAuth Yapılandırması

**Supabase Dashboard → Authentication → Providers:**

1. "Google" provider'ı bulun ve "Enable" tıklayın
2. Google Console (https://console.cloud.google.com)'dan OAuth 2.0 credentials oluşturun:
   - "OAuth consent screen" ayarını tamamlayın
   - Credential type olarak "Web application" seçin
   - Authorized redirect URI olarak şunu ekleyin:
     ```
     https://your-project.supabase.co/auth/v1/callback
     ```
   - Client ID ve Client Secret'i kopyalayın
3. Supabase'de Google provider ayarlarına Client ID ve Secret'i yapıştırın
4. Save tıklayın

## 4. Database Schema

Supabase Dashboard → SQL Editor'da şu SQL'i çalıştırın:

```sql
-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  display_name TEXT NOT NULL DEFAULT 'User',
  avatar_url TEXT,
  is_admin BOOLEAN DEFAULT FALSE,
  is_banned BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  likes INTEGER DEFAULT 0,
  comment_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create likes table
CREATE TABLE IF NOT EXISTS likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(post_id, user_id)
);

-- Create trending_topics table
CREATE TABLE IF NOT EXISTS trending_topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  momentum TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create RLS policies for public read
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Allow public read to posts (except from banned authors)
CREATE POLICY "posts_read" ON posts FOR SELECT USING (true);

-- Allow public read to comments
CREATE POLICY "comments_read" ON comments FOR SELECT USING (true);

-- Allow public read to users (limited fields)
CREATE POLICY "users_read" ON users FOR SELECT USING (true);

-- Allow authenticated users to insert posts (if not banned)
CREATE POLICY "posts_insert" ON posts FOR INSERT WITH CHECK (
  auth.uid() = author_id
  AND NOT EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND is_banned = true
  )
);

-- Allow authenticated users to insert comments (if not banned)
CREATE POLICY "comments_insert" ON comments FOR INSERT WITH CHECK (
  auth.uid() = author_id
  AND NOT EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND is_banned = true
  )
);

-- Create increment functions
CREATE OR REPLACE FUNCTION increment_likes(post_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE posts SET likes = likes + 1 WHERE id = post_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION decrement_likes(post_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE posts SET likes = likes - 1 WHERE id = post_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION increment_comment_count(post_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE posts SET comment_count = comment_count + 1 WHERE id = post_id;
END;
$$ LANGUAGE plpgsql;

-- Insert sample trending topics
INSERT INTO trending_topics (title, description, momentum) VALUES
  ('Weekly Gold Trend', 'Members comparing support zones on XAUUSD', '+18%'),
  ('Tickmill Spreads', 'Community discussing execution quality', '+11%'),
  ('Risk Management', 'Stop loss and position sizing discussions', '+9%')
ON CONFLICT DO NOTHING;
```

## 5. Admin User Ayarı

Kendi admin hesabınızı ayarlamak için:

1. Community sayfasında Google ile giriş yapın
2. Supabase Dashboard → SQL Editor'da şu sorguyu çalıştırın:
   ```sql
   UPDATE users SET is_admin = true WHERE email = 'your-email@example.com';
   ```

## 6. Environment Variables'ı Ayarlama

Yukarıdaki SQL'i çalıştırdıktan sonra:

1. Supabase Dashboard → Project Settings → API
2. "URL" ve "anon public key" kopyalayın
3. Projeniz root'unda `.env.local` dosyası oluşturun:
   ```
   VITE_SUPABASE_URL=your-url-here
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```
4. Terminal'de `npm run dev` çalıştırıp localhost:5173 açın

## 7. Test Etme

1. Community sayfasına gidin
2. "Sign In With Google" butonuna tıklayın
3. Google hesabınız ile giriş yapın
4. Post ve yorum yapabilir misiniz kontrol edin
5. Admin hesabı ile başka kullanıcıyı "Ban" edebilir misiniz kontrol edin

## Sorun Giderme

- **"Missing Supabase credentials" hatası**: .env.local dosyasını kontrol edin
- **OAuth redirect error**: Google Console'daki Redirect URI'nin Supabase URL'iniz ile eşleştiğini kontrol edin
- **Database "insufficient permissions" hatası**: Supabase'de authenticated user rolünün doğru permission'larına sahip olduğunu kontrol edin
