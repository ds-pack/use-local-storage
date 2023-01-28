'use client'
import { useEffect, useRef } from 'react'

function defaultGetItem<Value>(key: string): Value | string {
  try {
    return JSON.parse(window.localStorage.getItem(key))
  } catch (e) {
    return window.localStorage.getItem(key)
  }
}

function defaultSetItem<Value>(key: string, value: Value): void {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export interface Options<Value> {
  key: string
  hydrate?: boolean
  getItem?(key: string): Value | string
  setItem?(key: string, value: Value): void
}

export function useLocalStorage<Value>(
  [value, dispatch]: [Value, any],
  {
    key,
    hydrate = true,
    getItem = defaultGetItem,
    setItem = defaultSetItem,
  }: Options<Value> = {} as Options<Value>,
) {
  if (typeof dispatch !== 'function') {
    throw new TypeError(
      `Invalid type provided for the second value of the first argument. You provided: ${typeof dispatch}`,
    )
  }
  if (typeof key !== 'string') {
    throw new TypeError(
      `Invalid type provided for the key. Expected string, you provided: ${typeof key}`,
    )
  }

  let mountedRef = useRef(false)

  useEffect(() => {
    // only hydrate once
    if (hydrate && !mountedRef.current) {
      dispatch({ type: 'hydrated', value: getItem(key) })
    }
  }, [key, hydrate, getItem])

  useEffect(() => {
    if (mountedRef.current) {
      setItem(key, value)
    } else {
      mountedRef.current = true
    }
  }, [key, value, setItem])

  return [value, dispatch]
}
