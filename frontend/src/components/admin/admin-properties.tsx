"use client";

import { useEffect, useMemo, useState } from "react";
import { Home, CheckCircle2, XCircle, Search, ShieldCheck, ShieldAlert, Sparkles } from "lucide-react";
import adminService, { AdminPropertyResponse } from "@/services/admin.service";
import propertyService from "@/services/property.service";

export function AdminProperties() {
  const [properties, setProperties] = useState<AdminPropertyResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"ALL" | "VERIFIED" | "UNVERIFIED">("ALL");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    async function loadProperties() {
      try {
        setLoading(true);
        const data = await adminService.getAllProperties();
        setProperties(data.data || []);
      } catch (err: any) {
        setError(err.message || "Failed to load properties");
      } finally {
        setLoading(false);
      }
    }
    loadProperties();
  }, []);

  async function handleToggleVerification(property: AdminPropertyResponse) {
    try {
      setUpdatingId(property.id);
      const newStatus = !(property as any).verified;
      await propertyService.updateProperty(property.id, {
        verified: newStatus,
      } as any);

      setProperties((current) =>
        current.map((p) =>
          p.id === property.id ? { ...p, verified: newStatus } as any : p
        )
      );
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to update verification status.");
    } finally {
      setUpdatingId(null);
    }
  }

  const filteredProperties = useMemo(() => {
    return properties.filter((p: any) => {
      const matchesSearch =
        search.trim() === "" ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.city.toLowerCase().includes(search.toLowerCase()) ||
        (p.owner?.name && p.owner.name.toLowerCase().includes(search.toLowerCase())) ||
        (p.owner?.email && p.owner.email.toLowerCase().includes(search.toLowerCase()));

      const matchesFilter =
        filter === "ALL" ||
        (filter === "VERIFIED" && p.verified === true) ||
        (filter === "UNVERIFIED" && !p.verified);

      return matchesSearch && matchesFilter;
    });
  }, [properties, search, filter]);

  if (loading) {
    return (
      <div className="flex h-48 items-center justify-center rounded-3xl border border-slate-200 bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center text-sm font-semibold text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search & Filter Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search properties by title, city, or owner..."
            className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-10 pr-4 text-xs sm:text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {(["ALL", "VERIFIED", "UNVERIFIED"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-xl px-3.5 py-2 text-xs font-bold transition ${
                filter === f
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {f === "ALL" ? `All Stays (${properties.length})` : f}
            </button>
          ))}
        </div>
      </div>

      {/* Table Container */}
      <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50/80 text-slate-900 border-b border-slate-200 text-xs uppercase tracking-wider font-bold">
              <tr>
                <th className="p-4">Property Stay</th>
                <th className="p-4">City</th>
                <th className="p-4">Owner / Host</th>
                <th className="p-4">Monthly Rent</th>
                <th className="p-4 text-center">Trust Status</th>
                <th className="p-4 text-right">Moderation Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProperties.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-xs text-slate-500">
                    No properties found matching your filter.
                  </td>
                </tr>
              ) : (
                filteredProperties.map((property: any) => (
                  <tr key={property.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-slate-900 flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <Home size={15} />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{property.title}</p>
                        <p className="text-[11px] font-normal text-slate-400">{property.address || property.city}</p>
                      </div>
                    </td>
                    <td className="p-4 text-xs sm:text-sm">{property.city}</td>
                    <td className="p-4">
                      <span className="block text-xs font-bold text-slate-900">{property.owner?.name || "Host"}</span>
                      <span className="block text-[11px] text-slate-400">{property.owner?.email}</span>
                    </td>
                    <td className="p-4 font-bold text-slate-900 text-xs sm:text-sm">
                      ₹{property.rent?.toLocaleString("en-IN")}
                    </td>
                    <td className="p-4 text-center">
                      {property.verified ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-blue-700">
                          <ShieldCheck size={13} className="text-blue-600" /> Verified Stay
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600">
                          <ShieldAlert size={13} className="text-slate-400" /> Unverified
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleToggleVerification(property)}
                        disabled={updatingId === property.id}
                        className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition disabled:opacity-50 ${
                          property.verified
                            ? "border border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100"
                            : "border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
                        }`}
                      >
                        {updatingId === property.id
                          ? "Updating..."
                          : property.verified
                          ? "Revoke Verification"
                          : "Mark Verified"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
