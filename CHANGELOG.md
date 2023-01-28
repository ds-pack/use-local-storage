## 0.2.0

- Updated the call signature of the dispatch/setState function passed into the
  hook, it now calls the function with a payload object matching the following
  signature: `{ type: 'hydrated', value: Value }`
