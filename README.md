<div align="center">
  <h1>🧠 CON-CIENCIA</h1>
  <p><i>A Modern Scientific Blog Platform</i></p>
  
  <!-- Badges -->
  <p>
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase" />
  </p>
</div>

---

## 📋 Table of Contents
- [📌 About The Project](#-about-the-project)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Getting Started](#-getting-started)
- [📂 Project Structure](#-project-structure)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [📬 Contact](#-contact)

---

## 📌 About The Project

**CON-CIENCIA** is a modern, full-stack web application designed to be a hub for scientific knowledge and community interaction.

It allows users to:
- 📰 Read and engage with scientific articles
- 📅 Stay updated on upcoming events
- 💬 Participate in meaningful discussions

This platform goes beyond a blog — it's an educational tool. Teachers can publish findings and create events, fostering a collaborative learning environment, while administrators maintain quality, security, and community standards.

---

## ✨ Features

### 🔐 User Authentication
- Secure registration and login.

### 🛡️ Role-Based Access Control
| Role | Permissions |
|-----|----------|
| `USER_ROLE` | Read articles and events. |
| `TEACHER_ROLE` | Create, edit, and delete own articles/events via Teacher Studio. |
| `ADMIN_ROLE` | Manage all articles, events, and users via Admin Studio. |

### 📝 Article & Event Management
- Full CRUD functionality tailored by role.

### ⚡ Interactive Frontend
- Built with React + Vite for a fast and responsive UI.

### 🎨 Styling
- Modern, clean design with TailwindCSS.

### 🌐 API Integration
- RESTful API communication with backend.

### 👤 Profile Management
- Update personal info and password.

---

## 🛠️ Tech Stack

### Frontend
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)

### Deployment
- Firebase Hosting

---

## 🚀 Getting Started

### Prerequisites
- Node.js and npm (or yarn/pnpm) installed.

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/Duo-developers/frontend_CON-CIENCIA.git

# 2. Go to project folder
cd frontend_CON-CIENCIA

# 3. Install dependencies
npm install
```

### Running the Application

```bash
npm run dev
```

Access at: http://localhost:5173 (or another port if 5173 is in use).

### Building for Production

```bash
npm run build
```

Creates an optimized `dist/` folder ready for deployment.

---

## 📂 Project Structure

```
src/
 ├── components/       # Reusable UI components
 ├── auth/             # Login, Register
 ├── admin/            # Admin Studio
 ├── teacher/          # Teacher Studio
 ├── pages/            # Main pages
 ├── shared/           # Shared logic & context
 ├── context/          # React Context
 ├── hooks/            # Custom hooks
 ├── services/         # API requests
 ├── routes.jsx        # Routing
 ├── App.jsx           # Main component
 └── main.jsx          # Entry point
public/                # Static assets
firebase.json          # Firebase config
vite.config.js         # Vite config
tailwind.config.js     # Tailwind config
```

---

## 🤝 Contributing

1. Fork the project
2. Create your feature branch:
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for details.

---

## 📬 Contact

**Emilio Lux** - [emiliolux@example.com](mailto:emiliolux@example.com)

**Project Link:** [https://github.com/Duo-developers/frontend_CON-CIENCIA](https://github.com/Duo-developers/frontend_CON-CIENCIA)
