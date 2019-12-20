import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ColorList from "./components/ColorList";
import BubblePage from './components/BubblePage';
import Login from "./components/Login";
import "./styles.scss";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <div className="App">
        <PrivateRoute path="/colors" component={BubblePage} />
        <Route path="/login" component={Login} />
        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
      </div>
    </Router>
  );
}

export default App;
