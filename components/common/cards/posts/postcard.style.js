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
  containerActi:{
    flex:1,
    justifyContent:'space-between',
    flexDirection: 'row',
    marginBottom: 10
  },
  user:{
    flex:1,
    justifyContent: 'flex-start',
    flexDirection:'row'
  },
  username:{
    marginLeft:10,
    fontWeight: '700',
    alignSelf: 'center'
  }
})

export default styles