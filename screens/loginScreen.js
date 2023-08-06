import {Text, View} from 'react-native';


import {translationValues} from '../staticDataFiles/translationValues';
const {hi:{ connectorApp, programingPractis, enterMobilNumber}} = translationValues;

import {TextInputComponent} from '../components/textInputComponent';
import {CommonHeaderComponent} from '../components/commonHeaderComponent';

import {styles} from './screens.styles/loginScreenStyle';


export const LoginScreen = ()=>{
	/* Used to show ui till the app is loading */
	return(
		<View style={styles.mainContainer}>
			<CommonHeaderComponent/>
			<TextInputComponent
				showFieldLabel={true}
				fieldLabelText={enterMobilNumber}
			/>
		</View>
	);
}