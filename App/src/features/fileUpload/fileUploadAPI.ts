export function fetchData(files: any) {
  return fetch('http://localhost:3001/api/googlecloudupload',{
    method: 'POST',
    headers: {'Content-Type':'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': '*'  },
    mode: 'no-cors',
    body: files
  }).then(res => res.json())
    .then(response => {
      console.log("hi",response);
      if (!response) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response;
    })
}

export function fetchJsonData() {
  // return fetch('http://localhost:3001/api/googlecloudFetchPeopleData',{
  //   method: 'POST',
  //   headers: {'Content-Type':'application/text',
  //   'Access-Control-Allow-Origin':'*'},
  //   mode: 'no-cors',
  // }).then(response => {
  //   console.log('fetchJsonData',response);
  //   debugger;
  //     if (!response) {
  //       throw new Error(`HTTP error! Status: ${response}`);
  //     }
  //     return response;
  //   })

  return fetch('http://localhost:3001/api/googlecloudFetchPeopleData')
  .then(res => res.json())
  .then(response => {
    console.log("hi",response);
    if (!response) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response;
  })
}