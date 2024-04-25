'user client';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addEmployee as addEmployeeService} from './employeeService';

interface EmployeeState {
  name: string;
  joinDate: Date;
  job: string;
  shift: string;
  status: boolean;
}

const initialState: EmployeeState = {
  name: "",
  joinDate: new Date(),
  job: "",
  shift: "",
  status: true,
}

export const addEmployeeAsync = createAsyncThunk<any, EmployeeState>(
  'employee/addEmployee',
  async (employeeData: EmployeeState) => {
    return addEmployeeService(employeeData);
  }
);

// export const updateEmployeeByIdAsync = createAsyncThunk<any, {id: number, newData: Partial<EmployeeState>}>(
//   'employee/updateEmployeeById',
//   async ({id, newData}: {id: number, newData: Partial<EmployeeState>}) => {
//     return updateEmployeeService(id, newData);
//   }
// );

export const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    // Tidak diperlukan lagi karena kita menggunakan createAsyncThunk
  },
  extraReducers: (builder) => {
    builder
      .addCase(addEmployeeAsync.fulfilled, (state, action) => {
        // Memperbarui state dengan data baru setelah berhasil menambahkan karyawan
        // Pastikan respons dari addEmployeeService sesuai dengan struktur EmployeeState
        state = action.payload;
      })
    //   .addCase(updateEmployeeByIdAsync.fulfilled, (state, action) => {
    //     // Memperbarui state dengan data baru setelah berhasil memperbarui karyawan
    //     // Pastikan respons dari updateEmployeeService sesuai dengan struktur EmployeeState
    //     state = action.payload;
    //   });
  },
})

export default employeeSlice.reducer;
