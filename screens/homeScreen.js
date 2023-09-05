import {View} from 'react-native';
import {Provider} from 'react-redux';
import {myStore} from '../learnRedux/stores';

import {translationValues} from '../staticDataFiles/translationValues';
const {hi:{ connectorApp, programingPractis, enterMobilNumber, submit}} = translationValues;
import {constantValues} from '../staticDataFiles/constantValues';
import {CommonHeaderComponent} from '../components/commonHeaderComponent';
import {ShowDataFromRedux} from '../learnRedux/showDataFromRedux';
import {styles} from './screens.styles/homeScreenStyles';


export const HomeScreen = (props)=>{ 	// props used to get user props and default props
	/* Used to show ui till the app is loading */

	return(
		<View style={styles.mainContainer}>
			<CommonHeaderComponent/>
			<Provider store={myStore}>
				<ShowDataFromRedux/>
			</Provider>
		</View>
	);
}