import React, { useEffect, useState } from 'react';
import { BoxShadow } from 'react-native-shadow';
import { View, Dimensions, Text ,Image } from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import { Appbar, Paragraph } from 'react-native-paper';
import { Card, Title,Button} from 'react-native-paper';
import { global, COLORS, SCREEN_WIDTH, SCREEN_HEIGHT } from '../../../constants';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';


const CustomCard = ({ 
    height,
    width,
    contentPosition, 
    imagePosition,
    cardTitle, 
    CardTitleColor="white",
    cardPara, 
    CardParaColor,
    coverImage, 
    imageMargin, 
    shadowColor ="#FFFFFF", 
    shadowBorder = 15,
    shadowRadius = 3,
    shawdowOpacity = 0.3,
    shadowVerticalMargin = 30,
    shadowHorizontalMargin = 20,
    linearStartColor="transparent",
    linearEndColor="transparent",
    onLayout = true,
    cardBorderColor,
    cardBorderWidth,
    cardBorderRadius,
    cardBackgroundColor,
    onPress
}) => {

    const cardHeight = onLayout?SCREEN_HEIGHT * height:295;
    const [globalHeight1, setGlobalHeight] = useState(cardHeight);

    const shadowOpt = {
        width: SCREEN_WIDTH * width,
        height: globalHeight1,
        color: shadowColor,
        border: shadowBorder,
        opacity: shawdowOpacity,
        radius: shadowRadius,
        x: 0,
        y: 1,
        style: {
            marginVertical: shadowVerticalMargin,
            marginHorizontal: shadowHorizontalMargin,
        }
    }

    const title = cardTitle != null ? <Title  ellipsizeMode='tail' style={{color:CardTitleColor,fontWeight:'700',fontFamily:'Poppins-Regular',}} numberOfLines={2} allowFontScaling={true} >{cardTitle}</Title> : null;
    const para = cardPara != null ? <Paragraph style={{fontFamily:'Poppins-Regular',}}>{cardPara}</Paragraph> : null;
    const cardContent = <Card.Content>{title}{para}</Card.Content>;
    // <Image source={require('C:\\Users\\chaud\\Desktop\\firstApp\\assets\\hands.png')} />
    const cardCover = coverImage != null ? <Card.Cover resizeMode='stretch' source={{ uri: coverImage }} style={{margin:imageMargin,borderRadius:10,}}/> : null;

    const cp = contentPosition == 1 ? cardContent : cardCover;
    const ip = imagePosition == 2 ? cardCover : cardContent;


    useEffect(() => {
        // console.log('GlobalHeight1: ', globalHeight1);
    }, [globalHeight1]);
    const _goBack = () => console.log('Went back');
    const _handleMore = () => console.log('Shown more');
    const find_dimesions = (layout) => {
        const { x, y, width, height } = layout;
        setGlobalHeight(height);
        // console.log(`global Height ${globalHeight1}`);
    }

    // console.log(`Global Height is : ${shadowOpt.height} ${globalHeight1}`);
    return (
        <TouchableWithoutFeedback onPress={onPress}>

        <View style={{ flex: 1,backgroundColor:cardBackgroundColor}}>
            <BoxShadow setting={shadowOpt}>
                <View onLayout={(event) => { 
                  onLayout? find_dimesions(event.nativeEvent.layout):null 
                }}
                // style={{ borderWidth: 2 }}
                >

                        <LinearGradient colors={[linearStartColor, linearEndColor]} style={{ borderRadius: 10,  }}>
                        <Card
                            style={
                                onLayout?{
                                width: SCREEN_WIDTH * width,
                                backgroundColor: 'transparent',
                                elevation: 0,
                            }:{
                                width: SCREEN_WIDTH * width,
                                height:globalHeight1,
                                backgroundColor: 'transparent',
                                elevation: 0,
                            }}>
                            {cp}
                            {ip}
                        </Card>
                    </LinearGradient>


                </View>
            </BoxShadow>
        </View>
        </TouchableWithoutFeedback>
    );
}

export default CustomCard;