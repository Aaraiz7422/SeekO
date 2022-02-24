import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Button } from 'react-native';
import AppHeader from '../AppHeader';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import CustomCard from '../../global/CustomCard';
import { ActivityIndicator } from 'react-native-paper';

const TopicsListComponent = (props) => {

    const {
        account,
        navigation,
        fetching_topics,
        fetching_topics_error,
        selection_type,
        selected_category,
        selected_topic,
        topicListData,
    } = props;

    const Item = ({ item, index }) => (
        <CustomCard
            height={0.38}

            width={0.9}
            cardTitle={item.name}
            coverImage={item.thumbnail}
            imageMargin={10}
            linearStartColor={index % 2 != 0 ? '#02AAB0' : "#FFAC71"}
            linearEndColor={index % 2 != 0 ? "#00CDAC" : "#FF8450"}
            shadowColor={index % 2 != 0 ? "#00cbac" : "#FFA06A"}
            shadowBorder={16}
            shawdowOpacity={0.25}
            shadowHorizontalMargin={22}
            shadowVerticalMargin={20}
            onPress={() => goToTopicDetail(item, index)}
        ></CustomCard>
    );

    const renderItem = ({ item, index }) => (
        <Item item={item} index={index} />
    );

    const goToTopicDetail = (item, index) => {
        navigation.push('Topics', { account:account, selected_topic: item, index: index });
        console.log(`Go to Detail Component : ${item.name} ${item.thumbnail} ${item} ${index}`);
    }

    return (
        <>
            {!fetching_topics && !fetching_topics_error && topicListData ?
                <View style={[{ flex: 1, backgroundColor: "#F5F8FF", alignItems: 'center' }]}>
                    <FlatList
                        stickyHeaderIndices={[0]}
                        ListHeaderComponent={<AppHeader title={topicListData.name} image={account.avatar[0].avatar}></AppHeader>}
                        data={topicListData.topics}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                </View> : fetching_topics ? (
                    <ActivityIndicator size="large" />
                ) : (
                    fetching_topics_error && <View>
                        <Text style={{ color:'black',fontFamily: 'Poppins-Regular' }}>Tap to reload</Text>
                        <Button title='click me' onPress={() => fetchTopics()}></Button>
                    </View>
                )
            }
        </>
    );
}

export default TopicsListComponent;