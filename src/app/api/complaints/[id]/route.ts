import { NextResponse } from "next/server";
import Complaint from "@/mongo/models/complaintShcema";
import connectDB from "@/mongo/db";
import { Types } from "mongoose";

// Update route to modify or edit a complaint
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const { id } = params;
  if (!Types.ObjectId.isValid(id))                                         // Check if the ID is valid
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });


  const { status } = await req.json();                                     // this checks that the status in the field should 
  if (!["Pending", "In Progress", "Resolved"].includes(status))            // be one of the following ["Pending", "In Progress", "Resolved"]
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });

  const updated = await Complaint.findByIdAndUpdate(id, { status }, { new: true });
  return updated
    ? NextResponse.json(updated)
    : NextResponse.json({ error: "Not found" }, { status: 404 });
}


// Delete route to delete or remove a complaint
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;                                               // Check if the ID is valid
    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }
    await Complaint.findByIdAndDelete(id);                                      // finds the complaint with the id in the database and then deletes it
    return NextResponse.json({ message: "Complaint deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete complaint" }, { status: 500 });
  }
}
