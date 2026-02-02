# E-commerce Full-Stack Application

A professional e-commerce platform with Laravel backend API and SvelteKit frontend in a single repository.

## Project Structure

```
ecommerce-fullstack/
├── backend/          # Laravel 12 REST API
│   ├── app/
│   ├── database/
│   ├── routes/
│   └── ...
└── frontend/         # SvelteKit UI
    ├── src/
    ├── static/
    └── ...
```

## Quick Start

### Prerequisites
- PHP 8.2+
- Composer
- Node.js 18+
- npm

### Installation

```bash
# Clone repository
git clone https://github.com/MohammadCZeidan/E-commerce.git
cd E-commerce

# Setup backend
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve

# Setup frontend (in new terminal)
cd ../frontend
npm install
npm run dev
```

## Backend API

**Base URL**: `http://localhost:8000/api`

### Endpoints
- `GET /products` - Get all products with filters
- `GET /products/{id}` - Get single product details
- `POST /orders` - Create new order
- `GET /categories` - Get all categories

### Environment
```bash
cd backend
php artisan serve  # Runs on http://localhost:8000
```

## Frontend Application

**Dev URL**: `http://localhost:5173`

### Features
- 🛍️ Product catalog with advanced filtering
- 🔍 Real-time search
- 🛒 Shopping cart with localStorage persistence
- 💳 Secure checkout flow
- 📱 Fully responsive design
- ⚡ Fast performance with SvelteKit

### Environment
```bash
cd frontend
npm run dev    # Development server
npm run build  # Production build
npm run preview # Preview production build
```

## Development Workflow

```bash
# Terminal 1 - Backend API
cd backend && php artisan serve

# Terminal 2 - Frontend Dev Server
cd frontend && npm run dev
```

Visit `http://localhost:5173` to see the application.

## Tech Stack

**Backend:**
- Laravel 12
- PHP 8.2
- SQLite Database
- RESTful API Architecture

**Frontend:**
- SvelteKit
- TypeScript
- Vite
- CSS3

## Features

- **Product Management**: Browse, filter, and search products
- **Shopping Cart**: Add/remove items, update quantities
- **Checkout Process**: Multi-step checkout with validation
- **Order Management**: Create and track orders
- **Responsive Design**: Mobile-first approach
- **Type Safety**: Full TypeScript support
- **API Integration**: RESTful communication

## Database

SQLite database located at `backend/database/database.sqlite`

Run migrations and seed:
```bash
cd backend
php artisan migrate:fresh --seed
```

## API Documentation

### Products
```http
GET /api/products
GET /api/products/{id}
POST /api/products
PUT /api/products/{id}
DELETE /api/products/{id}
```

### Orders
```http
POST /api/orders
GET /api/orders
GET /api/orders/{id}
```

## Contributing

1. Follow PSR-12 coding standards for PHP
2. Use TypeScript for all frontend code
3. Write descriptive commit messages
4. Test before pushing

## License

Proprietary - All rights reserved

## Author

Built with attention to detail and industry best practices.
