# 🏥 Prescripto — Doctor Appointment Booking System

A full-stack doctor appointment booking platform where patients can **browse doctors by specialty**, **book appointments**, and **pay securely via Razorpay**.

> ⚠️ **Heads up:** The backend is hosted on Render's free tier. The server may take **30–60 seconds to wake up** on the first visit. Please wait a moment if it seems slow.

---

## 🔗 Live Demo

| | Link |
|---|---|
| 🌐 **Patient Frontend** | [prescripto.vercel.app](https://your-frontend.vercel.app) |
| ⚙️ **Backend API** | [prescripto-backend-28iu.onrender.com](https://prescripto-backend-28iu.onrender.com) |

---

## ✨ What You Can Do

- 📝 **Create a profile** — register and manage your personal details
- 🔍 **Browse doctors** — filter by specialty (General, Gynecologist, Dermatologist, etc.)
- 📅 **Book appointments** — pick a doctor, choose a time slot, and confirm
- 💳 **Pay online** — secure payments via **Razorpay**
- 📋 **My Appointments** — view and cancel your bookings

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Auth | JWT |
| File Storage | Cloudinary |
| Payments | Razorpay |
| Frontend Hosting | Vercel |
| Backend Hosting | Render |

---

## 🚀 Run the Backend Locally

Want to run the API yourself instead of using the hosted version? Follow these steps.

### 1. Clone the repo

```bash
git clone https://github.com/your-username/prescripto.git
cd prescripto/backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

Create a `.env` file inside the `backend/` folder:

```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

ADMIN_EMAIL=admin@prescripto.com
ADMIN_PASSWORD=your_admin_password
```

> 💡 You'll need accounts on [MongoDB Atlas](https://mongodb.com/atlas), [Cloudinary](https://cloudinary.com), and [Razorpay](https://razorpay.com) to fill these in.

### 4. Start the server

```bash
npm run server
```

API will be running at `http://localhost:4000`

---

## 🔌 Key API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/user/register` | Register a new patient |
| POST | `/api/user/login` | Patient login |
| GET | `/api/doctor/list` | Get all doctors |
| POST | `/api/user/book-appointment` | Book an appointment |
| GET | `/api/user/appointments` | Get patient's appointments |
| POST | `/api/user/cancel-appointment` | Cancel an appointment |
| POST | `/api/payment/razorpay` | Initiate Razorpay payment |
| POST | `/api/payment/verify` | Verify payment after success |

---

## 💳 Razorpay Test Payments

Use these test credentials to try payments without real money:

| Field | Value |
|-------|-------|
| Card Number | `4111 1111 1111 1111` |
| Expiry | Any future date |
| CVV | Any 3 digits |
| OTP | `1234` (on Razorpay test screen) |

---

## 📁 Project Structure

```
prescripto/
├── backend/               # Node.js + Express API
│   ├── controllers/       # Route logic
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   ├── middlewares/       # Auth, multer
│   └── server.js
│
└── frontend/              # React patient app
    ├── src/
    │   ├── pages/         # Home, Doctors, Appointment, Login etc.
    │   ├── components/    # Navbar, Footer, etc.
    │   └── context/       # App state
    └── vite.config.js
```

---

## 🙋‍♂️ Author

**Your Name**
- GitHub: [@your-username](https://github.com/your-username)
- LinkedIn: [linkedin.com/in/your-profile](https://linkedin.com/in/your-profile)

---

## 📄 License

MIT License — feel free to use and modify. 