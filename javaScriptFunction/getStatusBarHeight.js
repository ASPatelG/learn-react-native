import Constants from 'expo-constants';
	
export const getStatusBarHeight = ()=> {
	const statusBarHeight = Constants.statusBarHeight;
	if(statusBarHeight){
		return statusBarHeight;
	}
	else{
		return 0;
	}
}
