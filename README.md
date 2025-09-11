# WeatherScope 🌤️

> Your Personal Weather Companion - A modern, feature-rich weather application built with React and Material-UI

![WeatherScope Demo](https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&auto=format&fit=crop&q=60)


## 👥 Team Members & DevOps Roles
- **23211a6774** - Coding (Frontend + Backend Development)
- **23211a6777** - CI (Continuous Integration)
- **23211a6792** - Planning (Project Architecture & Strategy)
- **23211a6794** - Git Manager (Version Control & Repository Management)
- **23211a67A0** - Monitoring (System Monitoring & Observability)
- **23211a67B7** - Docker Manager (Containerization & Deployment)
- **23211a67C3** - CD (Continuous Deployment)


## 🚀 Features

### 🔐 Authentication System
- **Modern Login/Signup**: Beautiful, responsive authentication pages with form validation
- **Persistent Sessions**: User sessions are maintained across browser refreshes
- **Protected Routes**: Weather app is only accessible after authentication
- **User Management**: Profile display and secure logout functionality

### 🌍 Advanced Location Features
- **Current Location Detection**: Automatic weather detection using GPS coordinates
- **Global Search**: Search for any city worldwide with enhanced accuracy
- **Country/State Selection**: Dropdown filters to avoid ambiguous city names
- **Recent Searches**: Quick access to previously searched locations
- **Precise Location Matching**: Handles cities with same names in different countries/states

### 🎨 Modern UI/UX
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dynamic Backgrounds**: Weather-condition and temperature-based color schemes
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **Material Design**: Consistent, professional interface using Material-UI
- **Dark/Light Adaptation**: Interface adapts to weather conditions

### 🌤️ Comprehensive Weather Data
- **Detailed Metrics**: Temperature, humidity, pressure, wind speed, visibility
- **Weather Conditions**: Real-time weather descriptions with appropriate icons
- **Temperature Ranges**: Min/max temperatures with trend indicators
- **Sun Times**: Sunrise and sunset information
- **Cloud Coverage**: Visual representation of cloudiness percentage
- **Weather Advice**: Contextual tips based on current conditions

### 🎭 Visual Enhancements
- **Dynamic Weather Icons**: Lucide React icons that change based on conditions
- **Weather Images**: High-quality Unsplash images matching weather conditions
- **Temperature-based Styling**: Hot, mild, cool, and cold temperature themes
- **Interactive Elements**: Hover effects and loading states
- **Splash Screen**: Animated startup screen with weather-themed graphics

## 🏗️ System Architecture

### Frontend Architecture
```
┌─────────────────────────────────────┐
│           React App (Vite)          │
├─────────────────────────────────────┤
│  Authentication Layer (Context API) │
├─────────────────────────────────────┤
│     Protected Route Wrapper         │
├─────────────────────────────────────┤
│    Enhanced Weather Components      │
├─────────────────────────────────────┤
│     Material-UI + Framer Motion    │
├─────────────────────────────────────┤
│        OpenWeather API Layer       │
└─────────────────────────────────────┘
```

### Component Hierarchy
```
App.jsx (Theme Provider + Auth Provider)
├── ProtectedRoute.jsx
│   ├── AuthWrapper.jsx
│   │   ├── Login.jsx
│   │   └── Signup.jsx
│   └── EnhancedWeatherApp.jsx
│       ├── SplashScreen.jsx
│       ├── EnhancedSearchBox.jsx
│       └── EnhancedInfoBox.jsx
└── Utils
    └── weatherUtils.js
```

## 📁 Project Structure

