# JobSync Job Application Tracker

**JobSync** is a fully responsive web application that helps users efficiently track, manage, and organize their job applications. It provides a centralized dashboard for monitoring application progress, searching and filtering records, and importing or exporting application data in multiple formats.

---

## 📌 Overview

JobSync offers a structured workflow for managing job applications through four main pages:

- **Home Page**  
  Provides a comprehensive overview of all job applications, including key statistics and insights. Users can search applications by job title, company name, or location. The page supports both grid and row views and allows filtering by application status and placement type. Each job application can be browsed to view all related details.

- **Job Application Details Page**  
  Displays complete information for a selected job application, including role details, company information, application status, placement type, and notes.

- **New Job Application Page**  
  Allows users to add new job applications with all relevant details.

- **Update Job Application Page**  
  Enables editing and updating existing job application records.

All application data is stored locally using the browser’s **Local Storage**, ensuring persistence without requiring a backend service.

---

## 🚀 Features

- Fully responsive job application tracking system
- Centralized dashboard with application statistics and overview
- Search by job title, company name, and location
- Grid and row views for flexible data presentation
- Filtering by application status and placement type
- Add, edit, and delete job applications
- Import job applications from JSON files
- Export data in **JSON** and **CSV** formats
- Persistent storage using Local Storage
- Modular and reusable UI components
- Client-side routing for seamless navigation

---

## 🛠️ Tech Stack

- **React.js**
- **TypeScript**
- **Tailwind CSS**
- **React Router DOM**
- **Context API** (state management)
- **React Icons**
- **NanoID** (unique ID generation)

---

## 📂 Project Structure

```bash
src/
├── assets/
├── classes/
|   └── Jobs.class.tsx
├── components/        # Reusable UI components (Cards, Forms, Tables, etc.)
├── constants/
├── context/     # Context API for global state management
├── interfaces/
├── libs/
├── pages/
├── App.tsx       # Root application component
├── index.css
└── main.tsx      # Application entry point
```

## ⚙️ Installation & Setup

1. Clone the repository

```bash
git clone https://github.com/Mahmoud46/JobSync-Job-Application-Tracker.git
```

2. Navigate to the project directory

```bash
cd JobSync-Job-Application-Tracker
```

3. Install dependencies

```bash
npm install
```

4. Run the development server

```bash
npm run dev
```
