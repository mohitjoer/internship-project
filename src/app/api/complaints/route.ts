import { NextResponse } from "next/server";
import  Complaint  from "@/mongo/models/complaintShcema";
import  connectDB  from "@/mongo/db";
import { sendEmail } from "@/lib/email";



// This is post route to create a new complate in the database
export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const newComplaint = await Complaint.create(body);   
    
    // this is to send email to admin on a new complaint submission
    try {
      await sendEmail(
        process.env.ADMIN_EMAIL!,
        "New Complaint Submitted",
        `
          <h2>New Complaint Submitted</h2>
          <p><strong>Title:</strong> ${newComplaint.title}</p>
          <p><strong>Category:</strong> ${newComplaint.category}</p>
          <p><strong>Priority:</strong> ${newComplaint.priority}</p>
          <p><strong>Description:</strong> ${newComplaint.description}</p>
          <p><strong>Date Submitted:</strong> ${new Date(newComplaint.dateSubmitted).toLocaleString()}</p>
        `
      );
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
  }

    return NextResponse.json(newComplaint, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create complaint" }, { status: 500 });
  }
}


//this is get route to fetch all the complaints from the database
export async function GET() {
  try {
    await connectDB();
    const complaints = await Complaint.find().sort({ dateSubmitted: -1 }); // finds the complaint with the id in the database 
    return NextResponse.json(complaints);                                  // and then transfers it all to the frontend
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch complaints" }, { status: 500 });
  }
}