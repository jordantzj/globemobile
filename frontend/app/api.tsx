import axios from 'axios';
import Constants from 'expo-constants';

const URL = Constants.expoConfig?.extra?.URL;
const documentId = Constants.expoConfig?.extra?.documentId;

export const getVisitedCountries = async () => {
  try {
    const response = await axios.get(`http://${URL}/visitedCountries`);
    console.log('Visited countries:', response.data);
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

export const addVisitedCountries = async (countries: string[]) => {
  try {
    console.log('Adding countries to:', `http://${URL}/addCountries`, 'with value:', countries);
    const response = await axios.post(`http://${URL}/addCountries`, {
      id: documentId,
      countries: countries,});
    return response.data;
  } catch (error) {
    console.error('Error adding countries:', error);

    if (axios.isAxiosError(error)) {
      console.error('Axios error message:', error.message);
      console.error('Axios error response:', error.response);
    }

    throw error;
  }
};
