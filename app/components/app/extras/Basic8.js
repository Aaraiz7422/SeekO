import React, { useEffect, useState } from 'react';
import { BoxShadow } from 'react-native-shadow'
import { StyleSheet, SafeAreaView, Text, View, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from "react-native-linear-gradient";
import { Appbar, Divider, Paragraph, 
    Modal, 
    Portal, 
    Provider 
} from 'react-native-paper';
import { Card, Title } from 'react-native-paper';
import { global, COLORS, SCREEN_WIDTH, SCREEN_HEIGHT } from '../../../constants';
import CustomButton from '../global/CustomButton';
import AppHeader from './AppHeader';
// import global from './global-styles';

const Basic8 = () => {


    // #1 For Modal

    // const [visible, setVisible] = React.useState(false);

    // const showModal = () => setVisible(true);
    // const hideModal = () => setVisible(false);
    // const containerStyle = { backgroundColor: 'white', padding: 30, margin: 30,borderRadius:20 };

    // #

    const GDButton = ({
        title,
        textColor,
        backgroundColor,
        onPress
    }) => {
        return (

            <TouchableOpacity onPress={onPress}
                style={
                    {
                        margin: 4,
                        justifyContent: 'center',
                        // alignItems: 'center'
                    }
                }>

                <View
                    style={[styles.button, backgroundColor]}
                >
                    <Text style={[styles.text, textColor]}>{title}</Text>
                </View>

            </TouchableOpacity>

        );
    }
    const _goBack = () => console.log('Went back');
    const _handleMore = () => console.log('Shown more');

    const shadowOpt = {
        height: SCREEN_HEIGHT * 0.08,
        width: SCREEN_WIDTH * 0.18,
        color: "#FF8780",
        // color: "#FF8450",
        border: 15,
        radius: 3,
        opacity: 0.26,
        x: 0,
        y: 1,
        style: { paddingBottom: 30 }
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#F5F8FF', }}>
            <AppHeader title={"Basics-8"}></AppHeader>
            <View style={{
                margin: 40, marginBottom: 25,
                // backgroundColor:"green" 
            }}>

                <View style={{ flexDirection: "row", justifyContent: "space-between", height: SCREEN_HEIGHT * 0.1, }}>
                    <View style={{ flexDirection: "column", justifyContent: "space-around", width: SCREEN_WIDTH * 0.5 }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Total Marks:</Text>
                            <Text style={{ fontSize: 20, fontWeight: "bold" }}>3</Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Obtained Marks:</Text>
                            <Text style={{ fontSize: 20, fontWeight: "bold" }}>5</Text>
                        </View>
                    </View>
                    <View style={{ justifyContent: "center", alignItems: 'center' }}>
                        <BoxShadow setting={shadowOpt}>
                            <View style={{ justifyContent: "center", alignItems: 'center' }}>

                                <LinearGradient colors={["#FFAC71", "#FF8450"]} style={{
                                    height: SCREEN_HEIGHT * 0.095,
                                    width: SCREEN_WIDTH * 0.22,
                                    borderRadius: 12,
                                    justifyContent: "center",
                                    alignItems: 'center'
                                }}>
                                    <Text style={{ color: "white", fontSize: 34, fontWeight: "bold" }}>60%</Text>
                                </LinearGradient>
                            </View>
                        </BoxShadow>
                    </View>
                </View>

            </View>
            <Divider style={{
                height: 3, backgroundColor: "#DEE8FB"
            }} />
            <View style={{
                marginHorizontal: 40, marginBottom: 25, marginTop: 25
                // backgroundColor:"green" 
            }}>
                <Text>Question#1</Text>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Guten Tag means</Text>
                <GDButton backgroundColor={{ backgroundColor: "#DEE8FB" }} title={"Good Day"}></GDButton>
                <GDButton backgroundColor={{ backgroundColor: "#FF0000" }} textColor={{ color: "white" }} title={"Good Day"}></GDButton>
                <GDButton backgroundColor={{ backgroundColor: "#DEE8FB" }} title={"Good Day"}></GDButton>
                <GDButton backgroundColor={{ backgroundColor: "#027E6A" }} textColor={{ color: "white" }} title={"Good Day"}></GDButton>
                {/* Modal Button */}
                {/* <CustomButton backgroundColor={"#DEE8FB"} title={"Cancel"} height={45} width={0.75} borderColor={"green"} borderWidth={2}  */}
                    {/* // shadowColor='#FFBF3C'  */}
                    {/* onPress={showModal} */}
                {/* // #3 For Modal  */}
                {/* ></CustomButton> */}
                {/* Modal Button */}
            </View>
            <Divider style={{
                height: 3, backgroundColor: "#DEE8FB"
            }} />


            {/* #2 For Modal */}
            {/* <Provider>
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                        <View 
                        style={{alignItems:'center',}}
                        >

                            <Text style={{ fontSize:22,fontWeight:'bold',textAlign:'center',marginBottom:30}}>Are you sure you want to submit your quiz?</Text>
                            <CustomButton backgroundColor={"#FFFFFF"} title={"Cancel"} height={60} width={0.64} borderColor={"red"} borderWidth={1} borderRadius={30}></CustomButton>
                            <CustomButton backgroundColor={"#01CCAD"} title={"OK"} height={60} width={0.64} borderRadius={30}></CustomButton>
                        </View>
                    </Modal>
                </Portal>
            </Provider> */}
            {/* #2 */}
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        color: '#000',
        // margin: 10,
    },
    button: {
        // backgroundColor: '#F8C04E',
        // width: Dimensions.get('window').width * 0.6,
        height: 45,
        alignItems: 'center',
        borderRadius: 6,
        // margin: 20,
        justifyContent: 'center'
    },
    // width:60,
});

export default Basic8;