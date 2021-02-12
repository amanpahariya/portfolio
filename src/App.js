import { BrowserRouter as Router, Switch,Route } from 'react-router-dom';
import './App.css';
import About from './components/About';
import ContactUs from './components/ContactUs';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Resume from './components/Resume';

function App() {
  return (

    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" exact component={About} />
        <Route path="/resume" exact component={Resume} />
        <Route path="/contact-us" exact component={ContactUs} />
      </Switch>
    </Router>
  );
}

export default App;
