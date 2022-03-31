import { fetch } from "../api";
const counterState = {
  count: 0,
}

const counter = {
  state: counterState,
  reducers: {
    addCounter({ state, payload }) {
      return {
        ...state,
        count: state.count + payload,
      }
    }
  },
  effects: {
    asyncAddCounter({dispatch, state, payload}) {
      fetch(1000).then(value => {
        console.log(value);
        dispatch('counter/addCounter', payload);
      })  
    }
  }
}

export default counter;