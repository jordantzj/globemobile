import { StyleSheet, Image, Platform, View, Text, SafeAreaView  } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import CountryContainer from '@/components/CountryContainer';
import countries from '@/app/country-by-continent.json';
import { getVisitedCountries} from '@/app/api';
import React, { useEffect, useState } from 'react';
import CountryPicker, { Country, CountryCode } from 'react-native-country-picker-modal';

interface visitedCountry {
  country: string;
  continent: string;
}

export default function TabTwoScreen() {
  const [visitedCountries, setVisitedCountries] = useState<visitedCountry[]>([]);
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState<Country>()
  const [countryCode, setCountryCode] = useState<CountryCode>('FR')

  
  useEffect(() => {
    // Fetch data when the component mounts
    fetchVisitedCountries();
  }, []);

  const fetchVisitedCountries = async () => {
    try {
      const data = await getVisitedCountries();
      const countriesVisitedData = data[0].countriesVisited;
      const filteredCountries = countries.filter(countryObj => 
        countriesVisitedData.includes(countryObj.country)
      );
      setVisitedCountries(filteredCountries);
    } catch (error) {
      console.error('Error fetching countries:', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };
  const onSelect = (country: Country) => {
    setCountryCode(country.cca2);
    setCountry(country);
  };
  
  return (
    <ParallaxScrollView
    headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Image source={require('@/assets/images/mapwithpins.jpg')}/>
      }
    >
    <CountryPicker
      {...{
        countryCode,
        withFilter: true,
        withFlag: true,
        withCountryNameButton: true,
        withAlphaFilter: true,
        onSelect: onSelect,
      }}
      visible
    />
      <ThemedView>
        <ThemedText type="title">Travel Journal</ThemedText>
        <ThemedText type="subtitle">Countries you've visited</ThemedText>
      </ThemedView>
      <ThemedView>
      </ThemedView>
      <ThemedView>
        <ThemedText type="defaultSemiBold">Europe</ThemedText>
        {visitedCountries
        .filter((country) => country.continent === "Europe")
        .map((country) => (
          <CountryContainer
            key={country.country}
            countryName={country.country}
            continent="EU"
          />
        ))}
      </ThemedView>
      <ThemedView>
        <ThemedText type="defaultSemiBold">Asia</ThemedText>
        {visitedCountries
        .filter((country) => country.continent === "Asia")
        .map((country) => (
          <CountryContainer
            key={country.country}
            countryName={country.country}
            continent="AS"
          />
        ))}
      </ThemedView>
      <ThemedView>
        <ThemedText type="defaultSemiBold">Africa</ThemedText>
        {visitedCountries
        .filter((country) => country.continent === "Africa")
        .map((country) => (
          <CountryContainer
            key={country.country}
            countryName={country.country}
            continent="AF"
          />
        ))}
      </ThemedView>
      <ThemedView>
        <ThemedText type="defaultSemiBold">North America</ThemedText>
        {visitedCountries
        .filter((country) => country.continent === "North America")
        .map((country) => (
          <CountryContainer
            key={country.country}
            countryName={country.country}
            continent="NA"
          />
        ))}
      </ThemedView>
      <ThemedView>
        <ThemedText type="defaultSemiBold">South America</ThemedText>
        {visitedCountries
        .filter((country) => country.continent === "South America")
        .map((country) => (
          <CountryContainer
            key={country.country}
            countryName={country.country}
            continent="SA"
          />
        ))}
      </ThemedView>
      <ThemedView>
        <ThemedText type="defaultSemiBold">Oceania</ThemedText>
        {visitedCountries
        .filter((country) => country.continent === "Oceania")
        .map((country) => (
          <CountryContainer
            key={country.country}
            countryName={country.country}
            continent="OC"
          />
        ))}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
