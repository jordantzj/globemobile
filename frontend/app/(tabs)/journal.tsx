import {
  StyleSheet,
  Image,
  Button,
} from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import CountryContainer from "@/components/CountryContainer";
import countries from "@/app/country-by-continent.json";
import { getVisitedCountries, addVisitedCountries } from "@/app/api";
import React, { useEffect, useState } from "react";
import DropDownPicker from 'react-native-dropdown-picker';

interface visitedCountry {
  country: string;
  continent: string;
}

export default function TabTwoScreen() {
  const [visitedCountries, setVisitedCountries] = useState<visitedCountry[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState<any>(false);
  const [value, setValue] = useState<any>([]);
  const [items, setItems] = useState<any>(countries);

  useEffect(() => {
    // Fetch data when the component mounts
    fetchVisitedCountries();
  }, []);

  const fetchVisitedCountries = async () => {
    try {
      const data = await getVisitedCountries();
      const countriesVisitedData = data[0].countriesVisited;
      const filteredCountries = countries.filter((countryObj) =>
        countriesVisitedData.includes(countryObj.country)
      );
      setVisitedCountries(filteredCountries);
    } catch (error) {
      console.error("Error fetching countries:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };


  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Image source={require("@/assets/images/mapwithpins.jpg")} />
      }
    >
      <ThemedView>
        <ThemedText type="title">Travel Journal</ThemedText>
        <ThemedText type="subtitle">Countries you've visited</ThemedText>
      </ThemedView>

      <ThemedView>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          multiple={true}
          min={0}
          max={5}
          searchable={true}
          listMode="SCROLLVIEW" //To fix the "VirtualizedLists should never be nested inside plain ScrollViews" warning
          searchPlaceholder="Search For Countries..."
          placeholder="Select Countries You've visited"
          placeholderStyle={{
            color: "rgba(128, 128, 128, 0.6)"
          }}
          schema={{
            label: 'country',
            value: 'country'
          }}
        />
        <Button title="Submit" onPress={() => addVisitedCountries(value)} />
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
    flexDirection: "row",
    gap: 8,
  },
});
