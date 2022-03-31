import { fetch } from "../api";

const counterState = {
  count: 0,
  otherCount: -100,
}

const counter = {
  state: counterState,
  reducers: {
    addCounter({ state, payload }) {
      return {
        ...state,
        count: state.count + payload,
      }
    },
    addOtherCount({ state, payload}) {
      return {
        ...state,
        otherCount: state.otherCount + payload
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