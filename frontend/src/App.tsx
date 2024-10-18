import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import CheeseMenu from "./components/cheeseMenu";
import CheeseDetails from "./pages/cheeseDetails";

const App: React.FC = () => {
  return (
    <Router>
      <Header title="PZ Cheeseria" subtitle="We'll give you a cheesy good time"/>
      <Routes>
        <Route path="/" element={<CheeseMenu />} />
        <Route path="/cheese/:id" element={<CheeseDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
