import { View, StyleSheet, StatusBar, Platform} from 'react-native';

import {getStatusBarHeight} from '../javaScriptFunction/getStatusBarHeight';


export const CommonHeaderComponent = (props)=> {
	/* Used to show ui till the app is loading */
	const {statusBarContainer} = props;
	return(
		<View style = {Platform.OS === 'ios' ?statusBarContainer :null}>
			<StatusBar
				animated={true}
				backgroundColor="#61dafb"
	    	/>
		</View>
	)
};

const styles = StyleSheet.create({
	statusBarContainer:{
		height:getStatusBarHeight(),
	},
});

CommonHeaderComponent.defaultProps = {
	statusBarContainer:styles.statusBarContainer
}