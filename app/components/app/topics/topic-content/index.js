//Import Core Components
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Dimensions,
  PixelRatio,
  ActivityIndicator,
  Platform,
  Text,
  Alert,
  PermissionsAndroid,
} from 'react-native';
//Import Plugins and Libraries
import YouTube, {
  YouTubeStandaloneAndroid,
  YouTubeStandaloneIOS,
} from 'react-native-youtube';
import AutoHeightImage from 'react-native-auto-height-image';
//Import global variables and constants
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../../../../../constants';
//Import Global Components
import CustomButton from '../../../global/CustomButton';

import {PDFDocument, StandardFonts, rgb, PageSizes} from 'pdf-lib';
import Share from 'react-native-share';
// import RNFetchBlob from 'react-native-fetch-blob';
import {
  writeFile,
  appendFile,
  copyFile,
  DownloadDirectoryPath,
  DocumentDirectoryPath,
} from 'react-native-fs';
import Pdf from 'react-native-pdf';
import {PdfImage} from '../../../../../constants';

const HEADING_1 = 'HEADING_1';
const HEADING_2 = 'HEADING_2';
const HEADING_3 = 'HEADING_3';
const SUBTITLE = 'SUBTITLE';
const PARAGRAPH = 'PARAGRAPH';
const IMAGE = 'IMAGE';
const YOUTUBE_VIDEO = 'YOUTUBE_VIDEO';
const win = Dimensions.get('window');
const ratio = win.width / 541; //541 is actual image width
import {Thumbnail} from 'react-native-thumbnail-video';

// Topic Content appears on the base of server response ( content can be h1,h2,h3,subtitle,paragraph,images,videos and tabs)
const TopicContentContainer = props => {
  const [isReady, setIsReady] = useState(false);
  const [status, setStatus] = useState(null);
  const [quality, setQuality] = useState(null);
  const [playerWidth, setPlayerWidth] = useState(
    Dimensions.get('window').width,
  );

  // const [source, setSource] = useState(null);
  // const [url, setUrl] = useState('');
  // const [file_Path, setFilePath] = useState('');

  const _youTubeRef = React.createRef();
  const {
    account,
    topic_associated_data,
    navigation,
    parent_data,
    tab_data,
    selected_topic_title,
    source,
    setSource,
    url,
    setUrl,
    setFilePath,
    sharePdf,
    saveFile,
    createPdf,
    requestRunTimePermission,
  } = props;

  useEffect(() => {
    // console.log(`Account Data : ${account.name + selected_topic_title}`)
    // console.log(`Certificate : ${topic_associated_data.certificate_shown}`);
    console.log(`UE Updated ***`);
    
  }, []);

  // const requestRunTimePermission = () => {
  //   async function externalStoragePermission() {
  //     try {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //         {
  //           title: 'External Storage Write Permission',
  //           message: 'App needs access to Storage data.',
  //         },
  //       );
  //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //         saveFile();
  //       } else {
  //         alert('WRITE_EXTERNAL_STORAGE permission denied');
  //       }
  //     } catch (err) {
  //       Alert.alert('Write permission err', err);
  //       console.warn(err);
  //     }
  //   }

  //   if (Platform.OS === 'android') {
  //     externalStoragePermission();
  //   } else {
  //     saveFile();
  //   }
  // };

  // // save pdf
  // const saveFile = () => {
  //   // var RNFS = require('react-native-fs');
  //   const fs = RNFetchBlob.fs;
  //   var splitArray = file_Path.split('/');

  //   var fileName = splitArray[splitArray.length - 1];
  //   console.log(fileName);
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
  //         notification: true,
  //       });
  //       console.log('FILE WRITTEN!');
  //     })
  //     .catch(err => {
  //       console.log('SaveFile()', err.message);
  //       alert(err.message);
  //     });
  // };

  // const createPdf = async () => {
  //   const pdfDoc = await PDFDocument.create();
  //   const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  //   const pngImage = await pdfDoc.embedPng(PdfImage);
  //   const pngDims = pngImage.scale(0.5);
  //   const page = pdfDoc.addPage(PageSizes.A4);
  //   const {width, height} = page.getSize();

  //   page.drawImage(pngImage, {
  //     x: width / 2 - pngDims.width / 2,
  //     y: height / 2 - pngDims.height + 250,
  //     width: pngDims.width,
  //     height: pngDims.height,
  //   });

  //   // Draw a string of text toward the top of the page
  //   const fontSize = 30;
  //   page.drawText('Creating PDFs in JavaScript is awesome!', {
  //     x: 50,
  //     y: height - 4 * fontSize,
  //     size: fontSize,
  //     font: timesRomanFont,
  //     color: rgb(0, 0.53, 0.71),
  //   });

  //   const username = account.name;
  //   page.drawText(username, {
  //     x: (width - 60 - username.length / 2) / 2,
  //     y: (height + 90) / 2,
  //     size: 18,
  //     font: timesRomanFont,
  //     color: rgb(0, 0.53, 0.71),
  //   });

  //   const courseTitle = selected_topic_title;
  //   page.drawText(courseTitle, {
  //     x: (width - 80 - courseTitle.length / 2) / 2,
  //     y: (height - 30) / 2,
  //     size: 18,
  //     font: timesRomanFont,
  //     color: rgb(0, 0.53, 0.71),
  //   });

  //   // Serialize the PDFDocument to bytes (a Uint8Array)
  //   // const pdfBytes = await pdfDoc.save()
  //   const base64DataUri = await pdfDoc.saveAsBase64({dataUri: true});
  //   // dataUri = base64DataUri;
  //   setSource({uri: base64DataUri});
  //   setUrl(base64DataUri);
  //   console.log(`Pdf Created`);
  //   // console.log(`pdfBytes : ${pdfBytes}`);
  //   // console.log(`base64DataUri : ${base64DataUri}`);
  //   // console.log(`dataUri : ${dataUri}`);
  // };

  // const sharePdf = async () => {
  //   try {
  //     await Share.open({
  //       url: url,
  //       title: 'Sharing Certificate Maria.pdf file from SeekO app',
  //       message: 'Please take a look at this pdf',
  //       filename: `${account.name} Certificate`,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // return pdf

  const renderPdf = () => {
    return (
      <>
        {source === null ? (
          <ActivityIndicator size={'small'} color={'green'}></ActivityIndicator>
        ) : (
          <Pdf
            source={source !== null && source}
            trustAllCerts={false}
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`Number of pages: ${numberOfPages}`);
              console.log(`FilePath : ${filePath}`);
              // console.log(`Source : ${source.uri}`)
              setFilePath(filePath);
            }}
            onPageChanged={(page, numberOfPages) => {
              console.log(`Current page: ${page}`);
            }}
            onError={error => {
              console.log(error);
            }}
            onPressLink={uri => {
              console.log(`Link pressed: ${uri}`);
            }}
            style={styles.pdf}
          />
        )}
