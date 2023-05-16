import { StyleSheet } from "react-native";

import { COLORS, SHADOWS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: SIZES.xxLarge,
    borderRadius: SIZES.small,
    backgroundColor: "#FFF",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
    marginBottom: 2,
    marginTop: 5,
  },
  logoContainer: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: "30%",
    height: "70%",
  },
  textContainer: {
    // width: 50,
    flex: 1,
    marginLeft: 10,
    height: 50,
    backgroundColor: COLORS.whiteList,
    borderRadius: SIZES.medium,
    justifyContent: "flex-start"
  },
  jobName: {
    fontSize: SIZES.medium,
    fontFamily: "DMBold",
    color: COLORS.primary,
  },
  jobType: {
    fontSize: SIZES.small + 2,
    fontFamily: "DMRegular",
    color: COLORS.gray,
    marginTop: 3,
    textTransform: "capitalize",
  },
});

export default styles;
