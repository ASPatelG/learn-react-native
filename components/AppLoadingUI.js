import {Text, View, Pressable} from 'react-native';
import {translationValues} from '../staticDataFiles/translationValues';
const {hi:{appLoading, connectorApp, programingPractis}} = translationValues;
import {styles} from './componentStyles/AppLoadingUIStyles';


export const AppLoadingUI = ()=>{
	/* Used to show ui till the app is loading */
	return(
		<View style={styles.mainContainer}>
			<Text style={styles.aploadingTextStyle}> {appLoading} </Text>
		</View>
	);
}