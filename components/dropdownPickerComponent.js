import React,{ Component } from 'react';
import { StyleSheet } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const DropdownPickerComponent = (props) => {
	const {selectedItemValue, itemKey, itemList, dropdownStyle, ...rest } = props
	return (
		<Picker
			selectedValue={selectedItemValue}
			mode={'dropdown'}
			style={dropdownStyle}
			itemStyle={{color:'#175491'}}
			// selectionColor={'#D3D3D3'}
			onValueChange={item =>props.onValueChange(item.label, item.value)}
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

export default DropdownPickerComponent;

const styles = StyleSheet.create({
	dropdownStyle:{
		alignItems:'center',
		width:wp('95%'),
		paddingTop:10,
	},
});

DropdownPickerComponent.defaultProps = {
	dropdownStyle:styles.dropdownStyle,
}
