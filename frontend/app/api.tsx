import axios from 'axios';

const API_URL = 'http://192.168.86.33:3000'; // Expo's IP address

export const getVisitedCountries = async () => {
  try {
    const response = await axios.get(`${API_URL}/visitedCountries`);
    console.log('Visited countries blah:', response.data);
    return response.data;
  } catch (error: unknown) {
    console.error('Error fetching countries:', error);
    
    // Type Guard for AxiosError
    if (axios.isAxiosError(error)) {
      console.error('Axios error message:', error.message);
      console.error('Axios error response:', error.response);
    } else if (error instanceof Error) {
      console.error('Standard error message:', error.message);
    } else {
      console.error('Unknown error:', error);
    }
  }
  
};

// export const addVisitedCountries = async (country: string) => {
//   try {
//     const response = await axios.post(`${API_URL}/visitedCountries`, country);
//     return response.data;
//   } catch (error) {
//     console.error('Error adding user:', error);
//     throw error;
//   }
// };
