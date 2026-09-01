"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useAuth } from "@/context/auth-context";

import wishlistService, {
  WishlistItem,
} from "@/services/wishlist.service";

interface WishlistContextType {
  wishlist: WishlistItem[];
  wishlistIds: Set<string>;
  loading: boolean;

  refreshWishlist: () => Promise<void>;

  addToWishlist: (
    propertyId: string
  ) => Promise<void>;

  removeFromWishlist: (
    propertyId: string
  ) => Promise<void>;

  isWishlisted: (
    propertyId: string
  ) => boolean;
}

const WishlistContext =
  createContext<WishlistContextType | null>(
    null
  );

export function WishlistProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { user, isAuthenticated } =
    useAuth();

  const [wishlist, setWishlist] =
    useState<WishlistItem[]>([]);

  const [loading, setLoading] =
    useState(false);

  // ==========================================
  // LOAD WISHLIST
  // ==========================================

  const refreshWishlist =
    useCallback(async () => {
      if (typeof window === "undefined") return;

      const token = localStorage.getItem("accessToken");
      if (
        !token ||
        !isAuthenticated ||
        user?.role !== "STUDENT"
      ) {
        setWishlist([]);
        return;
      }

      try {
        setLoading(true);

        const data =
          await wishlistService.getWishlist();

        setWishlist(data || []);
      } catch (error: any) {
        // If 401 Unauthorized, gracefully clear wishlist
        setWishlist([]);
      } finally {
        setLoading(false);
      }
    }, [
      isAuthenticated,
      user?.role,
    ]);

  // ==========================================
  // REFRESH WHEN LOGIN USER CHANGES
  // ==========================================

  useEffect(() => {
    refreshWishlist();
  }, [refreshWishlist]);

  // ==========================================
  // WISHLIST IDS
  // ==========================================

  const wishlistIds = useMemo(() => {
    return new Set(
      wishlist.map(
        (item) => item.propertyId
      )
    );
  }, [wishlist]);

  // ==========================================
  // CHECK
  // ==========================================

  const isWishlisted = useCallback(
    (propertyId: string) => {
      return wishlistIds.has(propertyId);
    },
    [wishlistIds]
  );

  // ==========================================
  // ADD (OPTIMISTIC)
  // ==========================================

  const addToWishlist = useCallback(
    async (propertyId: string) => {
      // Optimistic dummy placeholder to give immediate < 16ms UI feedback
      const tempItem: WishlistItem = {
        id: `temp-${Date.now()}`,
        propertyId,
        userId: user?.id || "",
        createdAt: new Date().toISOString(),
        property: {
          id: propertyId,
          title: "Loading...",
          description: "",
          address: "",
          city: "",
          state: "",
          pincode: "",
          rent: 0,
          rentPeriod: "MONTHLY",
          availableRooms: 1,
          gender: "UNISEX",
          roomType: "SINGLE",
          furnishing: "FURNISHED",
          available: true,
          images: [],
        } as any,
      };

      setWishlist((current) => {
        if (current.some((item) => item.propertyId === propertyId)) {
          return current;
        }
        return [tempItem, ...current];
      });

      try {
        const item = await wishlistService.addToWishlist(propertyId);
        setWishlist((current) =>
          current.map((existing) =>
            existing.propertyId === propertyId ? item : existing
          )
        );
      } catch (error) {
        console.error("ZentStay: Failed to add property to wishlist:", error);
        // Revert optimistic addition
        setWishlist((current) =>
          current.filter((item) => item.propertyId !== propertyId)
        );
        throw error;
      }
    },
    [user?.id]
  );

  // ==========================================
  // REMOVE (OPTIMISTIC)
  // ==========================================

  const removeFromWishlist = useCallback(
    async (propertyId: string) => {
      let previousWishlist: WishlistItem[] = [];

      setWishlist((current) => {
        previousWishlist = current;
        return current.filter((item) => item.propertyId !== propertyId);
      });

      try {
        await wishlistService.removeFromWishlist(propertyId);
      } catch (error) {
        console.error("ZentStay: Failed to remove property from wishlist:", error);
        // Revert optimistic removal
        setWishlist(previousWishlist);
        throw error;
      }
    },
    []
  );

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistIds,
        loading,
        refreshWishlist,
        addToWishlist,
        removeFromWishlist,
        isWishlisted,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

// ==========================================
// HOOK
// ==========================================

export function useWishlist() {
  const context =
    useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist must be used inside WishlistProvider"
    );
  }

  return context;
}