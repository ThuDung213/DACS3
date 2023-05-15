import { StyleSheet } from "react-native";

import { COLORS, SHADOWS, SIZES } from "../../../../constants";

const styles = StyleSheet.create({
    container: {
        width: '85%',
        flex: 1,
        padding: SIZES.xLarge,
        backgroundColor:  "#FFF",
        borderRadius: SIZES.medium,
        ...SHADOWS.medium,
        shadowColor: COLORS.white,
        marginLeft: 25,
        marginBottom:5,
        marginTop: 10
      },
      postTitle:{
        fontWeight: 'bold',
        flex:1,
        fontSize: SIZES.medium,
        justifyContent: 'flex-start',
        alignItems:'flex-start'
      },
      postDesc:{
        flex:1,
        // justifyContent:'center',
        // alignItems:'center',
        // textAlign:'center'
      },
      function:{
        fontSize: 24,
        flexDirection:'row',
        flex: 1,
        alignSelf: 'flex-end'
      }
});

export default styles;
