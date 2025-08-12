# CON-CIENCIA - A Scientific Blog Platform

## About The Project

CON-CIENCIA is a modern, full-stack web application designed to be a hub for scientific knowledge and community interaction. It provides a platform for users to read and engage with scientific articles, stay informed about upcoming events, and participate in discussions. The project is built with a focus on a clean user experience, role-based functionalities, and a modular architecture.

This platform is not just a blog; it's an educational tool. Teachers can publish their own findings and create events, fostering a learning environment. Administrators oversee the platform's content and user base, ensuring a high standard of quality and a safe community for all.

## Features

* **User Authentication**: Secure user registration and login system.
* **Role-Based Access Control**:
    * **USER_ROLE**: Can read articles and events.
    * **TEACHER_ROLE**: Can create, edit, and delete their own articles and events through a dedicated "Teacher Studio".
    * **ADMIN_ROLE**: Has access to an "Admin Studio" to manage all articles, events, and users on the platform.
* **Article and Event Management**: Full CRUD (Create, Read, Update, Delete) functionality for articles and events, tailored to user roles.
* **Interactive Frontend**: Built with React and Vite for a fast and responsive user interface.
* **Styling**: Modern and clean design implemented with TailwindCSS.
* **API Integration**: Communicates with a backend service through a RESTful API for all data operations.
* **User Profile Management**: Users can update their profile information and password.

## Tech Stack

* **Frontend**:
    * [React](https://reactjs.org/)
    * [Vite](https://vitejs.dev/)
    * [React Router](https://reactrouter.com/)
    * [TailwindCSS](https://tailwindcss.com/)
    * [Axios](https://axios-http.com/) for API requests
* **Deployment**: The project is configured for deployment on Firebase Hosting.

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

You need to have Node.js and npm (or yarn/pnpm) installed on your machine.

### Installation

1.  Clone the repo
    ```sh
    git clone [https://github.com/Duo-developers/frontend_CON-CIENCIA.git](https://github.com/Duo-developers/frontend_CON-CIENCIA.git)
    ```
2.  Navigate to the project directory
    ```sh
    cd frontend_CON-CIENCIA
    ```
3.  Install NPM packages
    ```sh
    npm install
    ```

### Running the Application

To run the application in development mode:

```sh
npm run dev
This will start the development server, and you can view the application at http://localhost:5173 (or another port if 5173 is in use).

Building for Production
To create a production build of the application:

Bash

npm run build
This will create a dist folder with the optimized and minified files ready for deployment.

Project Structure
The project follows a standard React application structure:

src/: Contains all the source code for the application.

components/: Reusable UI components.

auth/: Components related to authentication (Login, Register).

admin/: Components for the Admin Studio.

teacher/: Components for the Teacher Studio.

...and other shared components.

pages/: Represents the different pages of the application.

shared/: Shared logic, context, and custom hooks.

context/: React Context for state management (e.g., AuthContext).

hooks/: Custom hooks for managing state and side effects.

services/: API service for making HTTP requests to the backend.

routes.jsx: Defines the application's routing.

App.jsx: The main application component.

main.jsx: The entry point of the application.

public/: Static assets.

firebase.json: Configuration for Firebase hosting.

vite.config.js: Configuration for Vite.

tailwind.config.js: Configuration for TailwindCSS.

Contributing
Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request

License
Distributed under the MIT License. See LICENSE for more information.

Contact
Emilio Lux - emiliolux@example.com

Project Link: https://github.com/Duo-developers/frontend_CON-CIENCIA







