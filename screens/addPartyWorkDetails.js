import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import {useState, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';

// import {addEmployeeData, changeSelectedLanguage} from '../redux/actions';

import {CommonHeaderComponent} from '../components/commonHeaderComponent';
import TextInputComponent from '../components/textInputComponent';
import ButtonComponent from '../components/buttonComponent';

import {styles} from './screens.styles/addPartyDetailsStyle';

const AddPartyWorkDetails = (props)=>{
	const transRef  = useSelector((state)=>state.transRef);
	const dispatchRefrence = useDispatch()		// To send the data in store
	const [partyDetails, setPartyDetails] = useState({
		firstName:'',
		lastName:'',
		mobileNumber:'',
		email:'',
		workType:'wall',
		rate:'', length:'',
		width:'',
		height:'',
		totalArea:'',
		totalAmount:'',
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

	const onChangeFirstName = useCallback((enteredText)=>{
		setPartyDetails((previous)=>({
			...previous,
			firstName:enteredText,
		}));
	}, []);

	const onChangeLastName = useCallback((enteredText)=>{
		setPartyDetails((previous)=>({
			...previous,
			lastName:enteredText,
		}));
	}, []);

	const onChangeMobileNumber = useCallback((enteredText)=>{
		if(regularExpressionOnlyDigit.test(enteredText) || enteredText === ''){
			setPartyDetails((previous)=>({
				...previous,
				mobileNumber:enteredText,
			}));
		}
		else{
			null
		}
	}, []);

	const onChangeEmail = useCallback((enteredText)=>{
		setPartyDetails((previous)=>({
			...previous,
			email:enteredText,
		}));
	}, []);

	const onChangeWorkType = useCallback((enteredText)=>{
		setPartyDetails((previous)=>({
			...previous,
			workType:enteredText,
		}));
	}, []);

	const onChangeRate = useCallback((enteredText)=>{
		if(regularExpressionOnlyDigit.test(enteredText) || enteredText === ''){
			const calculatedTotalAmount = Number(partyDetails.totalArea) * Number(enteredText);
			setPartyDetails((previous)=>({
				...previous,
				rate:enteredText,
				totalAmount:calculatedTotalAmount,
			}));
		}
		else{
			null
		}
	}, []);

	const onChangeLength = useCallback((enteredText)=>{
		if(regularExpressionOnlyDigit.test(enteredText) || enteredText === ''){
			let height = Number(partyDetails.height);

			if(height <= 0 || height === ''){
				height = 1;
			}

			const calculatedTotalArea = Number(enteredText) * Number(partyDetails.width) * height;
			const calculatedTotalAmount = calculatedTotalArea * Number(partyDetails.rate);
			setPartyDetails((previous)=>({
				...previous,
				totalArea:calculatedTotalArea,
				totalAmount:calculatedTotalAmount,
				length:enteredText
			}));
		}
		else{
			null
		}
	}, []);

	const onChangeWidth = useCallback((enteredText)=>{
		if(regularExpressionOnlyDigit.test(enteredText) || enteredText === ''){

			let height = Number(partyDetails.height);

			if(height <= 0 || height === ''){
				height = 1;
			}

			const calculatedTotalArea = Number(enteredText) * Number(partyDetails.length) * height;
			const calculatedTotalAmount = calculatedTotalArea * Number(partyDetails.rate);
			setPartyDetails((previous)=>({
				...previous,
				totalArea:calculatedTotalArea,
				totalAmount:calculatedTotalAmount,
				width:enteredText
			}));
		}
		else{
			null
		}
	}, []);

	const onChangeHeight = useCallback((enteredText)=>{
		if(regularExpressionOnlyDigit.test(enteredText) || enteredText === ''){
			let height = Number(enteredText);

			if(height <= 0 || height === ''){
				height = 1;
			}

			const calculatedTotalArea = height * Number(partyDetails.width) * Number(partyDetails.length);
			const calculatedTotalAmount = calculatedTotalArea * Number(partyDetails.rate);
			setPartyDetails((previous)=>({
				...previous,
				totalArea:calculatedTotalArea,
				totalAmount:calculatedTotalAmount,
				height:enteredText
			}));
		}
		else{
			null
		}
	}, []);

	const onChangeDiscount = useCallback((enteredText)=>{
		if(regularExpressionOnlyDigit.test(enteredText) || enteredText === ''){
			setPartyDetails((previous)=>({
				...previous,
				discount:enteredText
			}));
		}
		else{
			null
		}
	}, []);

	const onPressSave = useCallback(()=>{
		const {navigation} = props;
		dispatchRefrence(addEmployeeData({}));		// Passed data will be in payload
		navigation.goBack();
	}, []);

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
						value={partyDetails.totalArea.toString()}
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
						value={partyDetails.totalAmount.toString()}
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
				title={transRef.t('save')}
				onPressIn={onPressSave}
				disabled={disableSave()}
			/>
		</SafeAreaView>
	);
}

export default AddPartyWorkDetails;