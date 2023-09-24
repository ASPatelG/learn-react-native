import {useState, useEffect} from 'react';
import {View, BackHandler} from 'react-native';
import {dataStore} from '../learnRedux/dataStore';
import {CommonHeaderComponent} from '../components/commonHeaderComponent';
import DropdownPickerComponent from '../components/dropdownPickerComponent';
import {UserShortDetails} from '../components/userShortDetails';
import {styles} from './screens.styles/homeScreenStyles';
import {constantValues} from '../staticDataFiles/constantValues';


const HomeScreen = (props)=>{ 	// props used to get user props and default props
	/* Used to show ui till the app is loading */

	const [workType, setPartyType] = useState(constantValues.workTypes[0].value);

	onchanDropDownValue = (itemKey, itemValue)=>{
		setPartyType(itemKey);
	}

	useEffect(() => {
		const backAction = () => {
			BackHandler.exitApp()	// To close the app
			return true;
		};

		const backHandler = BackHandler.addEventListener(
			'hardwareBackPress',
			backAction,
		);

		// To remove event on onmount
		return () => backHandler.remove();

	}, []);

	return(
		<View style={styles.mainContainer}>
			<CommonHeaderComponent/>
			<UserShortDetails/>
			<View style={styles.dropDownContainer}>
				<DropdownPickerComponent
					selectedItemValue={workType}
					itemList={constantValues.workTypes}
					onValueChange={onchanDropDownValue}
					dropdownStyle={null}
				/>
			</View>
		</View>
	);
}

export default HomeScreen;