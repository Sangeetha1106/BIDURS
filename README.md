# PICKURS.in - Live E-Auction Platform (Frontend Demo)

## Overview
PICKURS.in is a premium, product-based live e-auction platform. This project is a **Frontend-Only Prototype** designed to demonstrate the user interface, design system, and user flows of the application. 

This repository contains the complete frontend architecture built using pure HTML, CSS, JavaScript, and Bootstrap 5.

## Project Structure
```
/
├── index.html                  # Landing Page
├── pages/                      # All internal pages
│   ├── about.html
│   ├── auction-result.html
│   ├── chat.html
│   ├── contact.html
│   ├── dashboard.html
│   ├── faq.html
│   ├── forgot-password.html
│   ├── how-it-works.html
│   ├── live-auction.html       # The main live bidding room
│   ├── live-auctions.html
│   ├── login.html
│   ├── my-bids.html
│   ├── otp-verification.html
│   ├── payment-status.html
│   ├── product-details.html
│   ├── products.html
│   ├── profile.html
│   ├── register.html
│   ├── reviews.html
│   ├── subscription.html
│   ├── terms.html
│   ├── upcoming-auctions.html
│   ├── wanted-products.html
│   ├── watchlist.html
│   └── won-auctions.html
├── assets/
│   ├── css/
│   │   └── style.css           # Global design system & utilities
│   ├── js/
│   │   ├── auth.js             # Mock authentication & global navbar/footer generator
│   │   ├── bidding.js          # Live auction timer & bidding logic
│   │   ├── dashboard.js        # Dashboard data rendering
│   │   ├── filters.js          # Product filtering logic
│   │   ├── product-details.js  # Dynamic product page routing
│   │   ├── products.js         # Grid rendering logic
│   │   ├── stage6.js           # Interactive forms (chat, reviews, wanted)
│   │   ├── subscription.js     # Subscription state management
│   │   ├── timer.js            # Global countdown utilities
│   │   └── utils.js            # Currency & formatting helpers
│   └── data/
│       └── products.js         # Centralized mock product database
```

## Technology Stack
- **HTML5** (Semantic structure)
- **CSS3** (Custom variables, animations, layouts)
- **Vanilla JavaScript (ES6+)** (DOM manipulation, data routing, mock states)
- **Bootstrap 5** (Grid system, modals, utility classes)
- **Bootstrap Icons**

## Important Limitations & Disclaimers

### ⚠️ Frontend-Only Architecture
This project does **not** include a backend. Everything runs locally in the browser. 

### 1. Mock Authentication
- The login and registration flows do not verify passwords against a database. 
- Submitting any credentials will log you in by setting `isLoggedIn: true` in your browser's `localStorage`.
- The OTP verification step accepts `123456` as the universal mock code.

### 2. Mock Bidding
- Bidding in the Live Auction room (`live-auction.html`) is a local browser simulation. 
- You are not connected via WebSocket to other players.
- When the timer expires, the page automatically selects the top bidder in your local array as the winner.

### 3. Subscription & Payments
- There is **no real payment gateway integration** (No Razorpay, Stripe, etc.).
- Clicking "Subscribe" or "Proceed to Payment" will trigger UI loading states and success mockups.
- Subscription validity is stored temporarily in `localStorage`.

### 4. Data Persistence
- Products are loaded from a centralized hardcoded array in `assets/data/products.js`. 
- New items added via the "Wanted Products" form are saved to `localStorage` and will persist only until your browser cache is cleared.

## How to Run Locally
1. Clone or download this repository.
2. No build tools (like Webpack or Node.js) are strictly required.
3. Simply open `index.html` in any modern web browser to start the application.
4. *(Optional)* For the best experience testing cross-file routing, use a local server like VS Code Live Server or python's `http.server`.
