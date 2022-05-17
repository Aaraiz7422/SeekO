import React, {useState, useEffect, useContext} from 'react';
import {View, Image, Dimensions, Button, Pressable} from 'react-native';
import AppHeader from '../AppHeader';
import {ScrollView} from 'react-native-gesture-handler';
import {ProgressBar, Colors, Text, ActivityIndicator} from 'react-native-paper';
import CustomCard from '../../global/CustomCard';
import CustomButton from '../../global/CustomButton';
import Icon from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import {BoxShadow} from 'react-native-shadow';
import QuizCard from '../../global/quiz-card';

import FullScreenModal from '../FullScreenModal';
import {useNetInfo} from '@react-native-community/netinfo';
import ConnectionModal from '../../global/ConnectionModal';
import {NetworkContext} from '../../../../network-context';

const QuizzesComponent = props => {
  const [visible, setVisible] = useState(false);
  const netInfo = useNetInfo();
  const {
    account,
    current_question_index,
    quiz_data,
    selected_quiz,
    submitting_quiz,
    fetching_quiz_data,
    fetching_quiz_data_error,
    attempted_quiz_data,
    show_quiz_submit_button,
    quiz_answers_indexes_list,
    tab_data,
    selected_topic_redux,
    fetchQuizData,
    onSelectionOfQuizOption,
    onNextQuestion,
    onPreviousQuestion,
    submitQuiz,
    selected_topic_title,
  } = props;
  const internetAvailability = useContext(NetworkContext);

  console.log('Questionssssssssssssssssssss', selected_topic_title, quiz_data);
  // *** uncomment below line if you Quiz AppBar/AppHeader title with tab number
  // const headerTitle = selected_topic_redux ? tab_data ? `${selected_topic_redux.name} - ${tab_data.name}` : `${selected_topic_redux.name}` : 'Quiz';
  const headerTitle = selected_topic_redux
    ? tab_data
      ? `${selected_topic_redux.name}`
      : `${selected_topic_redux.name}`
    : 'Quiz';
  const showModal = () => setVisible(true);
  const closeModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: 'white',
    padding: 30,
    margin: 30,
    borderRadius: 20,
  };

  const shadowOpt = {
    width: 80,
    height: 80,
    // width: Dimensions.get('window').width * 0.17,
    // height: Dimensions.get('window').height * 0.1,
    color: '#f9c04d',
    border: 10,
    radius: 30,
    opacity: 0.15,
    x: 0,
    y: 1,
    style: {
      // justifyContent:"center",
      marginVertical: 10,
      marginHorizontal: 10,
    },
  };

  const renderQuizQuestions = () => {
    let current_question = quiz_data.questions[current_question_index];
    let question_number_heading =
      current_question_index + 1 + '/' + quiz_data.questions.length;
    let progress_calculation =
      (current_question_index + 1) / quiz_data.questions.length;

    return (
      <QuizCard
        question_number_heading={question_number_heading}
        current_question={current_question}
        progress_calculation={progress_calculation}
        {...props}
      />
    );
  };

  return (
    <>
      {internetAvailability.isConnected ? (
        <View style={{flex: 1, backgroundColor: '#F5F8FF'}}>
          <View style={{paddingTop: 10, backgroundColor: '#F5F8FF'}}>
            <AppHeader
              title={headerTitle}
              image={account.avatar[0].avatar}></AppHeader>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={true}
            style={{alignContent: 'center'}}>
            {/* <View
          style={{
            // flex: 1,
            backgroundColor: 'green',
            // height: Dimensions.get('window').height * 0.88,
            alignContent: 'center',
          }}> */}
            {!fetching_quiz_data && !fetching_quiz_data_error && quiz_data ? (
              renderQuizQuestions()
            ) : fetching_quiz_data ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator size="large" color="#00CDAC" />
              </View>
            ) : (
              fetching_quiz_data_error && (
                <Button
                  title="Tap to reload"
                  onPress={() => fetchQuizData()}></Button>
              )
            )}
            <View
              style={{
                alignItems: 'center',
                // backgroundColor:"grey",
                // opacity:0.5,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  width: Dimensions.get('window').width * 0.9,
                  // backgroundColor:"purple",
                  justifyContent: 'space-between',
                }}>
                <BoxShadow setting={shadowOpt}>
                  <LinearGradient
                    colors={['#F8C04E', '#FFBF3C']}
                    style={{
                      width: 80,
                      height: 80,
                      // width: Dimensions.get('window').width * 0.16,
                      // height: Dimensions.get('window').height * 0.12,
                      alignItems: 'center',
                      borderRadius: 60,
                      justifyContent: 'center',
                    }}>
                    <Icon.Button
                      name="arrowleft"
                      size={40}
                      backgroundColor={'transparent'}
                      onPress={() => {
                        onPreviousQuestion();
                      }}></Icon.Button>
                  </LinearGradient>
                </BoxShadow>
                <BoxShadow setting={shadowOpt}>
                  <LinearGradient
                    colors={['#F8C04E', '#FFBF3C']}
                    style={{
                      width: 80,
                      height: 80,
                      // width: Dimensions.get('window').width * 0.16,
                      // height: Dimensions.get('window').height * 0.12,
                      alignItems: 'center',
                      borderRadius: 60,
                      justifyContent: 'center',
                    }}>
                    <Icon.Button
                      name="arrowright"
                      size={40}
                      backgroundColor={'transparent'}
                      onPress={() => {
                        onNextQuestion();
                      }}></Icon.Button>
                  </LinearGradient>
                </BoxShadow>
              </View>
              {!show_quiz_submit_button || submitting_quiz ? (
                <></>
              ) : (
                <CustomButton
                  backgroundColor={'#F5F8FF'}
                  title={'Submit'}
                  textColor={'white'}
                  height={50}
                  width={0.7}
                  borderRadius={30}
                  shadowColor={'#f9c04d'}
                  shadowVerticalMargin={0}
                  shadowRadius={20}
                  shadowBorder={10}
                  shadowHorizontalMargin={10}
                  // shadowVerticalMargin={10}
                  shadowOpacity={0.15}
                  linearStartColor={'#F8C04E'}
                  linearEndColor={'#FFBF3C'}
                  onPress={showModal}></CustomButton>
              )}
            </View>
            {/* {!netInfo.isConnected && <Text>No Internet Connection</Text>} */}
            {/* <FullScreenModal visible={visible} onDismiss={closeModal}>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 22,
                  fontWeight: 'bold',
                  fontFamily: 'Poppins-Regular',
                  textAlign: 'center',
                  marginBottom: 30,
                }}>
                Are you sure you want to submit your quiz?
              </Text>
              <CustomButton
                backgroundColor={'#FFFFFF'}
                textColor={'black'}
                title={'Cancel'}
                height={60}
                width={0.64}
                borderColor={'red'}
                borderWidth={1}
                borderRadius={30}
                onPress={closeModal}></CustomButton>
              <CustomButton
                backgroundColor={'#01CCAD'}
                textColor={'black'}
                title={'OK'}
                height={60}
                width={0.64}
                borderRadius={30}
                onPress={submitQuiz}></CustomButton>
            </View>
          </FullScreenModal> */}
            {/* </View> */}
          </ScrollView>
          <FullScreenModal visible={visible} onDismiss={closeModal}>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 22,
                  fontWeight: 'bold',
                  fontFamily: 'Poppins-Regular',
                  textAlign: 'center',
                  marginBottom: 30,
                }}>
                Are you sure you want to submit your quiz?
              </Text>
              <CustomButton
                backgroundColor={'#FFFFFF'}
                textColor={'black'}
                title={'Cancel'}
                height={60}
                width={0.64}
                borderColor={'red'}
                borderWidth={1}
                borderRadius={30}
                onPress={closeModal}></CustomButton>
              <CustomButton
                backgroundColor={'#01CCAD'}
                textColor={'black'}
                title={'OK'}
                height={60}
                width={0.64}
                borderRadius={30}
                onPress={submitQuiz}></CustomButton>
            </View>
          </FullScreenModal>
        </View>
      ) : (
        <ConnectionModal
          visible={!internetAvailability.isConnected}></ConnectionModal>
      )}
    </>
  );
};

export default QuizzesComponent;
