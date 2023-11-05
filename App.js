import 'react-native-gesture-handler';		//According to reactnative stack navigation this statement should in top(firstline)
import {Component} from 'react';
import { StyleSheet, Text, View, StatusBar, useState, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator } from '@react-navigation/drawer';
import {Provider} from 'react-redux';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {CodingPractise} from './codingPractise';
import {AppLoadingUI} from './components/AppLoadingUI';

import {LoginScreen} from './screens/loginScreen';
import {OTPVerifyScreen} from './screens/OTPVerifyScreen';
import {ChooseWork} from './screens/ChooseWork';
import HomeScreen from './screens/homeScreen';
import AddUpdatePartyWorkDetails from './screens/addUpdatePartyWorkDetails';
import DrawerContentComponent from './screens/DrawerContentComponent';

import {dataStore} from './learnRedux/dataStore';

import {ProgramingPractiseRoot} from './programingPractise/programingPractiseRoot';

const Stack = createStackNavigator();		// App Starting navigation(app root navigation)
function AppMainStack (){
	// dataStore --> To use centralized state,  Provider --> To map all screen with store
	return (
		
			<Stack.Navigator
				initialRouteName='LoginScreen'	// To programing practise set ChooseWork
			>
				<Stack.Screen name="ChooseWork" component={ChooseWork} options={{headerShown:false}}/>
				{/*<Stack.Screen name="ProgramingPracitseStack" component={ProgramingPracitseStack} options={{headerShown:false}}/>*/}
				<Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown:false}}/>
				<Stack.Screen name="OTPVerifyScreen" component={OTPVerifyScreen} options={{headerShown:false}}/>
				<Stack.Screen name="CostEstimationCalculator" component={CostEstimationCalculator} options={{headerShown:false}}/>
				<Stack.Screen name="AddUpdatePartyWorkDetails" component={AddUpdatePartyWorkDetails} options={{headerShown:false}}/>
			</Stack.Navigator>
	)
}

// const Stack = createStackNavigator();		// Programin practise stack navigation
function ProgramingPracitseStack (){
	return (
		<Stack.Navigator
			initialRouteName='ProgramingPractiseRoot'
		>
			<Stack.Screen name="ProgramingPractiseRoot" component={ProgramingPractiseRoot} options={{headerShown:false}}/>
		</Stack.Navigator>
	)
}

// const CostEstimationStack = createStackNavigator();		// This is cost estimation stack
function CostEstimationCalculator (){
	return (
		<Stack.Navigator
			initialRouteName='HomeScreen'
		>
			<Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown:false, title: 'Back'}}/>
		</Stack.Navigator>
	)
}

const Drawer = createDrawerNavigator();
function DrawerNavigator() {
	return(
		<NavigationContainer>
			<Provider store={dataStore}>
				<Drawer.Navigator
					initialRouteName="AppMainStack"
					drawerContent={(props) => <DrawerContentComponent {...props} />}
					screenOptions={{
						headerShown: false,
						drawerStyle:{
							backgroundColor:'#ffffff',
							width: wp('85%'),
						}
					}}
				>
					<Drawer.Screen name="ProgramingPracitseStack" component={ProgramingPracitseStack} options={{headerShown:false}}/>
					<Drawer.Screen name="AppMainStack" component={AppMainStack} options={{headerShown:false}}/>
				</Drawer.Navigator>
			</Provider>
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
					<DrawerNavigator/>
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
