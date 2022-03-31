import React from 'react'

import { useModule, dispatch, container } from './store';
// import { useMyHook } from 'redux-lite'

const App = () => {
  // console.log(useModule)
  // const counterState = container.getState('counter');
  const counterState = useModule('counter');
  // console.log(counterState)
  const count = counterState.count;
  const handleClick = () => {
    // console.log(dispatch.counter);
    dispatch('counter/addCounter', 1);
  }

  const handleAsyncClick = () => {
    dispatch('counter/asyncAddCounter', 1);
  }
  // const example = useMyHook()
  return (
    <div>
      {count}
      <button onClick={handleClick}>increase</button>
      <button onClick={handleAsyncClick}>Async increase</button>
      
    </div>
  )
}
export default App
