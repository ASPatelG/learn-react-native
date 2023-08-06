import {Text, View, Pressable} from 'react-native';
import {translationValues} from '../staticDataFiles/translationValues';
const {hi:{ connectorApp, programingPractis}} = translationValues;

export const ProgramingPractiseRoot = (props)=>{
	/* Used to show ui till the app is loading */

	const {navigation} = props;

	function navigateToWorkPractise(){
		navigation.navigate('')
	}

	return(
		<View style={{flex:1}}>
		</View>
	);
}