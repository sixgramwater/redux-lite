# redux-lite

> A lightweight state management library for react inspired by redux and react-redux

[![NPM](https://img.shields.io/npm/v/@sixgramwater/redux-lite)](https://www.npmjs.com/package/@sixgramwater/redux-lite) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @sixgramwater/redux-lite
```

## Usage

### 1. create a single module
```jsx
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
    // create thunk in effects to dispatch async action
    asyncAddCounter({dispatch, state, payload}) {
      fetch(1000).then(value => {
        dispatch.counter.addCounter(payload);
      })  
    }
  }
}
```

### 2. setup modules and invoke `create()`
```jsx
// setup modules and invoke create()
const modules = { counter };
export const { useModule, dispatch, useSelector } = create(modules);
```

### 3. get selected state using `useSelector()` hook
```jsx
// App.jsx
import { useModule, dispatch, useSelector } from './store';

const App = () => {
  // const counterState = useModule('counter');
  // const count = counterState.count;
  const count = useSelector('counter', state => state.count);
  const handleClick = () => {
    dispatch.counter.addCounter(1);
  }

  const handleAsyncClick = () => {
    dispatch.counter.asyncAddCounter(1);
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

## Api
### `create(modules)`
| Property | Description | Type |
| :----: | :----: | :----: |
| modules | A collection of registered modules | {string, Module} |

### `useSelector(moduleName, selector)`
| Property | Description | Type |
| :----: | :----: | :----: |
| moduleName | The name of the module used returns the corresponding status | string |
| selector | the selector function used to return the exact data you select | Function |

### `dispatch.{moduleName}.{fnName}(payload)`
| Property | Description | Type |
| :----: | :----: | :----: |
| moduleName | The specific module name of the call should be registered in create | string |
| fnName | The method name of the call module, reducer/effect | string |
| payload | The load value passed | object |

## License

MIT © [sixgramwater](https://github.com/sixgramwater)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
