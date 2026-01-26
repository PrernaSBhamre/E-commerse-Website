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
- **Route**: `/`
- **Role**: The main landing page that aggregates several high-impact components.
- **Logic**: 
    - Composes `Hero`, `FlashSales`, `CategoryList`, `BestSelling`, `ExploreProducts`, and `NewArrival`.
    - Coordinates visual layout using Tailwind's grid and flexbox to maintain a professional "Exclusive" dashboard feel.

### 2. All Products (`AllProducts.jsx`)
- **Route**: `/all-products`
- **Logic**: Fetches all products from the backend and implements client-side filtering and sorting.
- **Filtering Logic**: Filters by search term and category.
- **Sorting Logic**: Sorts by Price (High/Low) and Newest arrivals.

### 3. Flash Sales (`AllFlashSales.jsx`) & Best Sellers (`AllBestSellers.jsx`)
- **Routes**: `/flash-sales`, `/best-sellers`
- **Logic**: Specialized pages that fetch and display products based on their promotion status or sales volume.

### 4. About Page (`About.jsx`)
- **Route**: `/about`
- **Logic**: Displays company information, values, and team details using premium styling and micro-animations.

### 5. Contact Page (`Contact.jsx`)
- **Route**: `/contact`
- **Logic**: Provides a contact form for user inquiries and displays company contact information.

### 6. Wishlist Page (`wishlist.jsx`)
- **Route**: `/wishlist`
- **Logic**: Uses a custom hook `useFavorites` to manage and display user's favorite products.
- **Micro-animations**: Uses `animate-fade-in-up` for smooth product entry.

### 7. Manage Profile (`Profile.jsx`)
- **Route**: `/profile`
- **Logic**: 
    - **Personal Info**: Permits users to update their Name, Email, and Address.
    - **Security**: Includes a dedicated section for changing the account password with validation.
    - **State Management**: Consumes `AuthContext` to display and sync user data.
    - **Premium UI**: Uses a split-layout design with animated status cards and hover effects.

### 8. My Orders (`Orders.jsx`)
- **Route**: `/orders`
- **Logic**: 
    - **Data Fetching**: Retrieves the authenticated user's order history using `GET /api/orders`.
    - **Order Summary**: Displays order ID, placement date, total price, and shipping details.
    - **Status Tracking**: Uses color-coded status indicators (pending, delivered, cancelled) for clear visibility.
    - **Product Details**: Lists all items within an order with quantity and price details.
    - **Professional UI**: Employs a clean, cards-based layout inspired by Amazon/Flipkart for high readability.

### 9. Order Details (`OrderDetails.jsx`)
- **Route**: `/orders/:orderId`
- **Logic**: 
    - **Data Retrieval**: Fetches all orders and filters for the specific ID (frontend-only logic).
    - **Detailed View**: Provides an administrative breakdown including shipping address, payment status, and order total.
    - **Inventory Breakdown**: Lists products with names, descriptions, and quantities.
    - **Professional Design**: Adopts a minimalist, high-structure layout similar to Amazon.

### 10. Product Detail (`ProductDetail.jsx`)
- **Route**: `/product/:id`
- **Logic**: Fetches individual product data based on the URL parameter.
- **Dynamic Content**: Manages product images, variants, and descriptions.

### 8. Category Detail (`CategoryDetail.jsx`) & Category Products (`CategoryProducts.jsx`)
- **Routes**: `/category/:id`, `/categories/:categoryId/products`
- **Logic**: Filters products based on specific categories or subcategories.

### 9. Shopping Cart (`Cart.jsx`)
- **Route**: `/cart`
- **Logic**: Leverages the `CartContext` for real-time updates and persistence in `localStorage`.

### 10. Checkout (`Checkout.jsx`)
- **Route**: `/checkout/:id`
- **Logic**: Handles order placement, address validation, and submission to the backend.

### 11. Authentication (`Login.jsx`, `Signup.jsx`)
- **Routes**: `/login`, `/signup`
- **Logic**: 
    - **Login**: Validates credentials and stores JWT in `localStorage` via `AuthContext`.
    - **Signup**: Creates a new user account with role selection (User/Admin) and address details.
    - **Theme**: Consistent Red/Black premium theme with animated backgrounds.

---

## 🛤️ Routing Table

| Path | Component | Description |
| :--- | :--- | :--- |
| `/` | `Home` | Landing page |
| `/about` | `About` | Company info |
| `/contact` | `Contact` | Contact form |
| `/all-products` | `AllProducts` | Full product catalog |
| `/flash-sales` | `AllFlashSales` | Discounted items |
| `/best-sellers` | `AllBestSellers` | Popular items |
| `/wishlist` | `Wishlist` | Saved products |
| `/orders` | `Orders` | User order history |
| `/orders/:orderId` | `OrderDetails` | Detailed order summary |
| `/product/:id` | `ProductDetail` | Single product view |
| `/category/:id` | `CategoryDetail` | Category-specific view |
| `/cart` | `Cart` | Shopping cart |
| `/checkout/:id` | `Checkout` | Order entry |
| `/login` | `Login` | User sign-in |
| `/signup` | `Signup` | User registration |
| `/profile` | `Profile` | Manage account & security |

---

## 🔐 Authentication Logic
- **Bcrypt & JWT**: Secure password hashing and token-based sessions.
- **Context API**: `AuthContext` provides global access to user state and login/logout methods.
- **Axios Interceptor**: Often used to attach the JWT to every outgoing request for secure API access.

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
