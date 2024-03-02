import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Timer = ({ onStart, onStop }) => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const toggleTimer = () => {
    setIsActive(!isActive);
    if (!isActive) {
      onStart();
    } else {
      onStop(seconds);
    }
  };

  const resetTimer = () => {
    setSeconds(0);
    setIsActive(false);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{formatTime(seconds)}</Text>
      <TouchableOpacity onPress={toggleTimer} style={styles.button}>
        <Text style={styles.buttonText}>{isActive ? 'Stop' : 'Start'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={resetTimer} style={[styles.button, styles.resetButton]}>
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  resetButton: {
    backgroundColor: '#FF5733',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Timer;
