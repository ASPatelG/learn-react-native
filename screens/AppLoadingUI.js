import {Text, View, Pressable} from 'react-native';
import {translationValues} from '../staticDataFiles/translationValues';
const {hi:{appLoading, connectorApp, programingPractis}} = translationValues;
import {styles} from './screens.styles/AppLoadingUIStyles';


export const AppLoadingUI = ()=>{
	/* Used to show ui till the app is loading */
	return(
		<View style={styles.mainContainer}>
			<Text style={styles.aploadingTextStyle}> {appLoading} </Text>
			<Pressable
				style={styles.pressableButtonStyle}
				// activeOpacity={0.1}
				// underlayColor={'#ffffff'}
			>
				<Text style={styles.buttonTitle}>{connectorApp}</Text>
			</Pressable>
			<Pressable
				style={styles.pressableButtonStyle}
			>
				<Text style={styles.buttonTitle}>{programingPractis}</Text>
			</Pressable>
		</View>
	);
}