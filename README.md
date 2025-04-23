# 🍽️ Restaurant Menu Application

A full-stack, responsive web-based Restaurant Menu Application that allows customers to view digital menus via QR code scanning and place orders directly from their mobile devices. Restaurant managers can update menus, track orders, analyze sales, and customize branding — all through an intuitive admin interface.

---

## 👥 Project Team

- **Nirjala Prajapati**
- **Shisham Chudal**  

---

## 🌟 Project Overview

The Restaurant Menu Application enhances dining by replacing traditional paper menus with interactive digital menus. Customers can scan a QR code to view menu items, place orders, and receive order updates. On the backend, restaurant managers can manage their menu, review order analytics, and apply branding elements through a dedicated admin panel.

---

## 🎯 Goals and Objectives

- Enable QR code-based menu access and mobile ordering.
- Provide a secure admin dashboard for managing menu items and categories.
- Implement secure user authentication and session management.
- Offer branding customization for subscription-based restaurants.
- Display order analytics including popular and abandoned items.
- Ensure scalability, responsiveness, and offline capabilities.

---

## 👤 Target Users

1. **Restaurant Owners & Managers** – Use the admin panel to manage content, branding, and track order data.
2. **Customers** – View categorized menus, place orders, and receive live updates.
3. *(Optional)* **Delivery Services** – Integrate to enhance order tracking and logistics.

---

## 🚀 Key Features

- 📱 QR code scanning to access digital menus.
- 🧾 Categorized menus with add-to-cart and ordering features.
- 🛠️ Admin panel for CRUD operations on menu items and order tracking.
- 🔁 Real-time order token and order tracking.
- 📊 Analytics dashboard for top items and abandoned carts.
- 🎨 Branding tools for restaurant personalization.
- 🔐 JWT-based authentication and secure session handling.
- 📡 PWA features: Offline access & push notifications.
- 📱 Mobile-first, fully responsive UI/UX.

---

## 🧰 Tech Stack

### Frontend
- HTML5 / CSS3 / SASS
- JavaScript (ES6)
- Vue.js *(optional reactive components)*
- Bootstrap 5

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose

### Authentication
- JSON Web Tokens (JWT)
- Session & Cookie Management

### Additional Features
- Progressive Web App (PWA) capabilities
- SSL Encryption for secure transmission

### Testing
- Mocha / Chai / Jest

### Deployment
- Cloud: Heroku / AWS / DigitalOcean
- Version Control: GitHub

---

## ⚙️ Getting Started

### Prerequisites
- Node.js and npm installed
- MongoDB running locally or remotely
- Git installed

### 🛠️ Installation

1. **Clone the repo**

```bash
git clone https://github.com/your-repo/restaurant-menu-app.git
cd restaurant-menu-app
```

2. **Install backend dependencies**

```bash
cd server
npm install
```

3. **Install frontend dependencies**

```bash
cd ../client
npm install
```

4. **Start the application**

From the root directory:

```bash
npm run dev
```

This will concurrently run:

- Backend server at `http://localhost:5000`
- Frontend client at `http://localhost:5173`

---

## 📁 Project Structure

```plaintext
restaurant-menu-app/
├── client/          # Frontend - Vite, Vue.js, Bootstrap
├── server/          # Backend - Express, MongoDB
├── README.md        # Project Overview
├── package.json     # Root with concurrently script
```

---

## 🧪 Testing

To run backend tests:

```bash
cd server
npm test
```

---

## 🌐 Deployment

- Ensure production environment variables are set (`.env`).
- Deploy frontend and backend to Heroku or any cloud platform.
- Use CI/CD pipelines for seamless updates.

---

## 📌 License

This project is for educational purposes under Westcliff University. All rights reserved by the group members.

---

## 💬 Contact

For questions or feedback, please reach out to:
- Nirjala Prajapati
- Shisham Chudal
