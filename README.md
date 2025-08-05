# 🏥 StudyLi — Learning Management System

**StudyLi** is a modern online learning management system (LMS) designed to enhance the digital education experience for students, teachers and administrators. The platform offers intuitive tools for course creation, student enrollment, assignment submissions and real-time communication. With role-based dashboards tailored for admins, students and instructors, StudyLi ensures a streamlined, user-friendly interface for every user. It also supports multimedia learning materials, integrates cloud storage for file uploads, and provides a scalable architecture for institutions of all sizes.

## ✨ Features

### 👨‍💼 Admin Dashboard

- Well Structured Admin Dashboard
- Student and Teacher List
- All Course History
- Blog and Announcement Management 

### 🧑 Student Features

- Student Dashboard
- Enrollment System
- Assignment Submission
- Counciling Request
- 24/7 AI Support _(*Upcoming*)_

### 👨‍💼 Teacher Feature

- Teacher Dashboard
- Course Management
- Approve or Reject Council Request
- Create Assignment, Meeting Link , Video tutorial Linking.


### 🔒 Other Highlights

- Role-Based Access
- Authentication with NextAuth

---

## 🚀 Tech Stack

- **Frontend**: React, Next.js, Tailwind CSS
- **Backend**: Next.js API Routes, MongoDB
- **Auth**: NextAuth.js
- **UI Components**: Radix UI, Shadcn/UI
- **Forms & Validation**: React Hook Form
- **Charts**: Recharts

---
### Dependencies:

- @radix-ui/react-accordion: ^1.2.11
- @radix-ui/react-avatar: ^1.1.10
- @radix-ui/react-dialog: ^1.1.14
- @radix-ui/react-dropdown-menu: ^2.1.15
- @radix-ui/react-label: ^2.1.7
- @radix-ui/react-select: ^2.2.5
- @radix-ui/react-slot: ^1.2.3
- @radix-ui/react-visually-hidden: ^1.2.3
- @tanstack/react-query: ^5.83.0
- bcryptjs: ^3.0.2",
- class-variance-authority: ^0.7.1
- cloudinary: ^2.7.0
- clsx: ^2.1.1
- formidable: ^3.5.4
- lottie-react: ^2.4.1
- lucide-react: ^0.525.0
- mongoose: ^8.16.3
- next: 15.3.5
- next-auth: ^4.24.11
- react: ^19.0.0
- react-countup: ^6.5.3
- react-dom: ^19.0.0
- react-hot-toast: ^2.5.2
- react-icons: ^5.5.0
- react-simple-typewriter: ^5.0.1
- recharts: ^3.1.0
- sweetalert2: ^11.22.2
- tailwind-merge: ^3.3.1

---

## 🛠️ Getting Started

```bash
# Clone the repository
git clone https://github.com/munna516/Studyli
cd studyli

# Install dependencies
npm install 

# Copy and configure environment variables
cp  .env.local

# Run on localhost 
npm run dev

```

---

## 🔐 Environment Variables

Create a `.env.local` file in the project root with the following variables:

```env
MONGODB_URI=your_mongodb_atlas_connection_string
NEXT_PUBLIC_NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_generated_secret_here
```

### 🔑 How to Set Them Up

1. **MongoDB**:

   - Create an account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a cluster and database
   - Go to _Connect > Drivers_, copy the URI, and replace `<password>` with your DB password.

2. **NextAuth**:

   - `NEXTAUTH_SECRET`: Generate with `openssl rand -hex 32`
   - `NEXT_PUBLIC_NEXTAUTH_URL`: Usually `http://localhost:3000` during development


### 🛡️ Security Best Practices

- Never commit `.env.local` to version control — add it to `.gitignore`.
- Use environment variable settings on your host (e.g., Vercel, Netlify) for production.
- Always use test credentials in development and rotate secrets regularly.

---

## 📬 Contact

For questions or suggestions, feel free to open an issue or contact us.


---
## Contributors

* Mehedi Hasan Munna - [mehedihasanmunna516@gmail.com](mailto:mehedihasanmunna516@gmail.com)
* Shawon Kumar Singha - [shawonkumarsingha.cse@gmail.com.](mailto:shawonkumarsingha.cse@gmail.com.)
* Ahmed Al Rakib - [rakib15-5652@diu.edu.com](mailto:rakib15-5652@diu.edu.com)
* Md Akmal Hossaion Razu - [razu15-5516@diu.edu.com](mailto:razu15-5516@diu.edu.com)
* Md Rubel Mian - [mian15-5379@diu.edu.bd](mailto:mian15-5379@diu.edu.bd)


---

## 🌐 Live Demo

🔗 [https://studyli.vercel.app/](https://studyli.vercel.app/)

## 📁 GitHub Repository

🔗 [https://github.com/munna516/Studyli](https://github.com/munna516/Studyli)

---
