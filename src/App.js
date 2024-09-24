import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import "./App.css";
import MainPage from "./pages/MainPage";
import MyFlights from "./pages/MyFlights";
import MainHeader from "./components/MainPage/MainHeader";
import FlightProvider from "./context/flightsContext";

function App() {

  return (
    <FlightProvider>
      <Router>
        <MainHeader />
        <main className="main-container">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/my-flights" element={<MyFlights />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </Router>
    </FlightProvider>
  );
}

export default App;
