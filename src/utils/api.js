import axios from 'axios'


const BASE_URL='https://youtube138.p.rapidapi.com';

const options = {
  method: 'GET',
  url: 'https://youtube138.p.rapidapi.com/auto-complete/',
  params: {
    q: 'desp',
    hl: 'en',
    gl: 'US'
  },
  headers: {
    'X-RapidAPI-Key': '8c943a7ea3mshd5e941d41670764p15e4bdjsn4606c3d4e89e',
    'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
  }
};




export const fetchDataFromApi = async (url) => {
  const MAX_RETRIES = 5;
  let retries = 0;

  while (retries < MAX_RETRIES) {
    try {
      const response = await axios.get(`${BASE_URL}/${url}`, options);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 429) {
        // If 429 received, wait and retry
        const waitTime = 1000 * (2 ** retries);
        await new Promise(resolve => setTimeout(resolve, waitTime));
        retries++;
      } else {
        console.error('Error fetching data:', error);
        throw error;
      }
    }
  }

  throw new Error('Max retries exceeded');
};
