import { createStore } from "redux";
import reducer from "../reducers/index";

const AppStore = createStore(reducer);

export default AppStore;