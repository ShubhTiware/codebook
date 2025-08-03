import AllRoutes from "./routes/AllRoutes";
import { Footer, Header } from "./components";
import "./App.css";
import React from "react";

function App() {
  return (
    <div className="App dark:bg-darkbg">
      <Header />
      <AllRoutes />
      <Footer />
    </div>
  );
}

export default App;
