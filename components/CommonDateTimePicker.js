import React, { useState, memo } from 'react';
import { View, Text, Button, Platform, TouchableHighlight, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const CommonDateTimePicker = (props) => {
	const [state, setState] = useState({selectedDate:new Date(), showDatePicker:false});

	const handleDateChange = (event, date) => {
		console.log('event::::::::::::::::::::: ', event, 'date:::::::::::::::::: ', date);
		if (date !== undefined) {
			// setState((previous)=>({...previous, showDatePicker:Platform.OS === 'ios', selectedDate:date}, props.onDateChange(date)));
			// setState((previous)=>({...previous, showDatePicker:Platform.OS === 'ios', selectedDate:date}));
		}
	};

	const onPressDatepicker = () => {
		setState((previous)=>({...previous, showDatePicker:true}));
	};

	return (
		<View>
			<TouchableHighlight
				onPress={onPressDatepicker}
				activeOpacity={0.2}
				style={styles.dateTimeContainer}
			>
				<Text>{state?.selectedDate ?state?.selectedDate?.toISOString()?.split('T')[0] :'Select a date'}</Text>
			</TouchableHighlight>
			{/* <Button title="Show Date Picker" onPress={showDatepicker} /> */}
			{state?.showDatePicker && (
				<DateTimePicker
					value={props?.selectedDate}
					mode="date"
					display="default"
					onChange={handleDateChange}
				/>
			)}
		</View>
	);
};

export default memo(CommonDateTimePicker);

const styles = StyleSheet.create({
	dateTimeContainer:{
		borderWidth:0.8,
		borderColor:'#808080',
		padding:20,
		borderRadius:5,
		marginTop:15,
	}
});
