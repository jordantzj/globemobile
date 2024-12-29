
import { View, StyleSheet } from 'react-native';

export default function CountryContainer(style:any, children:any) {
  return (
    <View style={[styles.container, style]}>
    <View style={styles.leftHalf}></View>
    <View style={styles.rightHalf}></View>
    {children}
  </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      height: 200, // Adjust height as needed
      width: '100%',
    },
    leftHalf: {
      flex: 1,
      backgroundColor: 'red',
    },
    rightHalf: {
      flex: 1,
      backgroundColor: 'gray',
    },
  });
