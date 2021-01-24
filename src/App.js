import './App.css';
import React, { useState } from 'react';
import HomePage from './components/HomePage';
import RoomPage from './components/RoomPage';
import MatchingPage from './components/MatchingPage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            <Route exact path ="/">
              <HomePage />
            </Route>
            <Route path="/:id/matching">
              <MatchingPage />
            </Route>
            <Route path="/:id" children={<RoomPage />} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
