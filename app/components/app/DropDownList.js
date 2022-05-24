//Import Core Components
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
//Import Plugins and Libraries
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/MaterialCommunityIcons';
//Import global variables and constants
import {SCREEN_WIDTH} from '../../../constants';

const data = [
  {label: 'Male', value: 'Male'},
  {label: 'Female', value: 'Female'},
  {label: 'Others', value: 'Others'},
];

const DropDownListComponent = props => {
  const {value, isFocus, setValue, setIsFocus} = props;

//   const renderLabel = () => {
//     if (value || isFocus) {
//       return (
//         <Text style={[styles.label, isFocus && {color: 'blue'}]}>
//           Dropdown label
//         </Text>
//       );
//     }
//     return null;
//   };

  return (
    <View style={styles.container}>
      {/* {isFocus && renderLabel()} */}
      <Dropdown
        style={[
          styles.dropdown,
          isFocus && {borderColor: 'rgba(0, 0, 0, 0.57)'},
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        // search
        // dropdownPositiob={"bottom"}
        maxHeight={170}
        labelField="label"
        valueField="value"
        placeholder={'Gender'}
        // searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          // console.log("DD List Value : ", item.value);
          setValue(item.value);
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={'black'}
            name="gender-male-female-variant"
            size={24}
          />
        )}
      />
    </View>
  );
};

export default DropDownListComponent;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'white',
    width: SCREEN_WIDTH * 0.8,

    paddingTop: 20,
    paddingBottom: 20,
  },
  dropdown: {
    // width:SCREEN_WIDTH * 0.8,
    backgroundColor: 'white',
    height: 60,
    borderColor: 'rgba(0, 0, 0, 0.19)',
    borderWidth: 1.2,
    borderRadius: 30,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    width: SCREEN_WIDTH * 0.7,

    position: 'absolute',
    // backgroundColor: 'white',
    // color:"green",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 18,
    // color:"rgba(120, 230, 10, 0.6)"
  },
  selectedTextStyle: {
    fontSize: 18,
    color: 'black',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
