import {useState, useEffect, useRef} from 'react';
import {View, BackHandler, FlatList, Pressable, Text} from 'react-native';
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
import CommonGuiToApplyFilter from '../components/CommonGuiToApplyFilter';

import { createOwnerTable, createPartyTable } from '../sqliteDatabaseFunctionality/createTable';
import { getPartyData, filterPartyData } from '../sqliteDatabaseFunctionality/getData';
import {constantValues} from '../staticDataFiles/constantValues';

import {styles} from './screens.styles/homeScreenStyles';

import {generateWorkPaymentPDF} from '../javaScriptFunction/generateWorkPaymentPDF';

const HomeScreen = (props)=>{ 	// props used to get user props and default props
	/* Used to show ui till the app is loading */

	const [workType, setPartyType] = useState(constantValues.workTypes[0].value);
	// const allPartiesWorkArray = useSelector((state)=>state.partyDetails);
	const [state, setState] = useState({
		allPartiesWorkArray:[],
		appliedFilter:{
			isApplied:false,
			mobileNumber:'',
			workType:''
		},
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
				setState((previous)=>({...previous, allPartiesWorkArray:[...tablePartyData]}));
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
	}, []);

	const onPressAddWork = ()=>{
		const {navigation} = props;
		navigation.navigate('AddUpdatePartyWorkDetails');
	}

	const onPressPDF = (nativeEvent)=>{
		if(state.allPartiesWorkArray.length > 0){
			generateWorkPaymentPDF(state.allPartiesWorkArray);
		}
		else{
			showErrorAlert(transRef.t('noWorkError'));
		}
	}

	const onPressCross = ()=>{
		if(state?.appliedFilter?.isApplied){
			setState((previous)=>({...previous, appliedFilter:{...state.appliedFilter}, isOpenFilterUI:false}));
		}
		else{
			setState((previous)=>({
				...previous,
				appliedFilter:{
					...state.appliedFilter,
					isApplied:false,
					mobileNumber:'',
					workType:'',
				},
				isOpenFilterUI:false,
			}));
		}
	}

	const onOpenFilterUI = (nativeEvent)=>{
		setState((previous)=>({...previous, appliedFilter:{...state.appliedFilter}, isOpenFilterUI:true}));
	}

	onPressApply = async(filterData)=>{
		let tablePartyData = await filterPartyData(filterData);
		setState((previous)=>({
			...previous,
			allPartiesWorkArray:[...tablePartyData],
			appliedFilter:{
				...state.appliedFilter,
				isApplied:true,
				mobileNumber:filterData.mobileNumber,
				workType:filterData.workType,
			},
			isOpenFilterUI:false,
		}));
	}

	const onClearFilter = async()=>{
		let tablePartyData = await getPartyData();
		setState((previous)=>({...previous, allPartiesWorkArray:[...tablePartyData], appliedFilter:{ ...state.appliedFilter, isApplied:false, mobileNumber:'', workType:''}}));
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
				</Pressable>
				<LogoutUI navigation={props.navigation}/>
			</View>
				{state?.appliedFilter?.isApplied
					? <CommonGuiToApplyFilter //Badge will be show if applied any filter
						onClearFilter={onClearFilter}
					/>
					: null
				}
				{state.allPartiesWorkArray.length
					? <View style={styles.flatlistContainer}>
					<FlatList 
						data={state.allPartiesWorkArray} 
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
				{state?.appliedFilter?.isApplied && !state?.allPartiesWorkArray?.length
					? <Text style={styles.noFilterPartyData}>{transRef.t('notFoundPartyData')}</Text>
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
				onPressApply={onPressApply}
				filterData={state.appliedFilter}
				isOpenFilterUI={state.isOpenFilterUI}
			/>
		</View>
	);
}

export default HomeScreen;