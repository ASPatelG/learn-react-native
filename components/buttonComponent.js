import {memo, useEffect} from 'react';
import {Text, View, Pressable, StyleSheet} from 'react-native';
import {translationValues} from '../staticDataFiles/translationValues';
const { hi:{ submit } } = translationValues;
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const ButtonComponent = (props)=>{
	/* Used to show ui till the app is loading */

	const {
		navigation,
		onPressIn,
		pressableProps,
		textProps,
		title,
		disabled,
		// Styles
		mainContainer,
		pressableButtonStyle,
		disabledButtonStyle,
		isRerender,
	} = props;

	useEffect(()=>{}, [isRerender]);

	return(
		<View style={mainContainer}>
			<Pressable
				disabled={disabled}
				style={disabled ? disabledButtonStyle :pressableButtonStyle}
				onPressIn={({nativeEvent})=> onPressIn(nativeEvent)}
				// ...pressableProps
			>
				{title
					? <Text
						style={styles.buttonTitleStyle}
						// ...textProps
					>{ title }</Text>
					: null
				}
			</Pressable>
		</View>
	);
}

export default memo(ButtonComponent);

const styles = StyleSheet.create({
	mainContainer:{
		marginVertical:7,
	},
	pressableButtonStyle:{
		backgroundColor:'#175491',
		width:wp('60%'),
		paddingVertical:12,
		alignitems:'center',
		paddingVertical:5,
		paddingHorizontal:5,
		borderRadius:5,
		marginTop:10,
		alignSelf:'center',
	},
	buttonTitleStyle:{
		textAlign:'center',
		fontSize:18,
		fontWeight:'bold',
		color:'#ffffff',
		paddingVertical:10,
	},
	disabledButtonStyle:{
		backgroundColor:'#D1D1D1',
		width:wp('60%'),
		paddingVertical:12,
		alignitems:'center',
		paddingVertical:5,
		paddingHorizontal:5,
		borderRadius:5,
		marginTop:10,
		alignSelf:'center',
	}
});

ButtonComponent.defaultProps = {
	mainContainer: styles.mainContainer,
	disabledButtonStyle:styles.disabledButtonStyle,
	pressableButtonStyle:styles.pressableButtonStyle,
}