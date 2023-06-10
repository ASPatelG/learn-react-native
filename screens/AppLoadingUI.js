import {Text, View} from 'react-native';
import {translationValues} from '../staticDataFiles/translationValues';
const {hi:{appLoading}} = translationValues;
import {styles} from './screens.styles/AppLoadingUIStyles';


export const AppLoadingUI = ()=>{
	/* Used to show ui till the app is loading */
	return(
		<View style={styles.mainContainer}>
			<Text style={styles.aploadingTextStyle}> {appLoading} </Text>
		</View>
	);
}