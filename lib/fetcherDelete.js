// Name: Fetcher Delete
// Author: Irune Guinea
// Description: To delete a course
// Last updated: 27/03/2023 - V2

const fetcherDelete = async (url, accessToken) => {
    try {
      console.log('################ DELETING #####################');
      console.log('accessToken:', accessToken);
      console.log('url:', url);
      console.log('#####################################');
      const response = await fetch(url, {
        method: 'DELETE',
        mode: 'no-cors',
        headers: {
          
          Authorization: `Bearer ${accessToken}`, // Include the access token in the request headers
          "Content-Type": 'application/json'
        },
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
  
  export default fetcherDelete;