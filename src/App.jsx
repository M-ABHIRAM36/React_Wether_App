import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import WeatherApp from "./WeatherApp";
import Login from "./login";

function App() {
  return (
    <Router>
      <nav style={{ padding: "10px", background: "#eee" }}>
        <Link to="/" style={{ marginRight: "10px" }}>Home</Link>
        <Link to="/login">Login</Link>
      </nav>
      <Routes>
        <Route path="/" element={<WeatherApp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;

// import './App.css'
// import Button from '@mui/material/Button';

// import SearchBox from './SearchBox';
// import InfoBox from './infoBox';
// import WeatherApp from './WeatherApp';
// import Login from "./login";
// function App() {

//   return (
//    <div>
//         <div>
//       <Login />
//     </div>
//     <WeatherApp/>
//    </div>
//   );
// }

// export default App;





{/* <Button>Click me!</Button><br /><br />
<Button variant="text">Text</Button><br /><br />
<Button variant="contained">Contained</Button><br /><br />
<Button variant="outlined">Outlined</Button><br /><br /> */}