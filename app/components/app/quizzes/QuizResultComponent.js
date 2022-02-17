import React from 'react';
import { View, Image, Text } from 'react-native';
import AppHeader from '../AppHeader';
import { ScrollView } from 'react-native-gesture-handler';
import { ProgressBar, Colors } from 'react-native-paper';
import CustomCard from '../../global/CustomCard';
import CustomButton from '../../global/CustomButton';
import {connect} from 'react-redux';
import { StackActions } from '@react-navigation/native';

const QuizResultComponent = (props) => {
const { navigation ,route} = props;
const {quiz_result_data,selected_quiz,tab_data} = route.params;

console.log("Result.............................",props.selected_topic_redux);

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
                        backgroundColor: "#F5F8FF",
                        marginHorizontal: 30,
                        marginTop: 20,
                        marginBottom: -20,
                    }}
                    color={"#01CCAD"} />
                <View style={{ marginTop: 50, alignItems: "center" }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>You have scored:</Text>
                    <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>{quiz_result_data.user_marks}/{quiz_result_data.total_marks}</Text>
                </View>
                <View style={{marginBottom:-40,marginTop:-20}}>

                <CustomCard coverImage={'https://picsum.photos/700'}
                    imageMargin={20}
                    width={0.90}
                        height={0.38}
                ></CustomCard>
                </View>
                <View style={{alignItems:'center'}}>

                <CustomButton
                    backgroundColor={"#DEE8FB"}
                    title={"Review Quiz"}
                    height={50}
                    width={0.80}
                    borderRadius={30}
                    textColor={"white"}
                    linearStartColor={'#F8C04E'}
                    linearEndColor={'#FFBF3C'}
                    shadowColor={'#FFBF3C'}
                    shadowRadius={20}
                ></CustomButton>
                <CustomButton
                    backgroundColor={"#DEE8FB"}
                    title={"Reattempt Quiz"}
                    height={50}
                    width={0.80}
                    borderRadius={30}
                    textColor={"white"}
                    linearStartColor={'#F8C04E'}
                    linearEndColor={'#FFBF3C'}
                    shadowColor={'#FFBF3C'}
                    shadowRadius={20}
                    onPress={() => {
                        // console.log('Parent Data: ', parent_data);
                        console.log('Tab Data: ', tab_data);
                        // navigation.dispatch(StackActions.popToTop());
                        navigation.pop();
                        navigation.replace('Quizzes', {
                            selected_quiz: {id: selected_quiz.id },
                            tab_data,
                          });
                    
                        // navigation.navigate('Quizzes', {
                        //   selected_quiz: {id: selected_quiz.id },
                        //   tab_data,
                        // });
                      }}
                ></CustomButton>
                </View>
            </View>
        </ScrollView>
    );
}

const mapStateToProps = (state) => {
    // Redux Store --> Component
    return {
      selected_topic_redux: state.userReducer.selected_topic,
    };
  };
  
  // Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
  const mapDispatchToProps = (dispatch) => {
    // Action
    return {};
  };
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(QuizResultComponent);