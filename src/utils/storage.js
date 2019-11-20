export const getFromStorage = (key) => {
  if (sessionStorage.getItem(key)) {
    return JSON.parse(sessionStorage.getItem(key))
  } else {
    return false
  }
}

export const setToStorage = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value))
}
