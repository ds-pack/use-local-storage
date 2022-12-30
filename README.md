# `@ds-pack/use-local-storage`

A small hook wrapping the local storage API

![Coverage: 100%](https://img.shields.io/badge/coverage-100%25-brightgreen?logo=jest)

## API

The library exports a `useLocalStorage` hook that you call with the result of a
hook that matches the return type of `useState`. The requirement being that the
value you provide `useLocalStorage` should be an array with at least two values,
the first being the value to store in local storage, and the second being an
updater function (e.g. dispatch, setState, etc.).

The second argument for the hook is an options object that supports the
following:

- `key` - A string that is used as the key for where the value will be stored in
  local storage
- `hydrate` - An optional boolean that if true will call the setValue argument
  when mounted, with the value from localStorage
- `getItem` - An optional override to the default
  `JSON.parse(window.localStorage.getItem(key))`
- `setItem` - An optional override to the default
  `window.localStorage.setItem(key, JSON.stringify(value))`

## Installation:

```sh
yarn add @ds-pack/use-local-storage
```

## Usage:

```tsx
import useLocalStorage from '@matthamlin/use-local-storage'

function Component() {
  let [value, setValue] = useLocalStorage<string>(useState('foo'), {
    key: 'your-app',
  })

  return (
    <label>
      Enter your name:
      <input
        type="text"
        value={value}
        onChange={({ target: { value } }) => setValue(value)}
      />
    </label>
  )
}
```

### Tools:

- Typescript
- Babel
- Jest
