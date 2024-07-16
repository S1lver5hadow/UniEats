import React, { useState, useMemo } from 'react';
import { Text, View, LayoutChangeEvent, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useTheme } from "@/src/providers/ThemeProvider"
import { ColorTheme } from '../constants/Types';

interface CollapsibleContainerProps {
  children: React.ReactNode;
  expanded: boolean;
}

export const CollapsibleContainer = ({children, expanded}: CollapsibleContainerProps) => {
  const [height, setHeight] = useState(0);
  const { theme, colorTheme } = useTheme();
  const styles = useMemo(() => makeStyles(colorTheme), [theme]);

  const onLayout = (event: LayoutChangeEvent) => {
    const layoutHeight = event.nativeEvent.layout.height;

    if (layoutHeight > 0 && layoutHeight !== height) {
      setHeight(layoutHeight);
    }
  }

  const animatedStyle = useAnimatedStyle(() => {
    const animatedHeight = expanded ? withTiming(height) : withTiming(0);
    return {
      height: animatedHeight
    }
  }, [expanded])

  return (
    <Animated.View style={[animatedStyle, { overflow: 'hidden' }]}>
      <View onLayout={onLayout} style={styles.container}>
        <Text style={styles.additionalInfo}>
          {children}
        </Text>
      </View>
    </Animated.View>
  )
}

const makeStyles = (theme: ColorTheme) => StyleSheet.create({
  container: {
    position: 'absolute',
    alignSelf: 'center'
  },
  additionalInfo: {
    fontFamily: 'Abadi',
    color: theme.productText,
    fontSize: 16,
    textAlign: 'center',
    padding: 5,
  },
});

export default CollapsibleContainer;