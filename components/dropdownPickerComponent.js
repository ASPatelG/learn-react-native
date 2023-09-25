import React,{ Component } from 'react';
import { StyleSheet } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useSelector} from 'react-redux';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const DropdownPickerComponent = (props) => {
	const {
		selectedItemValue,
		itemList,
		dropdownStyle,
		showTranslatedLabel,
		...rest
	} = props

	const transRef  = useSelector((state)=>state.transRef);

	return (
		<Picker
			selectedValue={selectedItemValue}
			mode={'dropdown'}
			style={dropdownStyle}
			onValueChange={item =>props.onValueChange(item.label, item.value)}
			{...rest}
		>
			{itemList.map((item , index)=> {
				return(
					<Picker.Item 
						key={index}
						label={showTranslatedLabel
							? transRef.t(item.label)
							: item.label
						}
						value={item.value}
						style={item.value === selectedItemValue
							?styles.selectedItemStyle
							:index%2 === 0
							?styles.itemStyle
							:styles.oddIndexItemStyle
						}
					/>
				)
			})}
		</Picker>
	);
}

export default React.memo(DropdownPickerComponent);		// memo used to create the component as purecomponent

const styles = StyleSheet.create({
	dropdownStyle:{
		alignItems:'center',
		width:wp('95%'),
		paddingTop:10,
	},
	selectedItemStyle:{
		color:'#175491',
	},
	itemStyle:{
		color:'#808080',
		borderTopWidth:2,
		backgroundColor:'#D9F3F9'
	},
	oddIndexItemStyle:{
		color:'#808080',
		borderTopWidth:2,
		backgroundColor:'#FFEECC'
	}
});

DropdownPickerComponent.defaultProps = {
	dropdownStyle:styles.dropdownStyle,
}
