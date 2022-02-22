import React, { useEffect, useState } from 'react';
import { View, Image, Text, FlatList } from 'react-native';
import AppHeader from '../AppHeader';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import CustomCard from '../../global/CustomCard';
import services from '../../../api/services';
import { urls } from '../../../api/urls';
import CustomButton from '../../global/CustomButton';
import { fetchTopics } from '../../../../global-functions';
import { ActivityIndicator } from 'react-native-paper';


const CategoryItem = ({ navigation, categoryName, topicId, index }) => {

    const [topicListData, setTopicListData] = useState({});

    useEffect(() => {
        fetchTopics(topicId, setTopicListData);
    }, [])


    const TopicItem = ({ item, index }) => (
        <CustomCard
            height={0.38}
            width={0.6}
            cardTitle={item.name}
            coverImage={item.thumbnail}
            imageMargin={10}
            linearStartColor={index % 2 != 0 ? '#02AAB0' : "#FFAC71"}
            linearEndColor={index % 2 != 0 ? "#00CDAC" : "#FF8450"}
            shadowColor={index % 2 != 0 ? "#00cbac" : "#FFA06A"}
            onLayout={false}
            onPress={() => goToTopicDetail(item, index)}

        ></CustomCard>
    );

    const renderTopicItem = ({ item, index }) => (
        <TopicItem item={item} index={index} />
    );

    const onClickViewAll = () => {
        navigation.navigate('Topics', { topicListData: topicListData })
    }

    const goToTopicDetail = (item, index) => {
        navigation.push('Topics', { selected_topic: item, index: index });
        console.log(`Go to Detail Component : ${item.name} ${item.thumbnail} ${item} ${index}`);
    }


    return (
        <>
            <View style={{ marginLeft: 20, marginBottom: -20, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>

                <Text style={{ fontSize: 20, fontWeight: 'bold', fontFamily: 'Poppins-Regular' }}>{categoryName}</Text>
                <TouchableOpacity onPress={onClickViewAll} style={{ marginVertical: 16, marginHorizontal: 20 }}>
                    <Text style={{ fontSize: 16, fontFamily: 'Poppins-Medium' }}>View All</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={topicListData.topics}
                renderItem={renderTopicItem}
                horizontal={true}
            ></FlatList>
        </>
    );
}

const CategoriesComponent = ({ navigation, childName, categories }) => {

    const renderCategoryItem = ({ item, index }) => (
        <CategoryItem navigation={navigation} categoryName={item.name} index={index} topicId={item.id} />
    );

    return (

        <View style={{ flex: 1, backgroundColor: "#F5F8FF" }}>
            {
                categories && categories.length > 1 ? <View>
                    <FlatList
                        stickyHeaderIndices={[0]}
                        ListHeaderComponent={<AppHeader title={"Hi, " + childName}></AppHeader>}
                        data={categories}
                        renderItem={renderCategoryItem}
                        keyExtractor={item => item.id}
                    />
                </View> : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator size={"small"}></ActivityIndicator></View>
            }

        </View>
    );
}

export default CategoriesComponent;