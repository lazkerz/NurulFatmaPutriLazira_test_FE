'user client';

import { createSlice, createAsyncThunk, ThunkDispatch, Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import type { RootState } from "../../store";
import axios from 'axios';


export interface EmployeState{
    id: number;
    name: string;
    joinDate: Date;
    job: string;
    shift: string;
    status: boolean;
}
const initialState: EmployeState= {
    id: 0 ,
    name: "",
    joinDate: new Date(),
    job: "",
    shift: "",
    status: true,
}

interface AddEmployeePayload {
    name: string;
    joinDate: Date;
    job: string;
    shift: string;
    status: boolean;
}

// Definisikan fungsi async untuk menambahkan karyawan baru ke server
export const addEmployeeAsync = createAsyncThunk<any, AddEmployeePayload>(
    'employee/addEmployee',
    async (payload: AddEmployeePayload) => {
      const response = await axios.post('/api/employees', payload);
      return response.data;
    }
  );
  
  export const addEmployee = (payload: AddEmployeePayload) => async (dispatch: any) => {
      try {
        await dispatch(addEmployeeAsync(payload));
      } catch (error) {
        console.error('Error:', error);
      }
  };
  
export const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        // Tidak diperlukan lagi karena kita menggunakan createAsyncThunk
    },
    extraReducers: (builder) => {
        builder.addCase(addEmployeeAsync.fulfilled, (state, action) => {
            // Tambahkan karyawan baru ke state setelah berhasil
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.joinDate = action.payload.joinDate;
            state.job = action.payload.job;
            state.shift = action.payload.shift;
            state.status = action.payload.status;
        });
    },
})

// export const { add } = employeeSlice.actions;

export default employeeSlice.reducer;