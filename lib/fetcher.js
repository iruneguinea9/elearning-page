// Example fetcher function for the API
const fetcher = async (url, accessToken) => {
    try {
     
      const response = await fetch(url, {
        headers: {
          method: 'GET',
          Authorization: `Bearer ${accessToken}`, // Pass the access token in the request headers
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
  
      const data = await response.json(); // Parse the response data
  
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  export default fetcher;