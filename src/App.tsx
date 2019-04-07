import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import HomePageDeprecated from "./pages/HomePageDeprecated";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

const App = (): JSX.Element => {
  return (
    <Router>
      <div className="app" style={{ height: "100%", width: "100%" }}>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
      </div>
    </Router>
  );
};

export default App;