<View style={{marginTop:- Dimensions.get('window').height * 0.18}}>
        <CustomButton
          backgroundColor={'#DEE8FB'}
          title={'Download'}
          height={50}
          width={0.7}
          borderRadius={30}
          textColor={'white'}
          linearStartColor={'#F8C04E'}
          linearEndColor={'#FFBF3C'}
          shadowColor={'#FFBF3C'}
          shadowRadius={20}
          onPress={async () => {
            requestRunTimePermission();
          }}></CustomButton>
        <CustomButton
          backgroundColor={'#DEE8FB'}
          title={'Share'}
          height={50}
          width={0.7}
          borderRadius={30}
          textColor={'white'}
          linearStartColor={'#F8C04E'}
          linearEndColor={'#FFBF3C'}
          shadowColor={'#FFBF3C'}
          shadowRadius={20}
          onPress={async () => {
            await sharePdf();
          }}></CustomButton>
          </View>
      </>
    );
  };
  // rendering content on the base of server response
  const renderContentComponent = content => {
    switch (content.type) {
      case HEADING_1: {
        return (
          <Text
            style={{
              color: 'black',
              fontSize: 30,
              fontWeight: 'bold',
              fontFamily: 'Poppins-Regular',
              paddingVertical: 10,
            }}>
            {content.content}
          </Text>
        );
      }
      case HEADING_2: {
        return (
          <Text
            style={{
              color: 'black',
              fontSize: 28,
              fontWeight: 'bold',
              fontFamily: 'Poppins-Regular',
              paddingVertical: 10,
            }}>
            {content.content}
          </Text>
        );
      }
      case HEADING_3: {
        return (
          <Text
            style={{
              color: 'black',
              fontSize: 26,
              fontWeight: 'bold',
              fontFamily: 'Poppins-Regular',
            }}>
            {content.content}
          </Text>
        );
      }
      case SUBTITLE: {
        return (
          <Text
            style={{
              color: 'black',
              fontSize: 16,
              paddingTop: 10,
              fontFamily: 'Poppins-Regular',
            }}>
            {content.content}
          </Text>
        );
      }
      case PARAGRAPH: {
        return (
          <Text
            style={{
              color: 'black',
              fontSize: 16,
              paddingTop: 10,
              paddingBottom: 16,
              fontFamily: 'Poppins-Regular',
            }}>
            {content.content}
          </Text>
        );
      }
      case YOUTUBE_VIDEO: {
        return (
          <View style={{flex: 1, flexDirection: 'column', width: '100%'}}>
            {/* <YouTube
            ref={_youTubeRef}

            // You must have an API Key
            apiKey="AIzaSyBSF8vUTOH6SpJ5AiPq3_3spsNDmbEDDVA"
            // Un-comment one of videoId / videoIds / playlist.
            // videoId={singleVideoId}
            videoId={content.content} // The YouTube video ID
            loop={false} // control whether the video should loop when ended
            onReady={e => setIsReady(true)}
            onChangeState={e => setStatus(e.state)}
            onChangeQuality={e => setQuality(e.quality)}
            onError={e => console.log('Error: ', e.error)}
            controls={1}
            // playlistId="PLF797E961509B4EB5"
            // play={isPlaying}
            // loop={isLooping}
            // fullscreen={fullscreen}
            // controls={1}
            style={
              isReady &&
              [
              
              {
                height: PixelRatio.roundToNearestPixel(
                  playerWidth / (16 / 9),
                ),
              },
              styles.player,
            ]}
            // onError={(e) => setError(e.error)}
            // onReady={(e) => setIsReady(true)}
            // onChangeState={(e) => setStatus(e.state)}
            // onChangeQuality={(e) => setQuality(e.quality)}
            // onChangeFullscreen={(e) => setFullscreen(e.isFullscreen)}
            // onProgress={(e) => {
            //   setDuration(e.duration);
            //   setCurrentTime(e.currentTime);
            // }}
          /> */}
            {Platform.OS === 'android' && YouTubeStandaloneAndroid && (
              <Thumbnail
                url={`https://www.youtube.com/watch?v=${content.content}`}
                onPress={() => {
                  YouTubeStandaloneAndroid.playVideo({
                    apiKey: 'AIzaSyBSF8vUTOH6SpJ5AiPq3_3spsNDmbEDDVA',
                    videoId: `${content.content}`,
                    autoplay: true,
                    lightboxMode: false,
                  })
                    .then(() => {
                      console.log('Android Standalone Player Finished');
                    })
                    .catch(errorMessage => {
                      console.log(
                        'Android Standalone Player errorMessage: ',
                        errorMessage,
                      );
                    });
                }}
              />
            )}

            {/* {Platform.OS === 'ios' && YouTubeStandaloneIOS && ( */}
            {Platform.OS === 'ios' && (
              // <Thumbnail
              //   url={`https://www.youtube.com/watch?v=${content.content}&html5=1`}
              //   onPress={() => {
              // <View style={isReady? {display:'flex'}:{display:'none'}}>
              <>
                {
                  <>
                    {!isReady && (
                      <View
                        style={{
                          height: PixelRatio.roundToNearestPixel(
                            playerWidth / (16 / 9),
                          ),
                          justifyContent: 'center',
                        }}>
                        <ActivityIndicator
                          size={'large'}
                          color={'#00CDAC'}></ActivityIndicator>
                      </View>
                    )}

                    <View
                      style={isReady ? {display: 'flex'} : {display: 'none'}}>
                      <YouTube
                        ref={_youTubeRef}
                        apiKey={'AIzaSyBSF8vUTOH6SpJ5AiPq3_3spsNDmbEDDVA'}
                        videoId={content.content} // The YouTube video ID
                        loop={false} // control whether the video should loop when ended
                        onReady={e => setIsReady(true)}
                        onChangeState={e => setStatus(e.state)}
                        onChangeQuality={e => setQuality(e.quality)}
                        onError={e => console.log('Error: ', e.error)}
                        controls={1}
                        style={[
                          {
                            height: PixelRatio.roundToNearestPixel(
                              playerWidth / (16 / 9),
                            ),
                          },
                          styles.player,
                        ]}
                      />
                    </View>
                  </>
                }
              </>
              // YouTubeStandaloneIOS.playVideo(`${content.content}`)
              //   .then(() => {
              //     console.log('iOS Standalone Player Finished');
              //   })
              //   .catch(errorMessage => {
              //     console.log('iOS Standalone Player errorMessage: ', errorMessage);
              //   });
              //   }}
              // />
            )}

            {/* {Platform.OS === 'ios' && (
              <>
                <YouTube
                  ref={_youTubeRef}
                  apiKey={'AIzaSyBSF8vUTOH6SpJ5AiPq3_3spsNDmbEDDVA'}
                  videoId={content.content} // The YouTube video ID
                  loop={false} // control whether the video should loop when ended
                  onReady={(e) => setIsReady(true)}
                  onChangeState={(e) => setStatus(e.state)}
                  onChangeQuality={(e) => setQuality(e.quality)}
                  onError={(e) => console.log('Error: ', e.error)}
                  controls={1}
                  style={[
                    { height: PixelRatio.roundToNearestPixel(playerWidth / (16 / 9)) },
                    styles.player,
                  ]}
                />
                {
                  !isReady &&
                  <Text style={{color:'black',fontFamily:'Poppins-Regular',}}>Loading</Text>
                }
              </>
            )} */}
          </View>
        );
      }
      case IMAGE: {
        return (
          <AutoHeightImage
            style={{marginTop: 6, marginBottom: 10}}
            width={SCREEN_WIDTH * 0.9}
            source={{uri: content.image}}
          />
        );
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}>
      <ScrollView showsVerticalScrollIndicator={false} style={{paddingTop: 8}}>
        <View style={styles.container}>
          {topic_associated_data.certificate_shown === true ? (
            <>
            {renderPdf()}
            </>
          ) : (
            <>
              {topic_associated_data.content.map((content, index) => {
                return (
                  <View
                    key={index}
                    style={[
                      {
                        marginBottom:
                          topic_associated_data.length - 1 === index ? 32 : 0,
                        width: SCREEN_WIDTH * 0.9,
                      },
                    ]}>
                    {renderContentComponent(content)}
                    {topic_associated_data.length - 1 === index && (
                      <Text
                        style={{
                          color: 'black',
                          textAlign: 'center',
                          fontFamily: 'Poppins-Regular',
                          marginTop: 16,
                        }}>
                        End of content
                      </Text>
                    )}
                  </View>
                );
              })}
            </>
          )}
        </View>
        {topic_associated_data.quiz_id && (
          <View style={[{marginBottom: 40}, styles.container]}>
            {/* {
                  source === null ?
                  <ActivityIndicator size={'small'} color={'green'}></ActivityIndicator>:
                  <Pdf
                    source={source !== null && source}
                    trustAllCerts={false}
                    onLoadComplete={(numberOfPages,filePath) => {
                        console.log(`Number of pages: ${numberOfPages}`);
                        console.log(`FilePath : ${filePath}`);
                        // console.log(`Source : ${source.uri}`)
                        setFilePath(filePath);
                    }}
                    onPageChanged={(page,numberOfPages) => {
                        console.log(`Current page: ${page}`);
                    }}
                    onError={(error) => {
                        console.log(error);
                    }}
                    onPressLink={(uri) => {
                        console.log(`Link pressed: ${uri}`);
                    }}
                    style={styles.pdf}/>
                    
                }

<CustomButton
                backgroundColor={'#DEE8FB'}
                title={'Download'}
                height={50}
                width={0.6}
                borderRadius={30}
                textColor={'white'}
                linearStartColor={'#F8C04E'}
                linearEndColor={'#FFBF3C'}
                shadowColor={'#FFBF3C'}
                shadowRadius={20}
                onPress={async () => {
                  requestRunTimePermission();
                }}></CustomButton>
                <CustomButton
                backgroundColor={'#DEE8FB'}
                title={'Share'}
                height={50}
                width={0.6}
                borderRadius={30}
                textColor={'white'}
                linearStartColor={'#F8C04E'}
                linearEndColor={'#FFBF3C'}
                shadowColor={'#FFBF3C'}
                shadowRadius={20}
                onPress={async () => {
                  await sharePdf();
                }}></CustomButton> */}
            <CustomButton
              backgroundColor={'#DEE8FB'}
              title={'Start Quiz'}
              height={50}
              width={0.8}
              borderRadius={30}
              textColor={'white'}
              linearStartColor={'#F8C04E'}
              linearEndColor={'#FFBF3C'}
              shadowColor={'#FFBF3C'}
              shadowRadius={20}
              onPress={() => {
                console.log('Parent Data: ', parent_data);
                console.log('Tab Data: ', tab_data);
                navigation.navigate('Quizzes', {
                  account: account,
                  selected_topic_title: props.selected_topic_title,
                  selected_quiz: {id: topic_associated_data.quiz_id},
                  tab_data,
                });
              }}></CustomButton>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default React.memo(TopicContentContainer, (prevProps, nextProps) => {
  if (prevProps.topic_associated_data !== nextProps.topic_associated_data) {
    return true;
  }
  if (prevProps.parent_data !== nextProps.parent_data) {
    return true;
  }
  if (prevProps.tab_data !== nextProps.tab_data) {
    return true;
  }
  return false;
});
const styles = StyleSheet.create({
  player: {
    alignSelf: 'stretch',
    marginVertical: 10,
  },
  container: {
    // flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F8FF',
    // marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width * 0.94,
    height: Dimensions.get('window').height * 0.7,
    marginTop:-40,
    backgroundColor: '#F5F8FF',
  },
});
