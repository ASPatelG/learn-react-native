import React, { useState } from 'react';
import { View, Text, Button, Platform, TouchableHighlight, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const CommonDateTimePicker = () => {
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [showDatePicker, setShowDatePicker] = useState(false);

	const handleDateChange = (event, date) => {
		if (date !== undefined) {
			setSelectedDate(date);
		}
		setShowDatePicker(Platform.OS === 'ios');
	};

	const showDatepicker = () => {
		setShowDatePicker(true);
	};

	return (
		<View>
			<TouchableHighlight
				onPress={showDatepicker}
				activeOpacity={0.2}
				style={styles.dateTimeContainer}
			>
				<Text>{selectedDate ?selectedDate.toISOString().split('T')[0] :'Select a date'}</Text>
			</TouchableHighlight>
			{/* <Button title="Show Date Picker" onPress={showDatepicker} /> */}
			{showDatePicker && (
				<DateTimePicker
					value={selectedDate}
					mode="date"
					display="default"
					onChange={handleDateChange}
				/>
			)}
			{/* <Text>Selected Date: {selectedDate.toISOString().split('T')[0]}</Text> */}
		</View>
	);
};

export default CommonDateTimePicker;

const styles = StyleSheet.create({
	dateTimeContainer:{
		borderWidth:0.8,
		borderColor:'#808080',
		padding:20,
		borderRadius:5,
		marginTop:15,
	}
});
