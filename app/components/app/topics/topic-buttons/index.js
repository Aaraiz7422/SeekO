import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import CustomCard from '../../../global/CustomCard';
import CustomButton from '../../../global/CustomButton';

const TopicButtonsContainer = (props) => {
    const {account, topic_associated_data, selected_topic, navigation } = props;

    return (
        <View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <CustomCard
                        height={0.38}
                        width={0.9}
                        coverImage={selected_topic.thumbnail}
                    ></CustomCard>
                </View>
                {topic_associated_data.map((content) => {
                    return (
                        <View key={content.id} >
                            <CustomButton
                                title={content.name}
                                height={50}
                                width={0.90}
                                borderRadius={30}
                                textColor={"white"}
                                linearStartColor={'#F8C04E'}
                                linearEndColor={'#FFBF3C'}
                                shadowColor={'#FFBF3C'}
                                shadowRadius={20}
                                shadowHorizontalMargin={20}
                                onPress={() => {
                                    console.log('OnPress: ', content);
                                    navigation.push('Topics', {
                                        account:account,
                                        selected_button: content,
                                        content_type: content.has_content ? 'content' : 'tabs',
                                        selected_topic_title: selected_topic.name,
                                    });
                                    console.log("Content cccccccccccccccc: ", content);
                                }}
                            ></CustomButton>
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
}

export default TopicButtonsContainer;
