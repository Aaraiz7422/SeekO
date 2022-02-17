import React, { useState } from 'react';
import { View, Image } from 'react-native';
import AppHeader from './AppHeader';
import { ScrollView } from 'react-native-gesture-handler';
import { ProgressBar, Colors } from 'react-native-paper';
import CustomCard from '../global/CustomCard';
import CustomButton from '../global/CustomButton';
import {fetchTabs} from '../../../global-functions';

const TopicProgressComponent = ({ navigation }) => {
    const [tabs, setTabs] = useState([]);

    // React.useEffect(() => {
    //     fetchTabs();
    // }, []);

    const goToStartQuiz = () => {
        navigation.navigate('StartQuiz');
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
                        marginTop: 20,
                        marginBottom: -20,
                    }}
                    color={"#01CCAD"} />
                <CustomCard
                    height={0.38}

                    width={0.90}
                    // linearStartColor="#F5F8FF"
                    // linearEndColor= "#F5F8FF"
                    contentPosition={1}
                    imagePosition={2}
                    cardTitle={"How do you make paper pictures?"}
                    // cardPara={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Arcu ullamcorper at turpis egestas. Enim, ipsum etiam volutpat id risus urna. Erat lectus mauris laoreet quis nibh ut sit eget. Libero ac facilisis urna quis."}
                    coverImage={'https://picsum.photos/700'}
                    imageMargin={10}
                    shadowColor={"#FFFFFF"}
                    onPress={goToStartQuiz}
                ></CustomCard>
                <CustomCard
                    height={0.38}

                    width={0.90}
                    // linearStartColor="#F5F8FF"
                    // linearEndColor= "#F5F8FF"
                    contentPosition={1}
                    // imagePosition={2}
                    // cardTitle={"Note For Parents"}
                    cardPara={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Arcu ullamcorper at turpis egestas. Enim, ipsum etiam volutpat id risus urna. Erat lectus mauris laoreet quis nibh ut sit eget. Libero ac facilisis urna quis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Arcu ullamcorper at turpis egestas. Enim, ipsum etiam volutpat id risus urna. Erat lectus mauris laoreet quis nibh ut sit eget. Libero ac facilisis urna quis."}
                    // coverImage={'https://picsum.photos/700'}
                    // imageMargin={10}
                    shadowColor={"#FFFFFF"}
                ></CustomCard>
            </View>
        </ScrollView>
    );
}

export default TopicProgressComponent;