export const fetch = (delay) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('fetched Data');
    }, delay) 
  })
}