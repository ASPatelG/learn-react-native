import {Text, View, Pressable} from 'react-native';
import {translationValues} from '../staticDataFiles/translationValues';
const {hi:{ connectorApp, programingPractis}} = translationValues;
import {styles} from './screens.styles/ChooseWork.Styles';


export const ChooseWork = ()=>{
	/* Used to show ui till the app is loading */
	return(
		<View style={styles.mainContainer}>
			<Pressable
				style={styles.pressableButtonStyle}
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