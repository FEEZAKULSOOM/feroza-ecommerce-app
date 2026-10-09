# 💎 Feroza — AI-Powered MERN E-Commerce Platform

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase_Auth-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)

> A modern, full-stack e-commerce web platform featuring voice-assisted artificial intelligence navigation, secure multi-provider authentication, localized fintech payment processing via SafePay (PKR), real-time order tracking, and an administrative inventory control suite.

---

## 🌐 Live Deployments

* **Storefront Application:** [https://feroza-ecommerce-app-frontend.onrender.com/](https://feroza-ecommerce-app-frontend.onrender.com/)[cite: 3]
* **Administrative Control Panel:** [https://feroza-ecommerce-app-admin.onrender.com/](https://feroza-ecommerce-app-admin.onrender.com/)[cite: 7]

---

## 🌟 Key Features

### 🎙️ Voice-Assisted AI Navigation
* Hands-free client navigation powered by browser Web Speech APIs (`SpeechRecognition` / `SpeechSynthesisUtterance`).
* Responsive floating assistant widget that interprets natural voice commands to route users across catalog pages, collections, cart, and account views.

### 🔐 Authentication & Session Security
* **Dual-Method Authentication:** Supports traditional email/password registration and Google OAuth 2.0 login powered by Firebase.
* **Stateless Token Authorization:** Secure JSON Web Token (JWT) verification transmitted via `httpOnly` cookies with cross-site request forgery protections.

### 💳 Localized Payment Processing (Fintech Integration)
* **SafePay Sandbox Gateway:** End-to-end payment gateway tokenization handling transactions in Pakistani Rupee (PKR).
* **Payment Alternatives:** Native support for Cash on Delivery (COD) workflows.
* Real-time automated verification hooks validating checkout receipts before transitioning orders to fulfillment queues.

### 📦 Customer Experience & Storefront UX
* Dynamic catalog filtering across genders (Men, Women, Kids), sub-categories (Topwear, Bottomwear, Winterwear), and price tags.
* Instant client-side search indexing with real-time text debouncing.
* Product detail inspection with multi-image gallery previews and size selectors (`S`, `M`, `L`, `XL`, `XXL`).
* Persistent shopping cart state management with real-time subtotal and shipping cost calculations.
* Customer order ledger featuring dynamic lifecycle milestones (`Order Placed`, `Packing`, `Shipped`, `Out for delivery`, `Delivered`).
* Defensive UI architectures: custom empty states, error boundaries, and branded fallback routes.

### 🛠️ Administrative Operations Panel
* Protected administrative control dashboard showing aggregate catalog metrics and order volume.
* Multi-image asset upload workflow.
* Full CRUD inventory operations: publish new items, specify stock variants, toggle best-seller banners, and delete listings.
* Administrative status controllers to modify customer fulfillment tracking in real time.

---

## 🛠️ Tech Stack & Languages

### **Languages**
* **JavaScript (ES6+):** Frontend application logic, asynchronous data fetching, and Node runtime engine.
* **HTML5 & CSS3:** Semantic document structures and modern CSS grid/flexbox layouts.

### **Frontend Architecture**
* **React.js:** Component-driven user interface architecture with functional hooks (`useState`, `useEffect`, `useContext`).
* **React Router Dom:** Single-page application (SPA) client-side routing.
* **Tailwind CSS:** Utility-first styling with custom dark-teal themes and fluid mobile-first responsive breakpoints.
* **Axios:** Asynchronous HTTP client configured with cross-origin credential passing (`withCredentials: true`).
* **React Icons:** Scalable vector iconography.

### **Backend & Cloud Architecture**
* **Node.js & Express.js:** RESTful API server handling endpoint routing, middleware authorization, and payment tokenization.
* **MongoDB & Mongoose:** Document-oriented database schemas for users, product inventories, and transaction registries.
* **Firebase Authentication:** Client-side Google identity provider federated access.
* **Cloudinary / Multer:** Multi-file image parsing and cloud asset hosting.
* **Render:** Cloud production hosting with GitHub CI/CD automated deployments.

---

## 📂 Project Architecture

```plaintext
feroza-ecommerce/
├── client/                     # Storefront & Admin User Interface
│   ├── public/                 # Static assets & SVG icons
│   ├── src/
│   │   ├── assets/             # Brand logos & imagery
│   │   ├── component/          # Modular UI widgets (Nav, Footer, VoiceWidget, etc.)
│   │   ├── context/            # Global state context providers (AuthContext, ShopContext)
│   │   ├── pages/              # Views (Home, Collections, Product, Cart, Orders, Admin)
│   │   ├── App.jsx             # Main router declaration
│   │   └── main.jsx            # Application root entry point
│   └── tailwind.config.js      # Custom theme palettes and breakpoints
│
└── server/                     # Express REST API Engine
    ├── config/                 # Database connectors (MongoDB Mongoose)
    ├── controllers/            # Controller business logic (Auth, Product, Order, SafePay)
    ├── middleware/             # JWT authentication guards & Multer file handlers
    ├── models/                 # Mongoose database schemas (User, Product, Order)
    ├── routes/                 # RESTful API route declarations
    └── server.js               # Express application bootstrap file
