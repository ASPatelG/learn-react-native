import Toast from 'react-native-root-toast';
import {constantValues} from '../staticDataFiles/constantValues';

export const crossPlatformToast = (
		message,
		duration = constantValues.crossPlatformToastDuration,
		backgroundColor = constantValues.crossPlatformToastBackground,
		textColor = constantValues.crossPlatformToastTextColor,
		opacity = constantValues.crossPlatformToastOpacity,
	    position = constantValues.crossPlatformToastPosition,
	    shadow = constantValues.crossPlatformToastShadow,
	    animation = constantValues.crossPlatformToastAnimation,
	    hideOnPress = constantValues.crossPlatformToastHideOnPress,
	    delay = constantValues.crossPlatformToastDelay
	) => {
	/*
		this function is used to show the toast message in android and ios platform both
	*/
	Toast.show(message, {
	    duration:duration,
	    position:position,
	    shadow:shadow,
	    animation:animation,
	    hideOnPress:hideOnPress,
	    delay:delay,
	    backgroundColor:backgroundColor,
	    textColor:textColor,
	    opacity:opacity,
	});
}