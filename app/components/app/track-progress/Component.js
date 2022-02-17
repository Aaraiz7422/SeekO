import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Button,
  Text,
} from 'react-native';

//Import Plugins and Libraries

//Import Constants and variables
import { COLORS, SCREEN_WIDTH } from '../../../../constants';
import global from '../../../../global-styles'; import AppHeader from '../AppHeader';
import { ActivityIndicator } from 'react-native-paper';

const TrackProgressComponent = (props) => {

  const {
    fetching_quiz_progress_data,
    fetching_quiz_data_progress_error,
    current_user,
    selected_child_account,
    selected_screen,
    quiz_progress_data,
    getCurrentUserAction,
  } = props;

  const child_accounts = current_user.child_accounts;
  const flat_list_data =
    selected_screen && selected_screen === 'quizzes_list'
      ? quiz_progress_data
      : child_accounts;

  const renderChildAccounts = ({ item, index }) => {
    const { navigation, selected_child_account, selected_screen } = props;
    console.log("Selected Screen...................................", selected_screen);
    // console.log('QUIZ CARD ADAT: ', JSON.stringify(item));
    return (
      <View key={item.id} style={[styles.child_card, { backgroundColor: "#DEE8FB" }]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <View style={styles.child_account_count_circle}>
            <Text style={{ textAlign: 'center' }} >{index + 1}</Text>
          </View>
          <View style={{ maxWidth: ((SCREEN_WIDTH * 0.9) - 24 - 120) }}>
            <Text style={[global.text, { fontSize: 18 }]}>
              {selected_screen && selected_screen === 'quizzes_list'
                ? item.quiz_name
                : item.name}
            </Text>
          </View>
        </View>
        <Button
          title='View'
          color={"#FF8450"}
          style={styles.button}
          onPress={() => {
            if (selected_screen && selected_screen === 'quizzes_list') {
              console.log("Selected Screen...................................", selected_screen);
              navigation.push('QuizProgress', {
                quiz_progress_data: item,
                selected_child_account: selected_child_account,
              });
            } else {
              navigation.push('TrackProgress', {
                selected_child_account: item,
                selected_screen: 'quizzes_list',
              });
            }
          }}>
        </Button>
      </View>
    );
  };

  return (
    <View style={
      {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: SCREEN_WIDTH,
        backgroundColor: "#F5F8FF"
      }
    }>
      <AppHeader title={
        selected_screen && selected_screen === 'quizzes_list'
          ? selected_child_account.name
          : 'Track Progress'
      }></AppHeader>

      {!fetching_quiz_progress_data && !fetching_quiz_data_progress_error && current_user ? (
        <FlatList
          style={{ marginTop: 20, }}
          data={flat_list_data}
          renderItem={renderChildAccounts}
          keyExtractor={(item) => item.id}
        />
      ) : fetching_quiz_progress_data ? (
        <ActivityIndicator size={"large"}></ActivityIndicator>
      ) : (
        fetching_quiz_data_progress_error && (
          <>
            <Button title='Tap to reload' onPress={() => getCurrentUserAction()}></Button>
          </>
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  child_card: {
    flexDirection: 'row',
    width: SCREEN_WIDTH * 0.9,
    height: 'auto',
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
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
    marginRight: 8,
  },
  button: {
    maxHeight: 'auto',
    borderRadius: 3,
  },
});

export default TrackProgressComponent;

