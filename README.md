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
- **Jest** (Testing)
- **GitHub Actions** (CI/CD)

---

## ⚙️ Environment Setup
Create a `.env` in the project root with:
```bash
VITE_MAIN_API_URL=https://api.openweathermap.org/data/2.5/weather
VITE_MAIN_API_KEY=YOUR_API_KEY
```
Note: `.env` is already git-ignored to keep your API key private. Commit a `.env.example` instead when sharing.

---

## ⚡ How to Run Locally
```bash
git clone <your-repo-url>
cd React_Wether_App
npm install
npm run dev
```
Open the printed Local URL (e.g., http://localhost:5173/).


## 🧪 Testing
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

---

## 🚀 CI/CD Pipeline
This project uses **GitHub Actions** for continuous integration:

### What the CI does:
- ✅ **Linting**: Runs ESLint to check code quality
- ✅ **Testing**: Executes Jest test suite
- ✅ **Coverage**: Generates test coverage reports
- ✅ **Building**: Ensures the project builds successfully
- ✅ **Multi-Node**: Tests on Node.js 18.x and 20.x

### CI Triggers:
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches

### Test Coverage:
The CI pipeline generates coverage reports and uploads them to Codecov (optional).