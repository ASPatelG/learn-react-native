import {View} from 'react-native';
import {dataStore} from '../learnRedux/dataStore';
import {CommonHeaderComponent} from '../components/commonHeaderComponent';
import DropdownPickerComponent from '../components/dropdownPickerComponent';
import {UserShortDetails} from '../components/userShortDetails';
import {styles} from './screens.styles/homeScreenStyles';
import {constantValues} from '../staticDataFiles/constantValues';


export const HomeScreen = (props)=>{ 	// props used to get user props and default props
	/* Used to show ui till the app is loading */

	onchanDropDownValue = (itemKey, itemValue)=>{
		console.log('onchanDropDownValue function called: ', itemKey, itemValue);
	}

	return(
		<View style={styles.mainContainer}>
			<CommonHeaderComponent/>
			<UserShortDetails/>
			<View style={styles.dropDownContainer}>
				<DropdownPickerComponent
					selectedItemValue={constantValues.workTypes[0].label}
					itemKey={constantValues.workTypes[0].value}
					itemList={constantValues.workTypes}
					onValueChange={onchanDropDownValue}
					dropdownStyle={null}
				/>
			</View>
		</View>
	);
}