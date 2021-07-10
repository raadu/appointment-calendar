import React from "react";
import Calendar from "./components/Calendar";
import store from './redux/store';
import {Provider} from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {RootContainer} from './styles/AppStyles';

function App() {

  return (
    <RootContainer>
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
    </RootContainer>
  );
}

export default App;
