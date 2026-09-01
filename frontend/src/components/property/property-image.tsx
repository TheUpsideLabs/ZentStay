"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import { useState } from "react";

import { useAuth } from "@/context/auth-context";
import { useWishlist } from "@/context/wishlist-context";

import { VerifiedBadge } from "./verified-badge";

interface PropertyImageProps {
  propertyId: string;
  image: string;
  verified: boolean;
}

export function PropertyImage({
  propertyId,
  image,
  verified,
}: PropertyImageProps) {
  const { user } = useAuth();

  const {
    isWishlisted,
    addToWishlist,
    removeFromWishlist,
  } = useWishlist();

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const isStudent =
    user?.role === "STUDENT";

  const wishlisted =
    isWishlisted(propertyId);

  async function handleWishlist(
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    // Prevent the property Link from opening
    event.preventDefault();
    event.stopPropagation();

    if (!isStudent) {
      setError(
        "Please login with a student account to use wishlist."
      );

      setTimeout(() => {
        setError("");
      }, 3000);

      return;
    }

    if (loading) {
      return;
    }

    try {
      setLoading(true);
      setError("");

      console.log(
        "ZentStay Wishlist clicked:",
        {
          propertyId,
          wishlisted,
        }
      );

      if (wishlisted) {
        await removeFromWishlist(
          propertyId
        );

        console.log(
          "ZentStay: Property removed from wishlist."
        );
      } else {
        await addToWishlist(
          propertyId
        );

        console.log(
          "ZentStay: Property added to wishlist."
        );
      }
    } catch (error: any) {
      console.error(
        "ZentStay Wishlist Error:",
        error
      );

      setError(
        error?.response?.data?.message ||
          "Unable to update wishlist."
      );

      setTimeout(() => {
        setError("");
      }, 3000);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* =====================================
          PROPERTY IMAGE
      ===================================== */}

      <Image
        src={image}
        alt="Property"
        fill
        sizes="
          (max-width: 768px) 100vw,
          (max-width: 1200px) 50vw,
          33vw
        "
        className="
          object-cover
          transition
          duration-700
          group-hover:scale-110
        "
      />

      {/* =====================================
          VERIFIED BADGE
      ===================================== */}

      {verified && (
        <div className="absolute left-4 top-4 z-10">
          <VerifiedBadge />
        </div>
      )}

      {/* =====================================
          WISHLIST BUTTON
      ===================================== */}

      <button
        type="button"
        onClick={handleWishlist}
        disabled={loading}
        aria-label={
          wishlisted
            ? "Remove from wishlist"
            : "Add to wishlist"
        }
        title={
          wishlisted
            ? "Remove from wishlist"
            : "Add to wishlist"
        }
        className={`
          absolute
          right-4
          top-4
          z-20
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-full
          bg-white/95
          shadow-lg
          backdrop-blur
          transition-all
          duration-300

          ${
            wishlisted
              ? "text-red-500"
              : "text-slate-600 hover:text-red-500"
          }

          ${
            loading
              ? "cursor-not-allowed opacity-60"
              : "hover:scale-110"
          }
        `}
      >
        <Heart
          className="h-5 w-5"
          strokeWidth={2}
          fill={
            wishlisted
              ? "currentColor"
              : "none"
          }
        />
      </button>

      {/* =====================================
          WISHLIST ERROR
      ===================================== */}

      {error && (
        <div
          className="
            absolute
            right-4
            top-20
            z-30
            max-w-[220px]
            rounded-xl
            border
            border-red-200
            bg-white
            px-4
            py-3
            text-xs
            font-semibold
            text-red-600
            shadow-xl
          "
        >
          {error}
        </div>
      )}

      {/* =====================================
          IMAGE GRADIENT
      ===================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          h-28
          bg-gradient-to-t
          from-black/50
          to-transparent
        "
      />
    </>
  );
}