// store.js file is for storing and creating the redux store
import {createStore} from 'redux';
import rootReducer from './rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

// createStore function takes reducer as argument
const store = createStore(
    rootReducer,
    composeWithDevTools(),
);

export default store;
