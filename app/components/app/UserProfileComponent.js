import React from 'react';
import { View, Image, Text, Dimensions } from 'react-native';
import AppHeader from './AppHeader';
import { ScrollView } from 'react-native-gesture-handler';
import { ProgressBar, Colors, Divider } from 'react-native-paper';
import CustomCard from '../global/CustomCard';
import CustomButton from '../global/CustomButton';

const UserProfileComponent = ({ navigation }) => {

    return (
        <ScrollView style={{ flex: 1, backgroundColor: "#F5F8FF" }}>
            <View style={{ flex: 1, backgroundColor: "#F5F8FF" }}>
                <View style={{
                    height: Dimensions.get('window').height * 0.3,
                    zIndex: 2
                }}>
                    <Image source={require('../../assets/profileBg.png')}
                        style={{ flex: 1 }}
                        height={Dimensions.get('window').height * 0.3}
                    ></Image>
                </View>
                <View style={{
                    height: Dimensions.get('window').height * 0.3,
                    position: 'absolute', zIndex: 1, top: 0, left: 0, right: 0
                }}>
                    <Image source={require("../../assets/profileBgTop.png")}
                        style={{ flex: 1 }}
                        height={Dimensions.get('window').height * 0.3}
                    ></Image>
                </View>
                <View style={{ alignItems: 'center', zIndex: 3, position: 'relative', top: -60 }}>
                    <Image source={require("../../assets/profileAvatar.png")}></Image>
                    <Text style={{ margin: 10, fontSize: 24,fontWeight:'bold', fontFamily:'Poppins-Regular' }}>Usama Ejaz</Text>

                </View>
                <View style={{ zIndex: 3, position: 'relative', top: -50 }}>
                    <Divider style={{
                        height: 2, backgroundColor: "#DEE8FB"

                    }} />
                    <View style={{ marginLeft: 20, marginBottom: -20, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>

                        <Text style={{ fontSize: 20,fontWeight:'bold', fontFamily:'Poppins-Regular' }}>Completed Courses</Text>
                        <CustomButton
                            title={"View All"}
                            height={40}
                            width={0.2}
                        // backgroundColor={"red"}
                        ></CustomButton>
                    </View>
                    <CustomCard
                        height={0.38}

                        width={0.6}
                        // cardBackgroundColor={"green"}
                        cardTitle={"Making Crafty Paintings"}
                        coverImage={'https://picsum.photos/700'}
                        imageMargin={10}
                        linearStartColor={"#FFAC71"}
                        linearEndColor={"#FF8450"}
                        shadowColor='#FF8450'
                    // onPress={goToTopicDetail}
                    ></CustomCard>
                </View>
            </View>
        </ScrollView>
    );
}

export default UserProfileComponent;