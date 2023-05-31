// Import Vuex
import { createStore } from 'vuex';

const store = createStore({
  // State: Hold your global variables here
  state: {
    properties: null,
  },
  mutations: {
    setProperties(state, properties) {
      state.properties = properties;
    },
  }
});

export default store;