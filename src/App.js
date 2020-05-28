import React from 'react';
import { BrowserRouter as Router,Route,Switch,Redirect } from 'react-router-dom'
import Home from './pages/Home'
import CityList from './pages/CityList'
import Map from './pages/Map'
import Fn404 from './pages/NotFound'

function App() {
  return (
  <div className="app">
     <Router>
        <Switch>
          {/* <Redirect exact from="/" to="/home"></Redirect> */}
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          <Route path="/home" component={Home} />
          <Route path="/citylist" component={CityList} />
          <Route path="/map" component={Map} />
          <Route component={Fn404} />
        </Switch>
    </Router>
    </div>
  );
}

export default App;
