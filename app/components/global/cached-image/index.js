import React, { useState } from 'react';
import { Modal, View, Platform, ActivityIndicator } from 'react-native';
import FastImage from 'react-native-fast-image';

const CachedImage = (props) => {

    const [image_loading, set_Image_Loading] = useState(false);
    let { style, source, localImage } = props;
    source = localImage ? source : { ...source, priority: FastImage.priority.normal };

    const setImageLoading = (image_loading) => {
        set_Image_Loading(image_loading);
    };

    return (
        <FastImage
        resizeMode={'contain'}
            style={style}
            source={source}
            onLoadStart={() => {
                setImageLoading(true);
            }}
            onLoadEnd={() => {
                setImageLoading(false);
            }}>
            {image_loading && (
                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        backgroundColor:"#F5F8FF",
                    }}>
                    <ActivityIndicator size="large" color='#00CDAC'/>
                </View>
            )}
            {props.children}
        </FastImage>
    );
}

export default CachedImage;
