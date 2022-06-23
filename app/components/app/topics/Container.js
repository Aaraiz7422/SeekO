//Import Core Components
import React, {useEffect, useState} from 'react';
import {Alert, PermissionsAndroid, Platform} from 'react-native';
//Import Local Components
import TopicsListComponent from './Component';
import TopicDetailsComponent from './TopicDetailsComponent';
//Import Redux components and actions
import {connect} from 'react-redux';
import {
  getCurrentUser,
  setSelectedTopic,
  setCurrentUserFetchLoading,
} from '../../../redux/actions/userActions';
//Import Services and APIs
import services from '../../../api/services';
import {urls} from '../../../api/urls';

import {PDFDocument, StandardFonts, rgb, PageSizes} from 'pdf-lib';
import Share from 'react-native-share';
// import RNFetchBlob from 'react-native-fetch-blob'
import ReactNativeBlobUtil from 'react-native-blob-util';

import {
  writeFile,
  appendFile,
  copyFile,
  DownloadDirectoryPath,
  DocumentDirectoryPath,
} from 'react-native-fs';
import Pdf from 'react-native-pdf';
import {PdfImage, dataUriFont} from '../../../../constants';
import fontkit from '@pdf-lib/fontkit';

const TopicsContainer = props => {
  const {navigation, route} = props;
  const {topicListData, account} = route.params;

  // Pdf States
  const [source, setSource] = useState(null);
  const [url, setUrl] = useState('');
  const [file_Path, setFilePath] = useState('');
  // end Pdf States

  const [selection_type, setSelectionType] = useState('by_category');
  const [selected_topic_title, setSelectedTopicTitle] = useState(null);
  const [selected_category, setSelectedCategory] = useState(topicListData);
  const [selected_topic, set_Selected_Topic] = useState(null);
  const [selected_button, setSelectedButton] = useState(null);
  const [content_type, setContentType] = useState(null);

  const [fetching_topics, setFetchingTopics] = useState(false);
  const [fetching_topics_error, setFetchingTopicsError] = useState(false);

  const [topic_associated_data, setTopicAssociatedData] = useState(null);
  const [topic_list_data, set_Topic_List_Data] = useState(topicListData);

  // UI Screen render on the base of Selection Type variable value
  useEffect(() => {
    if (props.route.params.topicListData !== undefined) {
      setSelectedCategory(topicListData);
      if (selected_category !== null) {
        fetchTopics();
      }
    }
    if (props.route.params.selected_topic !== undefined) {
      let s_topic = props.route.params.selected_topic;
      props.setSelectedTopicAction(s_topic);
      setSelectionType('by_topic');
      set_Selected_Topic(s_topic);
      setSelectedTopicTitle(s_topic.name);
    }

    if (props.route.params.selected_button !== undefined) {
      let s_button = props.route.params.selected_button;
      let c_type = props.route.params.content_type;
      let s_topic_title = props.route.params.selected_topic_title;
      setSelectionType('by_button');
      setContentType(c_type);
      setSelectedButton(s_button);
      setSelectedTopicTitle(s_topic_title);
      createPdf(s_topic_title);
    }
    // createPdf();

    console.log(`selection type : ${selection_type}`);
    console.log(`content type : ${content_type}`);
    console.log(`selected topic : ${selected_topic}`);
    console.log(`selected button : ${selected_button}`);
    console.log(`selected topic Name : ${selected_topic_title}`);
  }, []);

  useEffect(() => {
    console.log('Effect Updated');
    console.log(`Selection type : ${selection_type}`);

    if (selected_topic !== null) {
      if (selected_topic.is_leaf) {
        setTopicDataType();
      } else {
        fetchTopics();
      }
      console.log(`selected topic id: ${selected_topic.id}`);
    }
    if (selected_button !== null) {
      fetchContentByButton();
    }
    console.log(`selected topic Name : ${selected_topic_title}`);
  }, [selection_type, selected_topic_title]);

  const setLoadingAndErrorState = (fetching_topics, fetching_topics_error) => {
    setFetchingTopics(fetching_topics);
    setFetchingTopicsError(fetching_topics_error);
  };

  const fetchTopics = () => {
    setLoadingAndErrorState(true);
    let data = null;
    let url = null;
    if (selection_type === 'by_category') {
      data = {category_id: selected_category.id};
      url = urls.get_topics_by_category;
    } else {
      data = {topic_id: selected_topic.id};
      url = urls.get_topics_by_topic;
    }
    services
      .base_service(url, data)
      .then(response => {
        console.log('topics response: ', response);
        if (selection_type === 'by_category') {
          setSelectedCategory(response);
        } else {
          set_Selected_Topic(response);
          setSelectedTopicTitle(response.name);
          console.log(
            '11111111111111LLLLLLLLLLLLLLLLLLLLLLLoooooooooooooggggggggg',
            response,
          );
        }
        console.log('LLLLLLLLLLLLLLLLLLLLLLLoooooooooooooggggggggg', response);
        set_Topic_List_Data(response);
        setLoadingAndErrorState(false, false);
      })
      .catch(error => {
        setLoadingAndErrorState(false, true);
        console.log('fetch topics error: ', error);
      });
  };

  const fetchContentByButton = () => {
    setLoadingAndErrorState(true);
    // const {selected_button, content_type} = this.state;
    let data = {button_id: selected_button.id};
    let url =
      content_type === 'tabs'
        ? urls.get_tabs_by_button
        : urls.get_content_by_button;
    fetchTopicData(url, data);
  };

  // fetch the topic course list and
  // pass the reponse to the TopicListComponent UI Screen.
  const fetchTopicData = (url, data) => {
    services
      .base_service(url, data)
      .then(response => {
        console.log('fetchTopicData response: ', response);
        setTopicAssociatedData(response);
        setLoadingAndErrorState(false, false);
      })
      .catch(error => {
        setLoadingAndErrorState(false, true);
        console.log('fetchTopicData  error: ', error);
      });
  };

  // this function calls the api on the base of selection type and content type
  // and response data passes to respective screen UI
  const setTopicDataType = () => {
    setLoadingAndErrorState(true);
    // const {selected_topic, selection_type} = state;
    console.log(`selected topic id: ${selected_topic.id}`);
    let data = {topic_id: selected_topic.id};
    let url = null;
    if (selected_topic && selection_type === 'by_topic') {
      let content_type =
        !selected_topic.has_buttons && !selected_topic.has_tabs
          ? 'content'
          : selected_topic.has_buttons
          ? 'buttons'
          : selected_topic.has_tabs
          ? 'tabs'
          : null;
      console.log('Content Type: ', content_type);
      setContentType(content_type);
      switch (content_type) {
        case 'content': {
          url = urls.get_content_by_topic;
          fetchTopicData(url, data);
          return;
        }
        case 'buttons': {
          url = urls.get_buttons_list_by_topic;
          fetchTopicData(url, data);
          return;
        }
        case 'tabs': {
          url = urls.get_tabs_list_by_topic;
          fetchTopicData(url, data);
          return;
        }
        default: {
          setLoadingAndErrorState(false, true);
          return;
        }
      }
    }

    // console.log("Topic Associated Data : ",topic_associated_data);
  };

  const requestRunTimePermission = () => {
    async function externalStoragePermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs access to Storage data.',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          saveFile();
        } else {
          alert('WRITE_EXTERNAL_STORAGE permission denied');
        }
      } catch (err) {
        Alert.alert('Write permission err', err);
        console.warn(err);
      }
    }

    if (Platform.OS === 'android') {
      externalStoragePermission();
    } else {
      saveFile();
    }
  };

  const saveFile = () => {
    // var RNFS = require('react-native-fs');
    const fs = ReactNativeBlobUtil.fs;
    // var splitArray = file_Path.split("/");

    // var fileName = splitArray[splitArray.length - 1]
    // console.log("Saved File Name :",fileName)
    // console.log("File Storage location : ",fs)

    // console.log(`File path : ${file_Path}`);
    // var path = RNFS.DownloadDirectoryPath + '/' + fileName;
    var path = DownloadDirectoryPath + '/' + `${account.name} Certificate.pdf`;
    console.log(`\n path : ${path}`);

    if (Platform.OS === 'ios') {
      var path =
        DocumentDirectoryPath + '/' + `${account.name} Certificate.pdf`;
      fs.writeFile(path, file_Path, 'uri')
        .then(() => {
          console.log('SaveFile ios');
        })
        .catch(err => {
          console.log('SaveFile ios error', err.message);
          alert(err.message);
        });

      fs.readFile(file_Path, 'base64')
        .then(data => {
          if (Platform.OS === 'ios') {
            ReactNativeBlobUtil.ios.presentOpenInMenu(data);
            console.log('readFile ios');
          }
          // handle the data ..
        })
        .catch(err => {
          console.log('readFile ios error', err.message);
          alert(err.message);
        });
    }
    // var path = DocumentDirectoryPath + '/' + fileName;
    if (Platform.OS === 'android') {
      fs.writeFile(path, file_Path, 'uri')
        .then(() => {
          // if (Platform.OS === 'ios') {
          //   ReactNativeBlobUtil.ios.previewDocument(file_Path)
          // }
          ReactNativeBlobUtil.android.addCompleteDownload({
            title: `${account.name} Certificate`,
            description: 'Download complete',
            mime: 'application/pdf',
            path: path,
            showNotification: true,
            notification: true,
          });
          // console.log('FILE WRITTEN!');
        })
        .catch(err => {
          console.log('SaveFile()', err.message);
          alert(err.message);
        });
    }

    //   ReactNativeBlobUtil.config({
    //     fileCache: true,
    //     // android only options, these options be a no-op on IOS
    //     addAndroidDownloads: {
    //     title: `${account.name} Certificate`,
    //         // Show notification when response data transmitted
    //         notification: true,
    //     showNotification: true,
    //     path: path,
    //     filename:`${account.name} Certificate`,

    //         // Title of download notification
    //         // File description (not notification description)
    //         description: 'An PdF file.',
    //         mime: 'application/pdf',

    //         // Make the file scannable  by media scanner
    //         // mediaScannable: true,
    //     }
    // })
    // })
    // .catch((err) => {
    //   console.log("SaveFile()", err.message);
    //   alert(err.message)
    // });

    //   RNFetchBlob.android.addCompleteDownload({
    //     title: `Maria`,
    //     description: 'desc',
    //     mime: 'application/pdf',
    //     path: path,
    //     showNotification: true,
    //     notification: true
    //   })
    //   console.log('FILE WRITTEN!');
    // })
  };

  // save pdf
  // const saveFile = () => {
  //   // var RNFS = require('react-native-fs');
  //   const fs = RNFetchBlob.fs
  //   var splitArray = file_Path.split("/");

  //   var fileName = splitArray[splitArray.length - 1]
  //   console.log(fileName)
  //   // var path = RNFS.DownloadDirectoryPath + '/' + fileName;
  //   var path = DownloadDirectoryPath + '/' + fileName;
  //   // var path = DocumentDirectoryPath + '/' + fileName;

  //   fs.writeFile(path, file_Path, 'uri')
  //     .then(() => {

  //       RNFetchBlob.android.addCompleteDownload({
  //         title: `${account.name} Certificate`,
  //         description: 'desc',
  //         mime: 'application/pdf',
  //         path: path,
  //         showNotification: true,
  //         notification: true
  //       })
  //       console.log('FILE WRITTEN!');
  //     })
  //     .catch((err) => {
  //       console.log("SaveFile()", err.message);
  //       alert(err.message)
  //     });
  // }

  const centerTextOnPdf = (embededFontVar, text, fontSize) => {
    const textWidth = embededFontVar.widthOfTextAtSize(text, fontSize);
    const textHeight = embededFontVar.heightAtSize(fontSize);

    return {textWidth: textWidth, textHeight: textHeight};
  };

  const createPdf = async courseTitle => {
    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);
    const VincHand = await pdfDoc.embedFont(dataUriFont);
    const TimeNewRoman = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const pngImage = await pdfDoc.embedPng(PdfImage);
    const pngDims = pngImage.scale(0.5);
    const page = pdfDoc.addPage(PageSizes.A4);
    const {width, height} = page.getSize();

    const username = account.name === null ? ' ' : account.name;
    const usernameTextCentering = centerTextOnPdf(VincHand, username, 16);
    const courseTitleTextCentering = centerTextOnPdf(VincHand, courseTitle, 16);
    const congratulationTextCentering = centerTextOnPdf(
      VincHand,
      'Congratulations!',
      30,
    );
    const courseCompletionTextCentering = centerTextOnPdf(
      VincHand,
      'You have completed the course',
      18,
    );

    // const textWidth = VincHand.widthOfTextAtSize(username, 20);
    // const textHeight = VincHand.heightAtSize(20);

    // const textWidth2 = VincHand.widthOfTextAtSize(courseTitle, 20);
    // const textHeight2 = VincHand.heightAtSize(20);

    page.drawRectangle({
      x: 0,
      y: 0,
      width: width,
      height: height,
      // borderColor: rgb(0, 0, 0),
      // borderWidth: 1.5,
      // color:rgb(0, 0, 1),
      color: rgb(0.97, 0.97, 1),
    });

    page.drawImage(pngImage, {
      x: width / 2 - pngDims.width / 2,
      y: height / 2 - pngDims.height + 250,
      width: pngDims.width,
      height: pngDims.height,
    });

    // Draw a string of text toward the top of the page
    page.drawText('Congratulations!', {
      x: width / 2 - congratulationTextCentering.textWidth / 2,
      y: height - 4 * 24 - congratulationTextCentering.textHeight / 2,
      size: 30,
      font: VincHand,
      color: rgb(0, 0, 0),
    });

    // Draw a string of text toward the top of the page
    page.drawText('You have completed the course', {
      x: width / 2 - courseCompletionTextCentering.textWidth / 2,
      y: height - 5 * 28 - courseCompletionTextCentering.textHeight / 2,
      size: 18,
      font: VincHand,
      color: rgb(0, 0, 0),
    });

    page.drawText(username, {
      x: width / 2 - usernameTextCentering.textWidth / 2,
      y: (height + 50) / 2 - usernameTextCentering.textHeight / 2,
      size: 16,
      font: VincHand,
      color: rgb(0.47, 0.47, 0.9),
    });

    // const courseTitle = selected_topic_title === null ? ' ': selected_topic_title;
    page.drawText(courseTitle, {
      x: width / 2 - courseTitleTextCentering.textWidth / 2,
      y: (height - 80) / 2 - courseTitleTextCentering.textHeight / 2,
      size: 16,
      font: VincHand,
      color: rgb(0.47, 0.47, 0.9),
    });

    // Serialize the PDFDocument to bytes (a Uint8Array)
    // const pdfBytes = await pdfDoc.save()
    const base64DataUri = await pdfDoc.saveAsBase64({dataUri: true});
    // dataUri = base64DataUri;
    setSource({uri: base64DataUri});
    setUrl(base64DataUri);
    console.log(`Pdf Created`);
    // console.log(`pdfBytes : ${pdfBytes}`);
    // console.log(`base64DataUri : ${base64DataUri}`);
    // console.log(`dataUri : ${dataUri}`);
  };

  const sharePdf = async () => {
    try {
      await Share.open({
        url: url,
        title: 'Sharing Certificate Maria.pdf file from SeekO app',
        filename: `${account.name} Certificate`,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (selected_topic &&
    selected_topic.is_leaf &&
    selection_type === 'by_topic') ||
    selection_type === 'by_button' ? (
    <TopicDetailsComponent
      source={source}
      setSource={setSource}
      url={url}
      setUrl={setUrl}
      setFilePath={setFilePath}
      sharePdf={sharePdf}
      saveFile={saveFile}
      createPdf={createPdf}
      requestRunTimePermission={requestRunTimePermission}
      account={account}
      fetching_topics={fetching_topics}
      fetching_topics_error={fetching_topics_error}
      selected_topic={selected_topic}
      selected_topic_title={selected_topic_title}
      selection_type={selection_type}
      setTopicDataType={setTopicDataType}
      selected_button={selected_button}
      content_type={content_type}
      navigation={navigation}
      topic_associated_data={topic_associated_data}
    />
  ) : (
    <TopicsListComponent
      {...props}
      account={account}
      navigation={navigation}
      fetchTopics={fetchTopics}
      fetching_topics={fetching_topics}
      fetching_topics_error={fetching_topics_error}
      selection_type={selection_type}
      selected_category={selected_category}
      selected_topic={selected_topic}
      topicListData={topic_list_data}></TopicsListComponent>
  );
};

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = state => {
  // Redux Store --> Component
  return {
    logged_in: state.authReducer.logged_in,
    auth_token: state.authReducer.auth_token,
    current_user_fetching: state.userReducer.current_user_fetching,
    current_user: state.userReducer.current_user,
    current_user_error: state.userReducer.current_user_error,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = dispatch => {
  // Action
  return {
    setCurrentUserFetchLoadingAction: loading =>
      dispatch(setCurrentUserFetchLoading(loading)),
    getCurrentUserAction: () => dispatch(getCurrentUser()),
    setSelectedTopicAction: selected_topic =>
      dispatch(setSelectedTopic(selected_topic)),
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(TopicsContainer);
