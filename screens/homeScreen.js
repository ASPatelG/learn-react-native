import {useState, useEffect} from 'react';
import {View, BackHandler, FlatList, Pressable} from 'react-native';
import {useSelector} from 'react-redux';

import { FontAwesome5 } from '@expo/vector-icons';

import {dataStore} from '../learnRedux/dataStore';
import {CommonHeaderComponent} from '../components/commonHeaderComponent';
import DropdownPickerComponent from '../components/dropdownPickerComponent';
import ButtonComponent from '../components/buttonComponent';
import PartyShortDetails from '../components/PartyShortDetails';
import {UserShortDetails} from '../components/userShortDetails';
import PartiesWorkTableHeader from '../components/partiesWorkTableHeader';

import {styles} from './screens.styles/homeScreenStyles';
import {constantValues} from '../staticDataFiles/constantValues';

import {generateWorkPaymentPDF} from '../javaScriptFunction/generateWorkPaymentPDF';

const HomeScreen = (props)=>{ 	// props used to get user props and default props
	/* Used to show ui till the app is loading */

	const [workType, setPartyType] = useState(constantValues.workTypes[0].value);
	const allPartiesWorkArray = useSelector((state)=>state.partyDetails);
	const transRef  = useSelector((state)=>state.transRef);

	onchanDropDownValue = (itemKey, itemValue)=>{
		setPartyType(itemKey);
	}

	useEffect(() => {
		const backAction = () => {
			BackHandler.exitApp()	// To close the app
			return true;
		};

		const backHandler = BackHandler.addEventListener(
			'hardwareBackPress',
			backAction,
		);

		// To remove event on onmount
		return () => backHandler.remove();

	}, []);

	const onPressAddWork = ()=>{
		const {navigation} = props;
		navigation.navigate('AddUpdatePartyWorkDetails');
	}

	const onPressPDF = (nativeEvent)=>{
		generateWorkPaymentPDF(allPartiesWorkArray);
	}

	return(
		<View style={styles.mainContainer}>
			<CommonHeaderComponent/>
			<UserShortDetails/>
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
					<FontAwesome5 name="file-download" size={50} color="#F5EC42"/>
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
			/>
		</View>
	);
}

export default HomeScreen;