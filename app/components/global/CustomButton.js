import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from "react-native-linear-gradient";
import { BoxShadow } from 'react-native-shadow';
import { SCREEN_WIDTH } from '../../../constants';
const CustomButton = ({
    title,
    textColor,
    backgroundColor,
    shadowColor = "#FFFFFF",
    shadowBorder = 10,
    shadowRadius = 20,
    shadowOpacity = 0.20,
    shadowVerticalMargin = 10,
    shadowHorizontalMargin = 10,
    linearStartColor="transparent",
    linearEndColor="transparent",
    onPress,
    height,
    width,
    borderColor,
    borderWidth,
    borderRadius,
}) => {

    const shadowOpt = {
        width: SCREEN_WIDTH * width,
        height: height,
        color: shadowColor,
        border: shadowBorder,
        radius: shadowRadius,
        opacity: shadowOpacity,
        x: 0,
        y: 1,
        style: {
            // justifyContent:"center",
            marginVertical: shadowVerticalMargin,
            marginHorizontal: shadowHorizontalMargin,
        }
    }

    const buttonStyle = {
        width: Dimensions.get('window').width * width,
        height: height,
        alignItems: 'center',
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: borderWidth,
        borderRadius: borderRadius,
        // margin: 20,
        justifyContent: 'center'
    };
    const textStyle = {
        fontSize: 20,
        color: textColor,
        textAlign:"center",fontFamily:'Poppins-Regular',
        paddingLeft:10,paddingRight:10
    };

    return (

        <TouchableOpacity onPress={onPress} style={{margin: 4,justifyContent: 'center',}}>
            <BoxShadow setting={shadowOpt}>
                <LinearGradient
                    // colors={["#F8C04E", "#FFBF3C"]}
                    colors={[linearStartColor, linearEndColor]}
                    style={[buttonStyle]}
                >
                    <Text style={textStyle}>{title}</Text>
                </LinearGradient>
            </BoxShadow>

        </TouchableOpacity>

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
        // height: 60,
        alignItems: 'center',
        // borderRadius: 40,
        // margin: 20,
        justifyContent: 'center'
    },
    // width:60,
});

export default CustomButton;