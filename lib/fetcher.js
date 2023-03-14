import { parseCookies } from 'nookies';
const fetcher = async (url) => {
    try {
      const cookies = parseCookies();
      const accessToken = cookies.token;
      console.log('#####################################')
      console.log('accessToken:', accessToken) 
      console.log('cookies:', cookies)
      console.log('url:', url)
      console.log('#####################################')
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`, 
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