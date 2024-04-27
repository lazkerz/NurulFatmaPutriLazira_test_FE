"use client"

import { useEffect, useState } from "react"
import { AppDispatch } from "@/app/GlobalRedux/store";
import { deleteEmployeeByIdAsync } from "@/app/GlobalRedux/Features/employee/employeeSlice";
import Swal from "sweetalert2";
import Link from "next/link"
import { useDispatch } from "react-redux";


interface DataEmployee {
    id: number;
    name: string;
    joinDate: Date;
    job: string;
    shift: string
    status: boolean;
  }

const ListEmployees = () => {
    const dispatch: AppDispatch = useDispatch();

    const [employees, setEmployee] = useState<DataEmployee[]>([])

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await fetch ('http://localhost:8000/employees');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setEmployee(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (id: number) => {
        const confirmation = await Swal.fire({
          title: 'Are you sure?',
          text: 'You will not be able to recover this employee data!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
        });
    
        if (confirmation.isConfirmed) {
          try {
            const result = await dispatch(deleteEmployeeByIdAsync(id.toString()));
            if (result.meta.requestStatus === 'fulfilled') {
              Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Employee data has been deleted successfully!',
                showConfirmButton: false,
                timer: 1000,
                didClose: () => {
                  // Redirect to employee table page
                  window.location.href = '/employee';
                },
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Failed',
                text: 'Failed to delete employee data!',
              });
            }
          } catch (error) {
            console.error("Error deleting employee:", error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Failed to delete employee data!',
            });
          }
        }
      };
    
    return(
        <div className="overflow-x-auto">
            <table id="my-datatable" className="text-sm w-full rounded-lg">
                <thead className="bg-sky-500">
                    <tr>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white w-10">
                            <span className="block text-left">No</span>
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white w-20">
                            <span className="block text-left">Name</span>
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white w-20">
                            <span className="block text-left">Join Date</span>
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white w-20">
                            <span className="block text-left">Job</span>
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white w-20">
                            <span className="block text-left">Shift</span>
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white w-20">
                            <span className="block text-left">Status</span>
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-white w-10">
                            <span className="block text-left">Action</span>
                        </th>
                    </tr>
                </thead>

                <tbody className="bg-gray-300">
                {employees.map((employee, index) => (
                    <tr key={index}>
                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 border-b border-sky-500">
                            <span className="block text-left text-gray-600">
                            {index + 1}
                            </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 border-b border-sky-500">
                            <span className="block text-left text-gray-600">
                        {employee.name}
                        </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 border-b border-sky-500">
                            <span className="block text-left text-gray-600">
                        {employee.joinDate.toString().slice(0, 10)}
                        </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 border-b border-sky-500">
                            <span className="block text-left text-gray-600">
                        {employee.job}
                        </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 border-b border-sky-500">
                            <span className="block text-left text-gray-600">
                        {employee.shift}
                        </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 border-b border-sky-500">
                            <span className="block text-left text-gray-600">
                        {employee.status ? "Active" : "Inactive"}
                        </span>
                        </td>
                        <td className="whitespace-nowrap flex space-around gap-1 px-4 py-2 font-medium text-gray-900 border-b border-sky-500">
                        <Link href={`/employee/edit/${employee.id}`}
                            className="inline-block rounded-lg bg-sky-300 px-4 py-2 text-xs font-medium text-sky-700 hover:bg-gray-200 transition-all"

                            >
                            Edit
                        </Link>
                        <button
                            onClick={() => handleDelete(employee.id)}
                            className="inline-block rounded-lg bg-red-500 px-4 py-2 text-xs font-medium text-white hover:bg-red-300 transition-all"
                        >Delete
                        </button>
                        </td>
                    </tr>
            ))}
            </tbody>
            </table>
        </div>
    )
}

export default ListEmployees