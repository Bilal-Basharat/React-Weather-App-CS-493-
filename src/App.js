import logo from './logo.svg';
import './App.css';
import Home from './home.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
<Router>
{/* <NavBar /> */}
<div className="App">

                <Switch>

                <Route path="/" exact component={Home} />
                
                </Switch>
                </div>
                
                </Router>            
  
    );
}

export default App;
