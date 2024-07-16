import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { SearchBar } from "@rneui/themed";
import { useTheme } from "@/src/providers/ThemeProvider"
import { ColorTheme } from '../constants/Types';

interface CustomSearchBarProps {
  searchVal: string;
  searchFunction: (text: string) => void;
}

const CustomSearchBar = ({ searchVal, searchFunction }: CustomSearchBarProps) => {
  const { theme, colorTheme } = useTheme();
  const styles = useMemo(() => makeStyles(colorTheme), [theme]);

  return (
    <View style={{ alignItems: 'center' }}>
      <SearchBar
        placeholder="Search..."
        lightTheme
        round
        value={searchVal}
        onChangeText={(text) => searchFunction(text)}
        autoCorrect={false}
        containerStyle={styles.searchContainer}
        inputContainerStyle={styles.inputSearchContainer}
        placeholderTextColor={colorTheme.text}
        searchIcon={{ size: 30, color: colorTheme.iconColor }}
        inputStyle={styles.searchInput}
      />
    </View>
  );
};

const makeStyles = (theme: ColorTheme) => StyleSheet.create({
  searchContainer: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    marginTop: 5,
    marginBottom: 5,
    width: '95%'
  },
  inputSearchContainer: {
    backgroundColor: theme.textInput,
    borderWidth: 3,
    borderBottomWidth: 3,
    borderColor: theme.textInputBorder,
    borderRadius: 30,
    fontFamily: 'Abadi',
    fontSize: 20,
    fontWeight: '600',
    color: theme.textInputText,
  },
  searchInput: {
    color: theme.text
  }
});

export default CustomSearchBar;
