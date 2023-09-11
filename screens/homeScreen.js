import {View} from 'react-native';
import {dataStore} from '../learnRedux/dataStore';

import {translationValues} from '../staticDataFiles/translationValues';
const {hi:{ connectorApp, programingPractis, enterMobilNumber, submit}} = translationValues;
import {constantValues} from '../staticDataFiles/constantValues';
import {CommonHeaderComponent} from '../components/commonHeaderComponent';
import {UserShortDetails} from '../components/userShortDetails';
// import {ShowDataFromRedux} from '../learnRedux/showDataFromRedux';
import {styles} from './screens.styles/homeScreenStyles';


export const HomeScreen = (props)=>{ 	// props used to get user props and default props
	/* Used to show ui till the app is loading */

	return(
		<View style={styles.mainContainer}>
			<CommonHeaderComponent/>
			<UserShortDetails/>
			{/*<ShowDataFromRedux/>*/}
		</View>
	);
}