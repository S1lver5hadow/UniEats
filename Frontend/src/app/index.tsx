import { StyleSheet } from "react-native"
import { Redirect } from "expo-router"

const index = () => {
  return <Redirect href={'/sign-up'}/>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10
  }
})

export default index;