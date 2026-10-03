# INT Gift Mart - Full-Stack E-Commerce & Gift Customization Boutique 🇱🇰

Sri Lanka's premier customized handcrafted gift boutique web platform with interactive 3D unboxing, courier doorstep delivery sequence, secret admin dashboard, email OTP verification, and Commercial Bank of Ceylon direct gateway.

---

## 🚀 Live Server Links

| Service | URL | Description |
| :--- | :--- | :--- |
| **Frontend Web** | [http://127.0.0.1:5173/](http://127.0.0.1:5173/) | Client storefront with 3D animations, catalog & studio |
| **Backend API** | [http://127.0.0.1:8000/](http://127.0.0.1:8000/) | FastAPI REST service |
| **Backend Docs** | [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs) | Interactive Swagger UI API documentation |
| **Admin Portal** | [http://127.0.0.1:5173/#admin](http://127.0.0.1:5173/#admin) | Hidden administrative control dashboard |

---

## 🔐 Admin Portal Access & Credentials

- **Direct URL:** [http://127.0.0.1:5173/#admin](http://127.0.0.1:5173/#admin)
- **Secret Keyboard Shortcut:** Press `Ctrl` + `Shift` + `A` anywhere on the site
- **Admin Password:** `INT@Admin2026`

### Admin Capabilities:
1. **Edit Products & Prices:** Add, edit name, change LKR prices, or upload custom photos for any of the 45+ items.
2. **Bank Details & Acc No Management:** Change bank name, account number, branch, or account title in real time.
3. **Official Shop Logo:** Upload or change the store's official logo across the navbar, footer, and icons.
4. **Customer Inquiries:** View customer inquiries with instant 1-click WhatsApp reply integration.
5. **Change Password:** Update the admin dashboard password securely.

---

## 📁 Source Code Directory Structure

```text
C:\Users\DELL\.gemini\antigravity\scratch\int_gift_mart/
├── backend/
│   ├── main.py                     # FastAPI server, OTP auth, SQLite/JSON DB, REST APIs
│   ├── requirements.txt            # Python dependencies (fastapi, uvicorn, pydantic)
│   └── data/                       # Inquiries, products, and persistent store data
├── frontend/
│   ├── index.html                  # HTML head, favicons, Edge sidebar meta tags
│   ├── package.json                # React, Vite, Tailwind CSS, Lucide, Canvas-Confetti
│   ├── vite.config.js              # Vite configuration with proxy to backend
│   ├── public/
│   │   ├── favicon.ico             # Multi-size crisp browser tab icon
│   │   ├── favicon.png             # Modern PNG favicon
│   │   ├── favicon.svg             # Vector SVG logo icon
│   │   ├── apple-touch-icon.png    # High-res 180x180 mobile & sidebar icon
│   │   ├── site.webmanifest        # Browser & Edge sidebar app manifest
│   │   ├── images/
│   │   │   ├── logo.jpg            # Official INT Gift Mart logo (Blue & Golden Pink)
│   │   │   └── hero.jpg            # Official Handcrafted Studio Showcase banner
│   │   └── products/               # 170+ authentic product crops from actual catalog
│   └── src/
│       ├── main.jsx                # Application root entry point
│       ├── App.jsx                 # Master page layout and modal coordinator
│       ├── index.css               # Tailwind CSS and luxury theme design tokens
│       ├── context/
│       │   └── CartContext.jsx      # Shopping cart, wishlist, auth state, dynamic bank info
│       └── components/
│           ├── Navbar.jsx          # Top brand bar, WhatsApp shortcut, user auth button
│           ├── Hero.jsx            # Official studio showcase frame & interactive surprise unboxing
│           ├── DeliveryJourney3D.jsx# 4-stage 3D courier delivery, doorbell chime, door swing & review
│           ├── ProductCatalog.jsx  # 45+ products with categories, search, filter & quick add
│           ├── CustomStudio.jsx    # Interactive Spotify song frame, Voice QR & bouquet builder
│           ├── CartDrawer.jsx      # Checkout drawer with Commercial Bank transfer instructions
│           ├── AdminModal.jsx      # Hidden admin portal with live editing tools
│           ├── AuthModal.jsx       # Real email OTP sign-in with 45s countdown timer
│           ├── InquiryModal.jsx    # Custom gift inquiry modal with WhatsApp dispatch
│           └── Footer.jsx          # Island-wide shipping notice, official links & bank notice
```

---

## 🛠️ How to Run the Servers Anytime

### 1. Start the Backend API (FastAPI)
Open PowerShell in the backend directory:
```powershell
cd C:\Users\DELL\.gemini\antigravity\scratch\int_gift_mart\backend
python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```

### 2. Start the Frontend Store (Vite + React)
Open a second PowerShell window in the frontend directory:
```powershell
cd C:\Users\DELL\.gemini\antigravity\scratch\int_gift_mart\frontend
npm run dev -- --host 127.0.0.1 --port 5173
```

---

## 💳 Payment & Contact Configuration

- **Bank:** Commercial Bank of Ceylon PLC
- **Account Number:** `8010 4492 1102`
- **Account Title:** INT Gift Mart (Pvt) Ltd
- **Branch:** Colombo City / Digital Banking
- **Official WhatsApp:** `+94 75 325 9928`
