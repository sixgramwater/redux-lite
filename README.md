# redux-lite

> simple library for state management inspired by redux and react-redux

[![NPM](https://img.shields.io/npm/v/redux-lite.svg)](https://www.npmjs.com/package/redux-lite) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save redux-lite
```

## Usage

```tsx
// store/counter.ts
import { fetch } from "../api";

const counterState = {
  count: 0,
}

// A single module named: counter
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

// setup modules and invoke create()
const modules = { counter };
export const { useModule, dispatch } = create(modules);


// App.jsx
import { useModule, dispatch } from './store';

const App = () => {
  const counterState = useModule('counter');
  const count = counterState.count;
  const handleClick = () => {
    dispatch('counter/addCounter', 1);
  }

  const handleAsyncClick = () => {
    dispatch('counter/asyncAddCounter', 1);
  }
  return (
    <div>
      {count}
      <button onClick={handleClick}>increase</button>
      <button onClick={handleAsyncClick}>Async increase</button>
      
    </div>
  )
}
```

## License

MIT © [sixgramwater](https://github.com/sixgramwater)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
