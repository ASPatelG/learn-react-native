import { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, BackHandler, TouchableHighlight } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSelector, useDispatch } from 'react-redux';

import { Entypo } from '@expo/vector-icons';

import { CommonHeaderComponent } from '../components/commonHeaderComponent';
import TextInputComponent from '../components/textInputComponent';
import ButtonComponent from '../components/buttonComponent';
import ScreenUILoading from '../components/ScreenUILoading';
import  CommonDateTimePicker from '../components/CommonDateTimePicker';

import { addPartyDetails, updatePartyDetails } from '../learnRedux/actions';
import { insertPartyDetail } from '../sqliteDatabaseFunctionality/insertData';
import { updatePartyDetail } from '../sqliteDatabaseFunctionality/updateData';
import { regularExpressionOnlyDigit, regularExpressionDecimal } from '../staticDataFiles/constantValues';

import { styles } from './screens.styles/addUpdatePartyDetailsStyle';

const AddUpdatePartyWorkDetails = (props) => {
	const { route: { params } } = props;
	const transRef = useSelector((state) => state.transRef);
	const dispatchRefrence = useDispatch()		// To send the data in store
	const [state, setState] = useState({
		firstName: '',
		lastName: '',
		mobileNumber: '',
		email: '',
		workType: 'wall',
		rate: '',
		length: '',
		width: '',
		height: '',
		totalArea: '',
		amount: '',
		discount: '',
		isLoading: true,
		showPersenalDetails:true,
		showWorkDetails:false,
		showPaymentDetails:false,
		selectedDate:new Date(),
	});
	const disableSave = () => {
		if (!state.firstName?.length || !state.mobileNumber || state.mobileNumber.length < 10 || !state.rate || !state.length || !state.width || !state.rate || !state.workType) {
			return true;
		}
		else {
			return false;
		}
	}

	useEffect(() => {
		const { navigation } = props;
		const willFocusSubscription = navigation.addListener('focus', () => {
			if (params) {		// To set data according to party details
				const { partySomeDetails } = params;
				const { discount, email, first_name, height, last_name, length, mobile_number, rate, amount, total_area, width, work_type, id } = partySomeDetails;

				setState(previous => ({ ...previous, discount, email, firstName: first_name, height, lastName: last_name, length, mobileNumber: mobile_number, rate, amount, totalArea: total_area, width, workType: work_type, id, isLoading: false }));
			}
			else {
				setState((previous) => ({ ...previous, isLoading: false }));
			}
		});

		const backAction = () => {
			const { navigation } = props;
			if (navigation.canGoBack()) {
				navigation.goBack()	// To close the app
			}
			return true;
		};

		const backHandler = BackHandler.addEventListener(
			'hardwareBackPress',
			backAction,
		);

		// To remove event on onmount
		return () => {
			backHandler.remove();
			willFocusSubscription();
		}
	}, []);

	const onChangeFirstName = (enteredText) => {
		setState((previous) => ({
			...previous,
			firstName: enteredText,
		}));
	}

	const onChangeLastName = (enteredText) => {
		setState((previous) => ({
			...previous,
			lastName: enteredText,
		}));
	}

	const onChangeMobileNumber = (enteredText) => {
		if (regularExpressionOnlyDigit.test(enteredText) || enteredText === '') {
			setState((previous) => ({
				...previous,
				mobileNumber: enteredText,
			}));
		}
		else {
			null
		}
	}

	const onChangeEmail = (enteredText) => {
		setState((previous) => ({
			...previous,
			email: enteredText,
		}));
	}

	const onChangeWorkType = (enteredText) => {
		setState((previous) => ({
			...previous,
			workType: enteredText,
		}));
	}

	const calculateAmount = (totalArea = 1, rate = 1) => {
		totalArea = Number(totalArea);	// because it's possible string value
		rate = Number(rate);
		let calculatedAmount = totalArea * rate;
		//	To round the value
		calculatedAmount = Math.round(calculatedAmount * 100) / 100;
		return calculatedAmount;
	}

	const calculateTotalArea = (length = 1, width = 1, height = 1) => {
		length = Number(length);	// because it's possible string value
		width = Number(width);
		height = Number(height);
		if (!height) {	// Since height is optional
			height = 1;
		}
		let calculatedTotalArea = length * width * height;
		//	To round the value
		calculatedTotalArea = Math.round(calculatedTotalArea * 100) / 100;
		return calculatedTotalArea;
	}

	const onChangeRate = (enteredText) => {
		if (regularExpressionDecimal.test(enteredText) || enteredText === '') {
			const calculatedAmount = calculateAmount(state.totalArea, enteredText);
			setState((previous) => ({
				...previous,
				rate: enteredText,
				amount: calculatedAmount,
			}));
		}
		else {
			null
		}
	}

	const onChangeLength = (enteredText) => {
		if (regularExpressionDecimal.test(enteredText) || enteredText === '') {
			const calculatedTotalArea = calculateTotalArea(enteredText, state.width, state.height);
			const calculatedAmount = calculateAmount(calculatedTotalArea, state.rate);
			setState((previous) => ({
				...previous,
				totalArea: calculatedTotalArea,
				amount: calculatedAmount,
				length: enteredText
			}));
		}
		else {
			null
		}
	}

	const onChangeWidth = (enteredText) => {
		if (regularExpressionDecimal.test(enteredText) || enteredText === '') {
			const calculatedTotalArea = calculateTotalArea(state.length, enteredText, state.height);
			const calculatedAmount = calculateAmount(calculatedTotalArea, state.rate);
			setState((previous) => ({
				...previous,
				totalArea: calculatedTotalArea,
				amount: calculatedAmount,
				width: enteredText
			}));
		}
		else {
			null
		}
	}

	const onChangeHeight = (enteredText) => {
		if (regularExpressionDecimal.test(enteredText) || enteredText === '') {
			const calculatedTotalArea = calculateTotalArea(state.length, state.width, enteredText);
			const calculatedAmount = calculateAmount(calculatedTotalArea, state.rate);
			setState((previous) => ({
				...previous,
				totalArea: calculatedTotalArea,
				amount: calculatedAmount,
				height: enteredText
			}));
		}
		else {
			null
		}
	}

	const onChangeDiscount = (enteredText) => {
		if (regularExpressionDecimal.test(enteredText) || enteredText === '') {
			setState((previous) => ({
				...previous,
				discount: enteredText
			}));
		}
		else {
			null
		}
	}

	const handleDateChange = (date) => {
		// Handle the date change event here
		setState((previous) => ({
			...previous,
			selectedDate: date
		}));
	};

	const onPressSave = async () => {
		const { navigation } = props;
		const insertDataOutput = await insertPartyDetail(state);
		const bodyData = { first_name: state.firstName, last_name: state.lastName, mobile_number: state.mobileNumber, email: state.email, work_type: state.workType, length: state.length, width: state.width, height: state.height, rate: state.rate, total_area: state.totalArea, amount: state.amount, discount: state.discount };
		// dispatchRefrence(addstate({partyData:bodyData}));	// Since useEffect Not Calling again
		navigation.goBack();
	}

	const onPressUpdate = async () => {
		const { navigation } = props;
		const updateDataResult = await updatePartyDetail(state);
		const bodyData = { first_name: state.firstName, last_name: state.lastName, mobile_number: state.mobileNumber, email: state.email, work_type: state.workType, length: state.length, width: state.width, height: state.height, rate: state.rate, total_area: state.totalArea, amount: state.amount, discount: state.discount };
		// dispatchRefrence(updatestate({partyData:bodyData, activeIndex:params.activeIndex}));		// Since useEffect Not Calling again
		navigation.goBack();
	}

	const setLoading = () => {
		setState({ ...state, isLoading: !state.isLoading });
	}

	function onOpenCloseUI(key){
		setState((previous) => ({
			...previous,
			[key]: !state[key],
		}));
	}

	if (state.isLoading) {
		return (
			<ScreenUILoading
				showLoadingIndicator={state.isLoading}
			/>
		);
	}
	else {
		return (
			<SafeAreaView style={styles.mainContainer}>
				<CommonHeaderComponent />
				<Text style={styles.eployeeDetailsStyle}>{transRef.t('addPartyWork')}</Text>
				<ScrollView>
					<View style={styles.uiContainer}>
						<TouchableHighlight
							onPress={()=>onOpenCloseUI('showPersenalDetails')}
							style={styles.uiHeadingContainer}
						>
							<View style={styles.uiSubHeadingContainer}>
								<Text style={styles.uiHeading}>{transRef.t('personalDetails')}</Text>
								<Entypo
									name={state.showPersenalDetails === true ?"chevron-up" :"chevron-down"}
									size={26}
									color="#002db3"
								/>
							</View>
						</TouchableHighlight>
						{state.showPersenalDetails === true
							?<View style={styles.uiElementContainer}>
								<TextInputComponent
									showFieldLabel={true}
									fieldLabelText={transRef.t('enterFirstName')}
									value={state.firstName}
									onChangeText={onChangeFirstName}
									maxLength={30}
									isItRequired={true}
									inputBoxStyle={styles.inputBoxStyle}
								/>
								<TextInputComponent
									showFieldLabel={true}
									fieldLabelText={transRef.t('enterLastName')}
									value={state.lastName}
									onChangeText={onChangeLastName}
									maxLength={30}
									inputBoxStyle={styles.inputBoxStyle}
								/>
								<TextInputComponent
									showFieldLabel={true}
									fieldLabelText={transRef.t('enterMobilNumber')}
									value={state.mobileNumber?.toString()}
									onChangeText={onChangeMobileNumber}
									maxLength={10}
									isItRequired={true}
									inputBoxStyle={styles.inputBoxStyle}
									keyboardType='number-pad'
								/>
								<TextInputComponent
									showFieldLabel={true}
									fieldLabelText={transRef.t('enterEmail')}
									value={state.email}
									onChangeText={onChangeEmail}
									keyboardType='email-address'
									inputBoxStyle={styles.inputBoxStyle}
									maxLength={80}
								/>
								<ButtonComponent
									title={transRef.t(params ? 'update' : 'save')}
									onPressIn={params ? onPressUpdate : onPressSave}
									disabled={disableSave()}
									mainContainer={styles.buttonContainer}
								/>
							</View>
							: null
						}
					</View>
					<View style={styles.uiContainer}>
						<TouchableHighlight
							onPress={()=>onOpenCloseUI('showWorkDetails')}
							style={styles.uiHeadingContainer}
							// underlayColor={'#cce6ff'}
						>
							<View style={styles.uiSubHeadingContainer}>
								<Text style={styles.uiHeading}>{transRef.t('workArea')}</Text>
								<Entypo
									name={state.showWorkDetails === true ?"chevron-up" :"chevron-down"}
									size={26}
									color="#002db3"
								/>
							</View>
						</TouchableHighlight>
						{state.showWorkDetails === true
							? <View style={styles.uiElementContainer}>
								<View style ={{flexDirection:'row'}}>
									<TextInputComponent
										showFieldLabel={true}
										fieldLabelText={transRef.t('workType')}
										value={state.workType}
										onChangeText={onChangeWorkType}
										isItRequired={true}
										inputBoxStyle={styles.workRateBoxStyle}
										textInputStyle={styles.workRateInput}
									/>
									<TextInputComponent
										showFieldLabel={true}
										fieldLabelText={transRef.t('workRate')}
										value={state.rate?.toString()}
										onChangeText={onChangeRate}
										keyboardType='number-pad'
										isItRequired={true}
										inputBoxStyle={styles.workRateBoxStyle}
										textInputStyle={styles.workRateInput}
										maxLength={10}
									/>
								</View>
								<View style={styles.workAreaDetails}>
									<TextInputComponent
										showFieldLabel={true}
										fieldLabelText={transRef.t('length')}
										value={state.length?.toString()}
										onChangeText={onChangeLength}
										keyboardType='number-pad'
										maxLength={10}
										isItRequired={true}
										textInputStyle={styles.workAreaInput}
										inputBoxStyle={styles.workAreaInputBox}
									/>
									<TextInputComponent
										showFieldLabel={true}
										fieldLabelText={transRef.t('width')}
										value={state.width?.toString()}
										onChangeText={onChangeWidth}
										keyboardType='number-pad'
										maxLength={10}
										isItRequired={true}
										textInputStyle={styles.workAreaInput}
										inputBoxStyle={styles.workAreaInputBox}
									/>
									<TextInputComponent
										showFieldLabel={true}
										fieldLabelText={transRef.t('height')}
										value={state.height?.toString()}
										onChangeText={onChangeHeight}
										keyboardType='number-pad'
										maxLength={10}
										textInputStyle={styles.workAreaInput}
										inputBoxStyle={styles.workAreaInputBox}
									/>
								</View>
								<View style={styles.workAreaDetails}>
									<TextInputComponent
										showFieldLabel={true}
										fieldLabelText={transRef.t('totalArea')}
										value={state.totalArea ? state.totalArea?.toString() : ''}
										// onChangeText={onChangeHeight}
										keyboardType='number-pad'
										maxLength={10}
										isItRequired={true}
										textInputStyle={styles.totalValueInput}
										inputBoxStyle={styles.totalValueBox}
										editable={false}
									/>
									<TextInputComponent
										showFieldLabel={true}
										fieldLabelText={transRef.t('totalAmount')}
										value={state.amount ? state.amount?.toString() : ''}
										// onChangeText={onChangeHeight}
										keyboardType='number-pad'
										maxLength={10}
										isItRequired={true}
										textInputStyle={styles.totalValueInput}
										inputBoxStyle={styles.totalValueBox}
										editable={false}
									/>
								</View>
								<ButtonComponent
									title={transRef.t('save')}
									onPressIn={params ? onPressUpdate : onPressSave}
									disabled={disableSave()}
									mainContainer={styles.buttonContainer}
								/>
							</View>
							: null
						}
					</View>
					<View style={styles.uiContainer}>
						<TouchableHighlight
							onPress={()=>onOpenCloseUI('showPaymentDetails')}
							style={styles.uiHeadingContainer}
						>
							<View style={styles.uiSubHeadingContainer}>
								<Text style={styles.uiHeading}>{transRef.t('paymentDetails')}</Text>
								<Entypo
									name={state.showPaymentDetails === true ?"chevron-up" :"chevron-down"}
									size={26} color="#002db3"
								/>
							</View>
						</TouchableHighlight>
						{state.showPaymentDetails === true
							? <View style={styles.uiElementContainer}>
								<View  style ={{flexDirection:'row', alignItems:'center'}}>
									<TextInputComponent
										showFieldLabel={true}
										fieldLabelText={transRef.t('workRate')}
										value={state.rate?.toString()}
										onChangeText={onChangeRate}
										keyboardType='number-pad'
										isItRequired={true}
										inputBoxStyle={styles.workRateBoxStyle}
										textInputStyle={styles.workRateInput}
										maxLength={10}
									/>
									<CommonDateTimePicker
										onDateChange={handleDateChange}
									/>
								</View>
								{/* <TextInputComponent
									showFieldLabel={true}
									fieldLabelText={transRef.t('discount')}
									value={state.discount?.toString()}
									onChangeText={onChangeDiscount}
									keyboardType='number-pad'
									maxLength={10}
									inputBoxStyle={styles.inputBoxStyle}
								/> */}
								<ButtonComponent
									title={transRef.t('save')}
									onPressIn={params ? onPressUpdate : onPressSave}
									disabled={disableSave()}
									mainContainer={styles.buttonContainer}
								/>
							</View>
							: null
						}
					</View>
				</ScrollView>
			</SafeAreaView>
		);
	}
}

export default AddUpdatePartyWorkDetails;