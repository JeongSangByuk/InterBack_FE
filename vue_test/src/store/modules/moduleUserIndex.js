export const moduleUserIndex = {
    namespaced: true,
    
    state: () => ({ 
        index: 0 
    }),

    getters: {
      getUserIndex(state) {
       // state.index = state.index + 1;

        return state.index;
      }
    },

    mutations: {
      setUserIndex(state, value) {
        state.index = value;
      }
    },

    actions: {
      test() {
        console.log("actions test");
      }
    }
  };
  