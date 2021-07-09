import React from "react";
import Calendar from "./components/Calendar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
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
  );
}

export default App;
