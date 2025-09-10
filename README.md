# React + Vite

React Weather App

A simple and elegant weather app built with **React** and **Material UI**.  
Fetches real-time weather data using an external API.

---

## 🚀 Features
Search weather by city name  
Displays temperature, humidity, wind speed  
Responsive UI using **Material UI**  
Real-time API integration  

---

## 🛠️ Tech Stack
- **React.js**
- **Material UI**
- **OpenWeather API**
- **JavaScript (ES6+)**
- **CSS**

---

## ⚙️ Environment Setup
Create a `.env` in the project root with:
```bash
VITE_MAIN_API_URL=https://api.openweathermap.org/data/2.5/weather
VITE_MAIN_API_KEY=YOUR_API_KEY // To get this API url, Browse for openweather >> signup >> Get an API key
```
Note: `.env` is already git-ignored to keep your API key private. Commit a `.env.example` instead when sharing.

---

## ⚡ How to Run Locally
```bash
git clone <your-repo-url>
cd React_Wether_App-main
npm install
npm run dev
```
Open the printed Local URL (e.g., http://localhost:5173/).
