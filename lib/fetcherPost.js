// Name: Fetcher Post
// Author: Irune Guinea
// Description: Fetches data from an API using a POST method and returns the response data.
// Last updated: 20/03/2023 - V6

const fetcherPost = async (url, accessToken,datasent) => {
    try {
      console.log('################ POSTING #####################');
      console.log('accessToken:', accessToken);
      console.log('url:', url);
      console.log('datasent:', datasent);
      console.log('#####################################');
      const response = await fetch(url, {
        method: 'POST',
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
  
  export default fetcherPost;