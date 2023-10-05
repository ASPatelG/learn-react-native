import {useState, useEffect} from 'react';
import {View, BackHandler, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {dataStore} from '../learnRedux/dataStore';
import {CommonHeaderComponent} from '../components/commonHeaderComponent';
import DropdownPickerComponent from '../components/dropdownPickerComponent';
import {UserShortDetails} from '../components/userShortDetails';
import {styles} from './screens.styles/homeScreenStyles';
import {constantValues} from '../staticDataFiles/constantValues';
import ButtonComponent from '../components/buttonComponent';


const HomeScreen = (props)=>{ 	// props used to get user props and default props
	/* Used to show ui till the app is loading */

	const [workType, setPartyType] = useState(constantValues.workTypes[0].value);
	const [allPartiesWorkArray, setAllPartiesWorkArray] = useState([]);
	const transRef  = useSelector((state)=>state.transRef);

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

	const onPressAddWork = ()=>{
		const {navigation} = props;
		navigation.navigate('AddPartyWorkDetails');
	}

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
					showTranslatedLabel={true}
				/>
			</View>
			{allPartiesWorkArray.length
				? <FlatList 
					data={allPartiesWorkArray} 
					renderItem={({item, index})=> <PartyWorkShortDetails
						key={index}
						index={index}
						employeeSomeDetails={item}
					/>}
					keyExtractor={(item, index) => index.toString()}
					keyboardShouldPersistTaps='always'
				/>
				: null
			}
			<ButtonComponent
				title={transRef.t('addPartyWork')}
				onPressIn={onPressAddWork}
			/>
		</View>
	);
}

export default HomeScreen;