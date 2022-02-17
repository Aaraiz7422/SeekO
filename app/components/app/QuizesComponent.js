import React from 'react';
import { View, Image, Dimensions } from 'react-native';
import AppHeader from './AppHeader';
import { ScrollView } from 'react-native-gesture-handler';
import { ProgressBar, Colors, Text } from 'react-native-paper';
import CustomCard from '../global/CustomCard';
import CustomButton from '../global/CustomButton';
import Icon from 'react-native-vector-icons/AntDesign';
import LinearGradient from "react-native-linear-gradient";
import { BoxShadow } from 'react-native-shadow';

import FullScreenModal from './FullScreenModal';

const QuizesComponent = ({ navigation }) => {

    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: 'white', padding: 30, margin: 30, borderRadius: 20 };

    const shadowOpt = {
        width: Dimensions.get('window').width * 0.17,
        height: Dimensions.get('window').height * 0.1,
        color: '#f9c04d',
        border: 10,
        radius: 30,
        opacity: 0.15,
        x: 0,
        y: 1,
        style: {
            // justifyContent:"center",
            marginVertical: 10,
            marginHorizontal: 10,
        }
    }

    const goToQuizResult = () => {
        navigation.navigate('QuizResult');
    }

    const goToUserProfile = () => {
        navigation.navigate('UserProfile');
    }

    const goToCategories = () => {
        navigation.navigate('Categories');
    }
    return (
        <ScrollView style={{ flex: 1, backgroundColor: "#F5F8FF" }}>
            <View style={{ flex:1, backgroundColor: "#F5F8FF" }}>
                <AppHeader title={"Making Crafty Paintings"}></AppHeader>
                <ProgressBar progress={0.2}
                    style={{
                        height: 16,
                        borderRadius: 10,
                        borderColor: 'rgba(0, 0, 0, 0.19)',
                        borderWidth: 2,
                        backgroundColor: "#F5F8FF",
                        marginHorizontal: 30,
                        marginTop: 20,
                        marginBottom: -20,
                    }}
                    color={"#F8C04E"} />
                <View style={{ flex: 1, marginTop: 40, marginLeft: 30 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Guten Tag means:</Text>
                </View>

                <View style={{
                    alignItems: 'center',
                    // backgroundColor:"red"
                }}>

                    <View style={{ alignItems: 'center', marginVertical: 20 }}>
                        <CustomButton
                            backgroundColor={"#F5F8FF"}
                            title={"Start Quiz"}
                            height={50}
                            width={0.70}
                            borderRadius={30}
                            shadowVerticalMargin={0}
                            shadowRadius={20}
                            borderWidth={1.5}
                            onPress={goToQuizResult}
                        ></CustomButton>
                        <CustomButton
                            backgroundColor={"#F5F8FF"}
                            title={"Start Quiz"}
                            height={50}
                            width={0.70}
                            borderRadius={30}
                            shadowVerticalMargin={0}
                            shadowRadius={20}
                            borderWidth={1.5}
                            onPress={goToUserProfile}
                        ></CustomButton>
                        <CustomButton
                            backgroundColor={"#F5F8FF"}
                            title={"Start Quiz"}
                            height={50}
                            width={0.70}
                            borderRadius={30}
                            shadowVerticalMargin={0}
                            shadowRadius={20}
                            borderWidth={1.5}
                            onPress={goToCategories}
                        ></CustomButton>
                        <CustomButton
                            backgroundColor={"#F5F8FF"}
                            title={"Start Quiz"}
                            height={50}
                            width={0.70}
                            borderRadius={30}
                            shadowVerticalMargin={0}
                            shadowRadius={20}
                            borderWidth={1.5}
                        // onPress={goToQuizes}
                        ></CustomButton>
                    </View>
                    <View style={{
                        flexDirection: 'row', width: Dimensions.get('window').width * 0.9,
                        // backgroundColor:"purple",
                        justifyContent: 'space-between',
                    }}>

                        <BoxShadow setting={shadowOpt}>
                            <LinearGradient
                                colors={["#F8C04E", "#FFBF3C"]}
                                style={{
                                    width: Dimensions.get('window').width * 0.16,
                                    height: Dimensions.get('window').height * 0.1,
                                    alignItems: 'center',
                                    borderRadius: 60,
                                    justifyContent: 'center'
                                }}
                            >
                                <Icon.Button
                                    name='arrowleft'
                                    size={40}
                                    backgroundColor={"transparent"}
                                    onPress={() => { }}>
                                </Icon.Button>
                            </LinearGradient>
                        </BoxShadow>
                        <BoxShadow setting={shadowOpt}>
                            <LinearGradient
                                colors={["#F8C04E", "#FFBF3C"]}
                                style={{
                                    width: Dimensions.get('window').width * 0.16,
                                    height: Dimensions.get('window').height * 0.1,
                                    alignItems: 'center',
                                    borderRadius: 60,
                                    justifyContent: 'center'
                                }}
                            >
                                <Icon.Button
                                    name='arrowright'
                                    size={40}
                                    backgroundColor={"transparent"}
                                    onPress={() => { }}>
                                </Icon.Button>
                            </LinearGradient>
                        </BoxShadow>
                    </View>
                    <CustomButton
                        backgroundColor={"#F5F8FF"}
                        title={"Submit"}
                        textColor={"white"}
                        height={50}
                        width={0.70}
                        borderRadius={30}
                        shadowColor={'#f9c04d'}
                        shadowVerticalMargin={0}
                        shadowRadius={20}
                        shadowBorder={10}
                        shadowHorizontalMargin={10}
                        shadowVerticalMargin={10}
                        shadowOpacity={0.15}
                        linearStartColor={"#F8C04E"}
                        linearEndColor={"#FFBF3C"}
                        onPress={showModal}
                    ></CustomButton>
                </View>
                <FullScreenModal visible={visible} onDismiss={hideModal}>
                <View
                                style={{ alignItems: 'center', }}
                            >

                                <Text style={{ fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 }}>Are you sure you want to submit your quiz?</Text>
                                <CustomButton backgroundColor={"#FFFFFF"} title={"Cancel"} height={60} width={0.64} borderColor={"red"} borderWidth={1} borderRadius={30}></CustomButton>
                                <CustomButton backgroundColor={"#01CCAD"} title={"OK"} height={60} width={0.64} borderRadius={30}></CustomButton>
                            </View>
                </FullScreenModal>

            </View>

        </ScrollView>
    );
}

export default QuizesComponent;