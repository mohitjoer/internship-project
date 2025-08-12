import { NextResponse } from "next/server";
import Complaint from "@/mongo/models/complaintShcema";
import connectDB from "@/mongo/db";
import { Types } from "mongoose";
import { sendEmail } from "@/lib/email";

// Update route to modify or edit a complaint
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {


  await connectDB();


  const { id } = await params;
  if (!Types.ObjectId.isValid(id))                                         // Check if the ID is valid
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });


  const { status } = await req.json();                                     // this checks that the status in the field should 
  if (!["Pending", "In Progress", "Resolved"].includes(status))            // be one of the following ["Pending", "In Progress", "Resolved"]
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });



  const updated = await Complaint.findByIdAndUpdate(id, { status }, { new: true });
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // this is to Send a email to admin on status to resolve i used the sendEmail function

  if (status === "Resolved") {                                             // if the status is resolved then it sends the email
    await sendEmail(
      process.env.ADMIN_EMAIL!,                                             // in this the admin email is used 
      `Complaint Status Updated: ${updated.title}`,                         // as the environment variable to send mail to the admin
      `
        <h2>${updated.title}</h2>
        <p><strong>New Status:</strong> ${updated.status}</p>
        <p><strong>Updated On:</strong> ${new Date().toLocaleString()}</p>
      `
    );
  }

  return NextResponse.json(updated);
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

  } catch {
    return NextResponse.json({ error: "Failed to delete complaint" }, { status: 500 });
  }
}