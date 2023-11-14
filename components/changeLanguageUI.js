import React,{ useState, useEffect } from 'react';
import { TouchableOpacity,Text, StyleSheet, View, BackHandler } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useSelector, useDispatch} from 'react-redux';
import { FontAwesome, AntDesign} from '@expo/vector-icons';
import ButtonComponent from './buttonComponent';
import {changeSelectedLanguage} from '../learnRedux/actions';
/*
	this component is used to change selectedLanguage
*/
const ChangeLanguageUI = (props)=> {
	const transRef  = useSelector((state)=>state.transRef);
	const [selectedLanguage, chnageLanguage] = useState(transRef.locale);
	const dispatchRefrence = useDispatch();		// To send the data in store

	OnPressChangeLanguage = (selectedLanguageCode) => {
		chnageLanguage({selectedLanguage:selectedLanguageCode});
	}

	onApplyLanguage = async (nativeEvent)=> {
		const {navigation} = props;
		await dispatchRefrence(changeSelectedLanguage({languageCod:selectedLanguage}));
		navigation.navigate('AppMainStack');
	}

	const backAction = () => {
		const {navigation} = props;
		navigation.navigate('AppMainStack')
		return true;
	};

	useEffect(() => {
		let backHandler = null;
		const {navigation} = props;
		const willFocusSubscription = navigation.addListener('focus', ()=> {
			backHandler = BackHandler.addEventListener(
				'hardwareBackPress',
				backAction,
			);
		});

		return () => {	// to unsubscribe/remove event on unmount
			backHandler?.remove();
			willFocusSubscription();
		}
	}, []);

	return (
		<View style={styles.mainContainer}> 
			<View style={styles.chooseLanguageTitleView}>
				<Text style={styles.chooseLanguageTitleText}>{transRef.t('choose_language')}</Text>
			</View>
			<View style={styles.eachLanguageView}>
				<TouchableOpacity 
					style={styles.firstLanguage}
					onPress={()=> chnageLanguage('en')}
					disabled={selectedLanguage==='en'}
				>
					<View style={styles.languageView}>
						<Text style={styles.bigFontLanguage}>English</Text>
						{selectedLanguage==='en'
							&&
							<FontAwesome name='check-circle' size={25} color='#38c6f4' style={{marginTop:5,}}/>
						}
					</View>
					<View style={styles.languageSection}>
						<View style={{paddingTop:10}}><Text style={{color:'#ffffff'}}>(English)</Text></View>
						<Text style={styles.wordStyle}> A</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity 
					style={styles.secondLanguage}
					onPress={()=> chnageLanguage('hi')}
					disabled={selectedLanguage==='hi'}
				>
					<View style={styles.languageView}>
						<Text style={styles.bigFontLanguage}>हिंदी</Text>
						{selectedLanguage==='hi'
							&&
							<FontAwesome name='check-circle' size={25} color='#38c6f4' style={{marginTop:5,}}/>
						}
					</View>
					<View style={styles.languageSection}>
						<View style={{paddingTop:10}}><Text style={{color:'#ffffff'}}>(Hindi)</Text></View>
						<Text style={styles.wordStyle}> अ</Text>
					</View>
				</TouchableOpacity>
			</View>
			<ButtonComponent
				title={transRef.t('applyLanguage')}
				onPressIn={onApplyLanguage}
			/>
		</View>	
	);
}
export default ChangeLanguageUI;

const styles = StyleSheet.create({
	mainContainer:{
		flex:1,
		backgroundColor:'#ffffff',
		alignItems:'center'
	},
	eachLanguageView:{
		flexDirection:'row',
		width:wp('84.5%'),
		paddingBottom:10,
		justifyContent:'space-between',
	},
	bigFontLanguage:{
		fontSize:20,
		color:'#ffffff'
	},
	firstLanguage:{
		backgroundColor:'#175491',
		height:80,
		width:wp('41%'),
		justifyContent:'space-between',
		paddingLeft:5,
		paddingRight:5,
		borderRadius:5
	},
	secondLanguage:{
		backgroundColor:'#175491',
		height:80,
		width:wp('41%'),
		justifyContent:'space-between',
		paddingLeft:5,
		paddingRight:5,
		borderRadius:5
	},
	wordStyle:{
		fontSize:34,
		color:'#DCEDF9',
		fontFamily:'serif',
		fontWeight:'bold'
	},
	languageSection:{
		flexDirection:'row' ,
		justifyContent:'space-between'
	},
	languageView:{
		height:hp('5%'),
		flexDirection:'row',
		justifyContent:'space-between'
	},
	chooseLanguageTitleView:{
		flexDirection:'row',
		justifyContent:'space-between',
		padding:10,
	},
	chooseLanguageTitleText:{
		color:'#999999',
		fontSize:20
	},
});