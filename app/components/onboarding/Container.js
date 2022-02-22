import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, FlatList, Animated } from 'react-native';
import OnBoardingItem from "./Component";
import Paginator from "./Paginator";
import AsyncStorage from '@react-native-async-storage/async-storage';


const slides = [
    {
        id: '1',
        title: "Learn While Playing",
        subTitle: "The average company forecasts a growth   178% in revenues for their first year, 100% for second, and 71% for third.",
    },
    {
        id: '2',
        title: "Learn While Travel",
        subTitle: "The average company forecasts a growth   178% in revenues for their first year, 100% for second, and 71% for third.",
    },
    {
        id: '3',
        title: "Learn While Free",
        subTitle: "The average company forecasts a growth   178% in revenues for their first year, 100% for second, and 71% for third.",
    }
];

const onBoarding = () => {

    const [currentIndex, setCurrentIndex] = useState(0);

    const scrollX = useRef(new Animated.Value(0)).current;

    const viewableItemChanged = useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
    const slidesRef = useRef(null);

    const onClickSkip = () => {
        if(currentIndex < slides.length -1){
            console.log(`On Boarding Screen # ${currentIndex + 1}`);
        } else {
            AsyncStorage.setItem('alreadyLaunched','true');
            // setIsFirstLaunch(false);
        }
    }


    return (
        <View style={styles.container}>
            {/* <View style={{ flex: 1 }}> */}
                <FlatList
                    data={slides}
                    renderItem={({ item }) => <OnBoardingItem item={item} onClickSkip={onClickSkip}></OnBoardingItem>}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    bounces={false}
                    keyExtractor={(item) => item.id}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                        useNativeDriver: false,
                    })}
                    scrollEventThrottle={32}
                    onViewableItemsChanged={viewableItemChanged}
                    viewabilityConfig={viewConfig}
                    ref={slidesRef}

                ></FlatList>
            {/* </View> */}
            <Paginator data={slides} scrollX={scrollX} ></Paginator>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'center', alignItems: 'center',
        backgroundColor:'#FFF'
    }
})

export default onBoarding;