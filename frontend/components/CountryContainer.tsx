import { View, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
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
  const screenWidth = Dimensions.get('window').width; // Get device screen width
  const containerWidth = screenWidth * 0.8; // Set width relative to screen width
  
  return (
    <View>
      <ThemedView style={[styles.container, { width: containerWidth }]}>
        <ThemedText style={{ color: 'black' }} type='default'>{countryName}</ThemedText>
      </ThemedView>
      <ThemedView
        style={[
          styles.backgroundContainer,
          { width: containerWidth, backgroundColor: CONTINENT_COLORS[continent] }
        ]}
      />
    </View>
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
    marginBottom: 5,
    left: 10
  },
  backgroundContainer: {
    position: 'absolute',
    height: 30,
  },
});
