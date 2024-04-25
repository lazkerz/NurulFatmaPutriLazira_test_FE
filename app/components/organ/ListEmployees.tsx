"use client"

import { useEffect, useState } from "react"
import Link from "next/link"


interface DataEmployee {
    id: number;
    name: string;
    joinDate: Date;
    job: string;
    shift: string;
  }

const ListEmployees = () => {

    const [employees, setEmployee] = useState<DataEmployee[]>([])
    const confirmDelete = () => alert ("Are You Sure?")

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
                        <td className="whitespace-nowrap flex space-around gap-1 px-4 py-2 font-medium text-gray-900 border-b border-sky-500">
                        <Link href={`/pages/edits/${employee.id}`}
                            className="inline-block rounded-lg bg-sky-300 px-4 py-2 text-xs font-medium text-sky-700 hover:bg-gray-200 transition-all"
                            style={{ cursor: 'not-allowed' }}
                            >
                            Edit
                        </Link>
                        <button
                            onClick={confirmDelete}
                            className="inline-block rounded-lg bg-gray-500 px-4 py-2 text-xs font-medium text-white transition-all"
                            disabled
                        >X
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