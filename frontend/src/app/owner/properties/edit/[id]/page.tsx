"use client";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import {
  ArrowLeft,
  Building2,
  IndianRupee,
  MapPin,
  Save,
} from "lucide-react";

import Link from "next/link";

import propertyService, {
  CreatePropertyData,
} from "@/services/property.service";

import collegeService, {
  College,
} from "@/services/college.service";

import { CollegeAutocomplete } from "@/components/college/college-autocomplete";

import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer";
import { useAuth } from "@/context";

export default function EditPropertyPage() {
  const router = useRouter();
  const params = useParams();

  const propertyId =
    typeof params?.id === "string"
      ? params.id
      : "";

  const {
    user,
    isAuthenticated,
  } = useAuth();

  const [loading, setLoading] =
    useState(true);

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] = useState<
    string | null
  >(null);
  const [success, setSuccess] = useState<
    string | null
  >(null);

  const [form, setForm] =
    useState<CreatePropertyData>({
      collegeId: "",
      title: "",
      description: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      rent: 0,
      rentPeriod: "MONTHLY",
      securityDeposit: 0,
      availableRooms: 1,
      gender: "UNISEX",
      roomType: "DOUBLE",
      furnishing: "FURNISHED",
    });

  const [existingImages, setExistingImages] =
    useState<
      { id: string; url: string }[]
    >([]);

  // ==========================================
  // AUTH
  // ==========================================

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    if (
      user?.role !== "OWNER" &&
      user?.role !== "ADMIN"
    ) {
      router.replace("/");
    }
  }, [isAuthenticated, user, router]);

  // ==========================================
  // LOAD PROPERTY
  // ==========================================

  useEffect(() => {
    async function loadProperty() {
      if (!propertyId) {
        setError("Invalid property ID.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response =
          await propertyService.getPropertyById(
            propertyId
          );

        const property = response.data;

        if (!property) {
          throw new Error(
            "Property not found."
          );
        }

        setForm({
          collegeId:
            property.collegeId ?? "",

          title:
            property.title ?? "",

          description:
            property.description ?? "",

          address:
            property.address ?? "",

          city:
            property.city ?? "",

          state:
            property.state ?? "",

          pincode:
            property.pincode ?? "",

          rent:
            Number(property.rent ?? 0),

          rentPeriod:
            property.rentPeriod === "YEARLY"
              ? "YEARLY"
              : "MONTHLY",

          securityDeposit:
            Number(
              property.securityDeposit ?? 0
            ),

          availableRooms:
            Number(
              property.availableRooms ?? 1
            ),

          gender:
            property.gender ?? "UNISEX",

          roomType:
            property.roomType ?? "DOUBLE",

          furnishing:
            property.furnishing ??
            "FURNISHED",
        });
      } catch (err: any) {
        console.error(
          "Failed to load property:",
          err
        );

        setError(
          err?.response?.data?.message ??
            err?.message ??
            "Failed to load property."
        );
      } finally {
        setLoading(false);
      }
    }

    if (
      isAuthenticated &&
      propertyId &&
      (user?.role === "OWNER" ||
        user?.role === "ADMIN")
    ) {
      loadProperty();
    }
  }, [
    propertyId,
    isAuthenticated,
    user,
  ]);

  // ==========================================
  // HANDLE INPUT
  // ==========================================

  function updateField(
    field: keyof CreatePropertyData,
    value: string | number
  ) {
    setForm((current: CreatePropertyData) => ({
      ...current,
      [field]: value,
    }));
  }

  // ==========================================
  // SUBMIT UPDATE
  // ==========================================

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError(null);
    setSuccess(null);

    // ------------------------------------------
    // VALIDATION
    // ------------------------------------------

    if (!form.collegeId) {
      setError(
        "Please select a college."
      );
      return;
    }

    if (
      form.title.trim().length < 3
    ) {
      setError(
        "Title must be at least 3 characters."
      );
      return;
    }

    if (
      form.description.trim().length < 10
    ) {
      setError(
        "Description must be at least 10 characters."
      );
      return;
    }

    if (
      form.address.trim().length < 5
    ) {
      setError(
        "Address must be at least 5 characters."
      );
      return;
    }

    if (
      form.city.trim().length < 2
    ) {
      setError(
        "City must be at least 2 characters."
      );
      return;
    }

    if (
      form.state.trim().length < 2
    ) {
      setError(
        "State must be at least 2 characters."
      );
      return;
    }

    if (
      !/^\d{6}$/.test(
        form.pincode
      )
    ) {
      setError(
        "Pincode must contain exactly 6 digits."
      );
      return;
    }

    if (form.rent <= 0) {
      setError(
        "Rent must be greater than 0."
      );
      return;
    }

    if (
      form.securityDeposit < 0
    ) {
      setError(
        "Security deposit cannot be negative."
      );
      return;
    }

    if (
      form.availableRooms <= 0 ||
      !Number.isInteger(
        form.availableRooms
      )
    ) {
      setError(
        "Available rooms must be a positive integer."
      );
      return;
    }

    if (!propertyId) {
      setError(
        "Property ID is missing."
      );
      return;
    }

    // ------------------------------------------
    // UPDATE
    // ------------------------------------------

    try {
      setSubmitting(true);

      const updated =
        await propertyService.updateProperty(
          propertyId,
          {
            collegeId:
              form.collegeId,

            title:
              form.title.trim(),

            description:
              form.description.trim(),

            address:
              form.address.trim(),

            city:
              form.city.trim(),

            state:
              form.state.trim(),

            pincode:
              form.pincode.trim(),

            rent:
              Number(form.rent),

            rentPeriod:
              form.rentPeriod,

            securityDeposit:
              Number(
                form.securityDeposit
              ),

            availableRooms:
              Number(
                form.availableRooms
              ),

            gender:
              form.gender,

            roomType:
              form.roomType,

            furnishing:
              form.furnishing,
          }
        );

      console.log(
        "ZentStay Property Updated:",
        updated
      );

      setSuccess(
        "Property updated successfully."
      );

      window.setTimeout(() => {
        router.push("/owner");
      }, 800);
    } catch (err: any) {
      console.error(
        "Failed to update property:",
        err
      );

      setError(
        err?.response?.data?.message ??
          "Failed to update property."
      );
    } finally {
      setSubmitting(false);
    }
  }

  // ==========================================
  // LOADING SCREEN
  // ==========================================

  if (
    loading
  ) {
    return (
      <main className="min-h-screen bg-slate-50 px-5 pb-20 pt-32">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

            <p className="mt-5 font-semibold text-slate-600">
              Loading property...
            </p>
          </div>
        </div>
      </main>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 px-5 pb-20 pt-32">
        <div className="mx-auto max-w-4xl">

        {/* HEADER */}

        <div className="mb-8">
          <Link
            href="/owner"
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              font-semibold
              text-blue-600
              hover:text-blue-700
            "
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Owner Dashboard
          </Link>

          <div className="mt-6">
            <p className="font-semibold uppercase tracking-[0.2em] text-blue-600">
              ZentStay Owner
            </p>

            <h1 className="mt-2 text-4xl font-black text-slate-900">
              Edit Property
            </h1>

            <p className="mt-3 text-slate-500">
              Update your hostel or PG
              property details.
            </p>
          </div>
        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="
            overflow-hidden
            rounded-3xl
            bg-white
            shadow-sm
          "
        >

          {/* ALERTS */}

          {(error || success) && (
            <div className="px-6 pt-6 md:px-8">

              {error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
                  {error}
                </div>
              )}

              {success && (
                <div className="rounded-2xl border border-green-200 bg-green-50 px-5 py-4 text-sm font-medium text-green-700">
                  {success}
                </div>
              )}

            </div>
          )}

          {/* =================================
              COLLEGE
          ================================= */}

          <section className="border-b border-slate-100 p-6 md:p-8">

            <div className="mb-6 flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50">
                <Building2 className="h-5 w-5 text-blue-600" />
              </div>

              <div>
                <h2 className="text-xl font-black text-slate-900">
                  College
                </h2>

                <p className="text-sm text-slate-500">
                  Select the college near your property.
                </p>
              </div>

            </div>

            <label className="block">

              <span className="mb-2 block text-sm font-bold text-slate-700">
                College *
              </span>
              <CollegeAutocomplete
                value={form.collegeId}
                onChange={(collegeId) => updateField("collegeId", collegeId)}
                disabled={submitting}
              />
            </label>

          </section>

          {/* =================================
              BASIC DETAILS
          ================================= */}

          <section className="border-b border-slate-100 p-6 md:p-8">

            <div className="mb-6">

              <h2 className="text-xl font-black text-slate-900">
                Property Details
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Basic information about your property.
              </p>

            </div>

            <div className="space-y-6">

              {/* TITLE */}

              <label className="block">

                <span className="mb-2 block text-sm font-bold text-slate-700">
                  Property Title *
                </span>

                <input
                  type="text"
                  value={form.title}
                  onChange={(event) =>
                    updateField(
                      "title",
                      event.target.value
                    )
                  }
                  placeholder="e.g. AKGEC Premium PG"
                  maxLength={100}
                  className="
                    h-14
                    w-full
                    rounded-2xl
                    border
                    border-slate-200
                    px-4
                    outline-none
                    transition
                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-100
                  "
                />

              </label>

              {/* DESCRIPTION */}

              <label className="block">

                <span className="mb-2 block text-sm font-bold text-slate-700">
                  Description *
                </span>

                <textarea
                  value={form.description}
                  onChange={(event) =>
                    updateField(
                      "description",
                      event.target.value
                    )
                  }
                  placeholder="Describe your hostel or PG..."
                  maxLength={1000}
                  rows={5}
                  className="
                    w-full
                    resize-none
                    rounded-2xl
                    border
                    border-slate-200
                    px-4
                    py-4
                    outline-none
                    transition
                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-100
                  "
                />

                <p className="mt-2 text-right text-xs text-slate-400">
                  {form.description.length}/1000
                </p>

              </label>

            </div>

          </section>

          {/* =================================
              LOCATION
          ================================= */}

          <section className="border-b border-slate-100 p-6 md:p-8">

            <div className="mb-6 flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-50">
                <MapPin className="h-5 w-5 text-green-600" />
              </div>

              <div>
                <h2 className="text-xl font-black text-slate-900">
                  Location
                </h2>

                <p className="text-sm text-slate-500">
                  Where is your property located?
                </p>
              </div>

            </div>

            <div className="space-y-5">

              {/* ADDRESS */}

              <label className="block">

                <span className="mb-2 block text-sm font-bold text-slate-700">
                  Address *
                </span>

                <input
                  type="text"
                  value={form.address}
                  onChange={(event) =>
                    updateField(
                      "address",
                      event.target.value
                    )
                  }
                  placeholder="e.g. AKGEC Main Road"
                  maxLength={200}
                  className="
                    h-14
                    w-full
                    rounded-2xl
                    border
                    border-slate-200
                    px-4
                    outline-none
                    transition
                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-100
                  "
                />

              </label>

              <div className="grid gap-5 md:grid-cols-3">

                {/* CITY */}

                <label className="block">

                  <span className="mb-2 block text-sm font-bold text-slate-700">
                    City *
                  </span>

                  <input
                    type="text"
                    value={form.city}
                    onChange={(event) =>
                      updateField(
                        "city",
                        event.target.value
                      )
                    }
                    placeholder="Ghaziabad"
                    className="
                      h-14
                      w-full
                      rounded-2xl
                      border
                      border-slate-200
                      px-4
                      outline-none
                      focus:border-blue-500
                      focus:ring-4
                      focus:ring-blue-100
                    "
                  />

                </label>

                {/* STATE */}

                <label className="block">

                  <span className="mb-2 block text-sm font-bold text-slate-700">
                    State *
                  </span>

                  <input
                    type="text"
                    value={form.state}
                    onChange={(event) =>
                      updateField(
                        "state",
                        event.target.value
                      )
                    }
                    placeholder="Uttar Pradesh"
                    className="
                      h-14
                      w-full
                      rounded-2xl
                      border
                      border-slate-200
                      px-4
                      outline-none
                      focus:border-blue-500
                      focus:ring-4
                      focus:ring-blue-100
                    "
                  />

                </label>

                {/* PINCODE */}

                <label className="block">

                  <span className="mb-2 block text-sm font-bold text-slate-700">
                    Pincode *
                  </span>

                  <input
                    type="text"
                    inputMode="numeric"
                    value={form.pincode}
                    onChange={(event) =>
                      updateField(
                        "pincode",
                        event.target.value
                          .replace(/\D/g, "")
                          .slice(0, 6)
                      )
                    }
                    placeholder="201009"
                    maxLength={6}
                    className="
                      h-14
                      w-full
                      rounded-2xl
                      border
                      border-slate-200
                      px-4
                      outline-none
                      focus:border-blue-500
                      focus:ring-4
                      focus:ring-blue-100
                    "
                  />

                </label>

              </div>

            </div>

          </section>

          {/* =================================
              PRICING & ROOMS
          ================================= */}

          <section className="border-b border-slate-100 p-6 md:p-8">

            <div className="mb-6 flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-50">
                <IndianRupee className="h-5 w-5 text-orange-600" />
              </div>

              <div>
                <h2 className="text-xl font-black text-slate-900">
                  Pricing & Rooms
                </h2>

                <p className="text-sm text-slate-500">
                  Set rent, rent period, deposit and room availability.
                </p>
              </div>

            </div>

            <div className="grid gap-5 md:grid-cols-2">

              {/* RENT */}

              <label className="block">

                <span className="mb-2 block text-sm font-bold text-slate-700">
                  Rent *
                </span>

                <input
                  type="number"
                  min={1}
                  value={
                    form.rent || ""
                  }
                  onChange={(event) =>
                    updateField(
                      "rent",
                      Number(
                        event.target.value
                      )
                    )
                  }
                  placeholder="8000"
                  className="
                    h-14
                    w-full
                    rounded-2xl
                    border
                    border-slate-200
                    px-4
                    outline-none
                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-100
                  "
                />

              </label>

              {/* RENT PERIOD */}

              <label className="block">

                <span className="mb-2 block text-sm font-bold text-slate-700">
                  Rent Period *
                </span>

                <select
                  value={
                    form.rentPeriod
                  }
                  onChange={(event) =>
                    updateField(
                      "rentPeriod",
                      event.target.value as CreatePropertyData["rentPeriod"]
                    )
                  }
                  className="
                    h-14
                    w-full
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    px-4
                    outline-none
                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-100
                  "
                >
                  <option value="MONTHLY">
                    Monthly
                  </option>

                  <option value="YEARLY">
                    Yearly
                  </option>
                </select>

              </label>

              {/* SECURITY */}

              <label className="block">

                <span className="mb-2 block text-sm font-bold text-slate-700">
                  Security Deposit
                </span>

                <input
                  type="number"
                  min={0}
                  value={
                    form.securityDeposit || ""
                  }
                  onChange={(event) =>
                    updateField(
                      "securityDeposit",
                      Number(
                        event.target.value
                      )
                    )
                  }
                  placeholder="5000"
                  className="
                    h-14
                    w-full
                    rounded-2xl
                    border
                    border-slate-200
                    px-4
                    outline-none
                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-100
                  "
                />

              </label>

              {/* ROOMS */}

              <label className="block">

                <span className="mb-2 block text-sm font-bold text-slate-700">
                  Available Rooms *
                </span>

                <input
                  type="number"
                  min={1}
                  step={1}
                  value={
                    form.availableRooms
                  }
                  onChange={(event) =>
                    updateField(
                      "availableRooms",
                      Number(
                        event.target.value
                      )
                    )
                  }
                  className="
                    h-14
                    w-full
                    rounded-2xl
                    border
                    border-slate-200
                    px-4
                    outline-none
                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-100
                  "
                />

              </label>

            </div>

          </section>

          {/* =================================
              ROOM PREFERENCES
          ================================= */}

          <section className="border-b border-slate-100 p-6 md:p-8">

            <div className="mb-6">

              <h2 className="text-xl font-black text-slate-900">
                Room Preferences
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Tell students what kind of accommodation
                you offer.
              </p>

            </div>

            <div className="grid gap-5 md:grid-cols-3">

              {/* GENDER */}

              <label className="block">

                <span className="mb-2 block text-sm font-bold text-slate-700">
                  Gender *
                </span>

                <select
                  value={form.gender}
                  onChange={(event) =>
                    updateField(
                      "gender",
                      event.target.value as CreatePropertyData["gender"]
                    )
                  }
                  className="
                    h-14
                    w-full
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    px-4
                    outline-none
                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-100
                  "
                >
                  <option value="UNISEX">
                    Unisex
                  </option>

                  <option value="BOYS">
                    Boys
                  </option>

                  <option value="GIRLS">
                    Girls
                  </option>
                </select>

              </label>

              {/* ROOM TYPE */}

              <label className="block">

                <span className="mb-2 block text-sm font-bold text-slate-700">
                  Room Type *
                </span>

                <select
                  value={form.roomType}
                  onChange={(event) =>
                    updateField(
                      "roomType",
                      event.target.value as CreatePropertyData["roomType"]
                    )
                  }
                  className="
                    h-14
                    w-full
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    px-4
                    outline-none
                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-100
                  "
                >
                  <option value="SINGLE">
                    Single
                  </option>

                  <option value="DOUBLE">
                    Double
                  </option>

                  <option value="TRIPLE">
                    Triple
                  </option>
                </select>

              </label>

              {/* FURNISHING */}

              <label className="block">

                <span className="mb-2 block text-sm font-bold text-slate-700">
                  Furnishing *
                </span>

                <select
                  value={
                    form.furnishing
                  }
                  onChange={(event) =>
                    updateField(
                      "furnishing",
                      event.target.value as CreatePropertyData["furnishing"]
                    )
                  }
                  className="
                    h-14
                    w-full
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    px-4
                    outline-none
                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-100
                  "
                >
                  <option value="FURNISHED">
                    Furnished
                  </option>

                  <option value="SEMI_FURNISHED">
                    Semi Furnished
                  </option>

                  <option value="UNFURNISHED">
                    Unfurnished
                  </option>
                </select>

              </label>

            </div>

          </section>

          {/* =================================
              ACTIONS
          ================================= */}

          <div className="flex flex-col-reverse gap-3 bg-slate-50 p-6 sm:flex-row sm:justify-end md:p-8">

            <Link
              href="/owner"
              className="
                inline-flex
                h-14
                items-center
                justify-center
                rounded-2xl
                border
                border-slate-200
                bg-white
                px-7
                font-bold
                text-slate-700
                transition
                hover:bg-slate-100
              "
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={submitting}
              className="
                inline-flex
                h-14
                items-center
                justify-center
                gap-2
                rounded-2xl
                bg-gradient-to-r
                from-blue-600
                to-cyan-500
                px-8
                font-bold
                text-white
                shadow-lg
                shadow-blue-200/40
                transition
                hover:scale-[1.01]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {submitting ? (
                <>
                  <span
                    className="
                      h-5
                      w-5
                      animate-spin
                      rounded-full
                      border-2
                      border-white/40
                      border-t-white
                    "
                  />

                  Updating...
                </>
              ) : (
                <>
                  <Save className="h-5 w-5" />
                  Update Property
                </>
              )}
            </button>

          </div>

        </form>
      </div>
    </main>
    <Footer />
    </>
  );
}