"use client"

import { useRouter } from 'next/router';
import { useEffect, useState } from "react"
import EmployeeForm from "@/app/components/mollecul/EmployeeForm";
import Button from "@/app/components/atom/Button";
import Swal from "sweetalert2";
import { updateEmployeeById } from "@/app/GlobalRedux/Features/employee/employeeService";

interface DataEmployee {
    id: number;
    name: string;
    joinDate: Date;
    job: string;
    shift: string;
    status: boolean;
  }

const EmployeesId = () => {
    const router = useRouter();
    const { id } = router.query;

    const [formData, setFormData] = useState({
        name: '',
        joinDate: new Date(),
        job: '',
        shift: '',
        status: false,
      });
    
    const employeeId = id ? parseInt(id as string, 10) : 0;
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
          await updateEmployeeById(employeeId, formData); // Mengirimkan id karyawan sebagai argumen pertama
          setFormData({
            name: '',
            joinDate: new Date(),
            job: '',
            shift: '',
            status: false,
          });
      
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Employee data has been updated successfully!',
            showConfirmButton: false,
            timer: 1000,
            didClose: () => {
              window.location.href = ''; // Redirect to employee table page
            }
          });
        } catch (error) {
          console.error('Error:', error);
        }
      };
      
    

    return(
        <>
        <h1 className="text-3xl font-semibold text-sky-500 mx-10 my-5">Update Employee</h1>
        <form method="post" onSubmit={handleSubmit} className="mx-10">
            <div className="space-y-6">
            <EmployeeForm formData={formData} setFormData={setFormData} />
            <Button>Update</Button>
            </div>
        </form>
        </>
    )
}

export default EmployeesId