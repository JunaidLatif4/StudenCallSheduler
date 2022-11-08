import { createStore } from "redux";

import AllReducres from "./GlobalStore/index";

const GlobalState = createStore(AllReducres, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default GlobalState;