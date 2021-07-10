import React from "react";
import Calendar from "./components/Calendar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {Provider} from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <Provider store = {store}>
      <Router>
        <Switch>
            <Route exact path="/">
              <div>
                <Calendar/>
              </div>
            </Route>
            <Route path="/year/:year/month/:monthDate">
                <div>
                  <Calendar/>
                </div>
            </Route>
          </Switch>
      </Router>
    </Provider>
  );
}

export default App;
