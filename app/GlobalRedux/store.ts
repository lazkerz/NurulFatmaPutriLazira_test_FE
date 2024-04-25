// src/app/store.ts
'use client'

import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './Features/employee/employeeSlice';

export const store = configureStore({
    reducer: {
        employee: employeeReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
