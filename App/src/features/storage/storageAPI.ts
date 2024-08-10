export function readStorage() {
  return fetch('http://localhost:3001/api/readStorage')
  .then(res => res.json())
  .then(response => {
    console.log("hi",response);
    if (!response) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response;
  })
}