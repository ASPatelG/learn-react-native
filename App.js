import { StyleSheet, Text, View, StatusBar } from 'react-native';

import {CodingPractise} from './HomeScreen';

export default function App() {
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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffffff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
