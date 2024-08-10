export function fetchData() {
  return fetch('https://dummyjson.com/products/')
  .then(res => res.json())
  .then(response => {
    console.log("hi",response);
    if (!response) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response;
  })
}