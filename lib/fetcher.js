import { parseCookies } from 'nookies';
// Example fetcher function for the API
const fetcher = async (url, accessToken) => {
    try {
      const cookies = parseCookies();
      const accessToken = cookies.token;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`, // Pass the access token in the request headers
          Accept: 'application/json'
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch data (status ${response.status})`);
      }
  
      const data = await response.json(); // Parse the response data
  
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  export default fetcher;