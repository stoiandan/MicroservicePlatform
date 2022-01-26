import { createStore } from "redux";
import LoginReducer from './reducers/login_reducer';


const store = createStore(LoginReducer);

export default store;