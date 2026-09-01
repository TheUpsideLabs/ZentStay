"use client";

import { useEffect, useMemo, useState } from "react";
import { User, CheckCircle2, XCircle, Search, Sparkles } from "lucide-react";
import adminService, { UserResponse } from "@/services/admin.service";

export function AdminUsers() {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<"ALL" | "STUDENT" | "OWNER" | "ADMIN">("ALL");

  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true);
        const data = await adminService.getAllUsers();
        setUsers(data.data);
      } catch (err: any) {
        setError(err.message || "Failed to load users");
      } finally {
        setLoading(false);
      }
    }
    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        search.trim() === "" ||
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        (u.phone && u.phone.includes(search));

      const matchesRole = roleFilter === "ALL" || u.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [users, search, roleFilter]);

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
            placeholder="Search users by name, email, or phone..."
            className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-10 pr-4 text-xs sm:text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {(["ALL", "STUDENT", "OWNER", "ADMIN"] as const).map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => setRoleFilter(role)}
              className={`rounded-xl px-3.5 py-2 text-xs font-bold transition ${
                roleFilter === role
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {role === "ALL" ? `All Users (${users.length})` : role}
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
                <th className="p-4">User</th>
                <th className="p-4">Role</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
                <th className="p-4 text-center">Auth Status</th>
                <th className="p-4">Joined Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-xs text-slate-500">
                    No users found matching your search criteria.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-slate-900 flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                        <User size={15} />
                      </div>
                      {user.name}
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                        user.role === "ADMIN" ? "bg-purple-100 text-purple-700" :
                        user.role === "OWNER" ? "bg-orange-100 text-orange-700" :
                        "bg-blue-50 text-blue-700"
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4 text-xs sm:text-sm">{user.email}</td>
                    <td className="p-4 text-xs sm:text-sm text-slate-500">{user.phone || "N/A"}</td>
                    <td className="p-4 text-center">
                      {user.isVerified ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700">
                          <CheckCircle2 size={12} /> Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-600">
                          <XCircle size={12} /> Pending
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-xs text-slate-500">
                      {new Date(user.createdAt).toLocaleDateString("en-IN", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      })}
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
