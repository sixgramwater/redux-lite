import React from 'react'

import { useModule, dispatch, container, useSelector } from './store';
// import { useMyHook } from 'redux-lite'

const Child = () => {
  // const count = useModule('counter').count;
  const count = useSelector('counter', state => state.count);
  const handleClick = () => {
    dispatch.counter.addCounter(1);
  }
  // const counterState = useModule('counter');
  // const count = counterState.count;
  return (
    <div>
      child: {count}
      <button onClick={handleClick}>increase Child</button>
    </div>
  )
}

const OtherChild = () => {
  const otherCount = useSelector('counter', state => state.otherCount);
  // const otherCount = useModule('counter').otherCount;
  const handleClick = () => {
    dispatch.counter.addOtherCount(-1);
  }
  return (
    <div>
      otherChild: {otherCount}
      <button onClick={handleClick}>inCrease OtherChild</button>
    </div>
  )
}
const App = () => {
  // console.log(container);
  // const counterState = container.getState('counter');
  // const count = useSelector('counter', state => state.count);
  // confirm
  // console.log(container);
  // console.log(counterState)
  // const count = counterState.count;
  const handleClick = () => {
    // console.log(dispatch.counter);
    dispatch.counter.addCounter(1);
  }

  const handleAsyncClick = () => {
    dispatch.counter.asyncAddCounter(1);
  }
  // const example = useMyHook()
  return (
    <div>
      {/* {count}
      <div>
        <button onClick={handleClick}>increase</button>
      </div>
      <div>
        <button onClick={handleAsyncClick}>Async increase</button>
      </div>       */}
      <div>
        <Child />
      </div>

      <br />

      <OtherChild />
    </div>
  )
}
export default App
