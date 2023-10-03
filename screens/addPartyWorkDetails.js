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
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [mobileNumber, setMobileNumber] = useState('');
	const [salary, setSalary] = useState('');
	const [email, setEmail] = useState('');

	const disableSave = ()=>{
		if(!firstName?.length || !jobTitle || !salary || !email){
			return true;
		}
		else{
			return false;
		}
	}

	const onchangeSalary = (enteredText)=>{
		const regularExpression = /^[0-9]+$/;
		if(regularExpression.test(enteredText) || enteredText === ''){
			setSalary(enteredText);
		}
		else{
			null
		}
	}

	const onPressSave = useCallback(()=>{
		const {navigation} = props;
		dispatchRefrence(addEmployeeData({employeeInfromation:{
			firstName,	// Since if we want to use same name of key we can use like this {name}
			lastName,
			jobTitle,
			salary,
			email,
		}}));		// Passed data will be in payload
		setFirstName('');
		setLastName('');
		setMobileNumber('');
		setSalary('');
		setEmail('');
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
					value={firstName}
					onChangeText={enteredText => setFirstName(enteredText)}
					maxLength={30}
					isItRequired={true}
					inputBoxStyle={styles.inputBoxStyle}
				/>
				<TextInputComponent
					showFieldLabel={true}
					fieldLabelText={transRef.t('enterLastName')}
					value={lastName}
					onChangeText={enteredText => setLastName(enteredText)}
					maxLength={30}
					inputBoxStyle={styles.inputBoxStyle}
				/>
				<TextInputComponent
					showFieldLabel={true}
					fieldLabelText={transRef.t('enterMobilNumber')}
					value={mobileNumber}
					onChangeText={enteredText => setMobileNumber(enteredText)}
					maxLength={10}
					isItRequired={true}
					inputBoxStyle={styles.inputBoxStyle}
					keyboardType='number-pad'
				/>
				<TextInputComponent
					showFieldLabel={true}
					fieldLabelText={transRef.t('enterEmail')}
					value={email}
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
						value={email}
						onChangeText={enteredText => setEmail(enteredText)}
						keyboardType='email-address'
						isItRequired={true}
						inputBoxStyle={styles.workRateBoxStyle}
						textInputStyle={styles.workRateInput}
						maxLength={20}
					/>
					<TextInputComponent
						showFieldLabel={true}
						fieldLabelText={transRef.t('workRate')}
						value={email}
						onChangeText={enteredText => setEmail(enteredText)}
						keyboardType='email-address'
						isItRequired={true}
						inputBoxStyle={styles.workRateBoxStyle}
						textInputStyle={styles.workRateInput}
						maxLength={20}
					/>
				</View>
				<Text style={styles.workAreaHeading}>{transRef.t('workArea')}</Text>
				<View style={styles.workAreaDetails}>
					<TextInputComponent
						showFieldLabel={true}
						fieldLabelText={transRef.t('length')}
						value={salary}
						onChangeText={enteredText => onchangeSalary(enteredText)}
						keyboardType='number-pad'
						maxLength={10}
						isItRequired={true}
						textInputStyle={styles.workAreaInput}
						inputBoxStyle={styles.workAreaInputBox}
					/>
					<TextInputComponent
						showFieldLabel={true}
						fieldLabelText={transRef.t('width')}
						value={salary}
						onChangeText={enteredText => onchangeSalary(enteredText)}
						keyboardType='number-pad'
						maxLength={10}
						isItRequired={true}
						textInputStyle={styles.workAreaInput}
						inputBoxStyle={styles.workAreaInputBox}
					/>
					<TextInputComponent
						showFieldLabel={true}
						fieldLabelText={transRef.t('height')}
						value={salary}
						onChangeText={enteredText => onchangeSalary(enteredText)}
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
						value={salary}
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
						value={salary}
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
					value={salary}
					onChangeText={enteredText => onchangeSalary(enteredText)}
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