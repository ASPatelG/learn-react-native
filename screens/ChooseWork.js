import {useSelector} from 'react-redux';
import {Text, View, Pressable, Image} from 'react-native';
import {styles} from './screens.styles/ChooseWork.Styles';
import {CommonHeaderComponent} from '../components/commonHeaderComponent';

export const ChooseWork = (props)=>{
	/* Used to show ui till the app is loading */

	const {navigation} = props;
	const transRef  = useSelector((state)=>state.transRef);

	function showLoginScreen(){
		navigation.navigate('LoginScreen');
	}

	function navigateToProgramingPractise(){
		navigation.navigate('ProgramingPracitseStack')
	}

	return(
		<View style={styles.mainContainer}>
			<CommonHeaderComponent/>
			<Text style={styles.screenHeading}>{transRef.t('chooseWork')}</Text>
			<Image source={require('../appImage/homeIcon.jpg')}  style={styles.loginIcon} />
			<Pressable
				style={styles.pressableButtonStyle}
				onPressIn={({nativeEvent})=> showLoginScreen()}
			>
				<Text style={styles.buttonTitle}>{transRef.t('connectorApp')}</Text>
			</Pressable>
			<Pressable
				style={styles.pressableButtonStyle}
				onPressIn={({nativeEvent})=> navigateToProgramingPractise()}
			>
				<Text style={styles.buttonTitle}>{transRef.t('programingPractis')}</Text>
			</Pressable>
		</View>
	);
}