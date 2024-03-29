import {useState, useEffect, useRef} from 'react';
import {View, BackHandler, FlatList, Pressable, Text, Image} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import { FontAwesome5, FontAwesome, Ionicons } from '@expo/vector-icons';

import {dataStore} from '../learnRedux/dataStore';
import {addPartyDetails, setPartyTableDataInStore} from '../learnRedux/actions';

import {CommonHeaderComponent} from '../components/commonHeaderComponent';
import DropdownPickerComponent from '../components/dropdownPickerComponent';
import ButtonComponent from '../components/buttonComponent';
import PartyShortDetails from '../components/PartyShortDetails';
import PartiesWorkTableHeader from '../components/partiesWorkTableHeader';
import {showErrorAlert} from '../components/showErrorAlert';
import PartyWorkFilter from '../components/PartyWorkFilter';
import CommonGuiToApplyFilter from '../components/CommonGuiToApplyFilter';
import ScreenUILoading from '../components/ScreenUILoading';

import { createOwnerTable, createPartyTable, createPersonalDetailTable, createPartyWorkTable, createPaymentTable } from '../sqliteDatabaseFunctionality/createTable';
import { getPartyData, filterPartyData } from '../sqliteDatabaseFunctionality/getData';
import { deleteParty } from '../sqliteDatabaseFunctionality/deleteData';

import {constantValues} from '../staticDataFiles/constantValues';

import {styles} from './screens.styles/homeScreenStyles';

import {generateWorkPaymentPDF} from '../javaScriptFunction/generateWorkPaymentPDF';

const HomeScreen = (props)=>{ 	// props used to get user props and default props
	/* Used to show ui till the app is loading */

	const [state, setState] = useState({
		allPartiesWorkArray:[],
		appliedFilter:{
			isApplied:false,
			mobileNumber:'',
			workType:''
		},
		isOpenFilterUI:false,
		workType:constantValues.workTypes[0].value,
		isLoading:true,
	});
	const transRef  = useSelector((state)=>state.transRef);
	const dispatchRefrence = useDispatch()		// To send the data in store
	const RBSheetRef = useRef(null);

	onchanDropDownValue = (itemKey, itemValue)=>{
		setState((previous)=> ({...previous, workType:itemValue}));
	}

	useEffect(() => {
		const { navigation } = props;

		const backAction = () => {
			BackHandler.exitApp()	// To close the app
			return true;
		};
		let backHandler = null;

		const setPartyDataInStore = async() => {
			let tablePartyData = await getPartyData();
			setState((previous)=>({...previous, allPartiesWorkArray:[...tablePartyData], appliedFilter:{mobileNumber:'', isApplied:false, workType:''}, isLoading:false}));
		};

		const willFocusSubscription = navigation.addListener('focus', ()=> {
			// createOwnerTable();		// To store business owner details
			// createPartyTable();		// To store party's works details
			setPartyDataInStore();	// To store table data in readux-store
			createPersonalDetailTable();
			createPartyWorkTable();
			createPaymentTable();
			backHandler = BackHandler.addEventListener(
				'hardwareBackPress',
				backAction,
			);
		});

		// To remove event on onmount
		return () => {
			backHandler?.remove();
			willFocusSubscription();
		}
	}, []);

	const onPressAddWork = ()=>{
		setState(previous=>({...previous, isLoading:true}));
		const {navigation} = props;
		navigation.navigate('AddUpdatePartyWorkDetails');
	}

	const onPressPDF = (nativeEvent)=>{
		setState(previous=>({...previous, isLoading:true}));
		const printableDataArray = state.allPartiesWorkArray?.filter((element)=>element.is_selected);
		if(printableDataArray.length > 0){
			generateWorkPaymentPDF(printableDataArray[0]);
			setState(previous=>({...previous, isLoading:false}));
		}
		else{
			showErrorAlert(transRef.t('noWorkError'));
			setState(previous=>({...previous, isLoading:false}));
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
		if(state.allPartiesWorkArray.length === 0 && !state.appliedFilter.isApplied){
			showErrorAlert(transRef.t('noWorkError'));
		}
		else{
			setState((previous)=>({...previous, appliedFilter:{...state.appliedFilter}, isOpenFilterUI:true}));
		}
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

	onPressMenu = async ()=>{
		const {navigation} = props;
		navigation.openDrawer();
	}

	const onClearFilter = async()=>{
		let tablePartyData = await getPartyData();
		setState((previous)=>({...previous, allPartiesWorkArray:[...tablePartyData], appliedFilter:{ ...state.appliedFilter, isApplied:false, mobileNumber:'', workType:''}}));
	}

	const onDelete = async (partyWorkData)=> {
		let deletionResponse = await deleteParty(partyWorkData.party_id);
		let tablePartyData = await getPartyData();
		setState((previous)=>({...previous, allPartiesWorkArray:[...tablePartyData]}));
	}

	if(state.isLoading){
		return(
			<ScreenUILoading
				showLoadingIndicator={state.isLoading}
			/>
		);
	}
	else{
		return(
			<View style={styles.mainContainer}>
				<CommonHeaderComponent/>
				<View style={{flexDirection:'row', alignItems:'center', paddingTop:8}}>
					<Pressable
						onPressIn={onPressMenu}
						style={styles.menuIconContainer}
					>
						<Ionicons name="menu-sharp" size={35} color="black" />
					</Pressable>
					<View style={styles.centerContent}>
						<Image source={require('../assets/images/homeIcon.jpg')}  style={styles.loginIcon} />
					</View>
					<Pressable
						onPressIn={onPressPDF}
						style={styles.downloadIconContainer}
					>
						<FontAwesome5 name="file-download" size={33} color="#F5EC42"/>
					</Pressable>
					<Pressable
						disabled={true}
						onPressIn={onOpenFilterUI}
						style={styles.downloadIconContainer}
					>
						<FontAwesome name="filter" size={35} color="#38C6F4" />
					</Pressable>
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
								onDeleteWork={onDelete}
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
						disabledButtonStyle={styles.disabledButtonStyle}
						pressableButtonStyle={styles.pressableButtonStyle}
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
}

export default HomeScreen;