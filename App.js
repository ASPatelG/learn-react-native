import 'react-native-gesture-handler';		//According to reactnative stack navigation this statement should in top(firstline)
import {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import { StyleSheet, Text, View, StatusBar, useState, Pressable } from 'react-native';

import {CodingPractise} from './HomeScreen';
import {AppLoadingUI} from './components/AppLoadingUI';
import {ChooseWork} from './screens/ChooseWork';



const ApploadingStack = createStackNavigator();		// App Starting navigation(app root navigation)
function AppMainStack (){
	return (
		<NavigationContainer>
			<ApploadingStack.Navigator
				initialRouteName='ChooseWork'
			>
				{/*<ApploadingStack.Screen name="AppLoadingUI" component={AppLoadingUI} />*/}
				<ApploadingStack.Screen name="ChooseWork" component={ChooseWork}/>
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
		this.changeAppLoadingTimer = '';
	}

	componentWillUnmount(){		// Life cycle methods
		clearTimeout(this.changeAppLoadingTimer);
	}

	componentDidMount(){	// Life cycle methods
		changeAppLoadingTimer = setTimeout(() => this.setState({isAppLoading:false}), 10000);
	}
	
	render(){	// Life cycle methods
		if(this.state.isAppLoading){
			return(
				<>
					<AppLoadingUI/>
				</>
			);
		}
		else{
			return (
				<>
					<AppMainStack/>
				</>
			);
		}
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
