import React from 'react';
import { View, Image } from 'react-native';
import AppHeader from './AppHeader';
import { ScrollView } from 'react-native-gesture-handler';
import { ProgressBar, Colors } from 'react-native-paper';
import CustomCard from '../global/CustomCard';
import CustomButton from '../global/CustomButton';

const StartQuizComponent = ({navigation}) => {
    const goToQuizes = () => {
        navigation.navigate('Quizes');
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: "#F5F8FF" }}>
            <View style={{ flex: 1, backgroundColor: "#F5F8FF" }}>
                <AppHeader title={"Making Crafty Paintings"}></AppHeader>
                <ProgressBar progress={0.5}
                    style={{
                        height: 16,
                        borderRadius: 10,
                        borderColor: '#01CCAD',
                        borderWidth: 1,
                        backgroundColor: "white",
                        marginHorizontal: 30,
                        marginVertical: 20,
                    }}
                    color={"#01CCAD"} />
                <CustomCard
                width={0.90}
                    height={0.38}

                    // linearStartColor="#F5F8FF"
                    // linearEndColor= "#F5F8FF"
                    contentPosition={1}
                    imagePosition={2}
                    cardTitle={"What did you learn?"}
                    // cardPara={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Arcu ullamcorper at turpis egestas. Enim, ipsum etiam volutpat id risus urna. Erat lectus mauris laoreet quis nibh ut sit eget. Libero ac facilisis urna quis."}
                    coverImage={'https://picsum.photos/700'}
                    imageMargin={10}
                    shadowColor={"#FFFFFF"}
                ></CustomCard>
                <View style={{alignItems:'center'}}>
                <CustomButton
                    backgroundColor={"#DEE8FB"}
                    title={"Start Quiz"}
                    height={50}
                    width={0.70}
                    borderRadius={30}
                    textColor={"white"}
                    linearStartColor={'#F8C04E'}
                    linearEndColor={'#FFBF3C'}
                    shadowColor={'#FFBF3C'}
                    shadowRadius={20}
                    onPress={goToQuizes}
                ></CustomButton>
                </View>
            </View>
        </ScrollView>
    );
}

export default StartQuizComponent;