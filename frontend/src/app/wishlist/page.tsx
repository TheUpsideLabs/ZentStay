"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Heart,
  MapPin,
  Trash2,
} from "lucide-react";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Container } from "@/components/layout/container";

import { useAuth } from "@/context/auth-context";
import { useWishlist } from "@/context/wishlist-context";

export default function WishlistPage() {
  const { user, isAuthenticated } =
    useAuth();

  const {
    wishlist,
    loading,
    removeFromWishlist,
  } = useWishlist();

  // ==========================================
  // NOT LOGGED IN
  // ==========================================

  if (!isAuthenticated) {
    return (
      <>
        <Navbar />

        <main className="min-h-screen bg-slate-50 pt-32">
          <Container>
            <div className="mx-auto max-w-2xl py-24 text-center">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
                <Heart
                  className="h-10 w-10 text-red-500"
                  fill="currentColor"
                />
              </div>

              <h1 className="mt-8 text-4xl font-black text-slate-900">
                Your Wishlist
              </h1>

              <p className="mx-auto mt-4 max-w-lg text-lg leading-8 text-slate-500">
                Login with your student account to
                save properties you love and find them
                easily later.
              </p>

              <Link
                href="/login"
                className="
                  mt-8
                  inline-flex
                  items-center
                  gap-2
                  rounded-2xl
                  bg-gradient-to-r
                  from-blue-600
                  to-cyan-500
                  px-7
                  py-4
                  font-bold
                  text-white
                  shadow-lg
                  shadow-blue-200/40
                  transition
                  hover:scale-105
                "
              >
                Login to Continue
                <ArrowRight className="h-5 w-5" />
              </Link>

            </div>
          </Container>
        </main>

        <Footer />
      </>
    );
  }

  // ==========================================
  // NON-STUDENT
  // ==========================================

  if (user?.role !== "STUDENT") {
    return (
      <>
        <Navbar />

        <main className="min-h-screen bg-slate-50 pt-32">
          <Container>
            <div className="mx-auto max-w-2xl py-24 text-center">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
                <Heart
                  className="h-10 w-10 text-slate-400"
                />
              </div>

              <h1 className="mt-8 text-4xl font-black text-slate-900">
                Student Wishlist
              </h1>

              <p className="mt-4 text-lg text-slate-500">
                Wishlist is available for student
                accounts only.
              </p>

            </div>
          </Container>
        </main>

        <Footer />
      </>
    );
  }

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="min-h-screen bg-slate-50 pt-32">
          <Container>

            <div className="py-20">

              <div className="h-10 w-64 animate-pulse rounded-xl bg-slate-200" />

              <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                {[1, 2, 3].map(
                  (item) => (
                    <div
                      key={item}
                      className="
                        h-[420px]
                        animate-pulse
                        rounded-[32px]
                        bg-slate-200
                      "
                    />
                  )
                )}

              </div>

            </div>

          </Container>
        </main>

        <Footer />
      </>
    );
  }

  // ==========================================
  // EMPTY WISHLIST
  // ==========================================

  if (wishlist.length === 0) {
    return (
      <>
        <Navbar />

        <main className="min-h-screen bg-slate-50 pt-32">
          <Container>

            <div className="mx-auto max-w-2xl py-24 text-center">

              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-50">
                <Heart
                  className="h-12 w-12 text-red-400"
                  fill="currentColor"
                />
              </div>

              <h1 className="mt-8 text-4xl font-black text-slate-900">
                Your Wishlist is Empty
              </h1>

              <p className="mt-4 text-lg leading-8 text-slate-500">
                Save properties that catch your eye
                and they'll appear here.
              </p>

              <Link
                href="/properties"
                className="
                  mt-8
                  inline-flex
                  items-center
                  gap-2
                  rounded-2xl
                  bg-gradient-to-r
                  from-blue-600
                  to-cyan-500
                  px-7
                  py-4
                  font-bold
                  text-white
                  shadow-lg
                  shadow-blue-200/40
                  transition
                  hover:scale-105
                "
              >
                Explore Properties
                <ArrowRight className="h-5 w-5" />
              </Link>

            </div>

          </Container>
        </main>

        <Footer />
      </>
    );
  }

  // ==========================================
  // REMOVE
  // ==========================================

  async function handleRemove(
    propertyId: string
  ) {
    try {
      await removeFromWishlist(
        propertyId
      );
    } catch (error) {
      console.error(
        "Failed to remove wishlist item:",
        error
      );
    }
  }

  // ==========================================
  // WISHLIST
  // ==========================================

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 pb-24 pt-32">

        <Container>

          {/* =====================================
              HEADER
          ===================================== */}

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <span className="inline-flex rounded-full bg-red-50 px-4 py-2 text-sm font-bold uppercase tracking-[0.2em] text-red-500">
                Saved Properties
              </span>

              <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
                My Wishlist
              </h1>

              <p className="mt-3 text-lg text-slate-500">
                {wishlist.length}{" "}
                {wishlist.length === 1
                  ? "property"
                  : "properties"}{" "}
                saved
              </p>

            </div>

            <Link
              href="/properties"
              className="
                inline-flex
                items-center
                gap-2
                self-start
                rounded-2xl
                border
                border-slate-200
                bg-white
                px-6
                py-3
                font-semibold
                text-slate-700
                transition
                hover:border-blue-600
                hover:bg-blue-600
                hover:text-white
                sm:self-auto
              "
            >
              Explore More
              <ArrowRight className="h-5 w-5" />
            </Link>

          </div>

          {/* =====================================
              PROPERTY GRID
          ===================================== */}

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

            {wishlist.map((item) => {
              const property =
                item.property;

              return (
                <article
                  key={item.id}
                  className="
                    group
                    overflow-hidden
                    rounded-[32px]
                    border
                    border-slate-100
                    bg-white
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-xl
                  "
                >

                  {/* IMAGE */}

                  <div className="relative h-60 overflow-hidden">

                    {property.images &&
                    property.images.length >
                      0 ? (
                      <Image
                        src={
                          property.images[0]
                            .imageUrl
                        }
                        alt={
                          property.title
                        }
                        fill
                        sizes="
                          (max-width: 768px) 100vw,
                          (max-width: 1024px) 50vw,
                          33vw
                        "
                        className="
                          object-cover
                          transition
                          duration-700
                          group-hover:scale-105
                        "
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-slate-100">
                        <Heart
                          className="h-12 w-12 text-slate-300"
                        />
                      </div>
                    )}

                    {/* REMOVE */}

                    <button
                      type="button"
                      onClick={() =>
                        handleRemove(
                          item.propertyId
                        )
                      }
                      className="
                        absolute
                        right-4
                        top-4
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-full
                        bg-white/95
                        text-red-500
                        shadow-lg
                        backdrop-blur
                        transition
                        hover:scale-110
                        hover:bg-red-50
                      "
                      aria-label="Remove from wishlist"
                      title="Remove from wishlist"
                    >
                      <Heart
                        className="h-5 w-5"
                        fill="currentColor"
                      />
                    </button>

                    {/* AVAILABLE */}

                    {property.available && (
                      <div className="absolute bottom-4 left-4 rounded-full bg-emerald-500 px-4 py-2 text-xs font-bold text-white shadow-lg">
                        AVAILABLE
                      </div>
                    )}

                  </div>

                  {/* CONTENT */}

                  <div className="p-6">

                    <h2 className="line-clamp-1 text-xl font-black text-slate-900">
                      {property.title}
                    </h2>

                    <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">

                      <MapPin className="h-4 w-4 shrink-0 text-blue-600" />

                      <span className="line-clamp-1">
                        {property.address},{" "}
                        {property.city}
                      </span>

                    </div>

                    {/* DETAILS */}

                    <div className="mt-5 flex flex-wrap gap-2">

                      <span className="rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600">
                        {property.roomType}
                      </span>

                      <span className="rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600">
                        {property.gender}
                      </span>

                      <span className="rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600">
                        {property.furnishing}
                      </span>

                    </div>

                    {/* PRICE */}

                    <div className="mt-6 flex items-end justify-between">

                      <div>

                        <p className="text-3xl font-black text-blue-600">
                          ₹
                          {property.rent.toLocaleString(
                            "en-IN"
                          )}
                        </p>

                        <p className="text-sm text-slate-500">
                          {property.rentPeriod === "YEARLY" ? "per year" : "per month"}
                        </p>

                      </div>

                      <Link
                        href={`/properties/${property.id}`}
                        className="
                          inline-flex
                          items-center
                          gap-2
                          rounded-xl
                          bg-slate-900
                          px-4
                          py-3
                          text-sm
                          font-bold
                          text-white
                          transition
                          hover:bg-blue-600
                        "
                      >
                        View
                        <ArrowRight className="h-4 w-4" />
                      </Link>

                    </div>

                  </div>

                </article>
              );
            })}

          </div>

        </Container>

      </main>

      <Footer />
    </>
  );
}