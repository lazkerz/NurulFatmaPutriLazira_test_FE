import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addEmployee as addEmployeeService, updateEmployeeById as updateEmployeeService, deleteEmployee as deleteEmployeeService} from './employeeService';

interface EmployeeState {
  name: string;
  joinDate: Date;
  job: string;
  shift: string;
  status: boolean
  id?: string;
}


const initialState: EmployeeState[] = [];

export const addEmployeeAsync = createAsyncThunk<any, EmployeeState>(
  'employee/addEmployee',
  async (employeeData: EmployeeState) => {
    return addEmployeeService(employeeData);
  }
);

export const updateEmployeeByIdAsync = createAsyncThunk<any, {id: string, newData: Partial<EmployeeState>}>(
  'employee/updateEmployeeById',
  async ({id, newData}: {id: string, newData: Partial<EmployeeState>}) => {
    // Memanggil updateEmployeeService dan menangani respons
    const updatedEmployee = await updateEmployeeService(id, newData);
    // Mengembalikan data karyawan yang telah diperbarui
    return updatedEmployee;
  }
);

export const deleteEmployeeByIdAsync = createAsyncThunk<any, string>(
  'employee/deleteEmployeeById',
  async (id: string) => {
    return deleteEmployeeService(id);
  }
);


export const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(addEmployeeAsync.fulfilled, (state, action) => {
        state.push(action.payload); // Menambahkan karyawan baru ke state
      })
      .addCase(updateEmployeeByIdAsync.fulfilled, (state, action) => {
        const updatedEmployeeIndex = state.findIndex(employee => employee.id === action.payload.id);
        if (updatedEmployeeIndex !== -1) {
          state[updatedEmployeeIndex] = { ...state[updatedEmployeeIndex], ...action.payload };
        }
      })
      .addCase(deleteEmployeeByIdAsync.fulfilled, (state, action) => {
          // Menghapus karyawan dari state berdasarkan ID yang diberikan
          const indexToDelete = state.findIndex(employee => employee.id === action.payload);
          if (indexToDelete !== -1) {
            state.splice(indexToDelete, 1);
          }
      });
  },
})

export default employeeSlice.reducer;
