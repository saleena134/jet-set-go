import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../utils/colors'
import { SearchJetImage, searchDataType, sortList } from '../utils/types'
import { globleStyles } from '../utils/globleStylesheet'
import { convertHexToRGBA, isIos } from '../utils/globleFunctions'
import { STRING_CONSTANTS } from '../utils/stringConstant'
import { images } from '../utils/image'

interface SearchListItemProps {
    data: searchDataType
    airlineName: string
    airlineOrderColor: string | any

}
const SearchListItem = (props: SearchListItemProps) => {
    const [jetImage, setJetImage] = useState()

    useEffect(() => {
        getAirlineImages()
    }, [])

    // to get airlines image by match from API
    const getAirlineImages = () => {
        SearchJetImage?.map((val) => {
            if (val?.name == props?.airlineName) {
                console.log(val?.name, props?.airlineName);
                setJetImage(val?.image)

            }
        })
    }
    return (
        <View style={{ backgroundColor: colors.secondary_dark_theme }}>
            <View style={{ flexDirection: "row", marginBottom: isIos() ? 7 : 13, }}>
                <ImageBackground source={jetImage} resizeMode="cover" style={[{ height: 250, width: "100%" }]} >
                    <View style={[globleStyles.seatChip, globleStyles.container, { backgroundColor: convertHexToRGBA(colors.black, 50) }]}>
                        <Image source={images.seat} style={globleStyles.seatIcon} />
                        <Text style={globleStyles.textDetail}>{props?.data?.seatsAvailable}</Text>
                    </View>
                    <View style={[globleStyles.priceChip, globleStyles.container, { backgroundColor: props?.airlineOrderColor == sortList.ASCENDING ? convertHexToRGBA(colors.black, 50) : convertHexToRGBA(colors.white, 50) }]}>
                        <Text style={[globleStyles.text_13, { color: props?.airlineOrderColor == sortList.ASCENDING ? colors.white : colors.text_color }]}>{STRING_CONSTANTS.INR} {props?.data?.price}/-</Text>
                    </View>

                    {/* overlay container to container details */}
                    <View style={[globleStyles.overlay]}>

                        <View style={[globleStyles.airplaneImageContainer, globleStyles.container]}>
                            <Text style={globleStyles.text_15}>{props?.data?.airline}</Text>
                        </View>

                        <View style={globleStyles.textContainer}>
                            <Text style={globleStyles.text_18}>{STRING_CONSTANTS.from}{props?.data?.origin}</Text>
                            <View style={{ marginTop: 5 }}>
                                <Image source={images.airplan} style={{ width: 30, height: 10, tintColor: colors.white }} />
                            </View>
                            <Text style={globleStyles.text_18}>{STRING_CONSTANTS.to}{props?.data?.destination}</Text>
                        </View>

                        <View style={[globleStyles.textContainer, { width: "100%", justifyContent: "center" }]}>
                            <Text style={globleStyles.text_15}>{props?.data?.duration}</Text>
                        </View>
                    </View>
                </ImageBackground>
            </View >
        </View >
    )
}

export default SearchListItem



