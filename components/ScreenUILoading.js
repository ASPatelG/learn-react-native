import {ActivityIndicator, View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

export default function ScreenUILoading(props){
	const {showLoadingIndicator, loadingIndicatorContainer, size} = props;
	if(props.showLoadingIndicator === true){
		return(
			<View style={[ StyleSheet.absoluteFillObject, loadingIndicatorContainer ]}>
				<ActivityIndicator
					size={size}
					animating={showLoadingIndicator}
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