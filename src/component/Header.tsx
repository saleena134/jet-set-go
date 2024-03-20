import { View, Text, Image } from 'react-native'
import React from 'react'
import { colors } from '../utils/colors'
import { images } from '../utils/image'

const Header = () => {
    return (
        <View style={{ width: "100%", height: 100, backgroundColor: colors.white, flexDirection: "column" }}>
            <Image source={images.logo} style={{ height: 40, width: 40, alignSelf: "center", marginTop: 10, tintColor: colors.secondary_dark_theme }} />
            <Image source={images.title} style={{ height: 40, width: 150, alignSelf: "center", marginTop: 50, position: "absolute" }} />
        </View>
    )
}

export default Header