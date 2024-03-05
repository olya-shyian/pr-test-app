export const getLocalStorage = <Type>(key: string, startValue: Type) => {
  const saveItem = (value: Type) => {
    localStorage.setItem(key, JSON.stringify(value))
  }

  const localData = localStorage.getItem(key)

  if (!localData) {
    saveItem(startValue)

    return [startValue, saveItem]
  }

  try {
    return [JSON.parse(localData), saveItem]
  } catch {
    localStorage.removeItem(key)

    return [startValue, saveItem]
  }
}
