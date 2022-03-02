import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { Animated, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import LinearGradient from "react-native-linear-gradient";

import profile from '../../../assets/profile.png';
// Tab ICons...
import home from '../../../assets/home.png';
import search from '../../../assets/search.png';
import notifications from '../../../assets/bell.png';
import settings from '../../../assets/settings.png';
import logout from '../../../assets/logout.png';
// Menu
import menu from '../../../assets/menu.png';
import close from '../../../assets/close.png';


const HomeComponent = (props) => {

    const { selectedTab } = props;
    const [currentTab, setCurrentTab] = useState("Home");
    // To get the curretn Status of menu ...
    const [showMenu, setShowMenu] = useState(false);
    // Animated Properties...
    const offsetValue = useRef(new Animated.Value(0)).current;
    // Scale Intially must be One...
    const scaleValue = useRef(new Animated.Value(1)).current;
    const closeButtonOffset = useRef(new Animated.Value(0)).current;
    const {
        current_user_fetching,
        current_user_error,
        current_user,
        getCurrentUserAction,
        navigation,
        onLogout
    } = props;

    const openCloseMenu = () => {
        // Do Actions Here....
        // Scaling the view...
        Animated.timing(scaleValue, {
            toValue: showMenu ? 1 : 1,
            duration: 300,
            useNativeDriver: true
        })
            .start()

        Animated.timing(offsetValue, {
            // YOur Random Value...
            toValue: showMenu ? 0 : Dimensions.get('window').width * 0.7,
            duration: 300,
            useNativeDriver: true
        })
            .start()

        Animated.timing(closeButtonOffset, {
            // YOur Random Value...
            toValue: !showMenu ? 0 : 0,
            duration: 300,
            useNativeDriver: true
        })
            .start()

        setShowMenu(!showMenu);
    }

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={["#85DADA", "#2CB8B8"]}
                style={[styles.container, { width: Dimensions.get('window').width }]}

            // style={{ flex: 1 ,width: Dimensions.get('window').width}}
            >
                <View style={{ justifyContent: 'flex-start', padding: 15 }}>
                    {/* <Image source={profile} style={{
                        width: 60,
                        height: 60,
                        borderRadius: 10,
                        marginTop: 8
                    }}></Image> */}

                    {/* <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: 'white',
                        marginTop: 20
                    }}>Jenna Ezarik</Text> */}

                    {/* <TouchableOpacity>
                        <Text style={{
                            marginTop: 6,
                            color: 'white'
                        }}>View Profile</Text>
                    </TouchableOpacity> */}

                    <View style={{ flexGrow: 1 }}>
                        {
                            // Tab Bar Buttons....
                        }

                        {TabButton(onLogout, openCloseMenu, currentTab, setCurrentTab, "Home", home)}
                        {TabButton(onLogout, openCloseMenu, currentTab, setCurrentTab, "Track Progress", notifications)}
                        {TabButton(onLogout, openCloseMenu, currentTab, setCurrentTab, "Users", settings)}
                        {TabButton(onLogout, openCloseMenu, currentTab, setCurrentTab, "Subscription", search)}

                    </View>

                    <View>
                        {TabButton(onLogout, openCloseMenu, currentTab, setCurrentTab, "LogOut", logout)}
                    </View>

                </View>
            </LinearGradient>

            {
                // Over lay View...
            }

            <Animated.View style={{
                flexGrow: 1,
                backgroundColor: '#F5F8FF',
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                paddingHorizontal: 15,
                // paddingVertical: 20,
                borderRadius: showMenu ? 30 : 0,
                // Transforming View...
                transform: [
                    { scale: scaleValue },
                    { translateX: offsetValue }
                ]
            }}>

                {
                    // Menu Button...
                }

                <Animated.View style={{
                    transform: [{
                        translateY: closeButtonOffset
                    }]
                }}>
                    <TouchableOpacity onPress={() => {
                        openCloseMenu()
                    }}>

                        <View style={{ flexDirection: "row", alignItems: 'center',marginTop:20 }}>
                                <Image source={showMenu ? close : menu} style={{
                                    width: 24,
                                    height: 20,
                                    tintColor: 'black',
                                }}></Image>
                                <Text style={{
                                    lineHeight: 25,
                                    fontSize: 20,
                                    fontWeight:'bold',
                                    fontFamily: 'Poppins-Regular',
                                    color: 'black',
                                    marginLeft: 20,
                                }}>{currentTab}</Text>
                        </View>

                    </TouchableOpacity>
                    {selectedTab(currentTab, props)}
                </Animated.View>

            </Animated.View>

        </SafeAreaView>
    );
}

// For multiple Buttons...
const TabButton = (onLogout, openCloseMenu, currentTab, setCurrentTab, title, image) => {
    return (

        <TouchableOpacity onPress={() => {
            if (title == "LogOut") {
                onLogout();
                openCloseMenu();
                // Do your Stuff...
            } else {
                setCurrentTab(title)
                openCloseMenu()
            }
        }}>
            <View style={{
                flexDirection: "row",
                alignItems: 'center',
                paddingVertical: 8,
                // backgroundColor: currentTab == title ? 'white' : 'transparent',
                paddingLeft: 13,
                paddingRight: 35,
                borderRadius: 8,
                marginTop: 15
            }}>

                <Image source={image} style={{
                    width: 25, height: 25,
                    tintColor: "white"
                }}></Image>

                <Text style={{
                    fontSize: currentTab == title ? 22: 18,
                    fontWeight: currentTab == title ? 'bold':'normal',
                    fontFamily:'Poppins-Regular',
                    paddingLeft: 15,
                    color: "white"
                }}>{title}</Text>

            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5359D1',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
});

export default HomeComponent;