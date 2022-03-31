# redux-lite

> simple library for state management inspired by redux and react-redux

[![NPM](https://img.shields.io/npm/v/redux-lite.svg)](https://www.npmjs.com/package/redux-lite) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save redux-lite
```

## Usage

```tsx
import * as React from 'react'

import { useMyHook } from 'redux-lite'

const Example = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
```

## License

MIT © [sixgramwater](https://github.com/sixgramwater)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
