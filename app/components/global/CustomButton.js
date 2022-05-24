//Import Core Components
import React from 'react';
import { StyleSheet, Text, Dimensions } from 'react-native';
//Import Plugins and Libraries
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from "react-native-linear-gradient";
import { BoxShadow } from 'react-native-shadow';
//Import global variables and constants
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
                    <Text style={textStyle} adjustsFontSizeToFit={true} allowFontScaling={true} >{title}</Text>
                </LinearGradient>
            </BoxShadow>

        </TouchableOpacity>

    );
}

export default CustomButton;