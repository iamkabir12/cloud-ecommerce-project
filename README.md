# Cloud-Based E-Commerce Shopping System

## Project Overview

This project is a full-stack cloud-ready E-Commerce Shopping System built using Docker, React.js, Node.js, Express.js, MySQL, and Razorpay Payment Gateway. It demonstrates Docker architecture for hosting a project on cloud infrastructure and is designed for academic cloud computing project submission as well as portfolio use.

## Tech Stack

* Frontend: React.js
* Backend: Node.js + Express.js
* Database: MySQL
* Containerization: Docker + Docker Compose
* Cloud Deployment: AWS EC2 (architecture-ready)
* Payment Gateway: Razorpay
* Reverse Proxy: Nginx

## Features

* Product Listing Page
* Product Images
* Add to Cart
* Remove from Cart
* Checkout Page
* Real Razorpay Payment Integration
* Admin Panel
* Add Product
* Delete Product
* MySQL Database Integration
* Dockerized Deployment
* Cloud-Ready Architecture

## Docker Architecture

User → React Frontend → Nginx → Node.js Backend → MySQL Database → Razorpay Payment Gateway → Docker Containers → AWS EC2

## Screenshots

### 1. Home Page

```markdown
![Home Page](./screenshots/screenshot1.png)
```

Example:
`![Home Page](./screenshots/home.png)`

---

### 2. Cart and Checkout

```markdown
![Cart and Checkout](./screenshots/screenshot2.png)
```

Example:
`![Cart and Checkout](./screenshots/cart-checkout.png)`

---

### 3. Admin Panel

```markdown
![Admin Panel](./screenshots/screenshot3.png)
```

Example:
`![Admin Panel](./screenshots/admin-panel.png)`

---

## Installation Steps

### Clone Repository

```bash
git clone https://github.com/iamkabir12/cloud-ecommerce-project.git
cd cloud-ecommerce-project
```

### Backend Setup

```bash
cd backend
npm install
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

### Docker Run

```bash
docker compose up --build
```

## Payment Gateway

Razorpay is integrated for real payment processing using test mode.

Supported methods:

* UPI
* Credit Card
* Debit Card
* Net Banking
* Wallets

## GitHub Repository

[https://github.com/iamkabir12/cloud-ecommerce-project](https://github.com/iamkabir12/cloud-ecommerce-project)

## Author

Pratik Pandey
B.Tech Computer Science and Engineering
Pandit Deendayal Energy University

---

## Final Note

This project is built as a Cloud Computing Project demonstrating practical Docker architecture and deployment-ready E-Commerce infrastructure with real payment gateway integration.

