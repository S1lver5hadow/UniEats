import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from "@/src/providers/ThemeProvider"

interface ScrollIndicatorProps {
  bottom: number,
};

const ScrollIndicator = ({ bottom }: ScrollIndicatorProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { colorTheme } = useTheme();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start()

    const timeout = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start()
    }, 3000)

    return () => clearTimeout(timeout);
  }, [fadeAnim])

  return (
    <Animated.View
      style={{
        ...styles.arrowContainer,
        opacity: fadeAnim,
        bottom: bottom
      }}
      pointerEvents="none"
    >
      <FontAwesome name="angle-down" size={100} color={colorTheme.light ? 'dimgrey' : 'white'} />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  arrowContainer: {
    position: 'absolute',
    alignSelf: 'center'
  },
})

export default ScrollIndicator;