```
mini-react-project/
├── public/
│   ├── vite.svg
│   └── index.html
├── src/
│   ├── components/              # React Components
│   │   ├── AuthWrapper.jsx      # Auth flow controller
│   │   ├── Login.jsx           # Login form component
│   │   ├── Signup.jsx          # Signup form component
│   │   ├── ProtectedRoute.jsx   # Route protection
│   │   ├── SplashScreen.jsx     # Animated loading screen
│   │   ├── EnhancedSearchBox.jsx # Advanced search functionality
│   │   ├── EnhancedInfoBox.jsx  # Weather data display
│   │   └── EnhancedWeatherApp.jsx # Main app container
│   ├── context/                # React Context
│   │   └── AuthContext.jsx     # Authentication state management
│   ├── utils/                  # Utility functions
│   │   └── weatherUtils.js     # Weather-related helpers
│   ├── legacy/                 # Original components (preserved)
│   │   ├── WeatherApp.jsx      # Original weather app
│   │   ├── SearchBox.jsx       # Original search component
│   │   ├── InfoBox.jsx         # Original info display
│   │   └── login.jsx           # Original login component
│   ├── App.jsx                 # Root component
│   ├── main.jsx               # App entry point
│   └── index.css              # Global styles
├── .env                       # Environment variables
├── package.json              # Dependencies and scripts
├── vite.config.js           # Vite configuration
└── README.md               # This file
```

## 🔄 Data Flow

### Authentication Flow
```
1. User visits app → Splash Screen (3s)
2. AuthContext checks localStorage for saved user
3. If no user → Show AuthWrapper (Login/Signup)
4. User submits credentials → AuthContext validates
5. On success → Store user data → Show WeatherApp
6. User can logout → Clear storage → Return to auth
```

### Weather Data Flow
```
1. App loads → Auto-detect current location (optional)
2. User searches city → EnhancedSearchBox validates input
3. API call to OpenWeather with enhanced parameters
4. Response transformed to standardized weather object
5. WeatherUtils processes data (icons, images, advice)
6. EnhancedInfoBox renders with dynamic styling
7. Recent searches saved to localStorage
```

