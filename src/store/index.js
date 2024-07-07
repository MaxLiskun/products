import { createStore } from "vuex";

import mainPage from "./modules/mainPage"



const store = createStore({
  modules: {
    mainPage,
  },
});


//export default store;
export default store;
