"use client";

import { useEffect, useState } from "react";
import {
  Heart,
  ShieldCheck,
  Wifi,
  Droplets,
  Zap,
  Sparkles,
  Utensils,
} from "lucide-react";

import { Footer } from "@/components/footer";
import { Container } from "@/components/layout/container";
import { Navbar } from "@/components/navbar";

import { useAuth } from "@/context/auth-context";
import { useWishlist } from "@/context/wishlist-context";

import propertyService from "@/services/property.service";
import { PropertyDetails } from "@/types/property-details";

import { PropertyGallery } from "./property-gallery";
import { PropertyNearbyCollege } from "./property-nearby-college";
import { PropertyMap } from "./property-map";
import { PropertyReviews } from "./property-reviews";
import { PropertySimilar } from "./property-similar";
import { VisitRequestModal } from "./visit-request-modal";
import { BookingModal } from "./booking-modal";

interface Props {
  id: string;
}

export function PropertyDetailsPage({
  id,
}: Props) {
  const [property, setProperty] =
    useState<PropertyDetails | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  // ==========================================
  // AUTH
  // ==========================================

  const { user } = useAuth();

  const isStudent =
    user?.role === "STUDENT";

  // ==========================================
  // WISHLIST
  // ==========================================

  const {
    addToWishlist,
    removeFromWishlist,
    isWishlisted,
  } = useWishlist();

  const [wishlistLoading, setWishlistLoading] =
    useState(false);

  const [wishlistError, setWishlistError] =
    useState("");

  // ==========================================
  // VISIT
  // ==========================================

  const [showVisitModal, setShowVisitModal] =
    useState(false);

  const [visitSuccess, setVisitSuccess] =
    useState(false);

  // ==========================================
  // BOOKING
  // ==========================================

  const [showBookingModal, setShowBookingModal] =
    useState(false);

  const [bookingSuccess, setBookingSuccess] =
    useState(false);

  // ==========================================
  // LOAD PROPERTY
  // ==========================================

  useEffect(() => {
    async function loadProperty() {
      try {
        setLoading(true);
        setError(null);

        const response =
          await propertyService.getPropertyById(id);

        setProperty(response.data);
      } catch (err) {
        console.error(
          "Failed to load property:",
          err
        );

        setError(
          "Unable to load this property."
        );
      } finally {
        setLoading(false);
      }
    }

    loadProperty();
  }, [id]);

  // ==========================================
  // WISHLIST TOGGLE
  // ==========================================

  async function handleWishlistToggle() {
    if (!property) {
      return;
    }

    if (!isStudent) {
      setWishlistError(
        "Please login with a student account to use wishlist."
      );

      return;
    }

    try {
      setWishlistLoading(true);
      setWishlistError("");

      const alreadyWishlisted =
        isWishlisted(property.id);

      if (alreadyWishlisted) {
        await removeFromWishlist(
          property.id
        );
      } else {
        await addToWishlist(
          property.id
        );
      }
    } catch (error: any) {
      console.error(
        "Wishlist action failed:",
        error
      );

      setWishlistError(
        error?.response?.data?.message ||
          "Unable to update wishlist. Please try again."
      );
    } finally {
      setWishlistLoading(false);
    }
  }

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="pt-32">
          <Container>
            <div className="flex min-h-[500px] items-center justify-center">
              <div className="text-center">
                <div
                  className="
                    mx-auto
                    h-12
                    w-12
                    animate-spin
                    rounded-full
                    border-4
                    border-slate-200
                    border-t-blue-600
                  "
                />

                <p className="mt-5 font-semibold text-slate-500">
                  Loading property...
                </p>
              </div>
            </div>
          </Container>
        </main>

        <Footer />
      </>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error || !property) {
    return (
      <>
        <Navbar />

        <main className="pt-32">
          <Container>
            <div className="py-32 text-center">
              <h1 className="text-4xl font-black text-slate-900">
                Property Not Found
              </h1>

              <p className="mt-4 text-slate-500">
                {error ??
                  "The property you are looking for does not exist."}
              </p>
            </div>
          </Container>
        </main>

        <Footer />
      </>
    );
  }

  const propertyIsWishlisted =
    isWishlisted(property.id);

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <>
      <Navbar />

      <main className="bg-slate-50 pb-24 pt-32">
        <Container>

          {/* =====================================
              SUCCESS MESSAGES
          ===================================== */}

          {visitSuccess && (
            <div className="mb-4 rounded-2xl border border-green-200 bg-green-50 px-6 py-4 text-green-700">
              <p className="font-bold">
                Visit request sent successfully! 🎉
              </p>

              <p className="mt-1 text-sm">
                The property owner will review your request.
              </p>
            </div>
          )}

          {bookingSuccess && (
            <div className="mb-8 rounded-2xl border border-blue-200 bg-blue-50 px-6 py-4 text-blue-700">
              <p className="font-bold">
                Booking request created successfully! 🎉
              </p>

              <p className="mt-1 text-sm">
                Your booking is pending owner confirmation.
              </p>
            </div>
          )}

          {wishlistError && (
            <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-6 py-4 text-red-600">
              <p className="font-semibold">
                {wishlistError}
              </p>
            </div>
          )}

          <div className="space-y-10">

            {/* =====================================
                GALLERY
            ===================================== */}

            <PropertyGallery
              images={property.images}
              title={property.title}
            />

            {/* =====================================
                MAIN CONTENT
            ===================================== */}

            <div className="grid gap-10 lg:grid-cols-[65%_35%]">

              {/* =================================
                  LEFT
              ================================= */}

              <div className="rounded-[32px] bg-white p-8 shadow-sm">

                {/* TRUST & VERIFICATION BANNER */}
                {property.verified && (
                  <div className="mb-6 flex items-center gap-3.5 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 text-emerald-900">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white font-bold">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-emerald-900">ZentStay Verified Accommodation</p>
                      <p className="text-xs text-emerald-700">Physical address, room amenities, and security guidelines verified by ZentStay quality inspectors.</p>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-3">

                  {property.verified && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3.5 py-1.5 text-xs font-bold text-emerald-800">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                      Verified PG
                    </span>
                  )}

                  {property.available && (
                    <span className="rounded-full bg-green-100 px-3.5 py-1.5 text-xs font-bold text-green-700">
                      ✓ Available Now ({property.availableRooms} rooms left)
                    </span>
                  )}

                  <span className="rounded-full bg-blue-100 px-3.5 py-1.5 text-xs font-bold text-blue-700">
                    🛏 {property.roomType}
                  </span>

                  <span className="rounded-full bg-slate-100 px-3.5 py-1.5 text-xs font-semibold text-slate-700">
                    👥 {property.gender}
                  </span>

                </div>

                {/* =================================
                    TITLE + WISHLIST
                ================================= */}

                <div className="mt-8 flex items-start justify-between gap-5">

                  <h1 className="text-4xl font-black text-slate-900 sm:text-5xl">
                    {property.title}
                  </h1>

                  {/* WISHLIST BUTTON */}

                  {isStudent && (
                    <button
                      type="button"
                      onClick={
                        handleWishlistToggle
                      }
                      disabled={
                        wishlistLoading
                      }
                      aria-label={
                        propertyIsWishlisted
                          ? "Remove from wishlist"
                          : "Add to wishlist"
                      }
                      title={
                        propertyIsWishlisted
                          ? "Remove from wishlist"
                          : "Add to wishlist"
                      }
                      className={`
                        flex
                        h-14
                        w-14
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        border
                        transition-all
                        duration-200
                        ${
                          propertyIsWishlisted
                            ? "border-red-200 bg-red-50 text-red-500"
                            : "border-slate-200 bg-white text-slate-400 hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                        }
                        ${
                          wishlistLoading
                            ? "cursor-not-allowed opacity-60"
                            : "hover:scale-105"
                        }
                      `}
                    >
                      <Heart
                        size={27}
                        strokeWidth={2}
                        fill={
                          propertyIsWishlisted
                            ? "currentColor"
                            : "none"
                        }
                      />
                    </button>
                  )}

                </div>

                <p className="mt-4 text-lg text-slate-500">
                  📍 {property.address},{" "}
                  {property.city}, {property.pincode}
                </p>

                {/* =================================
                    BASIC DETAILS
                ================================= */}

                <div className="mt-8 grid gap-4 sm:grid-cols-2">

                  <div className="rounded-2xl bg-slate-50 p-5">
                    <p className="text-sm text-slate-500">
                      Furnishing
                    </p>

                    <p className="mt-1 font-bold text-slate-900">
                      {property.furnishing}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-5">
                    <p className="text-sm text-slate-500">
                      Available Rooms
                    </p>

                    <p className="mt-1 font-bold text-slate-900">
                      {property.availableRooms} Rooms
                    </p>
                  </div>

                </div>

                {/* =================================
                    DESCRIPTION
                ================================= */}

                <div className="mt-10">
                  <h2 className="text-2xl font-bold">
                    Description
                  </h2>

                  <p className="mt-4 leading-8 text-slate-600">
                    {property.description}
                  </p>
                </div>

                {/* =================================
                    AMENITIES & INSPECTION CHECKLIST
                ================================= */}

                <div className="mt-10 border-t border-slate-100 pt-8">
                  <h2 className="text-2xl font-bold text-slate-900">
                    Amenities & Facilities
                  </h2>

                  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 text-xs font-semibold text-slate-700">
                    <div className="flex items-center gap-2.5 rounded-2xl border border-slate-200 bg-slate-50/50 p-3.5">
                      <Wifi className="h-4 w-4 text-blue-600 shrink-0" />
                      <span>High-Speed WiFi</span>
                    </div>
                    <div className="flex items-center gap-2.5 rounded-2xl border border-slate-200 bg-slate-50/50 p-3.5">
                      <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span>24/7 CCTV & Security</span>
                    </div>
                    <div className="flex items-center gap-2.5 rounded-2xl border border-slate-200 bg-slate-50/50 p-3.5">
                      <Droplets className="h-4 w-4 text-cyan-600 shrink-0" />
                      <span>RO Drinking Water</span>
                    </div>
                    <div className="flex items-center gap-2.5 rounded-2xl border border-slate-200 bg-slate-50/50 p-3.5">
                      <Zap className="h-4 w-4 text-amber-500 shrink-0" />
                      <span>Power Backup</span>
                    </div>
                    <div className="flex items-center gap-2.5 rounded-2xl border border-slate-200 bg-slate-50/50 p-3.5">
                      <Sparkles className="h-4 w-4 text-purple-600 shrink-0" />
                      <span>Daily Housekeeping</span>
                    </div>
                    <div className="flex items-center gap-2.5 rounded-2xl border border-slate-200 bg-slate-50/50 p-3.5">
                      <Utensils className="h-4 w-4 text-orange-600 shrink-0" />
                      <span>Mess / Meal Facility</span>
                    </div>
                  </div>
                </div>

                {/* =================================
                    HOST & TRUST PROFILE
                ================================= */}

                <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50/70 p-6">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Host & Property Management
                  </h3>
                  <div className="mt-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-lg font-bold text-white shadow-sm">
                        {property.owner?.name ? property.owner.name.charAt(0).toUpperCase() : "H"}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-slate-900">{property.owner?.name || "Verified Property Host"}</p>
                          <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-[10px] font-bold text-blue-700">
                            <ShieldCheck className="h-3 w-3" />
                            Verified Owner
                          </span>
                        </div>
                        <p className="mt-0.5 text-xs text-slate-500">Member of ZentStay Host Network • Direct contact with zero brokerage</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* =================================
                    HOUSE RULES & GUIDELINES
                ================================= */}

                <div className="mt-10 border-t border-slate-100 pt-8">
                  <h2 className="text-2xl font-bold text-slate-900">
                    House Rules & Policies
                  </h2>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2 text-xs">
                    <div className="rounded-2xl border border-slate-200 bg-white p-4">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Notice Period</p>
                      <p className="mt-1 font-bold text-slate-800 text-sm">30 Days Notice</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-4">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Gate / Curfew Timing</p>
                      <p className="mt-1 font-bold text-slate-800 text-sm">10:30 PM (Biometric security entry)</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-4">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Visitor Policy</p>
                      <p className="mt-1 font-bold text-slate-800 text-sm">Day visitors allowed in common area</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-4">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Maintenance Support</p>
                      <p className="mt-1 font-bold text-slate-800 text-sm">24/7 on-call warden & repairs</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* =================================
                  RIGHT PRICING CARD
              ================================= */}

              <div className="sticky top-32 h-fit rounded-[32px] bg-white p-8 shadow-sm">

                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                  {property.rentPeriod === "YEARLY" ? "Yearly Rent" : "Monthly Rent"}
                </p>

                <div className="mt-3 flex items-baseline gap-2">
                  <h2 className="text-4xl font-black text-blue-600 sm:text-5xl">
                    ₹{property.rent.toLocaleString("en-IN")}
                  </h2>
                  <span className="text-sm font-bold text-slate-500">
                    {property.rentPeriod === "YEARLY" ? "/ year" : "/ month"}
                  </span>
                </div>

                {/* COST TRANSPARENCY BREAKDOWN (PRD SECTION 13) */}
                <div className="mt-6 space-y-2.5 rounded-2xl border border-slate-100 bg-slate-50 p-4 text-xs">
                  <div className="flex justify-between font-medium text-slate-600">
                    <span>Base Rent ({property.rentPeriod === "YEARLY" ? "1 Year" : "1 Month"}):</span>
                    <span className="font-bold text-slate-900">₹{property.rent.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between font-medium text-slate-600">
                    <span>Security Deposit (Refundable):</span>
                    <span className="font-bold text-slate-900">₹{property.securityDeposit.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between font-medium text-slate-600">
                    <span>Brokerage & Booking Fee:</span>
                    <span className="font-bold text-emerald-600">₹0 (Free)</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-200 pt-2 text-sm font-bold text-slate-900">
                    <span>Estimated Move-in Total:</span>
                    <span className="text-blue-600">₹{(property.rent + property.securityDeposit).toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {/* BOOK PROPERTY */}

                <button
                  type="button"
                  onClick={() => {
                    setBookingSuccess(false);
                    setShowBookingModal(true);
                  }}
                  disabled={
                    !property.available
                  }
                  className="
                    mt-8
                    w-full
                    rounded-2xl
                    bg-gradient-to-r
                    from-blue-600
                    to-cyan-500
                    py-4
                    text-lg
                    font-bold
                    text-white
                    shadow-lg
                    shadow-blue-200/40
                    transition-all
                    duration-300
                    hover:scale-[1.02]
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  {property.available
                    ? "Book Property"
                    : "Property Unavailable"}
                </button>

                {/* BOOK VISIT */}

                <button
                  type="button"
                  onClick={() => {
                    setVisitSuccess(false);
                    setShowVisitModal(true);
                  }}
                  disabled={
                    !property.available
                  }
                  className="
                    mt-4
                    w-full
                    rounded-2xl
                    border
                    border-blue-200
                    bg-blue-50
                    py-4
                    text-lg
                    font-bold
                    text-blue-700
                    transition-all
                    duration-300
                    hover:border-blue-400
                    hover:bg-blue-100
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  {property.available
                    ? "Book Visit"
                    : "Property Unavailable"}
                </button>

                {/* CONTACT */}

                <button
                  type="button"
                  className="
                    mt-4
                    w-full
                    rounded-2xl
                    border
                    border-slate-200
                    py-4
                    font-semibold
                    transition-all
                    duration-300
                    hover:border-blue-600
                    hover:text-blue-600
                  "
                >
                  Contact Owner
                </button>

                {/* OWNER */}

                <div className="mt-8 border-t border-slate-100 pt-6">

                  <p className="text-sm text-slate-500">
                    Property Owner
                  </p>

                  <p className="mt-1 font-bold">
                    {property.owner.name}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {property.owner.email}
                  </p>

                </div>

              </div>
            </div>

            {/* =====================================
                NEARBY COLLEGE
            ===================================== */}

            <PropertyNearbyCollege
              college={property.college}
            />

            {/* =====================================
                MAP
            ===================================== */}

            <PropertyMap
              address={property.address}
              city={property.city}
              state={property.state}
              latitude={
                property.college.latitude
              }
              longitude={
                property.college.longitude
              }
            />

            {/* =====================================
                REVIEWS
            ===================================== */}

            <PropertyReviews
              reviews={property.reviews}
            />

            {/* =====================================
                SIMILAR
            ===================================== */}

            <PropertySimilar
              currentId={property.id}
              collegeId={property.collegeId}
              city={property.city}
            />

          </div>
        </Container>
      </main>

      {/* ==========================================
          VISIT MODAL
      ========================================== */}

      {showVisitModal && (
        <VisitRequestModal
          propertyId={property.id}
          propertyName={property.title}
          onClose={() => {
            setShowVisitModal(false);
          }}
          onSuccess={() => {
            setShowVisitModal(false);
            setVisitSuccess(true);
          }}
        />
      )}

      {/* ==========================================
          BOOKING MODAL
      ========================================== */}

      {showBookingModal && (
        <BookingModal
          propertyId={property.id}
          propertyName={property.title}
          rent={property.rent}
          rentPeriod={property.rentPeriod}
          securityDeposit={
            property.securityDeposit
          }
          onClose={() => {
            setShowBookingModal(false);
          }}
          onSuccess={() => {
            setShowBookingModal(false);
            setBookingSuccess(true);
          }}
        />
      )}

      <Footer />
    </>
  );
}