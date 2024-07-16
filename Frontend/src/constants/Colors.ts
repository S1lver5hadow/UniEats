/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#228B22';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    light: true,
    text: '#595959',
    colorText: '#3B7D23',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    colorButton: '#3B7D23',
    colorBorder: '#006400',
    textInput: 'lightgrey',
    textInputBorder: 'black',
    textInputText: 'black',
    iconColor: 'black',
    accountButton: '#D1D1D1',
    product: 'white',
    productText: 'black',
    order: '#0047AB',
    deliver: '#9F2B68',
    navBar: 'white',
    navBarBox: '#F2F2F2',
  },
  dark: {
    light: false,
    text: '#DCDEE1',
    colorText: '#60E434',
    background: '#313338',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#fff',
    tabIconSelected: '#60E434',
    colorButton: '#22A559',
    colorBorder: '#227d59',
    textInput: '#404249',
    textInputBorder: '#1E1f22',
    textInputText: 'white',
    iconColor: 'white',
    accountButton: '#4E5058',
    product: '#404249',
    productText: 'white',
    order: '#6495ED',
    deliver: '#BF40BF',
    navBar: '#1E1F22',
    navBarBox: '#313338',
  },
};
