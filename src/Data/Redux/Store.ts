import { configureStore, EnhancedStore, ThunkDispatch } from "@reduxjs/toolkit";
import { AnyAction, Reducer } from "redux";
import { IState } from "../Interfaces";

export let store: EnhancedStore;
export type AsyncDispatch = ThunkDispatch<IState, any, AnyAction>;

export function initializeStore(reducer: Reducer) {
	store = configureStore({
		reducer
	});
}
