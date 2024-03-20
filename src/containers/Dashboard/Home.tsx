import { FlatList, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import SearchBar from '../../component/SearchBar'
import { globleStyles } from '../../utils/globleStylesheet'
import SearchListItem from '../../component/SearchListItem'
import { colors } from '../../utils/colors'
import { images } from '../../utils/image'
import { STRING_CONSTANTS } from '../../utils/stringConstant'
import { searchDataType, sortList } from '../../utils/types'
import Header from '../../component/Header'

const Home = () => {

    const [getList, setGetList] = useState<Array<searchDataType>>([])
    const [searchKey, setSearchKey] = useState("")
    const [filteredAirlines, setFilteredAirlines] = useState()
    const [filterdArrayOfAirlines, setFilterdArrayOfAirlines] = useState<Array<searchDataType>>([])
    const [sortPrice, setSortPrice] = useState(sortList.ASCENDING)

    useEffect(() => {
        filterAndSortData(getList)
    }, [filteredAirlines, sortPrice, searchKey])

    useEffect(() => {
        getApi()
    }, [])

    const filterAndSortData = (data: Array<searchDataType>) => {
        var arr: Array<searchDataType> = []
        // for filter, sort and search
        for (let i = 0; i < data?.length; i++) {
            // for search
            if (data[i]?.destination?.toUpperCase().includes(searchKey?.toUpperCase().trim().replace(/\s/g, ""))) {
                // for filter 
                if (data[i]?.airline == filteredAirlines || !filteredAirlines) {
                    arr.push(data[i])
                    // for sort
                    if (sortPrice == sortList.ASCENDING) {
                        arr.sort((a, b) => {
                            return a?.price - b?.price
                        });
                    } else {
                        arr.sort((a, b) => {
                            return b?.price - a?.price
                        });
                    }
                }
            }
            setFilterdArrayOfAirlines(arr)
        }
    }

    // to get Listing data api ,in which sort, filter and search is handled by custom logic 
    const getApi = () => {
        fetch('https://api.npoint.io/378e02e8e732bb1ac55b')
            .then((response) => response.json())
            .then((data: Array<searchDataType>) => {
                setGetList(data)
                console.log("getting data list", data);
                filterAndSortData(data)
            })
            .catch(error => console.error('Error:', error));
    }

    //to render flatList render item
    const renderItem = (item: any) => {
        return <SearchListItem data={item} airlineName={item?.airline} airlineOrderColor={sortPrice} />
    }

    // when search key does not match with anything or no data
    const NoResult = () => {
        return (
            <View style={{ marginTop: 20 }}>
                <Text style={[globleStyles.text_18, { color: colors.black, textAlign: "center" }]}>
                    {STRING_CONSTANTS.no_result}
                    <Text style={{ color: colors.white }}>
                        {searchKey}</Text>
                </Text>
                <Image source={images.noData} style={{ alignSelf: "center" }} />
            </View>
        )
    }
    return (

        <SafeAreaView style={[globleStyles.flex_one, { backgroundColor: colors.white }]}>
            <View style={{ backgroundColor: colors.secondary_dark_theme }}>

                {/* a component to container header items */}
                <Header />

                <View style={styles.topCurveBackground}>
                    {/*  coustom searchBar in which sort and filter functionality added */}
                    <SearchBar onChangeText={(val: any) => {
                        setSearchKey(val)
                    }}
                        data={getList}
                        onSelectAirlinesFilter={(airlines) => {
                            setFilteredAirlines(airlines)
                        }}
                        onSelectPriceSort={(sort) => setSortPrice(sort)} />
                </View>

            </View>
            {/* these curve is for top header design */}
            <View style={styles.secondBackgroundCurve} />
            <View style={styles.thirdBackgroundCurve}>
                <View style={{ backgroundColor: colors.primary_theme, borderRadius: 20, overflow: "scroll" }}>
                    <FlatList
                        data={filterdArrayOfAirlines}
                        renderItem={({ item }) => renderItem(item)}
                        ListEmptyComponent={<NoResult />}
                        ListFooterComponent={<View style={{ backgroundColor: colors.secondary_dark_theme, height: 250 }} />}
                    />
                </View>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    topCurveBackground: {
        backgroundColor: colors.white,
        width: "97%",
        alignSelf: "flex-start",
        borderBottomRightRadius: 25
    },
    secondBackgroundCurve: {
        width: 13, height: 250, marginTop: 40,
        backgroundColor: colors.secondary_dark_theme,
        alignSelf: "flex-end", position: "absolute",
        borderTopLeftRadius: 20
    },
    thirdBackgroundCurve: {
        backgroundColor: colors.secondary_dark_theme,
        borderTopLeftRadius: 20,
        paddingTop: 20,
        paddingHorizontal: 10
    }

})
export default Home;

