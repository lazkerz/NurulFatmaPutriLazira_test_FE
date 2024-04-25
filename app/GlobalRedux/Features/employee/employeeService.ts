import axios, { AxiosError, AxiosResponse } from 'axios';

// Tentukan baseURL server JSON
const baseURL = 'http://localhost:8000';

// Buat instance axios dengan baseURL yang telah ditentukan
export const api = axios.create({
  baseURL: baseURL,
});


// Definisikan tipe data untuk payload karyawan
interface EmployeePayload {
  name: string;
  joinDate: Date;
  job: string;
  shift: string;
  status: boolean;
}

interface EmployeePayloadId extends EmployeePayload {
  id: number;
}

// Fungsi untuk menambahkan karyawan baru
export const addEmployee = async (employeeData: EmployeePayload): Promise<void> => {
  try {
    // Kirim permintaan POST ke endpoint /employees
    const response: AxiosResponse = await api.post('/employees', employeeData);
    // Cetak respons jika berhasil
    console.log('Response:', response.data);
  } catch (error) {
    // Tangani kesalahan jika terjadi
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error('Error:', axiosError.response?.data || axiosError.message);
    } else {
      console.error('Error:', error);
    }
  }
};

export const updateEmployeeById = async (id: number, newData: Partial<EmployeePayload>): Promise<void> => {
  try {
    // Ambil semua data karyawan dari server
    const response: AxiosResponse<EmployeePayloadId[]> = await api.get('/employees');
    const allEmployees: EmployeePayloadId[] = response.data;

    // Temukan data karyawan yang ingin Anda perbarui berdasarkan ID
    const updatedEmployees = allEmployees.map(employee => {
      if (employee.id === id) {
        return { ...employee, ...newData };
      } else {
        return employee;
      }
    });

    // Kirimkan semua data karyawan yang telah diperbarui kembali ke server
    await api.put<void>('/employees', updatedEmployees);

    console.log('Data updated successfully.');
  } catch (error) {
    // Tangani kesalahan jika terjadi
    handleError(error);
  }
};

function handleError(error: unknown) {
  throw new Error('Function not implemented.');
}

