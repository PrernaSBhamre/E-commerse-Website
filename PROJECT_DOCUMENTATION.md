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

- [ ] **All Products (`AllProducts.jsx`)**
    - **Logic**: Slices the filtered array into chunks for faster rendering.
    - **Filtering & Sorting Snippet**:
      ```javascript
      const filteredAndSortedProducts = products
        .filter(product => {
          const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesCategory = !selectedCategory || 
            (product.category && (typeof product.category === 'object' 
                ? product.category._id === selectedCategory 
                : product.category === selectedCategory));
          return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
          switch (sortBy) {
            case 'price-low': return a.price - b.price;
            case 'price-high': return b.price - a.price;
            default: return new Date(b.createdAt) - new Date(a.createdAt);
          }
        });
      ```

- [ ] **Flash Sales (`FlashSales.jsx`)**
    - **Logic**: Uses a `setInterval` to create a live countdown.
    - **Countdown Logic Snippet**:
      ```javascript
      useEffect(() => {
        const timer = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
            if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
            if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
            return prev;
          });
        }, 1000);
        return () => clearInterval(timer);
      }, []);
      ```

### 4. Product Detail (`ProductDetail.jsx`)
- **Logic**: Manages product angles and variant selection.
- **Price Formatting Snippet**:
  ```javascript
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };
  ```

### 5. Shopping Cart (`Cart.jsx`)
- **Logic**: Leverages the `CartContext` for real-time updates.
- **Cart Context Snippet**:
  ```javascript
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();
  // Derived state for professional summary
  const totalAmount = cartTotal - discount + deliveryCharges;
  ```

### 6. Checkout (`Checkout.jsx`)
- **Logic**: Form validation and order finalization.
- **Order Placement Snippet**:
  ```javascript
  const response = await axios.post('http://localhost:5000/api/orders', orderData, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (response.data.success) {
    alert('Order placed successfully!');
    navigate('/');
  }
  ```

### 7. New Arrivals (`NewArrival.jsx`)
- **Logic**: Targets the latest created items.
- **Sorting Logic Snippet**:
  ```javascript
  // Backend query example
  const newArrivals = await Product.find()
    .sort({ createdAt: -1 })
    .limit(4);
  ```

### 8. Authentication (`auth.js` / `User.js`)
- **Logic**: secure hashing and session control.
- **Bcrypt Login Snippet**:
  ```javascript
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(401).send("Invalid Credentials");
  
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '1d' });
  req.session.token = token; // Store in session
  ```

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
