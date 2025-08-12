# 🛠 Complaint Management System

A simple but powerful **full-stack web app** where users can submit complaints and admins can manage them.  
Built with **Next.js (TypeScript)**, **MongoDB**, and **Nodemailer**, it’s designed to be fast, responsive, and easy to use.

---

## ✨ What This App Does

### 👤 For Users:
- Fill out a complaint form with:
  - Title
  - Description
  - Category (Product / Service / Support)
  - Priority (Low / Medium / High)
- Once submitted, the complaint goes straight into the database.
- The admin instantly gets an email notification about the new complaint.

### 🛡 For Admins:
- View all complaints in a clean table view.
- Filter by **status** or **priority**.
- Change the status to:
  - Pending
  - In Progress
  - Resolved
- Deleting a complaint is just one click away.
- When the status changes, the admin receives an **email confirmation**.

---

## 🧰 Tech Stack
- **Frontend**: Next.js 15 (App Router) + TypeScript + Tailwind CSS + shadcn/ui
- **Backend**: Next.js API Routes
- **Database**: MongoDB (Mongoose)
- **Email**: Nodemailer (SMTP with Gmail App Password)

---

## 📂 Project Structure

src/
├── app/
│ ├── submit/ # User complaint form
│ ├── admin/ # Admin dashboard
│ └── api/
│ └── complaints/
│ ├── route.ts # POST & GET endpoints
│ └── [id]/route.ts # PATCH & DELETE endpoints
├── lib/
│ ├── db.ts # MongoDB connection helper
│ └── email.ts # Nodemailer helper
└── mongo/
├── db.ts
└── models/
└── complaintShcema.ts # Complaint model


---

## ⚙️ How to Run the Project

### 1️⃣ Clone the repository
```bash
git clone https://github.com/yourusername/complaint-management.git
cd complaint-management
```

---
## 📧 Setting up Gmail App Password (Important!)

Gmail doesn’t allow you to log in with your normal password in apps like Nodemailer.
You need to create a Google App Password instead.

Enable 2-Step Verification on your Google account:

Go to Google Security Settings(https://myaccount.google.com/security)

Turn on 2-Step Verification.

Generate an App Password:(https://myaccount.google.com/apppasswords)

Go to Google App Passwords

Choose Mail as the app.

Choose Other and type "Nodemailer".

Click Generate and copy the 16-character password.

##📌 ENV Structure

MONGO_DB_API=mongo api here i used (https://www.mongodb.com/products/platform/atlas-database)

EMAIL_USER=email address from which you want to send email
EMAIL_PASS= app pass (told above how to create )
ADMIN_EMAIL= admin email address (to send when the task is finshed)


##📌 API Overview

| Method | Endpoint              | Description                     |
| ------ | --------------------- | ------------------------------- |
| POST   | `/api/complaints`     | Submit a new complaint          |
| GET    | `/api/complaints`     | Fetch all complaints (Admin)    |
| PATCH  | `/api/complaints/:id` | Update complaint status (Admin) |
| DELETE | `/api/complaints/:id` | Delete a complaint (Admin)      |

##📷 Screenshots
