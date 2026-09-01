"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";
import { useSearchParams } from "next/navigation";

import propertyService from "@/services/property.service";
import { Property } from "@/types/property";

const ITEMS_PER_PAGE = 10;

export function usePropertyFilters() {
  const searchParams = useSearchParams();
  const collegeIdParam = searchParams.get("collegeId") || "";
  const pincodeParam = searchParams.get("pincode") || "";
  const initialSearchParam = searchParams.get("search") || "";
  const initialGenderParam = searchParams.get("gender") || "";
  const initialMinRentParam = searchParams.get("minRent") || "";
  const initialMaxRentParam = searchParams.get("maxRent") || "";

  const [properties, setProperties] = useState<Property[]>([]);

  const [collegeId, setCollegeId] = useState(collegeIdParam);
  const [pincode, setPincode] = useState(pincodeParam);
  const [search, setSearch] = useState(initialSearchParam);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [rentPeriod, setRentPeriod] = useState("");
  const [gender, setGender] = useState(initialGenderParam);
  const [roomType, setRoomType] = useState("");
  const [furnishing, setFurnishing] = useState("");
  const [minRent, setMinRent] = useState(initialMinRentParam);
  const [maxRent, setMaxRent] = useState(initialMaxRentParam);
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProperties = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await propertyService.getAllProperties({
        page,
        limit: ITEMS_PER_PAGE,
        collegeId: collegeId || undefined,
        pincode: pincode || undefined,
        search: search.trim() || undefined,
        gender: gender || undefined,
        roomType: roomType || undefined,
        furnishing: furnishing || undefined,
        rentPeriod: rentPeriod || undefined,
        verified: verifiedOnly ? true : undefined,
        availableOnly: availableOnly ? true : undefined,
        minRent: minRent ? Number(minRent) : undefined,
        maxRent: maxRent ? Number(maxRent) : undefined,
        sort: sort || undefined,
      });

      setProperties(result.properties);
      setTotal(result.total);
      setTotalPages(result.totalPages);
    } catch (err) {
      console.error("Failed to load properties:", err);
      setError("Unable to load properties. Please try again.");
      setProperties([]);
    } finally {
      setLoading(false);
    }
  }, [
    page,
    collegeId,
    pincode,
    search,
    gender,
    roomType,
    furnishing,
    rentPeriod,
    verifiedOnly,
    availableOnly,
    minRent,
    maxRent,
    sort,
  ]);

  useEffect(() => {
    loadProperties();
  }, [loadProperties]);

  function handleSearch(value: string) {
    setSearch(value);
    setPage(1);
  }

  function handleGender(value: string) {
    setGender(value);
    setPage(1);
  }

  function handleRoomType(value: string) {
    setRoomType(value);
    setPage(1);
  }

  function handleFurnishing(value: string) {
    setFurnishing(value);
    setPage(1);
  }

  function handleRentPeriod(value: string) {
    setRentPeriod(value);
    setPage(1);
  }

  function handleVerifiedOnly(value: boolean | ((prev: boolean) => boolean)) {
    setVerifiedOnly(value);
    setPage(1);
  }

  function handleAvailableOnly(value: boolean | ((prev: boolean) => boolean)) {
    setAvailableOnly(value);
    setPage(1);
  }

  function handleMinRent(value: string) {
    setMinRent(value);
    setPage(1);
  }

  function handleMaxRent(value: string) {
    setMaxRent(value);
    setPage(1);
  }

  function handleSort(value: string) {
    setSort(value);
    setPage(1);
  }

  function handlePageChange(newPage: number) {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  }

  function clearAllFilters() {
    setSearch("");
    setVerifiedOnly(false);
    setAvailableOnly(false);
    setRentPeriod("");
    setGender("");
    setRoomType("");
    setFurnishing("");
    setMinRent("");
    setMaxRent("");
    setSort("");
    setCollegeId("");
    setPincode("");
    setPage(1);
  }

  const hasActiveFilters = Boolean(
    search ||
    verifiedOnly ||
    availableOnly ||
    rentPeriod ||
    gender ||
    roomType ||
    furnishing ||
    minRent ||
    maxRent ||
    sort ||
    collegeId ||
    pincode
  );

  return {
    properties,

    search,
    setSearch: handleSearch,

    verifiedOnly,
    setVerifiedOnly: handleVerifiedOnly,

    availableOnly,
    setAvailableOnly: handleAvailableOnly,

    rentPeriod,
    setRentPeriod: handleRentPeriod,

    gender,
    setGender: handleGender,

    roomType,
    setRoomType: handleRoomType,

    furnishing,
    setFurnishing: handleFurnishing,

    minRent,
    setMinRent: handleMinRent,

    maxRent,
    setMaxRent: handleMaxRent,

    sort,
    setSort: handleSort,

    page,
    total,
    totalPages,
    setPage: handlePageChange,

    clearAllFilters,
    hasActiveFilters,

    loading,
    error,

    reload: loadProperties,
  };
}