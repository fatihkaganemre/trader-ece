import { useEffect, useState, useCallback } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

export interface UserProfile {
  id: string;
  email: string;
  display_name: string;
  avatar_url: string | null;
  is_admin: boolean;
  is_banned: boolean;
}

export function useSupabaseAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserProfile = useCallback(async (userId: string) => {
    try {
      const { data, error: fetchError } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

      if (fetchError) {
        if (fetchError.code !== "PGRST116") throw fetchError; // PGRST116 = no rows
        // User doesn't exist, create profile
        const authUser = await supabase.auth.getUser();
        if (authUser.data.user) {
          const newProfile: UserProfile = {
            id: authUser.data.user.id,
            email: authUser.data.user.email || "",
            display_name:
              authUser.data.user.user_metadata?.full_name ||
              authUser.data.user.email?.split("@")[0] ||
              "User",
            avatar_url: authUser.data.user.user_metadata?.avatar_url || null,
            is_admin: false,
            is_banned: false,
          };

          const { error: insertError } = await supabase
            .from("users")
            .insert([newProfile]);

          if (insertError) throw insertError;
          setProfile(newProfile);
        }
      } else {
        setProfile(data);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch profile";
      setError(message);
    }
  }, []);

  useEffect(() => {
    setLoading(true);

    const initializeAuth = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setUser(data.session?.user || null);

        if (data.session?.user) {
          await fetchUserProfile(data.session.user.id);
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : "Auth error";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user || null);

      if (session?.user) {
        await fetchUserProfile(session.user.id);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [fetchUserProfile]);

  const signInWithGoogle = useCallback(async () => {
    try {
      setError(null);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/community`,
        },
      });
      if (error) throw error;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Sign in failed";
      setError(message);
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      setError(null);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      setProfile(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Sign out failed";
      setError(message);
    }
  }, []);

  return {
    user,
    profile,
    loading,
    error,
    signInWithGoogle,
    signOut,
    isAuthenticated: !!user,
    isAdmin: profile?.is_admin || false,
    isBanned: profile?.is_banned || false,
  };
}
