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
  status: boolean
  id?: string;
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

export const updateEmployeeById = async (id: string, newData: Partial<EmployeePayload>): Promise<EmployeePayload> => {
  try {
    // Mengambil data karyawan yang akan diperbarui
    const response: AxiosResponse<EmployeePayload> = await api.get(`/employees/${id}`);
    const employeeToUpdate: EmployeePayload = response.data;

    // Menggabungkan data baru dengan data karyawan yang ada
    const updatedEmployee: EmployeePayload = { ...employeeToUpdate, ...newData };

    // Mengirim permintaan PUT untuk memperbarui data karyawan ke server
    await api.put<void>(`/employees/${id}`, updatedEmployee);

    return updatedEmployee; // Mengembalikan data karyawan yang telah diperbarui
  } catch (error) {
    handleError(error);
    throw new Error('Failed to update employee data');
  }
};


export const deleteEmployee = async (id: string): Promise<void> => {
  try {
    // Kirim permintaan DELETE ke endpoint /employees
    await api.delete(`/employees/${id}`);
    console.log('Employee deleted successfully');
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


function handleError(error: unknown) {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    console.error('Error:', axiosError.response?.data || axiosError.message);
  } else {
    console.error('Error:', error);
  }
}

