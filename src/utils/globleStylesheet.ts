import { StyleSheet } from "react-native";
import { colors } from "./colors";
import { convertHexToRGBA } from "./globleFunctions";

export const globleStyles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center"
    },
    flex_one: {
        flex: 1,
    },
    containerStyle: {
        paddingBottom: 15,
        paddingHorizontal: 15
    },
    text_15: {
        color: colors.white,
        fontWeight: "500",
        fontSize: 15
    },
    text_13: {
        color: colors.white,
        fontWeight: "500",
        fontSize: 13
    },
    text_18: {
        color: colors.white,
        fontWeight: "500", fontSize: 18,
    },
    text_17: {
        color: colors.white,
        fontWeight: "600", fontSize: 17
    },
    overlay: {
        width: "100%",
        height: 110,
        bottom: -40,
        backgroundColor: convertHexToRGBA(colors.black, 60),
    },
    seatChip: {
        width: 70,
        height: 40, borderRadius: 20,
        margin: 10,
        alignSelf: "flex-end",
        flexDirection: "row"
    },
    priceChip: {
        width: 80,
        height: 40,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        top: -50,
        alignSelf: "flex-start",
    },
    seatIcon: {
        width: 20,
        height: 20,
        tintColor: colors.white, marginRight: 5
    },
    textDetail: {
        color: colors.white,
        fontWeight: "500",
        fontSize: 16
    },
    textContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginTop: 10
    },
    airplaneImageContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%", backgroundColor: convertHexToRGBA(colors.black, 50),
        padding: 3
    }
})