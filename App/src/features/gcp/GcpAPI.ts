export function fetchData() {
  return fetch('http://localhost:3001/api/bigquery')
  .then(res => res.json())
  .then(response => {
    console.log("hi",response);
    if (!response) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response;
  })
}

export function fetchChartData() {
  return fetch('http://localhost:3001/api/bigquerychart')
  .then(res => res.json())
  .then(response => {
    console.log("hi",response);
    if (!response) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response;
  })
}

export function fetchBarChartData() {
  return fetch('http://localhost:3001/api/barquerychart')
  .then(res => res.json())
  .then(response => {
    console.log("hi",response);
    if (!response) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response;
  })
}

export function fetchColumnChartData() {
  return fetch('http://localhost:3001/api/columnquerychart')
  .then(res => res.json())
  .then(response => {
    console.log("hi",response);
    if (!response) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response;
  })
}

export function approveGcpDataAPI(data: any) {
  return fetch('http://localhost:3001/api/approvegcp',{
    method: 'POST',
    headers: {'Content-Type':'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': '*'  },
    body: JSON.stringify(data),
    mode: 'no-cors',
  })
  .then(res => res.json())
  .then(response => {
    console.log("hi",response);
    if (!response) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response;
  })
}

export function rejectGcpDataAPI(data: any) {
  return fetch('http://localhost:3001/api/rejectgcp',{
    method: 'POST',
    headers: {'Content-Type':'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': '*'  },
    body: JSON.stringify(data),
    mode: 'no-cors',
  })
  .then(res => res.json())
  .then(response => {
    console.log("hi",response);
    if (!response) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response;
  })
}

