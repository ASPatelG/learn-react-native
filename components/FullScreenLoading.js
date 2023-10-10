import {View, ActivityIndicator, StyleSheet} from 'react-native';

export const FullScreenLoading = (props)=>{
	const {containerStyle} = props;

	return(
		<View style={containerStyle}>
			<ActivityIndicator size="large" color="skyblue" />
		</View>
	);
}

const styles = StyleSheet.create({
	activatityIndicatorContainer:{
		...StyleSheet.absoluteFillObject,   	//StyleSheet.absoluteFillObject === {top:0, bottom:0, left:o, right:0}
		alignItems: 'center',
		justifyContent: 'center'
	},
})

FullScreenLoading.defaultProps = {
	containerStyle:styles.activatityIndicatorContainer
}
