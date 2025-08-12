"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton"
import BackButton from "@/components/backbutton";

interface Complaint {
  _id: string;
  title: string;
  category: string;
  priority: string;
  dateSubmitted: string;
  status: string;
}

export default function AdminDashboard() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchComplaints = async () => {   {/* this function fetchs all the complaints from the database */}
    setLoading(true);
    const url = "/api/complaints";
    const res = await fetch(url);
    const data = await res.json();
    setComplaints(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const updateStatus = async (id: string, status: string) => {  {/* this is the update the route for update of status */}
    await fetch(`/api/complaints/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchComplaints();
  };

  const deleteComplaint = async (id: string) => {     {/* this is the delete function  */}
    await fetch(`/api/complaints/${id}`, { method: "DELETE" });
    fetchComplaints();
  };

  const filteredComplaints = complaints.filter((c: Complaint) => {
    return (
      (!filterStatus || c.status === filterStatus) &&
      (!filterPriority || c.priority === filterPriority)
    );
  });

  const getPriorityColor = (priority: string) => {   {/* used switch for color of priority */}
    switch (priority) {
      case "High": return "text-red-600 bg-red-50";
      case "Medium": return "text-yellow-600 bg-yellow-50";
      case "Low": return "text-green-600 bg-green-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusColor = (status: string) => {     {/* same way used switch for status */}
    switch (status) {
      case "Pending": return "text-orange-600 bg-orange-50";
      case "In Progress": return "text-blue-600 bg-blue-50";
      case "Resolved": return "text-green-600 bg-green-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <div className="flex justify-start mb-4">  {/* back button*/}
            <BackButton />
          </div>
          <div className="text-center">   {/* page title */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Admin Complaint Management
            </h1>
          </div>
        </div>
        
        {/* filter part  */}
        <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="flex flex-col">  {/* filter based on status */}
                <label className="text-sm font-medium text-gray-700 mb-1">Status</label>
                <select 
                  value={filterStatus} 
                  onChange={(e) => setFilterStatus(e.target.value)} 
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>
              <div className="flex flex-col"> {/* filter based on priority */}
                <label className="text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select 
                  value={filterPriority} 
                  onChange={(e) => setFilterPriority(e.target.value)} 
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="">All Priority</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>
            <div className="text-sm text-gray-500 mt-2 sm:mt-0">     {/* list count shows number of complaintsc */}
              {loading ? (
                <Skeleton className="h-[20px] w-[100px] rounded-full" />
              ) : (
                `Showing ${filteredComplaints.length} of ${complaints.length} complaints`
              )}
            </div>
          </div>
        </div>

        {/* this table component is used from shadcn ui libery */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              {/* header of the table */}
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold text-gray-900">Title</TableHead>
                  <TableHead className="font-semibold text-gray-900">Category</TableHead>
                  <TableHead className="font-semibold text-gray-900">Priority</TableHead>
                  <TableHead className="font-semibold text-gray-900 hidden sm:table-cell">Date Submitted</TableHead>
                  <TableHead className="font-semibold text-gray-900">Status</TableHead>
                  <TableHead className="font-semibold text-gray-900">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, index) => (                      // Skeleton while loading data if not the line for no data found 
                    <TableRow key={index}>
                      <TableCell>
                        <Skeleton className="h-[20px] w-[100px] rounded-full" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-[20px] w-[100px] rounded-full" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-[20px] w-[100px] rounded-full" />
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Skeleton className="h-[20px] w-[100px] rounded-full" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-[20px] w-[100px] rounded-full" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-[20px] w-[100px] rounded-full" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : filteredComplaints.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">   {/* if no data found */}
                      No complaints found matching your filters                         
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredComplaints.map((c: Complaint) => (
                    <TableRow key={c._id} className="hover:bg-gray-50 transition-colors">
                      <TableCell className="font-medium text-gray-900 max-w-xs truncate">
                        {c.title}      {/* title */}
                      </TableCell>
                      <TableCell className="text-gray-700">
                        <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium">
                          {c.category}     {/* category */}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(c.priority)}`}>
                          {c.priority}       {/* priority */}
                        </span>
                      </TableCell>
                      <TableCell className="text-gray-600 text-sm hidden sm:table-cell">
                        {new Date(c.dateSubmitted).toLocaleDateString()}     {/* data */}
                      </TableCell>
                      <TableCell>     {/* status which can be easyly updated */}
                        <select
                          value={c.status}
                          onChange={(e) => updateStatus(c._id, e.target.value)}
                          className={`border border-gray-300 rounded-md px-2 py-1 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 ${getStatusColor(c.status)}`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Resolved">Resolved</option>
                        </select>
                      </TableCell>
                      <TableCell>   {/* delete button workes based on id*/}
                        <button 
                          onClick={() => deleteComplaint(c._id)} 
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        >
                          Delete
                        </button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}