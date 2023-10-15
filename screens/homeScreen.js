import {useState, useEffect, useRef} from 'react';
import {View, BackHandler, FlatList, Pressable} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import { FontAwesome5, FontAwesome } from '@expo/vector-icons';

import {dataStore} from '../learnRedux/dataStore';
import {addPartyDetails, setPartyTableDataInStore} from '../learnRedux/actions';

import {CommonHeaderComponent} from '../components/commonHeaderComponent';
import DropdownPickerComponent from '../components/dropdownPickerComponent';
import ButtonComponent from '../components/buttonComponent';
import PartyShortDetails from '../components/PartyShortDetails';
import {UserShortDetails} from '../components/userShortDetails';
import PartiesWorkTableHeader from '../components/partiesWorkTableHeader';
import {showErrorAlert} from '../components/showErrorAlert';
import LogoutUI from '../components/LogoutUI';
import PartyWorkFilter from '../components/PartyWorkFilter';

import { createOwnerTable, createPartyTable } from '../sqliteDatabaseFunctionality/createTable';
import { getPartyData } from '../sqliteDatabaseFunctionality/getData';
import {constantValues} from '../staticDataFiles/constantValues';

import {styles} from './screens.styles/homeScreenStyles';

import {generateWorkPaymentPDF} from '../javaScriptFunction/generateWorkPaymentPDF';

const HomeScreen = (props)=>{ 	// props used to get user props and default props
	/* Used to show ui till the app is loading */

	const [workType, setPartyType] = useState(constantValues.workTypes[0].value);
	// const allPartiesWorkArray = useSelector((state)=>state.partyDetails);
	const [allPartiesWorkArray, setPartyData] = useState([]);
	const [appliedFilter, changedAppliedFilter] = useState({
		isAppliedMobile:false,
		isAppliedWorkType:false,
		isOpenFilterUI:false,
	});
	const transRef  = useSelector((state)=>state.transRef);
	const dispatchRefrence = useDispatch()		// To send the data in store
	const RBSheetRef = useRef(null);

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
			willFocusSubscription();
		}
	// }, [allPartiesWorkArray]);		// dispatchRef.. to rerender on change data in store;
	}, []);

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

	const onPressCross = ()=>{
		// if(RBSheetRef?.current){
		// 	RBSheetRef?.close();
		// }
		changedAppliedFilter((previous)=>({...previous, isOpenFilterUI:false}));
	}

	const onOpenFilterUI = (nativeEvent)=>{
		changedAppliedFilter((previous)=>({...previous, isOpenFilterUI:true}));
		console.log('onOpenFilterUI function called: ', RBSheetRef);
		// if(RBSheetRef?.current){
		// 	RBSheetRef?.open();
		// }
	}

	return(
		<View style={styles.mainContainer}>
			<CommonHeaderComponent/>
			<View style={{flexDirection:'row', alignItems:'center'}}>
				<UserShortDetails navigation={props.navigation}/>
				<Pressable
					onPressIn={onPressPDF}
					style={styles.downloadIconContainer}
				>
					<FontAwesome5 name="file-download" size={33} color="#F5EC42"/>
				</Pressable>
				<Pressable
					onPressIn={onOpenFilterUI}
					style={styles.downloadIconContainer}
				>
					<FontAwesome name="filter" size={35} color="#38C6F4" />
					{/*{appliedFilter?.isAppliedMobile || appliedFilter?.isAppliedWorkType
						? <Badge //Badge will be show if applied any filter
							status="error"
							containerStyle={styles.filterBadgeIcon}
						/>
						: null
					}*/}
				</Pressable>
				<LogoutUI navigation={props.navigation}/>
			</View>
				{allPartiesWorkArray.length
					? <View style={styles.flatlistContainer}>
					<FlatList 
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
					/></View>
					: null
				}
				<ButtonComponent
					title={transRef.t('addPartyWork')}
					onPressIn={onPressAddWork}
					mainContainer={styles.mainContainer}
				/>
			<PartyWorkFilter
				RBSheetRef={RBSheetRef}
				onPressCross={onPressCross}
				filterData={appliedFilter}
			/>
		</View>
	);
}

export default HomeScreen;