import React, { useState } from 'react';
import { TextInput } from 'react-native-paper'
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
// import styled from 'styled-components/native'

// const InputContainer = styled.View`
//   flex-direction: row;
// `
// const Input = styled.TextInput`
//   flex: 1;
// `
// const AdornmentContainer = styled.View`
//   align-items: center;
//   justify-content: center;
//   padding: 0 10px;
// `

const CustomInput = ({ left, right, ...props }) => (
    <TextInput
        style={styles.input}
        {...props}
        left={left}
        right={right}
        // render={(inputProps) => (
        //     <InputContainer>
        //         {left && (
        //             <AdornmentContainer>
        //                 {left}
        //             </AdornmentContainer>
        //         )}
        //         <Input {...inputProps} />
        //         {right && (
        //             <AdornmentContainer>
        //                 {right}
        //             </AdornmentContainer>
        //         )}
        //     </InputContainer>
        // )}
    />
)
const styles = StyleSheet.create({
    input: {
        fontSize: 20,
        height: 50,
        width: Dimensions.get('window').width * 0.8,
        marginTop: 20,
    },
});

export default CustomInput;