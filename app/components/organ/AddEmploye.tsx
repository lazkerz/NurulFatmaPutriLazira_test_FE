'use client'

import React, { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../GlobalRedux/store";
// import { addEmployee } from '../../GlobalRedux/Features/employee/employeeService'
import { addEmployeeAsync } from "@/app/GlobalRedux/Features/employee/employeeSlice";
import EmployeeForm from "../mollecul/EmployeeForm";
import Button from "../atom/Button";
import Swal from 'sweetalert2';


const AddEmployee: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    joinDate: new Date(),
    job: '',
    shift: '',
    status: false,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // Dispatch async thunk untuk menambahkan karyawan
      await dispatch(addEmployeeAsync(formData));
      
      // Reset form setelah berhasil menambahkan karyawan
      setFormData({
        name: '',
        joinDate: new Date(),
        job: '',
        shift: '',
        status: false,
      });

      // Tampilkan notifikasi sukses
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Employee data has been added successfully!',
        showConfirmButton: false,
        timer: 1000,
        didClose: () => {
          window.location.href = ''; // Redirect to employee table page
        }
      });
    } catch (error) {
      // Tangani kesalahan jika terjadi
      console.error('Error:', error);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-semibold text-sky-500 mx-10 my-5">Add Employee</h1>
      <form onSubmit={handleSubmit} className="mx-10">
        <div className="space-y-6">
          <EmployeeForm formData={formData} setFormData={setFormData} />
          <Button type="submit">Add</Button> {/* Ganti <Button> menjadi tombol submit */}
        </div>
      </form>
    </>
  );
};

export default AddEmployee;
