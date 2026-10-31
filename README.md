# 🍲 Food Waste Management & Redistribution Platform

A simple and powerful web platform built to rescue surplus food from restaurants, hotels, and canteens and deliver it safely to local charities, shelters, and communities in need.

---

## 📌 The Problem
Every year, millions of tonnes of perfectly edible food are thrown away by restaurants, banquet halls, and institutional kitchens. At the same time, many people struggle to get a daily meal. 

Most of this food is thrown away simply because there is **no fast way to connect surplus food donors with people who can distribute it before it spoils**.

---

## 💡 The Solution
This platform bridges that gap by connecting three key groups in real time:

1. **Food Donors (Restaurants, Hotels, Canteens, Caterers):**
   - Can post extra, unserved food in seconds.
   - Set the number of meals, dietary details, and pickup deadline.
   
2. **Receivers (Verified NGOs, Food Banks, Shelters):**
   - Get notified when safe food is available nearby.
   - Claim meals with one tap and track arrival.

3. **Volunteers (Local Delivery Heroes):**
   - Pick up food parcels from donors.
   - Verify proper packaging and deliver directly to the NGO.

> **Food Safety First:** The system is strictly designed for **safe, unserved surplus food** (not plate leftovers), keeping in line with food safety regulations.

---

## ✨ Key Features

- **Multi-Role Dashboards:** Separate, clean interfaces for Food Donors, NGOs, and Volunteers.
- **Detailed Surplus Inventory & Expiry Tracking:** View complete food descriptions, portion counts, allergen chips, storage temperatures, active running duration, and color-coded expiry countdowns.
- **Live Dispatch Map:** An interactive visual map that tracks active donations, pickups, and deliveries across town.
- **Expiry & Pickup Timers:** Ensures food is picked up and distributed while it is still fresh and safe.
- **Food Safety Checklists:** Clear guidelines and verification steps before food is accepted and handed over.
- **Interactive 3D Assistant:** An engaging guide to help first-time users explore the platform.

---

## 📚 In-Depth Research & Safety Guide

For a simple, jargon-free breakdown of the underlying government statistics, UNEP data, and food safety regulations:
👉 **[Read the Full Project Summary & Research Guide (PROJECT_SUMMARY.md)](PROJECT_SUMMARY.md)**

It covers:
1. **Real Data vs Myths:** Breaking down the 78.2 million tonnes household estimate.
2. **Food Safety Standards:** Why plate leftovers and scraps are strictly prohibited under FSSAI rules.
3. **Jaipur Pilot Network:** Why local cluster operations work best for fast food recovery.
4. **Honest Metrics:** Accurately measuring rescued meals without confusing composting with human consumption.

---

## 🚀 How to Run the Project Locally

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your computer.

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/gauravpareek-web/Food-Waste-Management-.git
   cd Food-Waste-Management-
   ```

2. **Move into the web application folder:**
   ```bash
   cd site
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open in your browser:**
   Click the local link shown in your terminal (usually `http://localhost:5199/` or `http://localhost:5173/`).

---

## 📂 Project Structure

```text
Food-Waste-Management/
├── site/                     # Main web application
│   ├── src/
│   │   ├── components/       # UI parts (Landing page, Dashboards, Map, 3D Bot)
│   │   ├── data/             # Sample data, stats, and text content
│   │   ├── types.ts          # Data types and demo profiles
│   │   ├── App.tsx           # Main application router and state
│   │   └── main.tsx          # Application entry point
│   ├── public/               # Images, photos, and static assets
│   ├── package.json          # Project dependencies and run scripts
│   └── vite.config.ts        # Vite configuration
├── projectsummary.txt        # Research notes and national food waste data
├── promtforsite.txt          # Design notes and reference prompts
└── README.md                 # This file
```

---

## 🛠️ Built With

- **React & TypeScript** — For building a fast, interactive user interface.
- **Vite** — For ultra-fast local development and building.
- **Tailwind CSS** — For clean, modern styling that works on all screen sizes.
- **Lucide Icons** — Friendly, lightweight icons across all dashboards.
- **Three.js** — Smooth 3D graphics for interactive platform visuals.

---

## 🤝 Contributing

Contributions are always welcome! If you would like to improve this project:
1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License
This project is open source and available under the [MIT License](LICENSE).

