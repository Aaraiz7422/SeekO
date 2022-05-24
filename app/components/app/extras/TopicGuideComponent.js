import React, { useState } from 'react';
import { View, Image } from 'react-native';
import AppHeader from './AppHeader';
import { ScrollView } from 'react-native-gesture-handler';
import CustomCard from '../global/CustomCard';
import CustomButton from '../global/CustomButton';
import { fetchContent } from '../../../global-functions';

const TopicGuideComponent = () => {
    const [content, setContent] = useState([]);

    // React.useEffect(() => {
    //     fetchContent();
    // }, []);


    return (
        <ScrollView style={{ flex: 1, backgroundColor: "#F5F8FF" }}>
            <View style={{ flex: 1, backgroundColor: "#F5F8FF" }}>
                <AppHeader title={"Making Crafty Paintings"}></AppHeader>
                <CustomCard
                    height={0.38}

                    width={0.90}
                    // linearStartColor="#F5F8FF"
                    // linearEndColor= "#F5F8FF"
                    cardTitle={"Note For Parents"}
                    cardPara={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Arcu ullamcorper at turpis egestas. Enim, ipsum etiam volutpat id risus urna. Erat lectus mauris laoreet quis nibh ut sit eget. Libero ac facilisis urna quis."}
                ></CustomCard>
            </View>
        </ScrollView>
    );
}

export default TopicGuideComponent;