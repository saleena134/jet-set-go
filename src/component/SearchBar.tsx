import { View, Text, TextInput, Image, StyleSheet, FlatList, Pressable, TouchableOpacity } from 'react-native'
import React, { useMemo, useState } from 'react'
import { globleStyles } from '../utils/globleStylesheet'
import { colors } from '../utils/colors'
import { images } from '../utils/image'
import { STRING_CONSTANTS } from '../utils/stringConstant'
import { sortList } from '../utils/types'

interface SearchBarProp {
    onChangeText: (e: any) => void
    data?: any
    onSelectAirlinesFilter?: (airlines: string) => void
    //sending price order as ascen and decen
    onSelectPriceSort?: (sort: any) => void
}
const SearchBar = (props?: SearchBarProp) => {
    const [sortShowBottomSheet, setSortShowBottomSheet] = useState<boolean>(false)
    const [airlines, setAirlines] = useState<any>()
    const [sort, setSort] = useState<string>(sortList.ASCENDING)

    // for getting airline horizontal scrollable list
    const getAirlineList = () => {
        let set = new Set()
        for (let i = 0; i < props?.data?.length; i++) {
            set.add(props?.data[i]?.airline)
        }
        return Array.from(set) || []
    }

    const airlinesSet = useMemo(getAirlineList, [props?.data, sort])

    // for render flatList item
    const renderItem = (e: any, i: number) => {
        return (
            <Pressable style={[styles.filterList, globleStyles.container]} onPress={() => {
                props?.onSelectAirlinesFilter(e)
                setAirlines(e)
                setSortShowBottomSheet(false);
            }}><Text style={{ color: colors.white }}>{e}</Text></Pressable>
        )
    }

    // for sort button (by default state is ASCENDING)
    const sortedButton = () => {
        if (sort !== sortList.ASCENDING) {
            props?.onSelectPriceSort(sortList.ASCENDING)
            setSort(sortList.ASCENDING)
        } else {
            props?.onSelectPriceSort(sortList.DESCENDING)
            setSort(sortList.DESCENDING)
        }

    }
    return (
        <View>
            <View style={[globleStyles.containerStyle, globleStyles.container]}>
                <View style={styles.SearchBar}>
                    <TextInput placeholder={STRING_CONSTANTS.search_placeholder} selectionColor={colors.white}
                        placeholderTextColor={colors.white} style={{ flex: 1, marginLeft: 20, color: colors.white }} onChangeText={props?.onChangeText} />
                    <View style={[styles.iconContainer, globleStyles.container]}>
                        <Image source={images.search} style={{ tintColor: colors.primary_theme }} />
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.airlineFilterButton} onPress={() => setSortShowBottomSheet(true)}>
                        <Text style={globleStyles.text_15}>{airlines ? airlines : STRING_CONSTANTS.airlines}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => sortedButton()} style={[styles.airlineFilterButton, { flexDirection: "row" }]}>
                        <Text style={globleStyles.text_15}
                        >{STRING_CONSTANTS.price} {sort == sortList.ASCENDING ? STRING_CONSTANTS.ascen : STRING_CONSTANTS.desc}</Text>
                        <View>
                            <Image source={images.icon_back_btn} style={{ width: 20, height: 5, marginTop: 3, tintColor: colors.white, transform: [{ rotate: '90deg' }] }} />
                            <Image source={images.arrow_right} style={{ width: 20, height: 5, marginLeft: 7, tintColor: colors.white, transform: [{ rotate: '90deg' }] }} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            {/* to scrollable horizontal airlines container */}
            {sortShowBottomSheet ?
                <FlatList data={airlinesSet}
                    renderItem={({ item, index }) => renderItem(item, index)}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    ListHeaderComponent={
                        <TouchableOpacity style={[styles.filterList, globleStyles.container, { marginStart: 20 }]} onPress={() => {
                            setAirlines("")
                            props?.onSelectAirlinesFilter("")
                            setSortShowBottomSheet(false)
                        }}>
                            <Text style={{ color: colors.white }}>{STRING_CONSTANTS.show_all}</Text>
                        </TouchableOpacity>
                    }
                    ListFooterComponent={<View style={{ width: 20 }}></View>} />
                : null}
        </View>


    )
}

const styles = StyleSheet.create({
    SearchBar: {
        backgroundColor: colors.primary_theme,
        height: 50,
        width: "100%",
        borderRadius: 25,
        shadowColor: "grey",
        shadowOpacity: 5,
        shadowOffset: { width: 1, height: 1 },
        flexDirection: "row",
        alignItems: "center"
    },
    iconContainer: {
        height: 50,
        width: 50,
        backgroundColor: colors.white,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: colors.primary_theme
    },
    filterList: {
        backgroundColor: colors.primary_theme,
        marginBottom: 20,
        marginHorizontal: 5,
        height: 30,
        borderRadius: 10,
        padding: 6
    },
    buttonContainer: {
        flexDirection: "row",
        alignSelf: "flex-start",
    },
    airlineFilterButton: {
        backgroundColor: colors.primary_theme,
        padding: 10,
        marginTop: 20,
        marginHorizontal: 5,
        borderRadius: 10
    },

})
export default SearchBar