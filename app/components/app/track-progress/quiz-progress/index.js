import React from 'react';
import { View, StyleSheet, ScrollView, Text, Platform } from 'react-native';
import { BoxShadow } from 'react-native-shadow';
import { Divider } from 'react-native-paper';
import LinearGradient from "react-native-linear-gradient";
//Import Plugins and Libraries

//Import Constants and variables
import { COLORS, SCREEN_WIDTH, SCREEN_HEIGHT } from '../../../../../constants';

//Import Global Components
import AppHeader from '../../AppHeader';

const QuizProgressComponent = (props) => {
  const {
    account,
    quiz_progress_data,
    selected_child_account,
  } = props.route.params;
  const questions = quiz_progress_data.questions;
  const markInPercentage = parseInt((quiz_progress_data.user_marks / quiz_progress_data.total_marks) * 100);
  const shadowOpt = {
    height: SCREEN_HEIGHT * 0.08,
    width: SCREEN_WIDTH * 0.18,
    color: "#FF8780",
    // color: "#FF8450",
    border: 15,
    radius: 3,
    opacity: 0.26,
    x: 0,
    y: 1,
    style: { paddingBottom: 30 }
  }
  console.log("Quiz Progress.......................................................................................................");

  const quizName = quiz_progress_data.quiz_name.split('-')[0];

  return (
    <>
    <View style={{paddingTop:10,backgroundColor: "#F5F8FF"}}>
      <AppHeader title={quizName} image={account.avatar[0].avatar}></AppHeader>
      </View>
    <View style={
      {
        flex: 1,
        // justifyContent: 'flex-start',
        // alignItems: 'center',
        width: SCREEN_WIDTH,
        backgroundColor: "#F5F8FF"
      }
    }>
      {/* <AppHeader title={quizName} image={account.avatar[0].avatar}></AppHeader> */}
      {/* <AppHeader title={selected_child_account.name}></AppHeader> */}
      <View style={{
        marginHorizontal: 40, marginVertical:24,
        // backgroundColor:"green" 
      }}>

        {/* <Text style={{fontSize:16,fontWeight:'bold'}}>{quiz_progress_data.quiz_name}</Text> */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", height: SCREEN_HEIGHT * 0.1, }}>
          <View style={{ flexDirection: "column", justifyContent: "space-around", width: SCREEN_WIDTH * 0.5 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={{ color:'black',fontSize: 20, fontWeight: "bold",fontFamily:'Poppins-Regular', }}>Total Marks:</Text>
              <Text style={{color:'black', fontSize: 20, fontWeight: "bold",fontFamily:'Poppins-Regular', }}>{quiz_progress_data.total_marks}</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={{ color:'black',fontSize: 20, fontWeight: "bold",fontFamily:'Poppins-Regular', }}>Obtained Marks:</Text>
              <Text style={{ color:'black',fontSize: 20, fontWeight: "bold",fontFamily:'Poppins-Regular', }}>{quiz_progress_data.user_marks}</Text>
            </View>
          </View>
          <View style={{ justifyContent: "center", alignItems: 'center' }}>
            <BoxShadow setting={shadowOpt}>
              <View style={{ justifyContent: "center", alignItems: 'center' }}>

                <LinearGradient colors={["#FFAC71", "#FF8450"]} style={{
                  height: SCREEN_HEIGHT * 0.096,
                  width: SCREEN_WIDTH * 0.22,
                  borderRadius: 12,
                  justifyContent: "center",
                  alignItems: 'center'
                }}>
                  <Text
                  numberOfLines={1}
                  allowFontScaling={true} 
                  adjustsFontSizeToFit={true}
                  style={{ color: "white", fontSize: 34, fontWeight: "bold",fontFamily:'Poppins-Regular', }}>{markInPercentage}%</Text>
                </LinearGradient>
              </View>
            </BoxShadow>
          </View>
        </View>

      </View>
      <Divider style={{
        height: 3, backgroundColor: "#DEE8FB"
      }} />
      <ScrollView>
        <View style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
          width: SCREEN_WIDTH,
          backgroundColor: "#F5F8FF",
          paddingBottom:10,
        }}>

          {Object.keys(questions).map(function (key, index) {
            return (
              <>
                <View key={index} style={{ marginTop: 20, marginBottom: 40 }}>
                  <Text style={[global.text, { color:'black',textAlign: 'justify', marginTop: 4, fontSize: 14,fontFamily:'Poppins-Regular', }]}>
                    Question # {index + 1}
                  </Text>
                  <Text
                    style={[global.text, { color:'black',textAlign: 'justify', marginTop: 4, width: SCREEN_WIDTH * 0.8, fontSize: 20, fontWeight: 'bold',fontFamily:'Poppins-Regular', }]}>
                    {key}
                  </Text>
                  {questions[key].map((answer, index) => {
                    if (answer.is_correct) {
                      return (
                        <View style={{
                          marginTop: 4,
                          // height: SCREEN_HEIGHT * 0.06,
                          width: SCREEN_WIDTH * 0.8,
                          backgroundColor: "#027E6A",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius:4,
                        }}>
                          <Text
                            key={index}
                            style={[{ color: "white", padding:8, fontSize: 20,fontFamily:'Poppins-Regular', }]}>
                            {answer.option}
                          </Text>
                        </View>
                      );
                    }
                    if (answer.is_users_answer) {
                      return (
                        <View style={{
                          marginTop: 4,
                          // height: SCREEN_HEIGHT * 0.06,
                          width: SCREEN_WIDTH * 0.8,
                          backgroundColor: "red",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius:4,
                        }}>
                          <Text
                            key={index}
                            style={[{ color: "white", padding:8, fontSize: 20 ,fontFamily:'Poppins-Regular',}]}>
                            {answer.option}
                          </Text>
                        </View>
                      );
                    }
                    if (!answer.is_users_answer && !answer.is_users_answer) {
                      return (
                        <View style={{
                          marginTop: 4,
                          // height: SCREEN_HEIGHT * 0.06,
                          width: SCREEN_WIDTH * 0.8,
                          backgroundColor: "#DEE8FB",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius:4,
                        }}>
                          <Text
                            key={index}
                            style={[{ color: "black", padding:8, fontSize: 20,fontFamily:'Poppins-Regular', }]}>
                            {answer.option}
                          </Text>
                        </View>
                      );
                    }
                  })}
                </View>
                <Divider style={{
                  width:SCREEN_WIDTH * 1,
                  height: 3, backgroundColor: "#DEE8FB"
                }} />
              </>

            );
          })}
        </View>
      </ScrollView>
    </View>
    </>

  );
}

const styles = StyleSheet.create({
  quiz_card: {
    flexDirection: 'column',
    width: SCREEN_WIDTH * 0.9,
    padding: 16,
    marginBottom: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderRadius: 3,
    backgroundColor: COLORS.secondary_background_color,
  },
  child_account_count_circle: {
    flexDirection: 'row',
    width: 21,
    height: 21,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.white,
    borderRadius: 10.5,
    marginRight: 15,
  },
  button: {
    maxHeight: 25,
    borderRadius: 3,
  },
});

export default QuizProgressComponent;

import global from '../../../../../global-styles'; import { color } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
