import {useState, useEffect} from 'react';
import {View, BackHandler, FlatList, Pressable} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import { FontAwesome5 } from '@expo/vector-icons';

import {dataStore} from '../learnRedux/dataStore';
import {addPartyDetails, setPartyTableDataInStore} from '../learnRedux/actions';

import {CommonHeaderComponent} from '../components/commonHeaderComponent';
import DropdownPickerComponent from '../components/dropdownPickerComponent';
import ButtonComponent from '../components/buttonComponent';
import PartyShortDetails from '../components/PartyShortDetails';
import {UserShortDetails} from '../components/userShortDetails';
import PartiesWorkTableHeader from '../components/partiesWorkTableHeader';
import {showErrorAlert} from '../components/showErrorAlert';

import { createOwnerTable, createPartyTable } from '../sqliteDatabaseFunctionality/createTable';
import { getPartyData } from '../sqliteDatabaseFunctionality/getData';
import {constantValues} from '../staticDataFiles/constantValues';

import {styles} from './screens.styles/homeScreenStyles';

import {generateWorkPaymentPDF} from '../javaScriptFunction/generateWorkPaymentPDF';

const HomeScreen = (props)=>{ 	// props used to get user props and default props
	/* Used to show ui till the app is loading */

	const [workType, setPartyType] = useState(constantValues.workTypes[0].value);
	// const allPartiesWorkArray = useSelector((state)=>state.partyDetails);
	let [allPartiesWorkArray, setPartyData] = useState([]);
	let [isAppliedWorkType, changedAppliedFilter] = useState(false);
	const transRef  = useSelector((state)=>state.transRef);
	const dispatchRefrence = useDispatch()		// To send the data in store

	onchanDropDownValue = (itemKey, itemValue)=>{
		setPartyType(itemKey);
	}

	useEffect(() => {
		const { navigation } = props;

		const backAction = () => {
			BackHandler.exitApp()	// To close the app
			return true;
		};

		const setPartyDataInStore = async() => {
			let tablePartyData = await getPartyData();
			if(tablePartyData.length > 0 ){
				setPartyData(tablePartyData);
				// dispatchRefrence(setPartyTableDataInStore({partyData:tablePartyData}));
			}
		};

		const backHandler = BackHandler.addEventListener(
			'hardwareBackPress',
			backAction,
		);

		const willFocusSubscription = navigation.addListener('focus', ()=> {
			createOwnerTable();		// To store business owner details
			createPartyTable();		// To store party's works details
			setPartyDataInStore();	// To store table data in readux-store
		});

		// To remove event on onmount
		return () => {
			backHandler.remove();
			willFocusSubscription.remove();
		}
	// }, [allPartiesWorkArray]);		// dispatchRef.. to rerender on change data in store;
	}, []);

	const searchPartyDataWithWorkType = ()=>{

	}

	const onPressAddWork = ()=>{
		const {navigation} = props;
		navigation.navigate('AddUpdatePartyWorkDetails');
	}

	const onPressPDF = (nativeEvent)=>{
		if(allPartiesWorkArray.length > 0){
			generateWorkPaymentPDF(allPartiesWorkArray);
		}
		else{
			showErrorAlert(transRef.t('noWorkError'));
		}
	}

	return(
		<View style={styles.mainContainer}>
			<CommonHeaderComponent/>
			<UserShortDetails navigation={props.navigation}/>
			<View style={styles.screenChangeContent}>
				<View style={styles.dropDownContainer}>
					<DropdownPickerComponent
						selectedItemValue={workType}
						itemList={constantValues.workTypes}
						onValueChange={onchanDropDownValue}
						dropdownStyle={styles.dropdownStyle}
						showTranslatedLabel={true}
					/>
				</View>
				<Pressable
					onPressIn={onPressPDF}
					style={styles.downloadIconContainer}
				>
					<FontAwesome5 name="file-download" size={45} color="#F5EC42"/>
				</Pressable>
			</View>
				{allPartiesWorkArray.length
					? <FlatList 
						data={allPartiesWorkArray} 
						renderItem={({item, index})=> <PartyShortDetails
							key={index}
							index={index}
							partySomeDetails={item}
							navigation={props.navigation}
						/>}
						keyExtractor={(item, index) => index.toString()}
						keyboardShouldPersistTaps='always'
						ListHeaderComponent={<PartiesWorkTableHeader/>}
					/>
					: null
				}
				<ButtonComponent
					title={transRef.t('addPartyWork')}
					onPressIn={onPressAddWork}
					mainContainer={styles.mainContainer}
				/>
		</View>
	);
}

export default HomeScreen;