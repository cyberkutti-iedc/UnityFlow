import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-paper';

const PaperReactCommunity = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/2c.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Welcome to the unity flow Community!</Text>
      <Text style={styles.description}>Join our community to stay updated with the latest news, discussions, and events related to Studying.</Text>
      <Button
        mode="contained"
        onPress={() => console.log('Join Community')}
        style={styles.button}
        labelStyle={styles.buttonLabel}
      >
        Join Now
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    width: '80%',
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PaperReactCommunity;
