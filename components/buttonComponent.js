import {Text, View, Pressable, StyleSheet} from 'react-native';
import {translationValues} from '../staticDataFiles/translationValues';
const { hi:{ submit } } = translationValues;

export const ButtonComponent = (props)=>{
	/* Used to show ui till the app is loading */

	const {navigation, onPressIn, pressableProps, textProps, title} = props;

	return(
		<View style={styles.mainContainer}>
			<Pressable
				style={styles.pressableButtonStyle}
				onPressIn={({nativeEvent})=> onPressIn(nativeEvent)}
				// ...pressableProps
			>
				{title
					? <Text
						style={styles.buttonTitleStyle}
						// ...textProps
					>{ submit }</Text>
					: null
				}
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	pressableButtonStyle:{
		backgroundColor:'#175491',
		width:80,
		paddingVertical:5,
		paddingHorizontal:5,
		borderRadius:5,
		marginTop:10,
		alignSelf:'center',
	},
	buttonTitleStyle:{
		textAlign:'center',
		fontSize:14,
		fontWeight:'bold',
		color:'#ffffff',
	}
});