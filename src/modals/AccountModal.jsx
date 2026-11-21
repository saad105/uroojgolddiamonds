import React, { useState } from 'react';
import {
  CalendarIcon,
  CircleAlertIcon,
  CircleCheckBigIcon,
  DatabaseIcon,
  EyeIcon,
  EyeOffIcon,
  HeartIcon,
  KeyRoundIcon,
  LockIcon,
  LogInIcon,
  LogOutIcon,
  MailIcon,
  MessageSquareIcon,
  PenLineIcon,
  PhoneIcon,
  RefreshCwIcon,
  SaveIcon,
  ShieldCheckIcon,
  ShoppingBagIcon,
  UserIcon,
  XIcon,
} from 'lucide-react';
import { useAuth } from '../lib/AuthContext.jsx';
import { formatINR } from '../lib/format.js';

const AccountModal = ({ isOpen, onClose, wishlistProducts, cartItems = [], onSelectProduct, onOpenAppointment, onOpenCart }) => {
  const { user, profile, loading, isConfigured, signIn, signUp, signOut, updateProfile } = useAuth(),
    [E, S] = useState('profile'),
    [k, O] = useState(false),
    [T, R] = useState(''),
    [P, V] = useState(''),
    [H, G] = useState(''),
    [X, W] = useState(''),
    [oe, ye] = useState(false),
    [Z, De] = useState(null),
    [Se, Y] = useState(null),
    [fe, se] = useState(false),
    [Ne, ve] = useState(false),
    [ze, At] = useState(''),
    [Kt, B] = useState(''),
    [$, ce] = useState('Hyderabad'),
    [de, Te] = useState('Gold 22K'),
    [Ae, Be] = useState(false),
    [ne, ge] = useState(() => {
      try {
        return JSON.parse(localStorage.getItem('urooj_appointments') || '[]');
      } catch {
        return [];
      }
    }),
    [Dt, _n] = useState(() => {
      try {
        return JSON.parse(localStorage.getItem('urooj_enquiries') || '[]');
      } catch {
        return [];
      }
    });
  if (!isOpen) {
    return null;
  }
  const Os = async (ae) => {
      if ((ae.preventDefault(), De(null), Y(null), se(true), k)) {
        if (!H.trim()) {
          De('Please enter your full name.');
          se(false);
          return;
        }
        if (P.length < 6) {
          De('Password must be at least 6 characters.');
          se(false);
          return;
        }
        const tt = await signUp(T.trim(), P, H.trim(), X.trim());
        se(false);
        if (tt.success) {
          Y('Account registered successfully! Welcome to Urooj Gold & Diamonds.');
          setTimeout(() => {
            Y(null);
          }, 3e3);
        } else {
          De(tt.error || 'Failed to register. Please check details.');
        }
      } else {
        const tt = await signIn(T.trim(), P);
        se(false);
        if (tt.success) {
          Y('Signed in successfully!');
          setTimeout(() => {
            Y(null);
          }, 2e3);
        } else {
          De(tt.error || 'Invalid email or password.');
        }
      }
    },
    Lt = () => {
      var ae, tt;
      At(profile?.fullName || user?.user_metadata?.full_name || '');
      B(profile?.phone || user?.user_metadata?.phone || '');
      ce(profile?.city || 'Hyderabad');
      Te(profile?.preferredMetal || 'Gold 22K');
      ve(true);
      Be(false);
    },
    We = async (ae) => {
      ae.preventDefault();
      se(true);
      const tt = await updateProfile({
        fullName: ze,
        phone: Kt,
        city: $,
        preferredMetal: de,
      });
      se(false);
      if (tt.success) {
        ve(false);
        Be(true);
        setTimeout(() => Be(false), 3e3);
      } else {
        De(tt.error || 'Failed to update profile.');
      }
    },
    Fe = profile?.fullName || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Patron',
    Mt = profile?.phone || user?.user_metadata?.phone || 'Not specified',
    Cs = profile?.city || 'Hyderabad';
  if (profile != null) {
    profile.preferredMetal;
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="relative w-full max-w-3xl bg-[#FAF7F2] rounded-2xl border border-[#C6A15B]/50 shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col">
        <div className="bg-[#071F1B] text-[#F7F3EA] p-5 sm:p-6 flex items-center justify-between border-b border-[#C6A15B]/30">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-full bg-[#09231E] border border-[#C6A15B] flex items-center justify-center text-[#DFCA8F] shadow-inner">
              <UserIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-xl sm:text-2xl text-[#F7F3EA] tracking-wide">
                  {user ? `Welcome, ${Fe.split(' ')[0]}` : 'CLIENT ACCESS & REGISTRATION'}
                </h3>
                {user && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#C6A15B]/20 text-[#DFCA8F] text-[10px] font-semibold uppercase tracking-wider border border-[#C6A15B]/40">
                    <ShieldCheckIcon className="w-3 h-3 text-[#DFCA8F]" />
                    Secure
                  </span>
                )}
              </div>
              <p className="text-[11px] tracking-widest text-[#DFCA8F] uppercase font-light">
                {user
                  ? 'Private Client Lounge • Supabase Cloud Synchronized'
                  : 'Encrypted Cloud Authentication (Row Level Security)'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#EDE5D7] hover:text-[#DFCA8F] hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="bg-[#09231E] px-6 py-2 border-b border-[#C6A15B]/20 flex items-center justify-between text-[11px] text-[#EDE5D7] flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <DatabaseIcon className="w-3.5 h-3.5 text-[#DFCA8F]" />
            <span>
              {isConfigured ? (
                <strong className="text-emerald-400 font-medium">Supabase Database Connected</strong>
              ) : (
                <strong className="text-[#DFCA8F] font-medium">Supabase Database Ready (Enter credentials in .env)</strong>
              )}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-[#EDE5D7]/80">
            <LockIcon className="w-3 h-3 text-[#DFCA8F]" />
            <span>Row Level Security (RLS) Active — Strictly Private Per User</span>
          </div>
        </div>
        {user ? (
          <div className="flex border-b border-[#EDE5D7] bg-white px-4 sm:px-6 overflow-x-auto scrollbar-none">
            <button
              onClick={() => S('profile')}
              className={`py-3.5 px-4 text-xs font-semibold tracking-wider uppercase whitespace-nowrap transition-colors relative flex items-center gap-1.5 cursor-pointer ${E === 'profile' ? 'text-[#071F1B]' : 'text-[#6B6862] hover:text-[#071F1B]'}`}
            >
              <UserIcon className="w-3.5 h-3.5" />
              <span>Profile</span>
              {E === 'profile' && <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#C6A15B]" />}
            </button>
            <button
              onClick={() => S('wishlist')}
              className={`py-3.5 px-4 text-xs font-semibold tracking-wider uppercase whitespace-nowrap transition-colors relative flex items-center gap-1.5 cursor-pointer ${E === 'wishlist' ? 'text-[#071F1B]' : 'text-[#6B6862] hover:text-[#071F1B]'}`}
            >
              <HeartIcon className="w-3.5 h-3.5" />
              <span>Wishlist ({wishlistProducts.length})</span>
              {E === 'wishlist' && <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#C6A15B]" />}
            </button>
            <button
              onClick={() => S('cart')}
              className={`py-3.5 px-4 text-xs font-semibold tracking-wider uppercase whitespace-nowrap transition-colors relative flex items-center gap-1.5 cursor-pointer ${E === 'cart' ? 'text-[#071F1B]' : 'text-[#6B6862] hover:text-[#071F1B]'}`}
            >
              <ShoppingBagIcon className="w-3.5 h-3.5" />
              <span>Shopping Bag ({cartItems.reduce((ae, tt) => ae + tt.quantity, 0)})</span>
              {E === 'cart' && <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#C6A15B]" />}
            </button>
            <button
              onClick={() => S('appointments')}
              className={`py-3.5 px-4 text-xs font-semibold tracking-wider uppercase whitespace-nowrap transition-colors relative flex items-center gap-1.5 cursor-pointer ${E === 'appointments' ? 'text-[#071F1B]' : 'text-[#6B6862] hover:text-[#071F1B]'}`}
            >
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>Consultations ({ne.length})</span>
              {E === 'appointments' && <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#C6A15B]" />}
            </button>
            <button
              onClick={() => S('enquiries')}
              className={`py-3.5 px-4 text-xs font-semibold tracking-wider uppercase whitespace-nowrap transition-colors relative flex items-center gap-1.5 cursor-pointer ${E === 'enquiries' ? 'text-[#071F1B]' : 'text-[#6B6862] hover:text-[#071F1B]'}`}
            >
              <MessageSquareIcon className="w-3.5 h-3.5" />
              <span>Enquiries ({Dt.length})</span>
              {E === 'enquiries' && <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#C6A15B]" />}
            </button>
          </div>
        ) : null}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {user ? (
            <div>
              {E === 'profile' && (
                <div className="space-y-6">
                  {Ae && (
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                      <CircleCheckBigIcon className="w-4 h-4 text-emerald-600" />
                      <span>Profile information successfully updated in database!</span>
                    </div>
                  )}
                  {Ne ? (
                    <form onSubmit={We} className="bg-white rounded-2xl p-6 border border-[#EDE5D7] space-y-4 shadow-xs">
                      <div className="flex justify-between items-center pb-3 border-b border-[#EDE5D7]">
                        <h4 className="font-serif text-lg font-bold text-[#071F1B]">Edit Profile Information</h4>
                        <button
                          type="button"
                          onClick={() => ve(false)}
                          className="text-xs text-[#6B6862] hover:text-[#071F1B] cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div className="space-y-1">
                          <label className="font-semibold text-[#071F1B]">Full Name</label>
                          <input
                            type="text"
                            required
                            value={ze}
                            onChange={(ae) => At(ae.target.value)}
                            className="w-full bg-[#FAF7F2] border border-[#EDE5D7] rounded-lg px-3 py-2 text-xs text-[#071F1B] focus:outline-none focus:border-[#071F1B]"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-semibold text-[#071F1B]">Phone</label>
                          <input
                            type="tel"
                            value={Kt}
                            onChange={(ae) => B(ae.target.value)}
                            className="w-full bg-[#FAF7F2] border border-[#EDE5D7] rounded-lg px-3 py-2 text-xs text-[#071F1B] focus:outline-none focus:border-[#071F1B]"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-semibold text-[#071F1B]">City</label>
                          <input
                            type="text"
                            value={$}
                            onChange={(ae) => ce(ae.target.value)}
                            className="w-full bg-[#FAF7F2] border border-[#EDE5D7] rounded-lg px-3 py-2 text-xs text-[#071F1B] focus:outline-none focus:border-[#071F1B]"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-semibold text-[#071F1B]">Preferred Metal</label>
                          <select
                            value={de}
                            onChange={(ae) => Te(ae.target.value)}
                            className="w-full bg-[#FAF7F2] border border-[#EDE5D7] rounded-lg px-3 py-2 text-xs text-[#071F1B] focus:outline-none focus:border-[#071F1B]"
                          >
                            <option value="Gold 22K">Gold 22K (916)</option>
                            <option value="Gold 18K">Gold 18K (750)</option>
                            <option value="Natural Diamonds">Certified Natural Diamonds</option>
                            <option value="Platinum 950">Platinum 950</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => ve(false)}
                          className="px-4 py-2 rounded-lg border border-[#EDE5D7] text-xs font-semibold text-[#6B6862] hover:bg-[#FAF7F2] cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={fe}
                          className="px-5 py-2 rounded-lg bg-[#071F1B] text-[#DFCA8F] text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5 cursor-pointer shadow-sm hover:bg-[#09231E]"
                        >
                          <SaveIcon className="w-3.5 h-3.5" />
                          <span>{fe ? 'Saving...' : 'Save Profile'}</span>
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="bg-white rounded-2xl p-6 border border-[#EDE5D7] space-y-5 shadow-xs">
                      <div className="flex justify-between items-center pb-4 border-b border-[#EDE5D7]">
                        <div>
                          <h4 className="font-serif text-lg font-bold text-[#071F1B]">Client Information</h4>
                          <p className="text-[11px] text-[#6B6862]">
                            {'Encrypted UID: '}
                            <span className="font-mono">{user.id.slice(0, 12)}...</span>
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 rounded-full bg-[#071F1B] text-[#DFCA8F] text-[11px] font-semibold uppercase tracking-wider border border-[#C6A15B]/30">
                            VIP Client
                          </span>
                          <button
                            onClick={Lt}
                            className="p-1.5 text-[#071F1B] hover:text-[#A9823D] hover:bg-[#FAF7F2] rounded-lg border border-[#EDE5D7] text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            <PenLineIcon className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EDE5D7]/80">
                          <span className="text-[#6B6862] block text-[11px]">Full Name</span>
                          <span className="font-bold text-[#071F1B] text-sm">{Fe}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EDE5D7]/80">
                          <span className="text-[#6B6862] block text-[11px]">Email Address</span>
                          <span className="font-bold text-[#071F1B] text-sm truncate block">{user.email}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EDE5D7]/80">
                          <span className="text-[#6B6862] block text-[11px]">Phone Number</span>
                          <span className="font-bold text-[#071F1B] text-sm">{Mt}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EDE5D7]/80">
                          <span className="text-[#6B6862] block text-[11px]">City / Location</span>
                          <span className="font-bold text-[#071F1B] text-sm">{Cs}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                        <div
                          onClick={() => S('wishlist')}
                          className="p-3 rounded-xl bg-white border border-[#EDE5D7] hover:border-[#C6A15B] cursor-pointer transition-colors text-center"
                        >
                          <HeartIcon className="w-4 h-4 text-[#C6A15B] mx-auto mb-1" />
                          <span className="text-[11px] text-[#6B6862] block">Cloud Wishlist</span>
                          <strong className="text-sm font-bold text-[#071F1B]">
                            {wishlistProducts.length}
                            {' Items'}
                          </strong>
                        </div>
                        <div
                          onClick={() => S('cart')}
                          className="p-3 rounded-xl bg-white border border-[#EDE5D7] hover:border-[#C6A15B] cursor-pointer transition-colors text-center"
                        >
                          <ShoppingBagIcon className="w-4 h-4 text-[#C6A15B] mx-auto mb-1" />
                          <span className="text-[11px] text-[#6B6862] block">Shopping Bag</span>
                          <strong className="text-sm font-bold text-[#071F1B]">
                            {cartItems.reduce((ae, tt) => ae + tt.quantity, 0)}
                            {' Items'}
                          </strong>
                        </div>
                        <div
                          onClick={() => S('appointments')}
                          className="p-3 rounded-xl bg-white border border-[#EDE5D7] hover:border-[#C6A15B] cursor-pointer transition-colors text-center col-span-2 sm:col-span-1"
                        >
                          <CalendarIcon className="w-4 h-4 text-[#C6A15B] mx-auto mb-1" />
                          <span className="text-[11px] text-[#6B6862] block">Consultations</span>
                          <strong className="text-sm font-bold text-[#071F1B]">
                            {ne.length}
                            {' Booked'}
                          </strong>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-2 flex-wrap gap-3">
                    <button
                      onClick={onOpenAppointment}
                      className="bg-[#071F1B] hover:bg-[#09231E] text-[#DFCA8F] text-xs font-semibold py-2.5 px-5 rounded-xl tracking-wider uppercase transition-colors border border-[#C6A15B]/30 flex items-center gap-2 cursor-pointer shadow-sm"
                    >
                      <CalendarIcon className="w-4 h-4" />
                      <span>Book VIP Consultation</span>
                    </button>
                    <button
                      onClick={signOut}
                      className="flex items-center gap-1.5 text-xs text-red-700 hover:text-red-900 font-semibold px-4 py-2.5 rounded-xl border border-red-200 hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      <LogOutIcon className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
              {E === 'wishlist' && (
                <div className="space-y-4">
                  {wishlistProducts.length === 0 ? (
                    <div className="text-center py-12 text-xs text-[#6B6862] bg-white rounded-2xl border border-[#EDE5D7] p-8 space-y-2">
                      <HeartIcon className="w-10 h-10 text-[#6B6862]/30 mx-auto" />
                      <p className="font-serif text-base text-[#071F1B]">Your Cloud Wishlist is Empty</p>
                      <p className="text-[11px] text-[#6B6862]">
                        Browse our curated 916 gold & diamond collections and click the heart icon on any piece to save it here.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {wishlistProducts.map((ae) => (
                        <div
                          onClick={() => {
                            onClose();
                            onSelectProduct(ae);
                          }}
                          className="bg-white p-3.5 rounded-xl border border-[#EDE5D7] flex gap-3.5 items-center cursor-pointer hover:border-[#C6A15B] transition-all hover:shadow-md group"
                          key={ae.id}
                        >
                          <img
                            src={ae.images[0]}
                            alt={ae.name}
                            className="w-16 h-16 rounded-xl object-cover border border-[#EDE5D7]"
                          />
                          <div className="min-w-0 flex-1">
                            <h5 className="font-serif text-sm font-bold text-[#071F1B] truncate group-hover:text-[#A9823D] transition-colors">
                              {ae.name}
                            </h5>
                            <span className="text-xs font-bold text-[#071F1B] block">{formatINR(ae.price)}</span>
                            <span className="text-[10px] text-[#6B6862] block">
                              {ae.purity}
                              {' • '}
                              {ae.approxWeight}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {E === 'cart' && (
                <div className="space-y-4">
                  {cartItems.length === 0 ? (
                    <div className="text-center py-12 text-xs text-[#6B6862] bg-white rounded-2xl border border-[#EDE5D7] p-8 space-y-2">
                      <ShoppingBagIcon className="w-10 h-10 text-[#6B6862]/30 mx-auto" />
                      <p className="font-serif text-base text-[#071F1B]">Your Shopping Bag is Empty</p>
                      <p className="text-[11px] text-[#6B6862]">
                        Add precious hallmarked items to your shopping bag to synchronize them across devices.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="divide-y divide-[#EDE5D7] bg-white rounded-2xl border border-[#EDE5D7] p-4">
                        {cartItems.map((ae) => (
                          <div className="py-3 flex items-center justify-between gap-3 first:pt-0 last:pb-0" key={ae.product.id}>
                            <div className="flex items-center gap-3">
                              <img
                                src={ae.product.images[0]}
                                alt={ae.product.name}
                                className="w-12 h-12 rounded-lg object-cover"
                              />
                              <div>
                                <h6 className="font-serif text-xs font-bold text-[#071F1B]">{ae.product.name}</h6>
                                <p className="text-[10px] text-[#6B6862]">
                                  {'Qty: '}
                                  {ae.quantity}
                                  {' • '}
                                  {ae.product.purity}
                                </p>
                              </div>
                            </div>
                            <span className="font-mono text-xs font-bold text-[#071F1B]">
                              {formatINR(ae.product.price * ae.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>
                      {onOpenCart && (
                        <div className="flex justify-end">
                          <button
                            onClick={() => {
                              onClose();
                              onOpenCart();
                            }}
                            className="bg-[#071F1B] text-[#DFCA8F] text-xs font-semibold py-2.5 px-5 rounded-xl uppercase tracking-wider flex items-center gap-2 hover:bg-[#09231E] cursor-pointer"
                          >
                            <ShoppingBagIcon className="w-4 h-4" />
                            <span>Open Full Shopping Bag</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
              {E === 'appointments' && (
                <div className="space-y-4">
                  {ne.length === 0 ? (
                    <div className="text-center py-12 space-y-3 bg-white rounded-2xl border border-[#EDE5D7] p-6">
                      <CalendarIcon className="w-10 h-10 text-[#6B6862]/30 mx-auto" />
                      <p className="text-sm text-[#071F1B] font-serif font-bold">No Booked Consultations</p>
                      <p className="text-xs text-[#6B6862]">
                        Book a private showroom lounge session with our master jewellery consultants.
                      </p>
                      <button
                        onClick={onOpenAppointment}
                        className="bg-[#071F1B] text-[#DFCA8F] text-xs font-semibold py-2.5 px-5 rounded-xl tracking-wider uppercase hover:bg-[#09231E] cursor-pointer"
                      >
                        Book an Appointment
                      </button>
                    </div>
                  ) : (
                    ne.map((ae) => (
                      <div className="bg-white rounded-xl p-4 border border-[#EDE5D7] space-y-2 text-xs shadow-xs" key={ae.id}>
                        <div className="flex justify-between items-center">
                          <span className="font-serif font-bold text-[#071F1B] text-sm">{ae.interest}</span>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase bg-emerald-100 text-emerald-800 border border-emerald-300">
                            {ae.status}
                          </span>
                        </div>
                        <div className="text-[#6B6862]">
                          <span>
                            {'Ref: '}
                            <strong className="text-[#071F1B] font-mono">{ae.id}</strong>
                          </span>
                          {' •'}
                          <span className="ml-2">
                            {ae.preferredDate}
                            {' ('}
                            {ae.preferredTime})
                          </span>
                        </div>
                        {ae.notes && (
                          <p className="text-[#171A19]/80 italic bg-[#FAF7F2] p-2.5 rounded-lg border border-[#EDE5D7]/60">
                            "{ae.notes}"
                          </p>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}
              {E === 'enquiries' && (
                <div className="space-y-4">
                  {Dt.length === 0 ? (
                    <div className="text-center py-12 space-y-2 text-xs text-[#6B6862] bg-white rounded-2xl border border-[#EDE5D7] p-6">
                      <MessageSquareIcon className="w-10 h-10 text-[#6B6862]/30 mx-auto" />
                      <p className="font-serif text-sm text-[#071F1B]">No active bespoke enquiries recorded.</p>
                      <p>Custom jewellery sketches and special orders will appear here.</p>
                    </div>
                  ) : (
                    Dt.map((ae) => (
                      <div className="bg-white rounded-xl p-4 border border-[#EDE5D7] space-y-1.5 text-xs shadow-xs" key={ae.id}>
                        <div className="flex justify-between items-center">
                          <span className="font-serif font-bold text-[#071F1B] text-sm">
                            {ae.subject || ae.metal || 'Bespoke Enquiry'}
                          </span>
                          <span className="text-[10px] text-[#A9823D] font-mono">{ae.id}</span>
                        </div>
                        <p className="text-[#171A19]/80 font-light">{ae.description || ae.message}</p>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="max-w-md mx-auto space-y-6">
              <div className="text-center space-y-1.5">
                <h4 className="font-serif text-2xl text-[#071F1B]">
                  {k ? 'Register Client Account' : 'Sign In to Your Account'}
                </h4>
                <p className="text-xs text-[#6B6862] font-light leading-relaxed">
                  {k
                    ? 'Register your profile to securely store your Wishlist, Shopping Bag, custom bridal orders and consultation logs.'
                    : 'Access your cloud-synchronized shopping bag, saved jewellery pieces, and private appointments.'}
                </p>
              </div>
              {Z && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
                  <CircleAlertIcon className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                  <p className="leading-relaxed">{Z}</p>
                </div>
              )}
              {Se && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2">
                  <CircleCheckBigIcon className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                  <p className="leading-relaxed">{Se}</p>
                </div>
              )}
              <form onSubmit={Os} className="space-y-4">
                {k && (
                  <>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#071F1B] uppercase tracking-wider flex items-center gap-1.5">
                        <UserIcon className="w-3.5 h-3.5 text-[#C6A15B]" />
                        <span>Full Name *</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={H}
                        onChange={(ae) => G(ae.target.value)}
                        placeholder="e.g. Mohammed Farhan / Priya Sharma"
                        className="w-full bg-white border border-[#EDE5D7] rounded-xl px-3.5 py-2.5 text-xs text-[#071F1B] focus:outline-none focus:border-[#071F1B] focus:ring-1 focus:ring-[#071F1B] transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#071F1B] uppercase tracking-wider flex items-center gap-1.5">
                        <PhoneIcon className="w-3.5 h-3.5 text-[#C6A15B]" />
                        <span>Phone / Mobile Number</span>
                      </label>
                      <input
                        type="tel"
                        value={X}
                        onChange={(ae) => W(ae.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full bg-white border border-[#EDE5D7] rounded-xl px-3.5 py-2.5 text-xs text-[#071F1B] focus:outline-none focus:border-[#071F1B] focus:ring-1 focus:ring-[#071F1B] transition-all"
                      />
                    </div>
                  </>
                )}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#071F1B] uppercase tracking-wider flex items-center gap-1.5">
                    <MailIcon className="w-3.5 h-3.5 text-[#C6A15B]" />
                    <span>Email Address *</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={T}
                    onChange={(ae) => R(ae.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-white border border-[#EDE5D7] rounded-xl px-3.5 py-2.5 text-xs text-[#071F1B] focus:outline-none focus:border-[#071F1B] focus:ring-1 focus:ring-[#071F1B] transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#071F1B] uppercase tracking-wider flex items-center gap-1.5">
                    <KeyRoundIcon className="w-3.5 h-3.5 text-[#C6A15B]" />
                    <span>Password *</span>
                  </label>
                  <div className="relative">
                    <input
                      type={oe ? 'text' : 'password'}
                      required
                      value={P}
                      onChange={(ae) => V(ae.target.value)}
                      placeholder="Minimum 6 characters"
                      className="w-full bg-white border border-[#EDE5D7] rounded-xl px-3.5 py-2.5 pr-10 text-xs text-[#071F1B] focus:outline-none focus:border-[#071F1B] focus:ring-1 focus:ring-[#071F1B] transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => ye(!oe)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B6862] hover:text-[#071F1B] p-1"
                    >
                      {oe ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={fe}
                  className="w-full bg-[#071F1B] hover:bg-[#09231E] text-[#DFCA8F] text-xs font-serif font-bold tracking-widest uppercase py-3.5 rounded-xl shadow-lg border border-[#C6A15B]/40 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {fe ? (
                    <>
                      <RefreshCwIcon className="w-4 h-4 animate-spin text-[#DFCA8F]" />
                      <span>{k ? 'CREATING ACCOUNT...' : 'AUTHENTICATING...'}</span>
                    </>
                  ) : (
                    <>
                      {k ? <UserIcon className="w-4 h-4" /> : <LogInIcon className="w-4 h-4" />}
                      <span>{k ? 'REGISTER ACCOUNT' : 'SIGN IN SECURELY'}</span>
                    </>
                  )}
                </button>
              </form>
              <div className="text-center text-xs text-[#6B6862] pt-2 border-t border-[#EDE5D7]">
                <span>{k ? 'Already registered with Urooj Gold?' : 'New visitor to Urooj Gold & Diamonds?'}</span>{' '}
                <button
                  type="button"
                  onClick={() => {
                    O(!k);
                    De(null);
                    Y(null);
                  }}
                  className="text-[#071F1B] font-bold underline underline-offset-4 ml-1 cursor-pointer hover:text-[#A9823D]"
                >
                  {k ? 'Sign In Here' : 'Create an Account'}
                </button>
              </div>
              <div className="p-3.5 bg-white rounded-xl border border-[#EDE5D7] space-y-1.5 text-[11px] text-[#6B6862]">
                <div className="flex items-center gap-1.5 text-[#071F1B] font-semibold">
                  <ShieldCheckIcon className="w-4 h-4 text-[#C6A15B]" />
                  <span>Privacy & Zero Data-Leak Guarantee</span>
                </div>
                <p className="font-light leading-relaxed">
                  Your registration is protected by Supabase Row Level Security (RLS). Your saved wishlist, cart items, and
                  consultation inquiries are strictly mapped to your encrypted ID. No other user can access or view your data.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountModal;
