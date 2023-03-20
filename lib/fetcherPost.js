// Name: Fetcher Post
// Author: Irune Guinea
// Description: Fetches data from an API using a POST method and returns the response data.
// Last updated: 17/03/2023 - V5

const fetcherPost = async (url, accessToken,datasent) => {
    try {
      console.log('################ POSTING #####################');
      console.log('accessToken:', accessToken);
      console.log('url:', url);
      console.log('#####################################');
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include the access token in the request headers
          Accept: 'application/json'
        },
        body: JSON.stringify(datasent)
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch data (status ${response.status})`);
      }
  
      const data = await response.json(); // Parse the response data
      console.log(data)
      return data; // Return the response data
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  export default fetcherPost;