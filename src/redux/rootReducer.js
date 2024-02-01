import { combineReducers } from "redux";
import userReducer from "./reducers/userReducer";
import jwtReducer from "./reducers/jwtReducer";
import adminReducer from "./reducers/adminReducer";


const rootReducer = combineReducers({
  user: userReducer,
  auth: jwtReducer,
  admin: adminReducer
});

export default rootReducer;

