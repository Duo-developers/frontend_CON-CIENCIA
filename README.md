🧠 CON-CIENCIA – A Scientific Blog Platform
📌 About The Project
CON-CIENCIA is a modern, full-stack web application designed to be a hub for scientific knowledge and community interaction.
It allows users to:

Read and engage with scientific articles 📰

Stay updated on upcoming events 📅

Participate in meaningful discussions 💬

This platform goes beyond a blog — it’s an educational tool.
Teachers can publish findings and create events, fostering a collaborative learning environment, while administrators maintain quality, security, and community standards.

✨ Features
🔐 User Authentication – Secure registration and login.

🛡️ Role-Based Access Control:

USER_ROLE → Read articles and events.

TEACHER_ROLE → Create, edit, and delete own articles/events via Teacher Studio.

ADMIN_ROLE → Manage all articles, events, and users via Admin Studio.

📝 Article & Event Management – Full CRUD tailored by role.

⚡ Interactive Frontend – Built with React + Vite for a fast and responsive UI.

🎨 Styling – Modern, clean design with TailwindCSS.

🌐 API Integration – RESTful API communication with backend.

👤 Profile Management – Update personal info and password.

🛠 Tech Stack
Frontend

React → https://reactjs.org/

Vite → https://vitejs.dev/

React Router → https://reactrouter.com/

TailwindCSS → https://tailwindcss.com/

Axios → https://axios-http.com/

Deployment

Firebase Hosting

🚀 Getting Started
Prerequisites
You need Node.js and npm (or yarn/pnpm) installed.

Installation
bash
Copy
Edit
# 1. Clone the repo
git clone https://github.com/Duo-developers/frontend_CON-CIENCIA.git

# 2. Go to project folder
cd frontend_CON-CIENCIA

# 3. Install dependencies
npm install
Running the Application
bash
Copy
Edit
npm run dev
Access at: http://localhost:5173 (or another port if 5173 is in use).

Building for Production
bash
Copy
Edit
npm run build
Creates an optimized dist/ folder ready for deployment.

📂 Project Structure
csharp
Copy
Edit
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
🤝 Contributing
Fork the project

Create your feature branch:

bash
Copy
Edit
git checkout -b feature/AmazingFeature
Commit your changes:

bash
Copy
Edit
git commit -m 'Add some AmazingFeature'
Push to the branch:

bash
Copy
Edit
git push origin feature/AmazingFeature
Open a Pull Request

📄 License
Distributed under the MIT License. See LICENSE for details.

📬 Contact
Emilio Lux – emiliolux@example.com
Project Link: https://github.com/Duo-developers/frontend_CON-CIENCIA

