// Name : Fetcher
// Author : Irune Guinea
// With this fetcher I make the calls to the API and return the data or launch the error
// Last update 16/03/2023 - V2
const fetcher = async (url, accessToken) => {
    try {
      console.log('############### GETTING ######################')
      console.log('accessToken:', accessToken) 
      console.log('url:', url)
      console.log('#####################################')
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
    // ########################################## RETURN ##########################################
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  export default fetcher;