# Fullstack Currency Exchange App 💱 (Back End side)

A fullstack application using **NestJS** (backend) and **Next.js** (frontend) to get the EUR ➝ PLN exchange rate and simulate currency conversion.

---

## 🚀 Getting Started

### Backend (NestJS)
```bash
cd server
npm install
npm run start:dev
```

Endpoints:
- `GET /exchange`: Fetches and caches the EUR to PLN rate for 1 minute.
- `POST /transaction`: Accepts an amount in EUR, calculates PLN using the cached rate, and stores the transaction.
---

Features:
- Displays the current EUR ➝ PLN rate (via backend).
- Allows the user to input EUR and view the PLN equivalent.

---

## 🧪 Sample Requests

```http
GET /exchange
POST /transaction { "amount": 100 }
```
---

## 🛠️ Tech Stack

- **Frontend**: Next.js (React)
- **Backend**: NestJS
- **Language**: TypeScript
---