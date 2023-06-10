import 'react-native-gesture-handler';		//According to reactnative stack navigation this statement should in top(firstline)


import { StyleSheet, Text, View, StatusBar, useState } from 'react-native';

import {CodingPractise} from './HomeScreen';
import {AppLoadingUI} from './screens/AppLoadingUI';

export default function App() {

	const [isAppLoading, setIsAppLoading] = useState(true);		// First index is state(variable) name and Second index functionName--> to change the state value.

	useEffect(() => {
		const changeAppLoadingTimer = setTimeout(() => setIsAppLoading(false), 1000);
	}, []);
	
	if(isAppLoading){
		return(
			<AppLoadingUI/>
		);
	}
	else{
		return (
			<View style={styles.container}>
				<StatusBar
					animated={true}
					backgroundColor="#175491"
					hidden={false}
					StatusBarStyle={'light-content'}
				/>
				<CodingPractise/>
			</View>
		);
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
