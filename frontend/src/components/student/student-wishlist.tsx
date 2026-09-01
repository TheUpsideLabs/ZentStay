"use client";

import { useEffect, useState } from "react";
import { Heart, MapPin } from "lucide-react";
import wishlistService, { WishlistItem } from "@/services/wishlist.service";

export function StudentWishlist() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadWishlist() {
      try {
        setLoading(true);
        const data = await wishlistService.getWishlist();
        setItems(data);
      } catch (err: any) {
        setError(err.message || "Failed to load wishlist");
      } finally {
        setLoading(false);
      }
    }
    loadWishlist();
  }, []);

  async function handleRemove(propertyId: string) {
    try {
      await wishlistService.removeFromWishlist(propertyId);
      setItems(items.filter(item => item.propertyId !== propertyId));
    } catch (err) {
      console.error("Failed to remove from wishlist", err);
    }
  }

  if (loading) {
    return (
      <div className="flex h-48 items-center justify-center rounded-3xl border border-slate-200 bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-rose-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center text-red-600">
        {error}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-16 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-50 text-slate-400">
          <Heart size={32} />
        </div>
        <h3 className="mt-6 text-xl font-bold text-slate-900">Wishlist Empty</h3>
        <p className="mt-2 text-slate-500">You haven't saved any properties yet.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <div key={item.id} className="group relative flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
          <div className="relative h-48 w-full overflow-hidden rounded-2xl bg-slate-100 mb-4">
            {item.property.images?.[0] ? (
              <img src={item.property.images[0].imageUrl} alt={item.property.title} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-slate-400">No Image</div>
            )}
            <button
              onClick={() => handleRemove(item.propertyId)}
              className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-rose-500 shadow-sm transition hover:scale-110"
            >
              <Heart size={20} fill="currentColor" />
            </button>
          </div>
          
          <div>
            <h4 className="text-lg font-bold text-slate-900 truncate">{item.property.title}</h4>
            <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
              <MapPin size={14} /> {item.property.city}, {item.property.state}
            </p>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-lg font-bold text-slate-900">₹{item.property.rent}</span>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">{item.property.roomType}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
