import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const getVisitedCountries = async () => {
  try {
    const response = await axios.get(`${API_URL}/visitedCountries`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const addVisitedCountries = async (country: string) => {
  try {
    const response = await axios.post(`${API_URL}/visitedCountries`, country);
    return response.data;
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};
