import { useState } from 'react';
import Navigation from './components/Navigation/Navigation';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/Authorization/Register/Register'
import Login from './components/Authorization/Login/Login'
import ProductManager from './components/ProductManager/ProductManager'

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const login = () => {
    setLoggedIn(true);
  }
  const logout = () => {
    setLoggedIn(false);
  }

  return (
    <Router>
      <div className="App">
        <Navigation loggedIn={loggedIn} logout={logout} />
        <Switch>
          <Route exact path="/">
            <ProductManager loggedIn={loggedIn} />
          </Route>
          <Route path="/login">
            <Login login={login} />
          </Route>
          <Route path="/register" component={Register} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
