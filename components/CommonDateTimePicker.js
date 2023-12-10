import React, { useState, memo } from 'react';
import { View, Text, Button, Platform, TouchableHighlight, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';

const CommonDateTimePicker = (props) => {
	const [state, setState] = useState({showDatePicker:false});

	const handleDateChange = (event, date) => {
		if (date !== undefined) {
			setState((previous)=>({...previous, showDatePicker:Platform.OS === 'ios'}));
			props.onDateChange(date);
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
				<View style={props?.selectedDate ?styles.dateContainer :styles.placeHoldarContainer}>
					{props.selectedDate ?<Text style={styles.labelStyle}>{props.label}</Text> :null}
					<Text style={props?.selectedDate ?styles.dateStyle :styles.placeHoldarStyle}>{props?.selectedDate ?format(props?.selectedDate, 'dd MMM yyyy') :props.placeHoldar}</Text>
				</View>
			</TouchableHighlight>
			{state?.showDatePicker && (
				<DateTimePicker
					value={props?.selectedDate ?props.selectedDate :new Date()}
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
		borderColor:'#d3d3d3',
		padding:16,
		borderRadius:5,
		marginTop:15,
		alignItems:'flex-start',
	},
	labelStyle:{
		fontSize:14,
		fontWeight:'bold',
		backgroundColor:'#ffffff',
		paddingHorizontal:5,
	},
	dateContainer:{
		marginTop:-28,
	},
	placeHoldarContainer:{
		paddingVertical:2,
	},
	placeHoldarStyle:{
		fontSize:16,
		fontWeight:'bold',
		backgroundColor:'#ffffff',
		paddingHorizontal:5,
	},
	dateStyle:{
		fontSize:18,
		marginTop:8,
		fontWeight:'bold',
		color:'#808080',
	}
});
