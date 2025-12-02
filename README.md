# CareerCursor 🚀

CareerCursor is a career guidance platform designed to help students and job-seekers discover career paths based on their **passions, qualifications, and interests**, and provide them with a clear, actionable roadmap to achieve those careers — with progress tracking and AI assistance.

---

## 🚩 Problem It Solves

Students from tier-3 cities and non-privileged backgrounds often:
- Don’t know what careers actually exist.
- Don’t know what to do with their interests.
- Lack mentors or direction.
- Follow random advice with no real plan.

CareerCursor connects **who you are today** to **where you want to go tomorrow** with practical, AI-generated career roadmaps.

---

## 🧠 Features

### ✅ Currently Implemented

- User authentication (JWT + cookies)
- Email verification using Brevo
- AI-based career roadmap generation
- Job suggestions based on passion or qualification
- PDF generation of career roadmaps
- Progress tracker system
- Profile management
- Cloud upload support (Cloudinary)
- Rate limiting middleware
- Secure API controller architecture

### ⚠️ Partially Built / Planned

- Government jobs listing UI
- Private jobs listing UI
- Career dashboards
- Advanced tracking analytics
- Admin controls

---

## 🧱 Tech Stack

### Backend

| Category         | Technology |
|------------------|------------|
| Runtime          | Node.js |
| Framework        | Express.js |
| Database         | MongoDB |
| ORM / ODM        | Mongoose |
| Auth             | JWT (with cookies) |
| Email            | Brevo |
| AI Integration   | OpenRouter |
| Storage / CDN    | Cloudinary |
| PDF Generator    | PDFKit |
| Rate Limiting    | express-rate-limit |

---

### Frontend

| Category | Technology |
|----------|------------|
| Framework | React.js |
| State Management | Zustand |
| Routing | React Router DOM |
| Styling | TailwindCSS |
| Bundler | Vite |

---

## 📁 Project Structure

root
├── backend
│ ├── controllers
│ ├── middleware
│ ├── models
│ ├── routes
│ ├── lib
│ └── brevo
│
├── frontend
│ ├── components
│ ├── pages
│ ├── store
│ ├── routes
│ └── public

yaml
Copy code

---

## 🔐 Environment Variables

Create a `.env` file in `/backend` with:

MONGO_URL=your_database_url
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
OPENROUTER_KEY=your_openrouter_key
BREVO_API=your_brevo_api_key

CLOUD_API_KEY=cloudinary_key
CLOUD_API_SECRET=cloudinary_secret
CLOUD_NAME=cloud_name

yaml
Copy code

---

## ⚙️ Installation & Run

### One-Command Setup (Root Folder)

npm run build
npm start

yaml
Copy code

This will:
- Install backend dependencies
- Install frontend dependencies
- Build frontend
- Start the backend server

---

### Development Mode (Manual)

#### Backend:
cd backend
npm install
npm start

shell
Copy code

#### Frontend:
cd frontend
npm install
npm run dev

yaml
Copy code

---

## 🌐 Ports

Backend: http://localhost:8080
Frontend: http://localhost:5173

yaml
Copy code

---

## 🚧 Deployment

Status: **Not deployed yet**

Deployment steps and URL will be added after hosting.

---

## 👥 Target Audience

- School students
- College students
- Early job-seekers
- People shifting careers
- Students without mentors

---

## 🧩 Contribution

This project welcomes contributors for:

- UI Implementation for Job pages
- API Improvements
- Testing
- Documentation
- Feature suggestions

If you’d like to help, open a pull request or raise an issue.

---

## 🛠️ Planned Future Improvements

- Job listing UI pages
- Admin panel
- Resume analyzer
- Interview prep AI
- Career comparison feature
- Achievement unlocking system
- Mobile-friendly redesign

---

## 📜 License

To be decided

---

## ✨ Author

Built by a student developer from a tier-3 city
for students who don’t have clarity, privilege, or guidance.