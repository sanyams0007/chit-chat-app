import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import LoginForm from "./components/LoginForm";
import Chats from "./components/Chats";

const App = () => {
  return (
    <div>
      <Router>
        <AuthProvider>
          <Switch>
            <Route path="/chats" component={Chats} />
            <Route path="/" component={LoginForm} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
};

export default App;
