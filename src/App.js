import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import './App.css';
import About from "./components/About";
import Home from './components/Home';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Switch>
            <Route exact path="/about">
              <About/>
            </Route>
            <Route exact path="/about">
              <Home />
            </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
