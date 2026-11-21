import React, { createContext, useContext, useEffect, useState } from 'react';
import { getSupabase, isSupabaseConfigured } from './supabase.js';

const AuthContext = createContext(undefined);
const NOT_CONFIGURED =
  'Customer accounts need a Supabase project. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env (or set them in Admin → Cloud Database).';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const isConfigured = isSupabaseConfigured();
  const sb = getSupabase();

  const loadProfile = async (id, email, meta) => {
    if (!sb) return;
    try {
      const { data, error } = await sb.from('profiles').select('*').eq('id', id).single();
      if (error && error.code !== 'PGRST116') console.warn('Profile fetch warning (table may need creation):', error.message);
      setProfile(
        data
          ? {
              id,
              fullName: data.full_name || '',
              email,
              phone: data.phone || '',
              city: data.city || 'Hyderabad',
              preferredMetal: data.preferred_metal || 'Gold 22K',
            }
          : {
              id,
              fullName: meta?.full_name || email.split('@')[0],
              email,
              phone: meta?.phone || '',
              city: 'Hyderabad',
              preferredMetal: 'Gold 22K',
            },
      );
    } catch (e) {
      console.error('Error loading profile:', e);
    }
  };

  useEffect(() => {
    if (!isConfigured || !sb) {
      setLoading(false);
      return;
    }
    sb.auth
      .getSession()
      .then(({ data: { session: s } }) => {
        setSession(s);
        setUser(s?.user ?? null);
        if (s?.user) loadProfile(s.user.id, s.user.email || '', s.user.user_metadata);
        setLoading(false);
      })
      .catch(() => setLoading(false));
    const {
      data: { subscription },
    } = sb.auth.onAuthStateChange(async (_event, s) => {
      setSession(s);
      setUser(s?.user ?? null);
      if (s?.user) loadProfile(s.user.id, s.user.email || '', s.user.user_metadata);
      else setProfile(null);
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, [isConfigured]);

  const signUp = async (email, password, fullName, phone) => {
    if (!isConfigured || !sb) return { success: false, error: NOT_CONFIGURED };
    try {
      const { data, error } = await sb.auth.signUp({ email, password, options: { data: { full_name: fullName, phone } } });
      if (error) return { success: false, error: error.message };
      if (data.user) {
        try {
          await sb.from('profiles').upsert({ id: data.user.id, full_name: fullName, phone, city: 'Hyderabad' });
        } catch {}
        setUser(data.user);
        setProfile({ id: data.user.id, fullName, email, phone, city: 'Hyderabad', preferredMetal: 'Gold 22K' });
      }
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message || 'An unexpected error occurred during sign up.' };
    }
  };

  const signIn = async (email, password) => {
    if (!isConfigured || !sb) return { success: false, error: NOT_CONFIGURED };
    try {
      const { data, error } = await sb.auth.signInWithPassword({ email, password });
      if (error) return { success: false, error: error.message };
      if (data.user) {
        setUser(data.user);
        await loadProfile(data.user.id, data.user.email || '', data.user.user_metadata);
      }
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message || 'An unexpected error occurred during sign in.' };
    }
  };

  const signOut = async () => {
    if (sb) {
      try {
        await sb.auth.signOut();
      } catch (e) {
        console.error('Error signing out:', e);
      }
    }
    setUser(null);
    setSession(null);
    setProfile(null);
  };

  const updateProfile = async (patch) => {
    if (!user || !sb) return { success: false, error: 'User not logged in' };
    try {
      const { error } = await sb.from('profiles').upsert({
        id: user.id,
        full_name: patch.fullName,
        phone: patch.phone,
        city: patch.city,
        preferred_metal: patch.preferredMetal,
        updated_at: new Date().toISOString(),
      });
      if (error) return { success: false, error: error.message };
      setProfile((p) => (p ? { ...p, ...patch } : null));
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message || 'Failed to update profile' };
    }
  };

  const fetchUserWishlist = async () => {
    if (!user || !sb) return [];
    try {
      const { data, error } = await sb.from('wishlist_items').select('product_id').eq('user_id', user.id);
      return error ? [] : (data || []).map((r) => r.product_id);
    } catch {
      return [];
    }
  };

  const saveWishlistToCloud = async (ids) => {
    if (!user || !sb) return;
    try {
      await sb.from('wishlist_items').delete().eq('user_id', user.id);
      if (ids.length > 0) await sb.from('wishlist_items').insert(ids.map((product_id) => ({ user_id: user.id, product_id })));
    } catch (e) {
      console.error('Error saving wishlist to cloud:', e);
    }
  };

  const fetchUserCart = async (products) => {
    if (!user || !sb) return [];
    try {
      const { data, error } = await sb.from('cart_items').select('*').eq('user_id', user.id);
      if (error || !data) return [];
      return data
        .map((row) => {
          const product = products.find((p) => p.id === row.product_id);
          return product
            ? { product, quantity: row.quantity || 1, selectedSize: row.selected_size || undefined, customEngraving: row.custom_engraving || undefined }
            : null;
        })
        .filter(Boolean);
    } catch {
      return [];
    }
  };

  const saveCartToCloud = async (items) => {
    if (!user || !sb) return;
    try {
      await sb.from('cart_items').delete().eq('user_id', user.id);
      if (items.length > 0)
        await sb.from('cart_items').insert(
          items.map((i) => ({
            user_id: user.id,
            product_id: i.product.id,
            quantity: i.quantity,
            selected_size: i.selectedSize || null,
            custom_engraving: i.customEngraving || null,
          })),
        );
    } catch (e) {
      console.error('Error saving cart to cloud:', e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        loading,
        isConfigured,
        signUp,
        signIn,
        signOut,
        updateProfile,
        fetchUserWishlist,
        saveWishlistToCloud,
        fetchUserCart,
        saveCartToCloud,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
