import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  rowView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  postItem:{
    flex:1,
    justifyContent:'flex-start'
  },
  item: {
    padding: 16,
    margin: 16,
    elevation: 4,
    borderRadius: 8
  },
  title: {
    fontSize: 18,
    fontWeight:'bold'
  },
})

export default styles