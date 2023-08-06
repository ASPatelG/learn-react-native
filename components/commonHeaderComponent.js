import { View, StyleSheet, StatusBar} from 'react-native';

import {getStatusBarHeight} from '../javaScriptFunction/getStatusBarHeight';


export const CommonHeaderComponent = ()=> {
	/* Used to show ui till the app is loading */
	return(
		<View style={styles.statusBarContainer}>
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
	}
});