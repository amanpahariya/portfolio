import { BrowserRouter as Router, Switch,Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';

function App() {
  return (

    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" exact component={Home} />
        <Route path="/resume" exact component={Home} />
        <Route path="/contact-us" exact component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
