import {ActivityIndicator, View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

export default function ScreenUILoading(props){
	if(props.showLoadingIndicator === true){
		return(
			<View style={[ StyleSheet.absoluteFillObject, props.loadingIndicatorContainer ]}>
				<ActivityIndicator
					size={props.size}
					animating={props.showLoadingIndicator}
				/>
			</View>
		);
	}
	else{
		return(null);
	}
}

const styles = StyleSheet.create({
	loadingIndicatorContainer:{
		backgroundColor:'rgba(0,0,0,0.5)',
		alignItems:'center',
		justifyContent:'center'
	},
});

ScreenUILoading.defaultProps = {
	size:'large',
	loadingIndicatorContainer:styles.loadingIndicatorContainer,
	showLoadingIndicator:false,
}

ScreenUILoading.propTypes = {
	showLoadingIndicator:PropTypes.bool,
	size:PropTypes.string,
	loadingIndicatorContainer:PropTypes.object,
}