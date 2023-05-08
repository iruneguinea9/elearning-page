// File: api/fetcher.js
// Author: Irune Guinea
// Description: This fetches data from an API and returns it or throws an error
// Last update: 08/05/2023 - V34

import { parseCookies } from 'nookies';

const fetcher = async (url, accessToken) => {
  try {
    console.log('############### GETTING ######################');
    console.log('accessToken:', accessToken);
    console.log('url:', url);
    console.log('#####################################');
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`, // Pass the access token in the request headers
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data (status ${response.status})`);
    }

    const data = await response.json(); // Parse the response data

    console.log('############### RESPONSE ######################');
    console.log('data:', data);
    console.log('#####################################');

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default fetcher;