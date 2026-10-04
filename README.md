# INT Gift Mart - Handcrafted Personalized Gifts & Boutique 🇱🇰

Sri Lanka's premier customized handcrafted gift boutique web platform featuring an interactive 3D unboxing experience, courier doorstep delivery sequence, customized Spotify song frames, Voice QR memory plaques, diecast car bouquets, and Commercial Bank of Ceylon direct gateway.

---

## 🌟 Key Platform Features

- **Personalized Gift Studio:** Interactive Spotify song plaque generator, Voice QR memory frame builder, and flower/chocolate bouquet customizer.
- **Island-wide Catalog:** 45+ authentic Sri Lankan gifts categorized by Bouquets, Wooden Light Frames, Jhumka Organizers, and Hampers with accurate LKR prices.
- **Interactive 3D Experience:** 4-stage doorstep delivery journey featuring Web Audio doorbell chime, 3D door swing on scroll, celebration confetti, and an interactive customer review interface.
- **Real Customer Authentication:** Email verification with OTP countdown.
- **Secure Payment Gateway:** Direct bank transfer with Commercial Bank of Ceylon payment confirmation and WhatsApp slip upload.
- **Store Administration:** Dedicated store management portal to update prices, add new items, modify bank details, and respond to customer inquiries.

---

## 📁 Project Architecture

```text
int_gift_mart/
├── backend/                        # FastAPI REST API Backend
│   ├── main.py                     # API endpoints, OTP auth service, product data
│   ├── requirements.txt            # Python dependencies
│   └── data/                       # Inquiries, products, and persistent store data
├── frontend/                       # React (Vite + Tailwind CSS) Frontend
│   ├── public/                     # High-res logos, favicons, product photography
│   │   ├── favicon.ico             # Brand tab favicon
│   │   ├── site.webmanifest        # Browser & Edge sidebar app manifest
│   │   └── images/                 # Official studio showcase & logos
│   └── src/
│       ├── components/             # UI Components (Hero, Catalog, Studio, 3D Delivery)
│       ├── context/                # Shopping cart, wishlist, and dynamic settings
│       └── App.jsx                 # Master application controller
├── scripts/                        # Utility maintenance scripts
├── .gitignore                      # Git exclusion rules
├── start_store.bat                 # 1-click launcher for Windows
└── README.md                       # Project documentation
```

---

## 🛠️ Local Development Setup

### 1. Backend Server (FastAPI)
```powershell
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```
Interactive API documentation available at `http://127.0.0.1:8000/docs`.

### 2. Frontend Application (React + Vite)
```powershell
cd frontend
npm install
npm run dev
```
Client storefront available at `http://127.0.0.1:5173/`.

---

## 🛡️ Security & Environment Configuration

- **Admin Access:** Administrative features are restricted and protected by authentication. Credentials and store secrets should be set via environment variables in production.
- **Bank & Store Details:** All banking details, contact numbers, and store logos are dynamically managed via the backend database and can be updated securely through the management dashboard.

---

## 📄 License
Handcrafted with ❤️ for INT Gift Mart, Sri Lanka. All rights reserved.
