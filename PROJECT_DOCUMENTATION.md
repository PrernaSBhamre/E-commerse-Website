# Project Documentation: E-commerce Dashboard

This document provides a comprehensive overview of the technical architecture, technology stack, and detailed code logic for every page in the E-commerce Dashboard.

---

## 🚀 Technology Stack

### Frontend
- **React (v19)**: Core UI library using a component-based architecture.
- **Tailwind CSS**: Utility-first styling for a premium, responsive design.
- **React Router Dom (v7)**: Client-side routing for seamless page transitions.
- **Axios**: HTTP client for asynchronous API communication.
- **React Context API**: Global state management (specifically for the Shopping Cart).

### Backend
- **Node.js & Express (v5)**: High-performance backend runtime and framework.
- **MongoDB & Mongoose**: NoSQL database and ODM for flexible data modeling.
- **JWT & Bcrypt**: Secure token-based authentication and password hashing.
- **Joi**: Robust schema validation for API request bodies.

---

## 📂 Project Structure Overview

### Frontend
- **`src/App.jsx`**: Centralized routing hub.
- **`src/components/`**: Modularized UI components categorized by feature.
- **`src/components/CartContext.jsx`**: Global store for cart state and persistence.

### Backend
- **`backend/routes/`**: Route definitions mapped to Express endpoints.
- **`backend/controllers/`**: Isolated business logic for request processing.
- **`backend/schemas/`**: Mongoose schemas defining our data architecture.

---

## 🛠️ Page-wise Logic & Technical Details

### 1. Home Page (`Home.jsx`)
- **Role**: The main landing page that aggregates several high-impact components.
- **Logic**: 
    - Composes `Hero`, `FlashSales`, `CategoryList`, `BestSelling`, `ExploreProducts`, and `NewArrival`.
    - Coordinates visual layout using Tailwind's grid and flexbox to maintain a professional "Exclusive" dashboard feel.

### 2. All Products (`AllProducts.jsx`)
- **Logic**: 
    - **Data Ingestion**: Fetches the entire product catalog via `axios.get('/api/products')`.
    - **Filtering**: Implements real-time filtering using a `.filter()` function that checks both `searchTerm` and `selectedCategory`.
    - **Sorting**: Uses a `sortBy` state to reorder the array based on price, rating, sales count, or creation date.
    - **Pagination**: Slices the filtered array into chunks of 12 (using `indexOfFirstProduct` and `indexOfLastProduct`) for faster rendering.

### 3. Flash Sales (`FlashSales.jsx` / `AllFlashSales.jsx`)
- **Logic**: 
    - **Backend Filtering**: Queries MongoDB for products where `flashSale.isActive` is true and `endTime` is in the future.
    - **Frontend Countdown**: Uses a `setInterval` within a `useEffect` to update a `timeLeft` state every second, creating a live countdown experience.

### 4. Product Detail (`ProductDetail.jsx`)
- **Logic**: 
    - **Dynamic Routing**: Uses `useParams()` to grab the product ID and fetch specific data on mount.
    - **Interactive Gallery**: Manages a `selectedImage` state to switch between various product angles.
    - **Variant Selection**: Tracks `selectedColor` and `selectedSize` for precise order placement.
    - **Stateful Quantity**: Allows users to adjust the buying count before adding to cart or proceeding to checkout.

### 5. Shopping Cart (`Cart.jsx`)
- **Logic**: 
    - **Multi-column Layout**: Adopts a professional "Amazon/Myntra" style with a main item list and a sticky sidebar summary.
    - **Global Connection**: Leverages the `CartContext` to provide real-time updates to quantities and totals across the entire app.
    - **Local Persistence**: Automatically syncs state with `localStorage` to prevent data loss on page refresh.

### 6. Checkout (`Checkout.jsx`)
- **Logic**: 
    - **Pre-fill Data**: Grabs product info (if direct buy) or cart info (if multi-item buy).
    - **Form Validation**: Captures comprehensive billing details through a controlled React form.
    - **Order Finalization**: Sends a consolidated payload to `POST /api/orders`, including shipping address, product array, and payment method choice (COD or Bank).

### 7. New Arrivals (`NewArrival.jsx`)
- **Logic**: 
    - **Sorting**: Specifically targets the most lately created items using MongoDB's `createdAt` timestamp.
    - **Aesthetic Grid**: Uses a custom-engineered CSS grid to display a large featured product alongside smaller recent entries for visual hierarchy.

### 8. Authentication (`login.js` / `User.js`)
- **Logic**: 
    - **Security**: Passwords are never stored in plain text; `bcrypt` hashes them before saving.
    - **Session Persistence**: Upon successful login, a JWT is generated and stored in a secure server-side session (supported by `connect-mongo`).
    - **Middleware Protection**: Routes like `POST /api/orders` are protected by authentication middleware that verifies the user's token validity.

---

### 9. Data Bootstrapping (`initializeProductData.js`)
- **Logic**: Automatically populates the database with initial product and category data on server start to ensure a working environment out-of-the-box.

### 10. Session & Express Middleware (`backend/index.js`)
- **CORS Management**: Configured for multiple development ports (`3000`, `5173`, etc.) to support seamless frontend development.
- **Persistent Sessions**: Uses `connect-mongo` to store session data directly in MongoDB, ensuring that user login states persist even if the server restarts.
- **Global Error Handling**: Uses a centralized Express error handler middleware to catch asynchronous errors and provide consistent JSON error responses.

---

## 🎯 Architectural Decisions

- **Why Redux-less Cart?**: Used React Context + LocalStorage for the cart to keep the bundle size small while maintaining global reactivity.
- **Why Session + JWT?**: Combines token-based security with server-side session control for maximum flexibility and user tracking.
- **Why Joi Validation?**: Implemented Joi on the backend to ensure data integrity and provide clear error messages to the frontend before reaching the database level.
- **Why Premium Aesthetics?**: Every component follows a strict "Vibrant & Professional" design philosophy, focusing on micro-animations and consistent color tokens to wow the user.
