# E-commerce API Documentation

## Base URL
`http://localhost:5000/api`

---

## Authentication Endpoints

### Register User
- **Endpoint**: `POST /auth/register`
- **Description**: Register a new user account
- **Request Body**:
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string",
    "role": "string",
    "address": [
      {
        "street": "string",
        "city": "string",
        "zipCode": "string"
      }
    ]
  }
  ```
- **Response**: User registration success message

### Login User
- **Endpoint**: `POST /auth/login`
- **Description**: Authenticate user and return JWT token
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response**: JWT token and user information

### Forgot Password
- **Endpoint**: `POST /auth/forgotpassword`
- **Description**: Request password reset token
- **Request Body**:
  ```json
  {
    "email": "string"
  }
  ```
- **Response**: Password reset token (in real app would be sent via email)

### Reset Password
- **Endpoint**: `PUT /auth/resetpassword/:token`
- **Description**: Reset user password using token
- **Request Body**:
  ```json
  {
    "password": "string"
  }
  ```
- **Response**: Password reset confirmation

### Logout User
- **Endpoint**: `POST /auth/logout`
- **Description**: Log out the current user

### Authenticate User
- **Endpoint**: `POST /auth/authenticate`
- **Description**: Verify user authentication status

---

## Product Endpoints

### Get All Products
- **Endpoint**: `GET /products`
- **Description**: Retrieve all products with pagination and sorting
- **Authentication**: Public (No token required)
- **Response**: Array of product objects

### Get Single Product
- **Endpoint**: `GET /products/:id`
- **Description**: Retrieve a specific product by ID
- **Authentication**: Public (No token required)
- **Response**: Single product object

### Create Product
- **Endpoint**: `POST /products`
- **Description**: Create a new product
- **Authentication**: Protected (Requires admin token)
- **Headers**: `Authorization: Bearer <admin_token>`
- **Request Body**:
  ```json
  {
    "name": "string",
    "description": "string",
    "price": "number",
    "category": "ObjectId",
    "images": ["string"],
    "stock": "number",
    "flashSale": {
      "isActive": "boolean",
      "discountPercentage": "number",
      "endTime": "date",
      "originalPrice": "number"
    }
  }
  ```

### Update Product
- **Endpoint**: `PUT /products/:id`
- **Description**: Update an existing product
- **Authentication**: Protected (Requires admin token)
- **Headers**: `Authorization: Bearer <admin_token>`
- **Request Body**: Partial or full product object

### Delete Product
- **Endpoint**: `DELETE /products/:id`
- **Description**: Delete a product by ID
- **Authentication**: Protected (Requires admin token)
- **Headers**: `Authorization: Bearer <admin_token>`

### Get Active Flash Sale Products
- **Endpoint**: `GET /products/flash-sales`
- **Description**: Retrieve products currently on flash sale
- **Response**: Array of products with active flash sales

### Get Monthly Best Sellers
- **Endpoint**: `GET /products/best-sellers`
- **Description**: Retrieve top-selling products for the current month
- **Response**: Array of best-selling products with sales count

### Get New Arrival Products
- **Endpoint**: `GET /products/new-arrivals`
- **Description**: Retrieve recently added products
- **Response**: Array of products sorted by creation date (newest first)

---

## Category Endpoints

### Get All Categories
- **Endpoint**: `GET /categories`
- **Description**: Retrieve all product categories
- **Authentication**: Public (No token required)
- **Response**: Array of category objects

### Get Single Category
- **Endpoint**: `GET /categories/:id`
- **Description**: Retrieve a specific category by ID
- **Authentication**: Public (No token required)
- **Response**: Single category object

### Create Category
- **Endpoint**: `POST /categories`
- **Description**: Create a new product category
- **Authentication**: Protected (Requires admin token)
- **Headers**: `Authorization: Bearer <admin_token>`
- **Request Body**:
  ```json
  {
    "name": "string",
    "description": "string"
  }
  ```

### Update Category
- **Endpoint**: `PUT /categories/:id`
- **Description**: Update an existing category
- **Authentication**: Protected (Requires admin token)
- **Headers**: `Authorization: Bearer <admin_token>`
- **Request Body**: Partial or full category object

### Delete Category
- **Endpoint**: `DELETE /categories/:id`
- **Description**: Delete a category by ID
- **Authentication**: Protected (Requires admin token)
- **Headers**: `Authorization: Bearer <admin_token>`

---

## Response Format

All API responses follow this structure:

### Success Response
```json
{
  "success": true,
  "data": {},
  "count": 0
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

## Flash Sale Product Structure
```json
{
  "_id": "ObjectId",
  "name": "string",
  "description": "string",
  "price": "number",
  "category": {
    "_id": "ObjectId",
    "name": "string",
    "description": "string"
  },
  "images": ["string"],
  "stock": "number",
  "flashSale": {
    "isActive": "boolean",
    "discountPercentage": "number",
    "endTime": "date",
    "originalPrice": "number"
  },
  "salesCount": "number",
  "createdAt": "date"
}
```

## Category Structure
```json
{
  "_id": "ObjectId",
  "name": "string",
  "description": "string",
  "createdAt": "date"
}
```

## Error Codes

- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `404`: Not Found
- `500`: Internal Server Error

---

## Authentication Headers

For protected routes, include the JWT token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

### How to Get a Token:
1. Register a new user with `POST /auth/register`
2. Login with `POST /auth/login` to receive a JWT token
3. Use this token in the Authorization header for protected routes

### Token Storage:
- Store the received token in your frontend (localStorage, sessionStorage, or secure cookie)
- Include the token in every request to protected endpoints
- Tokens expire after 1 day (as configured in the backend)

## Notes

- All dates are in ISO 8601 format
- Image URLs should be valid HTTP/HTTPS links
- Price values are in the smallest currency unit (e.g., cents for USD)
- Category IDs must reference existing categories