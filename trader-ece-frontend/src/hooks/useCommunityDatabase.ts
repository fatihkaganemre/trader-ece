import { useCallback, useState } from "react";
import { supabase } from "../lib/supabase";

export interface DatabasePost {
  id: string;
  author_id: string;
  author: {
    display_name: string;
    avatar_url: string | null;
    is_banned: boolean;
  };
  title: string;
  content: string;
  category: string;
  likes: number;
  comment_count: number;
  created_at: string;
}

export interface DatabaseComment {
  id: string;
  post_id: string;
  author_id: string;
  author: {
    display_name: string;
    avatar_url: string | null;
    is_banned: boolean;
  };
  content: string;
  created_at: string;
}

export interface TrendingTopic {
  id: string;
  title: string;
  description: string;
  momentum: string;
}

export function useCommunityDatabase() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTrendingTopics = useCallback(async (): Promise<TrendingTopic[]> => {
    try {
      setError(null);
      const { data, error: err } = await supabase
        .from("trending_topics")
        .select("*")
        .order("momentum", { ascending: false });

      if (err) throw err;
      return data || [];
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch trends";
      setError(message);
      return [];
    }
  }, []);

  const fetchPosts = useCallback(
    async (category?: string): Promise<DatabasePost[]> => {
      try {
        setLoading(true);
        setError(null);

        let query = supabase
          .from("posts")
          .select(
            `id, author_id, title, content, category, likes, comment_count, created_at,
             users:author_id(display_name, avatar_url, is_banned)`
          )
          .order("created_at", { ascending: false });

        if (category && category !== "all") {
          query = query.eq("category", category);
        }

        const { data, error: err } = await query;
        if (err) throw err;

        return (data || []).map((post: any) => ({
          id: post.id,
          author_id: post.author_id,
          title: post.title,
          content: post.content,
          category: post.category,
          likes: post.likes,
          comment_count: post.comment_count,
          created_at: post.created_at,
          author: {
            display_name: post.users?.display_name || "User",
            avatar_url: post.users?.avatar_url,
            is_banned: post.users?.is_banned || false,
          },
        }));
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to fetch posts";
        setError(message);
        return [];
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Fetches the set of post IDs the given user has already liked
  const fetchUserLikes = useCallback(async (userId: string): Promise<Set<string>> => {
    try {
      const { data, error: err } = await supabase
        .from("likes")
        .select("post_id")
        .eq("user_id", userId);

      if (err) throw err;
      return new Set((data || []).map((row: any) => row.post_id as string));
    } catch {
      return new Set();
    }
  }, []);

  const createPost = useCallback(
    async (userId: string, title: string, content: string, category: string) => {
      try {
        setError(null);

        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("is_banned")
          .eq("id", userId)
          .single();

        if (userError) throw userError;
        if (userData?.is_banned) throw new Error("You have been banned from posting.");

        const { data, error: err } = await supabase
          .from("posts")
          .insert([{ author_id: userId, title, content, category, likes: 0, comment_count: 0 }])
          .select()
          .single();

        if (err) throw err;
        return data;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to create post";
        setError(message);
        throw err;
      }
    },
    []
  );

  const addComment = useCallback(
    async (postId: string, userId: string, content: string) => {
      try {
        setError(null);

        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("is_banned")
          .eq("id", userId)
          .single();

        if (userError) throw userError;
        if (userData?.is_banned) throw new Error("You have been banned from commenting.");

        const { data, error: err } = await supabase
          .from("comments")
          .insert([{ post_id: postId, author_id: userId, content }])
          .select()
          .single();

        if (err) throw err;
        await supabase.rpc("increment_comment_count", { post_id: postId });
        return data;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to add comment";
        setError(message);
        throw err;
      }
    },
    []
  );

  // Returns whether the user now likes the post (true = liked, false = unliked)
  const toggleLike = useCallback(async (postId: string, userId: string): Promise<boolean> => {
    try {
      setError(null);

      const { data: existingLike, error: checkError } = await supabase
        .from("likes")
        .select("id")
        .eq("post_id", postId)
        .eq("user_id", userId)
        .maybeSingle();

      if (checkError) throw checkError;

      if (existingLike) {
        const { error: deleteError } = await supabase
          .from("likes")
          .delete()
          .eq("id", existingLike.id);
        if (deleteError) throw deleteError;
        await supabase.rpc("decrement_likes", { post_id: postId });
        return false;
      } else {
        const { error: insertError } = await supabase
          .from("likes")
          .insert([{ post_id: postId, user_id: userId }]);
        if (insertError) throw insertError;
        await supabase.rpc("increment_likes", { post_id: postId });
        return true;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to toggle like";
      setError(message);
      throw err;
    }
  }, []);

  const banUser = useCallback(async (userId: string) => {
    try {
      setError(null);
      const { error: err } = await supabase
        .from("users")
        .update({ is_banned: true })
        .eq("id", userId);
      if (err) throw err;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to ban user";
      setError(message);
      throw err;
    }
  }, []);

  return {
    loading,
    error,
    fetchTrendingTopics,
    fetchPosts,
    fetchUserLikes,
    createPost,
    addComment,
    toggleLike,
    banUser,
  };
}
