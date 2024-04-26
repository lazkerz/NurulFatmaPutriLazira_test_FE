"use client"

import { useEffect, useState } from "react"
import EmployeeForm from "@/app/components/mollecul/EmployeeForm";
import { updateEmployeeByIdAsync } from '@/app/GlobalRedux/Features/employee/employeeSlice';
import { AppDispatch } from '@/app/GlobalRedux/store';
import Button from "@/app/components/atom/Button";
import Swal from "sweetalert2";
import { useDispatch } from 'react-redux';
import { format } from 'date-fns';


interface DataEmployee {
    id: string;
    name: string;
    joinDate: Date;
    job: string;
    shift: string;
    status: boolean;
  }

const EmployeesId = ({ params } : {
  params : {
    id : any
  }
  
}) => {
    const [selectedEmployee, setSelectedEmployee] = useState<DataEmployee | null>(null);
    const dispatch: AppDispatch = useDispatch();

    const [formData, setFormData] = useState({
      name: '',
      joinDate: new Date(),
      job: '',
      shift: '',
      status: false,
    });

    useEffect(() => {
      if (params.id) {
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:8000/employees');
            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            console.log(data); // Lakukan sesuatu dengan data yang diperoleh
            handleViewDetails(String(params.id), data);
          } catch (error) {
            console.error('Error:', error);
          }
        };
  
        fetchData();
      }
    }, [params.id]);
  
    const handleViewDetails = (id: string, employees: any[]) => {
      const employee = employees.find((employee) => employee.id === id);
      if (employee) {
        setSelectedEmployee(employee);
        const formattedJoinDate = format(new Date(employee.joinDate), 'dd/MM/yyyy');
        setFormData({
          name: employee.name,
          joinDate: new Date(formattedJoinDate),
          job: employee.job,
          shift: employee.shift,
          status: employee.status,
        });
      } else {
        console.log("Employee not found");
      }
    };
  
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
          const result = await dispatch(updateEmployeeByIdAsync({ id: params.id, newData: formData }));

          if(result.meta.requestStatus === 'fulfilled'){
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Employee data has been updated successfully!',
              showConfirmButton: false,
              timer: 1000,
              didClose: () => {
                window.location.href = '/pages'; // Redirect to employee table page
              }
            });
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Failed',
              text: 'Failed to update employee data!',
            });
          }
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
