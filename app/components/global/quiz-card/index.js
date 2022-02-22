import React, { Component, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, Text, Pressable, Dimensions } from 'react-native';
import { COLORS, SCREEN_WIDTH } from '../../../../constants';
import global from '../../../../global-styles';
import { ProgressBar } from 'react-native-paper';
import CustomButton from '../CustomButton';
import { useSafeAreaFrame } from 'react-native-safe-area-context';

const QuizCard = (props) => {

  const {
    current_question,
    question_number_heading,
    show_quiz_submit_button,
    quiz_answers_indexes_list,
    submitting_quiz,
    progress_calculation,
  } = props;

  const [quiz_button_height, set_Quiz_Button_Height] = useState(50);
  const [onLayout, setOnlLayout] = useState(true);

  const onChangeOption = (current_question, option) => {
    props.onSelectionOfQuizOption(current_question, option);
  };

  const find_dimesions = (layout) => {
    const { x, y, width, height } = layout;
    set_Quiz_Button_Height(height);
    setOnlLayout(false)
    console.log(`Button Height ${height}`);
  }

  console.log('submitting_quiz: ', submitting_quiz, show_quiz_submit_button);
  return (
    <View
      style={[
        global.page_container_with_aligned_flex_start,
        { paddingTop: 0 },
      ]}>

      <ScrollView showsVerticalScrollIndicator={true}>
        <View
          style={[
            {
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start',
              marginBottom: 16,
              width: Dimensions.get('window').width * 0.8,
            },
          ]}>

          <ProgressBar progress={progress_calculation}
            style={{
              width: SCREEN_WIDTH * 0.8,
              height: 16,
              borderRadius: 10,
              borderColor: 'rgba(0, 0, 0, 0.19)',
              borderWidth: 2,
              backgroundColor: "#F5F8FF",
              marginTop: 20,
            }}
            color={"#F8C04E"} />

        </View>
        <View
          style={[
            {
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              marginBottom: 16,
              width: Dimensions.get('window').width * 0.8,
            },
          ]}>

          <Text
            style={[global.text, { marginTop: 20, fontSize: 16, fontFamily: 'Poppins-Regular', }]}
          >
            Question: {question_number_heading}
          </Text>
          <Text style={[global.text, global.margin_top_10, global.alignTextJustify, { fontFamily: 'Poppins-Regular', fontWeight: 'bold', fontSize: 20 }]}>
            {current_question.question}
          </Text>
        </View>
        <View
          style={{ marginTop: 10, marginBottom: 10, justifyContent: 'flex-start', alignItems: 'center' }}
        >
          {current_question.options.map((option) => {
            let is_selected =
              quiz_answers_indexes_list[current_question.id] &&
              quiz_answers_indexes_list[current_question.id] === option.id;
            return (
              <View style={{ margin: 5 }}>
                <Pressable style={[{ width: Dimensions.get('window').width * 0.8, borderRadius: 30, borderWidth: 1, backgroundColor: is_selected ? "#01CCAD" : "#F5F8FF", }]} onPress={() => onChangeOption(current_question, option)}>
                  <Text style={{ color: 'black', textAlign: 'center', fontFamily: 'Poppins-Regular', margin: 10, fontSize: 20 }}>{option.option}</Text>
                </Pressable>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

export default QuizCard;
const styles = StyleSheet.create({
  option_container: {
    width: SCREEN_WIDTH * 0.9,
    padding: 16,
    backgroundColor: COLORS.secondary_background_color,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: COLORS.border_outline,
  },
  active_option: {
    backgroundColor: COLORS.white,
  },
  small_button: {
    width: (SCREEN_WIDTH * 0.9 - (SCREEN_WIDTH * 0.4) - 20) / 2,
    height: 45,
    borderRadius: 3,
  },
  button: {
    width: SCREEN_WIDTH * 0.4,
    height: 45,
    borderRadius: 3,
    fontSize: 20,
  },
});
