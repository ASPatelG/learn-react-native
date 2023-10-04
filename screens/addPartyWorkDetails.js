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
		rate:'',
		length:'',
		width:'',
		height:'',
		totalArea:'',
		totalAmount:'',
		discount:'',
	});
	const regularExpressionOnlyDigit = /^[0-9]+$/;
	console.log('partyDetails:::::::::::::::::::::::');
	const disableSave = ()=>{
		if(!partyDetails?.firstName?.length || !partyDetails?.mobileNumer || !partyDetails?.rate || !partyDetails?.length){
			return true;
		}
		else{
			return false;
		}
	}

	const setFirstName = useCallback((enteredText)=>{
		setPartyDetails({...partyDetails, firstName:enteredText});
	}, [partyDetails.firstName]);

	const setLastName = useCallback((enteredText)=>{
		setPartyDetails({...partyDetails, lastName:enteredText});
	}, [partyDetails.setLastName]);

	const onChangeMobileNumber = useCallback((enteredText)=>{
		if(regularExpressionOnlyDigit.test(enteredText) || enteredText === ''){
			setPartyDetails({...partyDetails, mobileNumber:enteredText});
		}
		else{
			null
		}
	}, [partyDetails.mobileNumer]);

	const setEmail = useCallback((enteredText)=>{
		setPartyDetails({...partyDetails, email:enteredText});
	}, [partyDetails.email]);

	const setWorkType = useCallback((enteredText)=>{
		setPartyDetails({...partyDetails, workType:enteredText});
	}, [partyDetails.workType]);

	const setRate = useCallback((enteredText)=>{
		setPartyDetails({...partyDetails, rate:enteredText});
	}, [partyDetails.rate]);

	const setLength = useCallback((enteredText)=>{
		if(regularExpressionOnlyDigit.test(enteredText) || enteredText === ''){
			setPartyDetails({...partyDetails, length:enteredText});
		}
		else{
			null
		}
	}, [partyDetails.length]);

	const setWidth = useCallback((enteredText)=>{
		if(regularExpressionOnlyDigit.test(enteredText) || enteredText === ''){
			setPartyDetails({...partyDetails, width:enteredText});
		}
		else{
			null
		}
	}, [partyDetails.width]);

	const setHeight = useCallback((enteredText)=>{
		if(regularExpressionOnlyDigit.test(enteredText) || enteredText === ''){
			setPartyDetails({...partyDetails, height:enteredText});
		}
		else{
			null
		}
	}, [partyDetails.height]);

	const setDiscount = useCallback((enteredText)=>{
		if(regularExpressionOnlyDigit.test(enteredText) || enteredText === ''){
			setPartyDetails({...partyDetails, discount:enteredText});
		}
		else{
			null
		}
	}, [partyDetails.height]);

	const onPressSave = useCallback(()=>{
		const {navigation} = props;
		dispatchRefrence(addEmployeeData({partyDetails:partyDetails}));		// Passed data will be in payload
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
					onChangeText={setFirstName}
					maxLength={30}
					isItRequired={true}
					inputBoxStyle={styles.inputBoxStyle}
				/>
				<TextInputComponent
					showFieldLabel={true}
					fieldLabelText={transRef.t('enterLastName')}
					value={partyDetails.lastName}
					onChangeText={setLastName}
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
					onChangeText={enteredText => setEmail(enteredText)}
					keyboardType='email-address'
					isItRequired={true}
					inputBoxStyle={styles.inputBoxStyle}
					maxLength={80}
				/>
				<View style={styles.workAreaDetails}>
					<TextInputComponent
						showFieldLabel={true}
						fieldLabelText={transRef.t('workType')}
						value={partyDetails.workType}
						onChangeText={enteredText => setWorkType(enteredText)}
						keyboardType='email-address'
						isItRequired={true}
						inputBoxStyle={styles.workRateBoxStyle}
						textInputStyle={styles.workRateInput}
					/>
					<TextInputComponent
						showFieldLabel={true}
						fieldLabelText={transRef.t('workRate')}
						value={partyDetails.rate}
						onChangeText={enteredText => setRate(enteredText)}
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
						onChangeText={enteredText => setLength(enteredText)}
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
						onChangeText={enteredText => setWidth(enteredText)}
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
						onChangeText={enteredText => setHeight(enteredText)}
						keyboardType='number-pad'
						maxLength={10}
						isItRequired={true}
						textInputStyle={styles.workAreaInput}
						inputBoxStyle={styles.workAreaInputBox}
					/>
				</View>
				<View style={styles.workAreaDetails}>
					<TextInputComponent
						showFieldLabel={true}
						fieldLabelText={transRef.t('totalArea')}
						value={partyDetails.totalArea}
						onChangeText={enteredText => onchangeSalary(enteredText)}
						keyboardType='number-pad'
						maxLength={10}
						isItRequired={true}
						textInputStyle={styles.totalValueInput}
						inputBoxStyle={styles.totalValueBox}
					/>
					<TextInputComponent
						showFieldLabel={true}
						fieldLabelText={transRef.t('totalAmount')}
						value={partyDetails.totalAmount}
						onChangeText={enteredText => onchangeSalary(enteredText)}
						keyboardType='number-pad'
						maxLength={10}
						isItRequired={true}
						textInputStyle={styles.totalValueInput}
						inputBoxStyle={styles.totalValueBox}
					/>
				</View>
				<TextInputComponent
					showFieldLabel={true}
					fieldLabelText={transRef.t('enterDiscount')}
					value={partyDetails.discount}
					onChangeText={enteredText => setDiscount(enteredText)}
					keyboardType='number-pad'
					maxLength={10}
					isItRequired={true}
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