"use client";

import React, { useState, useEffect } from "react";
import { Edit, Search, CheckCircle, XCircle } from "lucide-react";
import collegeService, { College } from "@/services/college.service";

export function AdminColleges() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingCollege, setEditingCollege] = useState<College | null>(null);

  const loadColleges = async () => {
    try {
      setLoading(true);
      const res = await collegeService.getAllColleges({ search, page, limit: 20 });
      setColleges(res.data);
      if (res.pagination) {
        setTotalPages(res.pagination.totalPages);
      }
    } catch (error) {
      console.error("Failed to load colleges", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      loadColleges();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [search, page]);

  const handleToggleStatus = async (college: College) => {
    try {
      await collegeService.updateCollege(college.id, { isActive: !college.isActive });
      setColleges((prev) => prev.map(c => c.id === college.id ? { ...c, isActive: !c.isActive } : c));
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="border-b border-slate-100 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-bold text-blue-700">
              AISHE Master Database
            </span>
            <span className="text-xs font-semibold text-slate-400">~37,580 Colleges</span>
          </div>
          <h3 className="mt-1 text-lg font-black text-slate-900">Institution & Coordinate Master</h3>
        </div>
        
        <div className="relative w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search by college name, city, or code..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="h-11 w-full sm:w-80 rounded-2xl border border-slate-200 bg-white pl-10 pr-4 text-xs sm:text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
          />
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
            <tr>
              <th className="p-4 font-semibold">Name</th>
              <th className="p-4 font-semibold">Location</th>
              <th className="p-4 font-semibold">Properties</th>
              <th className="p-4 font-semibold text-center">Status</th>
              <th className="p-4 font-semibold text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500">Loading colleges...</td>
              </tr>
            ) : colleges.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500">No colleges found.</td>
              </tr>
            ) : (
              colleges.map((college) => (
                <tr key={college.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                  <td className="p-4">
                    <p className="font-semibold text-slate-900">{college.name}</p>
                    <p className="text-xs text-slate-500">Code: {college.id.substring(0,8)}</p>
                  </td>
                  <td className="p-4">
                    {college.city}, {college.state}
                  </td>
                  <td className="p-4">
                    {college._count?.properties || 0}
                  </td>
                  <td className="p-4 text-center">
                    <button 
                      onClick={() => handleToggleStatus(college)}
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
                        college.isActive !== false ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {college.isActive !== false ? <CheckCircle size={12} /> : <XCircle size={12} />}
                      {college.isActive !== false ? "Active" : "Disabled"}
                    </button>
                  </td>
                  <td className="p-4 text-center">
                    <button 
                      onClick={() => setEditingCollege(college)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                    >
                      <Edit size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-slate-200 p-4">
          <p className="text-sm text-slate-500">Page {page} of {totalPages}</p>
          <div className="flex gap-2">
            <button 
              disabled={page === 1} 
              onClick={() => setPage(p => p - 1)}
              className="rounded-lg border border-slate-200 px-3 py-1 text-sm font-medium hover:bg-slate-50 disabled:opacity-50"
            >
              Previous
            </button>
            <button 
              disabled={page === totalPages} 
              onClick={() => setPage(p => p + 1)}
              className="rounded-lg border border-slate-200 px-3 py-1 text-sm font-medium hover:bg-slate-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Simple Edit Modal */}
      {editingCollege && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="mb-4 text-xl font-bold text-slate-900">Edit College</h3>
            
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Name</label>
                <input 
                  type="text" 
                  value={editingCollege.name} 
                  onChange={(e) => setEditingCollege({...editingCollege, name: e.target.value})}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-blue-500" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">City</label>
                  <input 
                    type="text" 
                    value={editingCollege.city} 
                    onChange={(e) => setEditingCollege({...editingCollege, city: e.target.value})}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-blue-500" 
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">State</label>
                  <input 
                    type="text" 
                    value={editingCollege.state} 
                    onChange={(e) => setEditingCollege({...editingCollege, state: e.target.value})}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-blue-500" 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Latitude</label>
                  <input 
                    type="number" 
                    value={editingCollege.latitude || ""} 
                    onChange={(e) => setEditingCollege({...editingCollege, latitude: parseFloat(e.target.value)})}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-blue-500" 
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Longitude</label>
                  <input 
                    type="number" 
                    value={editingCollege.longitude || ""} 
                    onChange={(e) => setEditingCollege({...editingCollege, longitude: parseFloat(e.target.value)})}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-blue-500" 
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={editingCollege.verified || false} 
                    onChange={(e) => setEditingCollege({...editingCollege, verified: e.target.checked})}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-slate-700">Verified Institution</span>
                </label>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button 
                onClick={() => setEditingCollege(null)}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button 
                onClick={async () => {
                  try {
                    await collegeService.updateCollege(editingCollege.id, {
                      name: editingCollege.name,
                      city: editingCollege.city,
                      state: editingCollege.state,
                      latitude: editingCollege.latitude,
                      longitude: editingCollege.longitude,
                      verified: editingCollege.verified
                    });
                    setEditingCollege(null);
                    loadColleges();
                  } catch (e) {
                    console.error(e);
                  }
                }}
                className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
