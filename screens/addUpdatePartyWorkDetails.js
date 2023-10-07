import {View, Text, SafeAreaView, ScrollView, BackHandler} from 'react-native';
import {useState,  useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {CommonHeaderComponent} from '../components/commonHeaderComponent';
import TextInputComponent from '../components/textInputComponent';
import ButtonComponent from '../components/buttonComponent';
import {addPartyDetails, updatePartyDetails} from '../learnRedux/actions';

import {styles} from './screens.styles/addPartyDetailsStyle';

const AddUpdatePartyWorkDetails = (props)=>{
	const {route:{params}} = props;
	const transRef  = useSelector((state)=>state.transRef);
	const dispatchRefrence = useDispatch()		// To send the data in store
	const [partyDetails, setPartyDetails] = useState({
		firstName:'',
		lastName:'',
		mobileNumber:'',
		email:'',
		workType:'wall',
		rate:'',
		length:'',
		width:'',
		height:'',
		totalArea:'',
		amount:'',
		discount:''
	});
	const regularExpressionOnlyDigit = /^[0-9]+$/;
	const disableSave = ()=>{
		if(!partyDetails.firstName?.length || !partyDetails.mobileNumber || !partyDetails.rate || !partyDetails.length){
			return true;
		}
		else{
			return false;
		}
	}

	useEffect(() => {
		if(params){		// To set data according to party details
			const {partySomeDetails}  = params;
			const {discount, email, firstName, height, lastName, length, mobileNumber, rate, amount, totalArea, width, workType} = partySomeDetails;
			setPartyDetails(previous=>({...previous, discount, email, firstName, height, lastName, length, mobileNumber, rate, amount, totalArea, width, workType}));
		}

		const backAction = () => {
			const {navigation} = props;
			navigation.goBack()	// To close the app
			return true;
		};

		const backHandler = BackHandler.addEventListener(
			'hardwareBackPress',
			backAction,
		);

		// To remove event on onmount
		return () => backHandler.remove();

	}, []);

	const onChangeFirstName = (enteredText)=>{
		setPartyDetails((previous)=>({
			...previous,
			firstName:enteredText,
		}));
	}

	const onChangeLastName = (enteredText)=>{
		setPartyDetails((previous)=>({
			...previous,
			lastName:enteredText,
		}));
	}

	const onChangeMobileNumber = (enteredText)=>{
		if(regularExpressionOnlyDigit.test(enteredText) || enteredText === ''){
			setPartyDetails((previous)=>({
				...previous,
				mobileNumber:enteredText,
			}));
		}
		else{
			null
		}
	}

	const onChangeEmail = (enteredText)=>{
		setPartyDetails((previous)=>({
			...previous,
			email:enteredText,
		}));
	}

	const onChangeWorkType = (enteredText)=>{
		setPartyDetails((previous)=>({
			...previous,
			workType:enteredText,
		}));
	}

	const calculateAmount = (totalArea=1, rate=1)=>{
		totalArea = Number(totalArea);	// because it's possible string value
		rate = Number(rate);
		let calculatedAmount = totalArea * rate;
		//	To round the value
		calculatedAmount = Math.round(calculatedAmount*100)/100;
		return calculatedAmount;
	}

	const calculateTotalArea = (length=1, width=1, height=1)=>{
		length = Number(length);	// because it's possible string value
		width = Number(width);
		height = Number(height);
		if(!height){	// Since height is optional
			height = 1;
		}
		let calculatedTotalArea = length * width * height;
		//	To round the value
		calculatedTotalArea = Math.round(calculatedTotalArea*100)/100;
		return calculatedTotalArea;
	}

	const onChangeRate = (enteredText)=>{
		if(regularExpressionOnlyDigit.test(enteredText) || enteredText === ''){
			const calculatedAmount = calculateAmount(partyDetails.totalArea, enteredText);
			setPartyDetails((previous)=>({
				...previous,
				rate:enteredText,
				amount:calculatedAmount,
			}));
		}
		else{
			null
		}
	}

	const onChangeLength = (enteredText)=>{
		if(regularExpressionOnlyDigit.test(enteredText) || enteredText === ''){
			const calculatedTotalArea = calculateTotalArea(enteredText, partyDetails.width, partyDetails.height);
			const calculatedAmount = calculateAmount(calculatedTotalArea, partyDetails.rate);
			setPartyDetails((previous)=>({
				...previous,
				totalArea:calculatedTotalArea,
				amount:calculatedAmount,
				length:enteredText
			}));
		}
		else{
			null
		}
	}

	const onChangeWidth = (enteredText)=>{
		if(regularExpressionOnlyDigit.test(enteredText) || enteredText === ''){
			const calculatedTotalArea = calculateTotalArea(partyDetails.length, enteredText, partyDetails.height);
			const calculatedAmount = calculateAmount(calculatedTotalArea, partyDetails.rate);
			setPartyDetails((previous)=>({
				...previous,
				totalArea:calculatedTotalArea,
				amount:calculatedAmount,
				width:enteredText
			}));
		}
		else{
			null
		}
	}

	const onChangeHeight = (enteredText)=>{
		if(regularExpressionOnlyDigit.test(enteredText) || enteredText === ''){
			const calculatedTotalArea = calculateTotalArea(partyDetails.length, partyDetails.width, enteredText);
			const calculatedAmount = calculateAmount(calculatedTotalArea, partyDetails.rate);
			setPartyDetails((previous)=>({
				...previous,
				totalArea:calculatedTotalArea,
				amount:calculatedAmount,
				height:enteredText
			}));
		}
		else{
			null
		}
	}

	const onChangeDiscount = (enteredText)=>{
		if(regularExpressionOnlyDigit.test(enteredText) || enteredText === ''){
			setPartyDetails((previous)=>({
				...previous,
				discount:enteredText
			}));
		}
		else{
			null
		}
	}

	const onPressSave = ()=>{
		const {navigation} = props;
		dispatchRefrence(addPartyDetails({partyData:partyDetails}));
		navigation.goBack();
	}

	const onPressUpdate = ()=>{
		const {navigation} = props;
		dispatchRefrence(updatePartyDetails({partyData:partyDetails, activeIndex:params.activeIndex}));
		navigation.goBack();
	}

	return(
		<SafeAreaView style={styles.mainContainer}>
			<CommonHeaderComponent/>
			<Text style={styles.eployeeDetailsStyle}>{transRef.t('addPartyWork')}</Text>
			<ScrollView>
				<TextInputComponent
					showFieldLabel={true}
					fieldLabelText={transRef.t('enterFirstName')}
					value={partyDetails.firstName}
					onChangeText={onChangeFirstName}
					maxLength={30}
					isItRequired={true}
					inputBoxStyle={styles.inputBoxStyle}
				/>
				<TextInputComponent
					showFieldLabel={true}
					fieldLabelText={transRef.t('enterLastName')}
					value={partyDetails.lastName}
					onChangeText={onChangeLastName}
					maxLength={30}
					inputBoxStyle={styles.inputBoxStyle}
				/>
				<TextInputComponent
					showFieldLabel={true}
					fieldLabelText={transRef.t('enterMobilNumber')}
					value={partyDetails.mobileNumber}
					onChangeText={onChangeMobileNumber}
					maxLength={10}
					isItRequired={true}
					inputBoxStyle={styles.inputBoxStyle}
					keyboardType='number-pad'
				/>
				<TextInputComponent
					showFieldLabel={true}
					fieldLabelText={transRef.t('enterEmail')}
					value={partyDetails.email}
					onChangeText={onChangeEmail}
					keyboardType='email-address'
					inputBoxStyle={styles.inputBoxStyle}
					maxLength={80}
				/>
				<View style={styles.workAreaDetails}>
					<TextInputComponent
						showFieldLabel={true}
						fieldLabelText={transRef.t('workType')}
						value={partyDetails.workType}
						onChangeText={onChangeWorkType}
						isItRequired={true}
						inputBoxStyle={styles.workRateBoxStyle}
						textInputStyle={styles.workRateInput}
					/>
					<TextInputComponent
						showFieldLabel={true}
						fieldLabelText={transRef.t('workRate')}
						value={partyDetails.rate}
						onChangeText={onChangeRate}
						keyboardType='number-pad'
						isItRequired={true}
						inputBoxStyle={styles.workRateBoxStyle}
						textInputStyle={styles.workRateInput}
						maxLength={10}
                   />
				</View>
				<Text style={styles.workAreaHeading}>{transRef.t('workArea')}</Text>
				<View style={styles.workAreaDetails}>
					<TextInputComponent
						showFieldLabel={true}
						fieldLabelText={transRef.t('length')}
						value={partyDetails.length}
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
						value={partyDetails.width}
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
						value={partyDetails.height}
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
						value={partyDetails.totalArea ?partyDetails.totalArea.toString() :''}
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
						value={partyDetails.amount ?partyDetails.amount.toString() :''}
						// onChangeText={onChangeHeight}
						keyboardType='number-pad'
						maxLength={10}
						isItRequired={true}
						textInputStyle={styles.totalValueInput}
						inputBoxStyle={styles.totalValueBox}
						editable={false}  
                    />
				</View>
				<TextInputComponent
					showFieldLabel={true}
					fieldLabelText={transRef.t('enterDiscount')}
					value={partyDetails.discount}
					onChangeText={onChangeDiscount}
					keyboardType='number-pad'
					maxLength={10}
					inputBoxStyle={styles.inputBoxStyle}
				/>
			</ScrollView>
			<ButtonComponent
				title={transRef.t(params ?'update' :'save')}
				onPressIn={params ?onPressUpdate :onPressSave}
				disabled={disableSave()}
			/>
		</SafeAreaView>
	);
}

export default AddUpdatePartyWorkDetails;