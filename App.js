import 'react-native-gesture-handler';		//According to reactnative stack navigation this statement should in top(firstline)
import {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import { StyleSheet, Text, View, StatusBar, useState, Pressable } from 'react-native';

import {CodingPractise} from './HomeScreen';
import {AppLoadingUI} from './screens/AppLoadingUI';



const ApploadingStack = createStackNavigator();		// App Starting navigation(app root navigation)
function AppMainStack (){
	return (
		<NavigationContainer>
			<ApploadingStack.Navigator
				initialRouteName='AppLoadingUI'
			>
				<ApploadingStack.Screen name="AppLoadingUI" component={AppLoadingUI} />
				{/*<ApploadingStack.Screen name="Notifications" component={Notifications} />*/}
				{/*<ApploadingStack.Screen name="Profile" component={Profile} />*/}
				{/*<ApploadingStack.Screen name="Settings" component={Settings} />*/}
			</ApploadingStack.Navigator>
		</NavigationContainer>
	)
}


export default class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			isAppLoading:true
		}
	}
	// const [isAppLoading, setIsAppLoading] = useState(true);		// First index is state(variable) name and Second index functionName--> to change the state value.

	// useEffect(() => {
	// 	const changeAppLoadingTimer = setTimeout(() => setIsAppLoading(false), 1000);
	// }, []);

	componetDidmount(){
		changeAppLoadingTimer = setTimeout(() => this.setState({isAppLoading:false}), 1000);
	}
	
	render(){
		if(this.state.isAppLoading){
			return(
				<>
					<AppMainStack/>
				</>
			);
		}
		// else{
		// 	return (
		// 		<View style={styles.container}>
		// 			<StatusBar
		// 				animated={true}
		// 				backgroundColor="#175491"
		// 				hidden={false}
		// 				StatusBarStyle={'light-content'}
		// 			/>
		// 			<CodingPractise/>
		// 		</View>
		// 	);
		// }
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffffff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
