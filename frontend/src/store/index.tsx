"use client";
import { configureStore } from "@reduxjs/toolkit";
import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import ordersReducer from "@/store/slices/ordersSlice";
import uiReducer from "@/store/slices/uiSlice";

export const store = configureStore({
    reducer: {
        orders: ordersReducer,
        ui: uiReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export function StoreProvider({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
}