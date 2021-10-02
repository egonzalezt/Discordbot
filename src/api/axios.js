const axios = require('axios')

function apiGetCall(URL)
{
  try {
    // create a promise for the axios request
    const promise = axios.get(URL)

    // using .then, create a new promise which extracts the data
    const dataPromise = promise.then((response) => response.data)

    // return it
    return dataPromise  
  } catch (error) 
  {
    console.error(error);
  }
}

function apiPostCall(URL)
{
  try {
    // create a promise for the axios request
    const promise = axios.post(URL)

    // using .then, create a new promise which extracts the data
    const dataPromise = promise.then((response) => response.data)

    // return it
    return dataPromise  
  } catch (error) 
  {
    console.error(error);
  }
}

module.exports = {apiGetCall,apiPostCall}