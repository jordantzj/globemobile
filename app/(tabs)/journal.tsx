import { StyleSheet, Image, Platform, View, Text, SafeAreaView  } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import CountryContainer from '@/components/CountryContainer';

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
    headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Image source={require('@/assets/images/mapwithpins.jpg')}/>
      }
    >
      <ThemedView>
        <ThemedText type="title">Travel Journal</ThemedText>
        <ThemedText type="subtitle">Countries you've visited</ThemedText>
      </ThemedView>
      <ThemedView>
        <ThemedText type="defaultSemiBold">Europe</ThemedText>
        <CountryContainer countryName="France" continent="EU" />
        <CountryContainer countryName="Germany" continent="EU" />
      </ThemedView>
      <ThemedView>
        <ThemedText type="defaultSemiBold">Asia</ThemedText>
        <CountryContainer countryName="China" continent="AS" />
      </ThemedView>
      <ThemedView>
        <ThemedText type="defaultSemiBold">Africa</ThemedText>
        <CountryContainer countryName="Egypt" continent="AF" />
      </ThemedView>
      <ThemedView>
        <ThemedText type="defaultSemiBold">North America</ThemedText>
        <CountryContainer countryName="Canda" continent="NA" />
      </ThemedView>
      <ThemedView>
        <ThemedText type="defaultSemiBold">South America</ThemedText>
        <CountryContainer countryName="Brazil" continent="SA" />
      </ThemedView>
      <ThemedView>
        <ThemedText type="defaultSemiBold">Oceania</ThemedText>
        <CountryContainer countryName="Australia" continent="OC" />
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
