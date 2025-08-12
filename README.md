# 🛠 Complaint Management System

A simple but powerful **full-stack web app** where users can submit complaints and admins can manage them.  
Built with **Next.js (TypeScript)**, **MongoDB**,**shadcn/ui**, and **Nodemailer**, it's designed to be fast, responsive, and easy to use.

---

## ✨ What This App Does

### 👤 For Users:
- Fill out a complaint form with:
  - Title
  - Description
  - Category (Product / Service / Support)
  - Priority (Low / Medium / High)
- Once submitted, the complaint goes straight into the database
- The admin instantly gets an email notification about the new complaint

### 🛡 For Admins:
- View all complaints in a clean table view
- Filter by **status** or **priority**
- Change the status to:
  - Pending
  - In Progress
  - Resolved
- Delete complaints with one click
- Receive **email confirmations** when status changes to Resolved

---

## 🧰 Tech Stack

- **Frontend**: Next.js 15 (App Router) + TypeScript + Tailwind CSS + shadcn/ui
- **Backend**: Next.js API Routes
- **Database**: MongoDB (Mongoose)
- **Email**: Nodemailer (SMTP with Gmail App Password)

---

## 📂 Project Structure

```
src/
├── app/
│   ├── submit/              # User complaint form
│   ├── admin/               # Admin dashboard
│   └── api/
│       └── complaints/
│           ├── route.ts     # POST & GET endpoints
│           └── [id]/route.ts # PATCH & DELETE endpoints
├── lib/
│   ├── db.ts               # MongoDB connection helper
│   └── email.ts            # Nodemailer helper
└── mongo/
    ├── db.ts
    └── models/
        └── complaintSchema.ts # Complaint model
```

---

## ⚙️ How to Run the Project

### 1️⃣ Clone the repository
```bash
git clone https://github.com/yourusername/complaint-management.git
cd complaint-management
```
<<<<<<< HEAD

### 2️⃣ Install dependencies
```bash
bun install
```

### 3️⃣ Set up environment variables
Create a `.env.local` file in the root directory and add your environment variables (see ENV Structure below).

### 4️⃣ Run the development server
```bash
bun run dev
```

### 5️⃣ Open your browser
Navigate to `http://localhost:3000` to see the application.
=======
>>>>>>> 4191ebc2a6740c836c67ccaf1a4c766ed98dacda

---

## 📧 Setting up Gmail App Password (Important!)

Gmail doesn't allow you to log in with your normal password in apps like Nodemailer. You need to create a Google App Password instead.

### Enable 2-Step Verification:
1. Go to [Google Security Settings](https://myaccount.google.com/security)
2. Turn on 2-Step Verification

### Generate an App Password:
1. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
2. Choose **Mail** as the app
3. Choose **Other** and type "Nodemailer"
4. Click **Generate** and copy the 16-character password

---

## 📌 Environment Variables

Create a `.env.local` file with the following structure:

```bash
MONGO_DB_API=your_mongodb_connection_string_here
EMAIL_USER=your_email_address_here
EMAIL_PASS=your_gmail_app_password_here
ADMIN_EMAIL=admin_email_address_here
```

**Notes:**
- `MONGO_DB_API`: MongoDB connection string (you can use [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database))
- `EMAIL_USER`: Email address from which you want to send emails
- `EMAIL_PASS`: Gmail App Password (see setup instructions above)
- `ADMIN_EMAIL`: Admin email address to receive notifications

---

## 📌 API Overview

| Method | Endpoint              | Description                     |
|--------|-----------------------|---------------------------------|
| POST   | `/api/complaints`     | Submit a new complaint          |
| GET    | `/api/complaints`     | Fetch all complaints (Admin)    |
| PATCH  | `/api/complaints/:id` | Update complaint status (Admin) |
| DELETE | `/api/complaints/:id` | Delete a complaint (Admin)      |

<<<<<<< HEAD
---

## 🚀 Features

- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Real-time Notifications**: Instant email alerts for admins
- **Status Management**: Easy complaint tracking and updates
- **Filter System**: Quick complaint filtering by status and priority
- **Type Safety**: Full TypeScript support for better development experience

---

## 📷 Screenshots

*Add your application screenshots here*

---
=======
##📷 Screenshots
>>>>>>> 4191ebc2a6740c836c67ccaf1a4c766ed98dacda
