# DevConsult

DevConsult is a modern, high-performance consultancy web application designed to showcase professional services with a premium user experience. It features a responsive design, interactive UI components, and a robust mock authentication system.

## 🚀 Setup & Installation

Follow these steps to get the project running on your local machine:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/rifatara04/dev-consult.git
    cd dev-consult
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Run the development server:**

    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📍 Route Summary

| Route            | Description                                                                                            |
| :--------------- | :----------------------------------------------------------------------------------------------------- |
| `/`              | **Homepage**: Landing page with Hero, Services preview, Client logos, Process steps, and Testimonials. |
| `/about`         | **About Us**: Company mission, core values, history timeline, and team members.                        |
| `/services`      | **Services**: Public catalog of services (Web Dev, Mobile App, Cloud, etc.) with price and details.    |
| `/services/[id]` | **Service Details**: Dynamic page showing detailed information for a specific service.                 |
| `/contact`       | **Contact**: Inquiry form with validation and contact information.                                     |
| `/login`         | **Login**: Custom authentication page (Mock credentials: `user@example.com` / `password`).             |

## ✨ Implemented Features

### 1. Modern User Interface

- **Responsive Design**: Fully optimized for Desktop, Tablet, and Mobile devices.
- **Modular Architecture**: Built with reusable React Server Components for performance and maintainability.
- **Styling**: Utilizes **Tailwind CSS** for rapid, utility-first styling with a consistent color palette (Slate & Blue).
- **Icons**: Integrated **Lucide React** for consistent and beautiful iconography.
- **Animations**: Smoth transitions and interactive elements using `framer-motion` and CSS transitions.

### 2. Authentication System

- **Secure Mock Auth**: Implemented a custom API (`/api/auth/login`) that sets `HttpOnly` cookies for security and accessible status cookies for client-side state.
- **Client-Side Context**: A dedicated `AuthContext` provides global `isLoggedIn` state that updates **instantly** without page reloads.
- **Persistent Session**: Verified via cookies logic handling browser compatibility.
- **User Profile**:
  - **Header**: Shows User Avatar when logged in.
  - **Dropdown**: Clicking avatar reveals user details and "Sign Out" option.
  - **Mobile Integration**: Profile info and specific "Sign Out" button integrated directly into the responsive mobile menu.

### 3. Service Catalog

- **Dynamic Routing**: Individual service pages generated via Next.js dynamic routes (`[id]`).
- **Mock Data Layer**: Centralized mock data management simulating a database for Services and Team members.
- **Interactive Cards**: Hover effects, badges, and detailed pricing information.

### 4. Forms & Interaction

- **Validation**: Robust form validation using `react-hook-form` (Login, Contact, Newsletter).
- **Toast Notifications**: Integrated `react-hot-toast` for real-time success/error feedback (e.g., "Logged in successfully", "Message sent").

### 5. Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API

## Live URL

#### 🚀 Live Project URL: https://dev-consult.vercel.app/

## Project Dependencies

#### Dependencies List

```
 "dependencies": {
    "@radix-ui/react-slot": "^1.2.4",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "framer-motion": "^12.26.2",
    "lucide-react": "^0.562.0",
    "next": "16.1.3",
    "react": "19.2.3",
    "react-dom": "19.2.3",
    "react-hook-form": "^7.71.1",
    "react-hot-toast": "^2.6.0",
    "tailwind-merge": "^3.4.0"
  }
```

#### Dev Dependencies List

```"devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.1.3",
    "tailwindcss": "^4",
    "tw-animate-css": "^1.4.0",
    "typescript": "^5"
  }
```
