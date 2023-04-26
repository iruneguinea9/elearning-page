// Name: Fetcher Post
// Author: Irune Guinea
// Description: Fetches data from an API using a POST method and returns the response data.
// Last updated: 26/04/2023 - V9
import { parseCookies} from 'nookies';

const fetcherPost = async (url, accessToken,datasent) => {
    try {
      const cookies = parseCookies();
      const accessToken = cookies.token;
      console.log('################ POSTING #####################');
      console.log('accessToken:', accessToken);
      console.log('url:', url);
      console.log('datasent:', datasent);
      console.log('#####################################');
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          
          Authorization: `Bearer ${accessToken}`, // Include the access token in the request headers
          "Content-Type": 'application/json',
          Accept: 'application/json'
        },
        body: datasent
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
  
  export default fetcherPost;