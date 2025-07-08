# Time Flow API — Frontend

Frontend interface for the **Time Flow API** — a task management system.

---

## Tech Stack

- **React** + **Vite** – blazing-fast development
- **TanStack Table** – for building dynamic, flexible tables
- **Zustand** – for lightweight global state management
- **Tailwind CSS** – for rapid UI development
- **React Hook Form** – for accessible and powerful form handling
- **TanStack Query** – for efficient server-state management
- **JWT Auth** – secure token-based authentication (via localStorage)
- **Shadcn/UI** – beautifully styled headless UI components
- **Axios** – for API interaction with Bearer token support

---

## ✨ Features

- View tasks in a responsive, sortable task table
- Mark tasks as completed
- Create new tasks with validation
- React Query handles caching and auto-refetch
- Auth token stored in localStorage and auto-attached to requests
- Smart status management based on task deadlines

---

## Setup Instructions

### 1. **Clone the repo**

```bash
git clone https://github.com/your-username/time-flow-frontend.git
cd time-flow-frontend
```
### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables
Create a .env file at the root with the following
```bash
VITE_API_URL=http://localhost:8000
```

### 4. Run the app
```bash
npm run dev
```