import React,{useEffect, useState} from 'react';
import { Button,View,Text,Dimensions, StyleSheet,Image,PermissionsAndroid, ActivityIndicator,Alert} from 'react-native';
import { PDFDocument, StandardFonts, rgb, PageSizes } from 'pdf-lib'
import Share from 'react-native-share';
// import RNFetchBlob from 'react-native-fetch-blob'
import {
  writeFile, appendFile, copyFile,
  DownloadDirectoryPath,DocumentDirectoryPath
} from 'react-native-fs';
import Pdf from 'react-native-pdf';
import CustomButton from '../../global/CustomButton';
import {PdfImage} from '../../../../constants';
import ReactNativeBlobUtil from 'react-native-blob-util'



const PDFGenerateShareAndSaveDocument = () => {

  const [source , setSource] = useState(null);
  const [url, setUrl] = useState('');
  const [file_Path, setFilePath] = useState('');


const requestRunTimePermission = () => {
  async function externalStoragePermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'External Storage Write Permission',
          message: 'App needs access to Storage data.',
        }
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
}

// save pdf
const saveFile = () => {
  // var RNFS = require('react-native-fs');
  const fs = ReactNativeBlobUtil.fs
  var splitArray = file_Path.split("/");

  var fileName = splitArray[splitArray.length - 1]
  console.log(fileName)
  // var path = RNFS.DownloadDirectoryPath + '/' + fileName;
  var path = DownloadDirectoryPath + '/' + fileName;
  // var path = DocumentDirectoryPath + '/' + fileName;

  fs.writeFile(path, file_Path, 'uri')
    .then(() => {

      ReactNativeBlobUtil.config({
        fileCache: true,
        // android only options, these options be a no-op on IOS
        addAndroidDownloads: {
        title: `Maria`,
            // Show notification when response data transmitted
            notification: true,
        showNotification: true,
        path: path,

            // Title of download notification
            // File description (not notification description)
            description: 'An PdF file.',
            mime: 'application/pdf',

            // Make the file scannable  by media scanner
            // mediaScannable: true,
        }
    })
  })
    .catch((err) => {
      console.log("SaveFile()", err.message);
      alert(err.message)
    });

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

}
  
const createPdf = async () => {
    const pdfDoc = await PDFDocument.create()
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)
    const pngImage = await pdfDoc.embedPng(PdfImage)
    const pngDims = pngImage.scale(0.5);
    const page = pdfDoc.addPage(PageSizes.A4)
    const { width, height } = page.getSize()
    
    page.drawImage(pngImage, {
      x: width / 2 - pngDims.width / 2,
      y: height / 2 - pngDims.height + 250,
      width: pngDims.width,
      height: pngDims.height,
    });
    
    // Draw a string of text toward the top of the page
    const fontSize = 30
    page.drawText('Creating PDFs in JavaScript is awesome!', {
      x: 50,
      y: height - 4 * fontSize,
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0.53, 0.71),
    })

    const username = 'Maria Bibi';
    page.drawText(username,  {
      x: (width - 60 - (username.length/2)) / 2,
    y: (height+90)/2,
      size: 18,
      font: timesRomanFont,
      color: rgb(0, 0.53, 0.71),
    })

    const courseTitle = 'How to Swim';
    page.drawText(courseTitle,  {
      x: (width - 80 - (courseTitle.length/2)) / 2,
    y: (height- 30)/2,
      size: 18,
      font: timesRomanFont,
      color: rgb(0, 0.53, 0.71),
    })
    
    // Serialize the PDFDocument to bytes (a Uint8Array)
    // const pdfBytes = await pdfDoc.save()
    const base64DataUri = await pdfDoc.saveAsBase64({ dataUri: true })
    // dataUri = base64DataUri;
    setSource({uri:base64DataUri})
    setUrl(base64DataUri);
    // console.log(`pdfBytes : ${pdfBytes}`);
    // console.log(`base64DataUri : ${base64DataUri}`);
    // console.log(`dataUri : ${dataUri}`);
  }


  const sharePdf = async () => {
    try {
      await Share.open({
        url:url,
        title: "Sharing Certificate Maria.pdf file from SeekO app",
        message: "Please take a look at this pdf",
        filename:"Maria",
      });
    } catch (err) {
      console.log(err);
    }
}

useEffect(()=>{
    createPdf();
  },[]);

  return (


    <View style={styles.container}>
                {
                  source === null ?
                  <ActivityIndicator size={'small'} color={'green'}></ActivityIndicator>:
                  <Pdf
                    source={source !== null && source}
                    trustAllCerts={false}
                    onLoadComplete={(numberOfPages,filePath) => {
                        console.log(`Number of pages: ${numberOfPages}`);
                        console.log(`FilePath : ${filePath}`);
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
                    <Text>Good Good</Text>
  
  {/* <Button onPress= {
    async () => {
      requestRunTimePermission();
    }
  } title={'Save'} ></Button> */}


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

  {/* <Button onPress={async ()=>{
    // createPDF();
  
    if(url !== ''){
      await sharePdf();
    }
  }} title={"Click Me!"}></Button> */}

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
                }}></CustomButton>
                    <Text>Good Good</Text>
            </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      // justifyContent: 'flex-start',
      alignItems: 'center',
      // backgroundColor:'green'
      // marginTop: 25,
  },
  pdf: {
      flex:1,
      width:Dimensions.get('window').width,
      // height:Dimensions.get('window').height - 400,
      // backgroundColor:'purple',,
  }
});

export default PDFGenerateShareAndSaveDocument; 