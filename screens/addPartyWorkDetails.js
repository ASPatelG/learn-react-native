import {View, Text, SafeAreaView} from 'react-native';
import {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

// import {addEmployeeData, changeSelectedLanguage} from '../redux/actions';

import {CommonHeaderComponent} from '../components/commonHeaderComponent';
import TextInputComponent from '../components/textInputComponent';
import {ButtonComponent} from '../components/buttonComponent';

import {styles} from './screens.styles/addPartyDetailsStyle';

const AddPartyWorkDetails = (props)=>{
	const transRef  = useSelector((state)=>state.transRef);
	const dispatchRefrence = useDispatch()		// To send the data in store
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [jobTitle, setJobTitle] = useState('');
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

	const onPressSave = ()=>{
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
		setJobTitle('');
		setSalary('');
		setEmail('');
		navigation.goBack();
	}

	return(
		<SafeAreaView style={styles.mainContainer}>
			<CommonHeaderComponent/>
			<Text style={styles.eployeeDetailsStyle}>{transRef.t('addPartyWork')}</Text>
			<TextInputComponent
				showFieldLabel={true}
				fieldLabelText={transRef.t('enterFirstName')}
				value={firstName}
				onChangeText={enteredText => setFirstName(enteredText)}
				maxLength={30}
				isItRequired={true}
			/>
			<TextInputComponent
				showFieldLabel={true}
				fieldLabelText={transRef.t('enterLastName')}
				value={lastName}
				onChangeText={enteredText => setLastName(enteredText)}
				maxLength={30}
			/>
			<TextInputComponent
				showFieldLabel={true}
				fieldLabelText={transRef.t('enterJobTitle')}
				value={jobTitle}
				onChangeText={enteredText => setJobTitle(enteredText)}
				maxLength={30}
				isItRequired={true}
			/>
			<TextInputComponent
				showFieldLabel={true}
				fieldLabelText={transRef.t('enterSalary')}
				value={salary}
				onChangeText={enteredText => onchangeSalary(enteredText)}
				keyboardType='number-pad'
				maxLength={10}
				isItRequired={true}
			/>
			<TextInputComponent
				showFieldLabel={true}
				fieldLabelText={transRef.t('enterEmail')}
				value={email}
				onChangeText={enteredText => setEmail(enteredText)}
				keyboardType='email-address'
				isItRequired={true}
			/>
			<ButtonComponent
				title={transRef.t('save')}
				onPressIn={onPressSave}
				disabled={disableSave()}
			/>
		</SafeAreaView>
	);
}

export default AddPartyWorkDetails;