// Name: Fetcher Put
// Author: Irune Guinea
// Description: Fetches data from an API using a PUT method and returns the response data.
// Last updated: 25/04/2023 - V3
import { parseCookies} from 'nookies';

const fetcherPut = async (url, accessToken,datasent) => {
    try {
      const cookies = parseCookies();
      const accessToken = cookies.token;
      console.log('################ UPDATING #####################');
      console.log('accessToken:', accessToken);
      console.log('url:', url);
      console.log('datasent:', datasent);
      console.log('#####################################');
      const response = await fetch(url, {
        method: 'PUT',
        mode: 'no-cors',
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include the access token in the request headers
          "Content-Type": 'application/json'
        },
        body: datasent,
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch data (status ${response.status})`);
      }
  
      const data = await response.json(); // Parse the response data
      console.log("response: ",response)
      return data; // Return the response data
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  export default fetcherPut;