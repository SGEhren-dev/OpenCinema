import { IState } from "Interfaces";

// Linking this so I dont forget where I found this
// https://stackoverflow.com/questions/40291084/use-reselect-selector-with-parameters
export function selectorWithArg<T>() {
	return (state: IState, value: T) => (value);
}
