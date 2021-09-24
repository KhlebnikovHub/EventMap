import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Main from "./components/Main/Main.jsx";
import Footer from "./components/Footer/Footer.jsx";
import "./App.css";

function App() {



  return (
    <>
      <Router>
        <Header />

        <Main />

        <Footer />
      </Router>
    </>
  );
}

export default App;
