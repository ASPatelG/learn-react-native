import React,{ Component } from 'react';
import { StyleSheet } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const PickerComponent = (props) => {
const {value, stateKey, itemList, dropdownStyle, ...rest } = props
return (
<Picker
selectedValue={value}
mode={'dropdown'}
style={dropdownStyle ?dropdownStyle :styles.employeeDropdownContainerStyle}
onValueChange={itemValue =>props.onValueChange(stateKey,itemValue)}
{...rest}
>
{itemList.map((item , index)=> {
return(
<Picker.Item  key={index} label={item.label} value={item.value} />
)
})}
</Picker>
);
}
const styles = StyleSheet.create({
employeeDropdownContainerStyle:{
alignItems:'center',
width:wp('85%'),
paddingTop:10
},
})
export default PickerComponent;
