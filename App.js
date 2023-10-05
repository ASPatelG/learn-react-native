import 'react-native-gesture-handler';		//According to reactnative stack navigation this statement should in top(firstline)
import {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';

import { StyleSheet, Text, View, StatusBar, useState, Pressable } from 'react-native';

import {CodingPractise} from './codingPractise';
import {AppLoadingUI} from './components/AppLoadingUI';

import {LoginScreen} from './screens/loginScreen';
import {OTPVerifyScreen} from './screens/OTPVerifyScreen';
import {ChooseWork} from './screens/ChooseWork';
import HomeScreen from './screens/homeScreen';
import AddUpdatePartyWorkDetails from './screens/addUpdatePartyWorkDetails';

import {dataStore} from './learnRedux/dataStore';

import {ProgramingPractiseRoot} from './programingPractise/programingPractiseRoot';

const ApploadingStack = createStackNavigator();		// App Starting navigation(app root navigation)
function AppMainStack (){
	// dataStore --> To use centralized state,  Provider --> To map all screen with store
	return (
		<NavigationContainer>
			<Provider store={dataStore}>
				<ApploadingStack.Navigator
					initialRouteName='ChooseWork'
				>
					<ApploadingStack.Screen name="ChooseWork" component={ChooseWork} options={{headerShown:false}}/>
					<ApploadingStack.Screen name="ProgramingPracitseStack" component={ProgramingPracitseStack} options={{headerShown:false}}/>
					<ApploadingStack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown:false}}/>
					<ApploadingStack.Screen name="OTPVerifyScreen" component={OTPVerifyScreen} options={{headerShown:false}}/>
					<ApploadingStack.Screen name="CostEstimationCalculator" component={CostEstimationCalculator} options={{headerShown:false}}/>
					<ApploadingStack.Screen name="AddUpdatePartyWorkDetails" component={AddUpdatePartyWorkDetails} options={{headerShown:false}}/>
				</ApploadingStack.Navigator>
			</Provider>
		</NavigationContainer>
	)
}

const PractiseProgramingStack = createStackNavigator();		// Programin practise stack navigation
function ProgramingPracitseStack (){
	return (
		<PractiseProgramingStack.Navigator
			initialRouteName='ProgramingPractiseRoot'
		>
			<PractiseProgramingStack.Screen name="ProgramingPractiseRoot" component={ProgramingPractiseRoot} options={{headerShown:false}}/>
		</PractiseProgramingStack.Navigator>
	)
}

const CostEstimationStack = createStackNavigator();		// This is cost estimation stack
function CostEstimationCalculator (){
	return (
		<CostEstimationStack.Navigator
			initialRouteName='HomeScreen'
		>
			<CostEstimationStack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown:false, title: 'Back'}}/>
		</CostEstimationStack.Navigator>
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
		changeAppLoadingTimer = setTimeout(() => this.setState({isAppLoading:false}), 5000);
	}
	
	render(){	// Life cycle methods
		if(this.state.isAppLoading){
			//  <> </> ---> fragment/react.frament
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
