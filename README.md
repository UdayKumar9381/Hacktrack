# 🚀 HackTrack - Hackathon Management Platform

**Deployed Site:** [https://hacktrack-ten.vercel.app/](https://hacktrack-ten.vercel.app/)

HackTrack is a full-stack web platform designed to **organize**, **host**, **register**, **participate**, **score**, and **certify** participants in hackathons. It serves as a one-stop solution for **students**, **colleges**, and **organizers** to seamlessly manage hackathon events.

---

## 📌 Table of Contents

- [🔰 Introduction](#-introduction)
- [✨ Features](#-features)
- [🧩 Tech Stack](#-tech-stack)
- [📁 Project Structure](#-project-structure)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [👨‍💻 Team Members](#-team-members)
- [🖼️ Functionality Overview](#-functionality-overview)
- [🚀 How to Run Locally](#-how-to-run-locally)
- [📄 License](#-license)

---

## 🔰 Introduction

HackTrack simplifies the entire hackathon lifecycle — from announcement and registration to submission, judging, and certification. It includes role-based dashboards for **students** and **colleges**, allowing organized management of hackathon data, certificates, and scores.

---

## ✨ Features

- 👨‍🎓 **Student Dashboard**: Registration, participation, scoreboards, certificate view, and submission.
- 🏫 **College Dashboard**: Organizer management, certificate generation, score submissions, and view student submissions.
- 📊 **Milestone Counter**: Displays total organizers, students, submissions, and participation.
- 📋 **Hackathon Categorization**: Present, Future, and Past hackathons.
- 💬 **FAQs & Help Pages** for smooth navigation.
- 🖥️ **Fully Responsive UI** built with React & Tailwind CSS.
- 🔒 **Authentication System** for secure access (students, colleges, organizers).

---

## 🧩 Tech Stack

| Frontend     | Backend          | Database | Others              |
|--------------|------------------|----------|---------------------|
| React.js     | Node.js + Express| MongoDB  | Tailwind CSS, Vercel (Deploy) |

---

## 📁 Project Structure

### 📦 Frontend

- Built with **React**, organized by sections and component types (student, college, organizer, hackathons).
- Pages include:
  - Homepage, Hackathon Browser, Contact, Login/Signup
  - Student & College Dashboards
  - Certificate Generator
  - Submission Viewer

### 🛠 Backend

- Built with **Node.js, Express, MongoDB**
- Organized into:
  - Routes (APIs for each module)
  - Models (Mongoose Schemas)
  - Middleware (auth, error handler)
  - Utilities (email service, cron jobs)
  - Certificate Generator
- Authentication for all user types

---

## 👨‍💻 Team Members

### Team - 9 K-HUB

| Senior Developers        | Junior Developers             |
|--------------------------|-------------------------------|
| Mounika                  | TEAM LEAD                     |
| Madhuri Thotakura        | Narapureddi Uday Kumar        |
| Gorinta Abhishek         | Somarouthu Naga Balaji        |
| S. Sangeetha             | Rankireddy Charishma          |
| Padala Ganga Lakshmi     | Singuluri Gayatri             |

---

## 🖼️ Functionality Overview

### 🏠 Homepage
- Interactive header, hackathon listings, 3D video welcome section
- Milestone counters, FAQ, footer with help links

### 🧑‍🎓 Student Dashboard
- Sidebar for certificate view, participation, submissions, scores
- Hackathon registration with email confirmation

### 🏫 College Dashboard
- Organizer management, certificate upload and making
- Score submission and viewing student submissions
- Messages from homepage contact form

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js, MongoDB, Git

### Steps

```bash
# Clone repository
git clone https://github.com/your-username/hacktrack.git
cd hacktrack

# Backend Setup
cd backend
npm install
# Add your MongoDB URI to `.env`
npm start

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

🙏 Acknowledgments
This project is developed as part of an 8-month remote internship provided by IIITH RCTS (International Institute of Information Technology, Hyderabad – Research & Consultancy Services).

We sincerely thank IIITH RCTS for the opportunity to gain industry exposure and work on a real-world project.

Special thanks to our mentors and team leads who guided us throughout the development process.

🌐 Deployment
Frontend deployed on Vercel
🔗 https://hacktrack-ten.vercel.app/

Let me know if you want to add badges like `Made with ❤️ by Team-9`, or shield.io badges (Tech Stack, License, Vercel Deploy, etc.) for a more professional GitHub appearance. 

![udaykumar_iiith_rcts_research_internship](https://github.com/user-attachments/assets/12c10581-0cc1-4170-9d18-d2e4401b3cdc)
