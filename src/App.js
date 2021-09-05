import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import './App.css';
import About from "./components/About";
import Home from './components/Home';
import Navbar from './components/Navbar';
import NoteState from "./context/notes/noteState";

function App() {
  return (
    <>
    <NoteState>
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
    </NoteState>
    </>
  );
}

export default App;
