# 🛒 Ecommerce Store Backend

A Node.js + Express + MongoDB backend for an e-commerce platform, featuring JWT authentication, product management, user roles, file uploads, and order handling.

## 🚀 Features

- **Authentication & Authorization**
  - Register, login, logout
  - Role-based access control (`user`, `admin`)
  - JWT access tokens with refresh tokens

- **Product Management**
  - Add, update, delete products (admin only)
  - Image uploads with Multer (disk or memory)
  - Search, filter, sort, and paginate

- **Orders & Cart**
  - Add items to cart
  - Create and manage orders
  - Stock management

- **Security**
  - Password hashing (bcrypt)
  - Input validation
  - Rate limiting, Helmet, and CORS

- **Database**
  - MongoDB with Mongoose
  - Indexes for search & filtering
  - Transactions for order processing

## 🗂 Project Structure

src/
index.js # App entry point
connect.js # DB config
controllers/ # Request handlers
models/ # Mongoose schemas
routes/ # API routes
middlewares/ # Auth, validation, error handling
utils/ # Helper functions

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/JashuGarg/Ecommerce_Store.git

   cd Ecommerce_Store
    ```
2. **Install dependencies**
    ```bash
        npm install
    ```
3. **Create environment file**
    ```bash
        cp .env.example .env
    ```

    Update .env with your credentials:
    ```bash
    PORT=5000
    MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url><dbname>
    JWT_SECRET=your_jwt_secret
    CORS_ORIGIN=http://localhost:3000
    ```    
4. **Run the server**

    ```bash
       npm run dev
    ``` 

## 🤝 Contributing

- Fork this repo

- Create a feature branch (git checkout -b feature/your-feature)

- Commit changes (git commit -m "Add feature")

- Push to branch (git push origin feature/your-feature)

- Open a Pull Request