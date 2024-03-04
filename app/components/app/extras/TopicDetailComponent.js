import React, { useState, useEffect } from 'react';
import { View, Image, FlatList } from 'react-native';
import AppHeader from './AppHeader';
import { ScrollView } from 'react-native-gesture-handler';
import CustomCard from '../global/CustomCard';
import CustomButton from '../global/CustomButton';
import { fetchTopic, fetchContent, fetchTabs, fetchButtons } from '../../../global-functions';



const TopicDetailComponent = ({ navigation, route }) => {
    const [buttons, setButtons] = useState([]);
    const { item, index } = route.params;
    const {name, thumbnail, id} = item;

    useEffect(() => {
        fetchButtons(id, setButtons);
    }, []);

    const ButtonItem = ({ title }) => {
        return (
            <CustomButton
                backgroundColor={"#DEE8FB"}
                title={title}
                height={50}
                width={0.90}
                borderRadius={30}
                textColor={"white"}
                linearStartColor={'#F8C04E'}
                linearEndColor={'#FFBF3C'}
                shadowColor={'#FFBF3C'}
                shadowRadius={20}
                shadowHorizontalMargin={20}
                onPress={goToTopicProgress}
            ></CustomButton>
        );
    }
    const renderButtonItem = ({ item }) => {
        console.log(`Button Name :   ${item.name}`);
        return (
            <ButtonItem title={item.name} ></ButtonItem>);
    }
    const goToTopicGuide = () => {
        console.log(`${buttons[0].name}`);
        console.log(`${JSON.stringify(name)} ${JSON.stringify(thumbnail)} ${JSON.stringify(id)} ${JSON.stringify(index)}`);
        navigation.navigate('TopicGuide');
    }

    const goToTopicProgress = () => {
        navigation.navigate('TopicProgress');
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: "#F5F8FF" }}>
            <View style={{ flex: 1, backgroundColor: "#F5F8FF" }}>
                <AppHeader title={name}></AppHeader>
                <CustomCard coverImage={thumbnail}
                    height={0.38}
                    imageMargin={4}
                    width={0.90}
                ></CustomCard>
                <FlatList data={buttons} renderItem={renderButtonItem} ></FlatList>
                <View>
                    <Image source={require('../../assets/hands.png')} />
                </View>
            </View>
        </ScrollView>
    );
}

export default TopicDetailComponent;