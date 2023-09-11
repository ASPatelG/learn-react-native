import {View, Text, StyleSheet} from 'react-native';

export const CodingPractise = (props)=>{
	return(
		<View style={styles.screenContainerStyle}>
			<Text>First file</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	screenContainerStyle:{
		flex:1,
		background:'#ffffff',
		alignitems:'center',
		justifycontent:'center',
	}
});