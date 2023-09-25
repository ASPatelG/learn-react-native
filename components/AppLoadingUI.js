import {Text, View, Image} from 'react-native';
import {translationValues} from '../staticDataFiles/translationValues';
const {en:{appLoading}} = translationValues;
import {styles} from './componentStyles/AppLoadingUIStyles';
import {CommonHeaderComponent} from '../components/commonHeaderComponent';



export const AppLoadingUI = ()=>{
	/* Used to show ui till the app is loading */
	return(
		<View style={styles.mainContainer}>
			<CommonHeaderComponent/>
			<Text style={styles.aploadingTextStyle}> {appLoading} </Text>
			<Image source={require('../appImage/homeIcon.jpg')}  style={styles.loginIcon} />
		</View>
	);
}