import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, FlatList, Animated } from 'react-native';
import OnBoardingItem from "./Component";
import Paginator from "./Paginator";
import AsyncStorage from '@react-native-async-storage/async-storage';


const slides = [
    {
        id: '1',
        title: "Learn while playing",
        subTitle: "Stimulate tactile learning by working together with your child to complete fun activities.",
    },
    {
        id: '2',
        title: "Broaden your horizons",
        subTitle: "Plethora of topics for knowledge on tons of information in the world around us.",
    },
    {
        id: '3',
        title: "Get your kids’ creative juices flowing",
        subTitle: "Research indicates that reading bedtime stories to your children increases their visual processing, imagination and linguistic skills.",
    }
];

const onBoarding = (props) => {

    const [currentIndex, setCurrentIndex] = useState(0);

    const scrollX = useRef(new Animated.Value(0)).current;

    const viewableItemChanged = useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;

    const { navigation } =props;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
    const slidesRef = useRef(null);

    const onClickSkip = () => {
        navigation.navigate("Signup");

        // if(currentIndex < slides.length -1){
        //     console.log(`On Boarding Screen # ${currentIndex + 1}`);
        // } else {
        //     navigation.navigate("Signup");
        //     // AsyncStorage.setItem('alreadyLaunched','true');
        //     // setIsFirstLaunch(false);
        // }
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