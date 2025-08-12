"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPriority, setFilterPriority] = useState("");

  const fetchComplaints = async () => {
    let url = "/api/complaints";
    const res = await fetch(url);
    const data = await res.json();
    setComplaints(data);
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/complaints/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchComplaints();
  };

  const deleteComplaint = async (id: string) => {
    if (confirm("Are you sure?")) {
      await fetch(`/api/complaints/${id}`, { method: "DELETE" });
      fetchComplaints();
    }
  };

  const filteredComplaints = complaints.filter((c: any) => {
    return (
      (!filterStatus || c.status === filterStatus) &&
      (!filterPriority || c.priority === filterPriority)
    );
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Complaint Management</h1>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="border p-2 rounded">
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>
        <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)} className="border p-2 rounded">
          <option value="">All Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      {/* Table */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Priority</th>
            <th className="p-2 border">Date Submitted</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredComplaints.map((c: any) => (
            <tr key={c._id}>
              <td className="p-2 border">{c.title}</td>
              <td className="p-2 border">{c.category}</td>
              <td className="p-2 border">{c.priority}</td>
              <td className="p-2 border">{new Date(c.dateSubmitted).toLocaleDateString()}</td>
              <td className="p-2 border">
                <select
                  value={c.status}
                  onChange={(e) => updateStatus(c._id, e.target.value)}
                  className="border p-1 rounded"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </td>
              <td className="p-2 border">
                <button onClick={() => deleteComplaint(c._id)} className="bg-red-600 text-white px-3 py-1 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

