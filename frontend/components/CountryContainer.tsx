import { View, StyleSheet, SafeAreaView } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

const CONTINENT_COLORS = {
  AF: '#D73D3D',
  NA: '#fcf75e',
  SA: '#ff964f',
  AS: '#147914',
  EU: '#1417A9',
  OC: '#b19cd9',
} as const;

type Continent = keyof typeof CONTINENT_COLORS;

type CountryContainerProps = {
  countryName: string;
  continent: Continent;
}

export default function CountryContainer({
  countryName,
  continent,
}: CountryContainerProps) {
  return (
    <SafeAreaView>
    <ThemedView style={styles.container}>
      <ThemedText style={{ color: 'black' }} type='default'>{countryName}</ThemedText>
    </ThemedView>
    <ThemedView style={[styles.backgroundContainer, { backgroundColor: CONTINENT_COLORS[continent] }]}>
    </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    zIndex: 1,
    height: 30,
    width: 300,
    left: 10,
    marginBottom: 5,
  },
  backgroundContainer: {
    position: 'absolute',
    width: 310,
    height: 30,
  },
});
