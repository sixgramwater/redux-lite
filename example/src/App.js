import React from 'react'

import { useMyHook } from 'redux-lite'

const App = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
export default App