### State Management
```
AuthContext (Global)
├── user: User object or null
├── isLoading: Authentication loading state
├── login(): Authenticate user
├── signup(): Register new user
└── logout(): Clear user session

WeatherApp (Local)
├── weatherData: Current weather information
├── loading: API request loading state
├── showSplash: Splash screen visibility
└── anchorEl: User menu state
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- OpenWeather API key (free at openweathermap.org)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mini-react-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env`
   - Get your API key from [OpenWeather](https://openweathermap.org/api)
   - Update the `.env` file:
   ```env
   VITE_WEATHER_API_URL=https://api.openweathermap.org/data/2.5/weather
   VITE_WEATHER_API_KEY=your_api_key_here
   VITE_GEO_API_URL=https://api.openweathermap.org/geo/1.0/direct
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:5173`
   - Create an account or login
   - Start exploring weather data!

### Build for Production

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory, ready for deployment.

## 🔑 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `VITE_WEATHER_API_URL` | OpenWeather API base URL | Yes | - |
| `VITE_WEATHER_API_KEY` | Your OpenWeather API key | Yes | - |
| `VITE_GEO_API_URL` | Geocoding API URL | No | OpenWeather geo API |

## 🌐 API Integration

### OpenWeather API Usage
The application uses OpenWeather's Current Weather Data API with the following features:

- **Rate Limiting**: Respects free tier limits (1000 calls/day)
- **Error Handling**: Graceful error messages for API failures
- **Caching**: Recent searches stored locally to reduce API calls
- **Fallback**: Legacy environment variable support

### API Endpoints Used
1. **Current Weather**: `/data/2.5/weather`
2. **Geocoding**: `/geo/1.0/direct` (for location disambiguation)

## 🎨 Theming & Customization

### Material-UI Theme
The app uses a custom Material-UI theme with:
- **Primary Color**: `#667eea` (Soft Blue)
- **Secondary Color**: `#764ba2` (Purple)
- **Typography**: Inter font family
- **Border Radius**: 12px for modern look
- **Shadows**: Elevated cards with soft shadows

### Weather-Based Styling
- **Hot Weather**: Red/Orange gradients (35°C+)
- **Warm Weather**: Orange/Yellow gradients (25-35°C)
- **Mild Weather**: Blue/Teal gradients (15-25°C)
- **Cool Weather**: Cool blue gradients (5-15°C)
- **Cold Weather**: Light blue/Gray gradients (<5°C)

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 600px (xs)
- **Tablet**: 600px - 960px (sm)
- **Desktop**: > 960px (md+)

### Mobile Optimizations
- Touch-friendly buttons and inputs
- Optimized search interface
- Stacked weather information cards
- Collapsible user menu

## 🔒 Security Features

- **Client-side Authentication**: Secure user session management
- **Input Validation**: Form validation for all user inputs
- **API Key Protection**: Environment variable usage
- **XSS Prevention**: React's built-in protection
- **CSRF Protection**: No server-side state management

## 🚀 Performance Optimizations

- **Code Splitting**: React.lazy for component loading
- **Image Optimization**: Optimized Unsplash image URLs
- **API Caching**: LocalStorage for recent searches
- **Minimal Re-renders**: Efficient state management
- **Bundle Optimization**: Vite's optimized bundling

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📋 Future Enhancements

- [ ] **Weather Forecast**: 5-day weather predictions
- [ ] **Weather Maps**: Interactive weather maps
- [ ] **Push Notifications**: Weather alerts and notifications
- [ ] **Favorite Locations**: Save and manage favorite cities
- [ ] **Weather Widgets**: Customizable weather widgets
- [ ] **Social Sharing**: Share weather conditions
- [ ] **Offline Mode**: Cached weather data for offline use
- [ ] **Multiple Units**: Fahrenheit, Kelvin temperature options
- [ ] **Weather History**: Historical weather data
- [ ] **Premium Features**: Advanced weather analytics

## 🐛 Troubleshooting

### Common Issues

**App won't start:**
- Check Node.js version (v16+)
- Run `npm install` to ensure dependencies are installed
- Verify `.env` file exists with correct API key

**Weather data not loading:**
- Verify OpenWeather API key is valid
- Check network connectivity
- Ensure API key hasn't exceeded rate limits

**Location detection not working:**
- Enable location permissions in browser
- Try using HTTPS (required for geolocation)
- Use manual search as fallback

**Authentication issues:**
- Clear browser's localStorage
- Disable browser extensions that might interfere
- Check browser console for errors

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## 🙏 Acknowledgments

- [OpenWeather API](https://openweathermap.org/) - Weather data provider
- [Material-UI](https://mui.com/) - React component library
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Lucide React](https://lucide.dev/) - Icon library
- [Unsplash](https://unsplash.com/) - High-quality weather images
- [Country State City](https://github.com/harpreetkhalsagtbit/country-state-city) - Location data

---


🐳 Docker Containerization & Deployment By 23211A67B7
Branch: docker

🛠️ Summary of Changes
Dockerfile Added
Implemented a multi-stage Dockerfile for optimized builds:

Stage 1 (Builder): Used node:18-alpine to install dependencies and build the React app.

Stage 2 (Runtime): Used lightweight nginx:alpine to serve the production build.
This approach significantly reduced the final image size and improved runtime performance.

Docker Compose Setup
Created docker-compose.yml for simplified container orchestration.

Configured the React app service with:

Auto-restart policy (restart: always)

Port mapping (3000:80) for local access

Container name react-weather-app-container

Local Build & Run
Built the image with:

docker build -t react-weather-app .

Ran locally with:

docker run -d -p 3000:80 react-weather-app

Verified functionality at: http://localhost:3000

DockerHub Integration
Tagged and pushed the image to DockerHub:

docker tag react-weather-app mytreya2005/react-weather-app:latest
docker push mytreya2005/react-weather-app:latest

Final public image available at: 👉 https://hub.docker.com/r/mytreya2005/react-wether-app

Outcome
The React Weather Application is now fully containerized and portable. Team members and reviewers can run the app instantly using a single command:

docker run -d -p 3000:80 mytreya2005/react-weather-app:latest

This ensures consistency across environments, faster setup, and a production-ready deployment workflow.

<div align="center">
  <p><strong>Built with ❤️ for weather enthusiasts</strong></p>
  <p>WeatherScope © 2024</p>
</div>

# React + Vite

A React Weather App 
