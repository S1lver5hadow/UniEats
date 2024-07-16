import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useClientOnlyValue } from '../../components/useClientOnlyValue';
import { useTheme } from "@/src/providers/ThemeProvider";
import { View, Pressable, Text, Dimensions } from 'react-native';
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colorTheme } = useTheme();
  const tabWidth = Dimensions.get('window').width / (state.routes.length - 1);
  const animatedIndex = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{
        translateX: withTiming((animatedIndex.value - 1) * tabWidth, { duration: 300 }),
      }]
    };
  });

  return (
    <View style={{ flexDirection: 'row', height: "8%", backgroundColor: colorTheme.navBar }}>
      <Animated.View
        style={[
          {
            position: 'absolute',
            backgroundColor: colorTheme.navBarBox,
            borderRadius: 15,
            marginLeft: 5,
            marginTop: 10,
            width: tabWidth - 10,
            height: "75%",
          },
          animatedStyle,
        ]}
      />
      {state.routes.map((route, index) => {
        if (route.name === 'index') {
          return null;
        }

        const { options } = descriptors[route.key];
        const label = options.title || '';

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
            animatedIndex.value = index;
          }
        };

        const iconMap: Record<string, string> = {
          menu: 'home',
          help: 'question',
          account: 'user',
        };

        const iconName = iconMap[route.name];
        const color = isFocused ? colorTheme.tabIconSelected : colorTheme.tabIconDefault;

        return (
          <Pressable
            key={index}
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
            onPress={onPress}
          >
            {/* @ts-ignore */}
            <FontAwesome name={iconName} size={28} style={{ marginBottom: -3 }} color={color} />
            <Text style={{ color }}>
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default function TabLayout() {
  const { colorTheme } = useTheme();

  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        tabBarActiveTintColor: colorTheme.tabIconSelected,
        tabBarInactiveTintColor: colorTheme.tabIconDefault,
        headerShown: useClientOnlyValue(false, true),
      }}>

      <Tabs.Screen
        name='index'
        options={{ href: null }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="help"
        options={{
          title: 'Help',
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Your Account',
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
