# 📈 Finance Tracker

Finance Tracker is a premium, full-stack personal finance management application designed to help you regain control over your wealth. Featuring a stunning, fully-responsive dashboard, it makes tracking spending, managing budgets, and monitoring recurring subscriptions incredibly simple and visually engaging.

## ✨ Features

- **🔐 Secure Authentication**: Robust JWT-based Login and Signup flow.
- **📊 Intuitive Dashboard**: Visualize your cash flow, total balance, income, and expenses at a glance with beautiful summary cards and interactive charts.
- **💸 Transaction Management**: Easily log, categorize, and organize multiple transactions.
- **🎯 Smart Budgeting**: Set monthly budgets and track your progress in real-time to avoid overspending.
- **🔁 Recurring Subscriptions**: Automatically track ongoing bills and subscriptions.
- **📄 Extensible Reports**: Generate insights and export full visual reports to PDF for offline record-keeping.
- **📱 Fully Responsive**: Carefully crafted to look perfect across Desktop, Tablet, and Mobile devices.
- **🎨 Modern Dark/Light Mode**: Experience a state-of-the-art interface featuring glassmorphism, smooth micro-animations, and striking glowing accents.

## 💻 Tech Stack

**Frontend**
- **React.js** (Built with Vite)
- **Tailwind CSS v4** (Utility-first styling & responsiveness)
- **Recharts** (Interactive Data Visualization)
- **Lucide React** (Vector Iconography)

**Backend**
- **Node.js** with **Express.js** (REST API)
- **Prisma ORM** (Database Type-Safe Management)
- **PostgreSQL** (Relational Database)
- **JWT & bcrypt** (Security & Authentication)

## 🎨 Design System

The platform emphasizes a **Premium Aesthetic** engineered for high user engagement:
- Custom curated color palettes featuring deep dark backgrounds (`#0d1611`) paired with vibrant accent greens (`#0bda50`).
- Engaging backdrop-blurs and radial background gradients for a modern "Glassmorphism" effect.
- Responsive CSS Grid arrays and Flexbox interfaces that elegantly wrap and stack complex input forms.

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites
- Node.js (v18+ recommended)
- A running instance of PostgreSQL

### 1. Install Dependencies

You need to install dependencies for both the frontend client and the backend server.
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Environment Variables

Create a `.env` file inside the `server` directory and configure the following required variables:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/finance_tracker"
JWT_SECRET="your_super_secret_jwt_key"
PORT=5000
```

### 3. Setup the Database

Navigate to the `server` folder, generate the Prisma client, and push the schema up to PostgreSQL.

```bash
cd server
npx prisma generate
npx prisma db push
```

### 4. Run the Application

You will need two separate terminal windows to run both the Frontend and Backend concurrently.

**Terminal 1 (Backend):**
```bash
cd server
npm run dev # Server should start on http://localhost:5000
```

**Terminal 2 (Frontend):**
```bash
cd client
npm run dev # Client should be ready at http://localhost:5173
```

Open your browser and navigate to `http://localhost:5173`. Create an account and start managing your finances!