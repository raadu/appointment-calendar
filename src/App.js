import React from "react";
import Calendar from "./components/Calendar";
import store from './redux/store';
import {Provider} from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App() {

  return (
    <Provider store = {store}>
      <Router>
        <Switch>
            <Route exact path="/">
              <Calendar/>
            </Route>
            <Route path="/year/:year/month/:monthDate">
                <Calendar/>
            </Route>
          </Switch>
      </Router>
    </Provider>
  );
}

export default App;
