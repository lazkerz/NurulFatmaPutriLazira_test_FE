import Link from 'next/link';
import { SlArrowLeft } from 'react-icons/sl';
import EmployeeForm from '@/app/components/organ/AddEmploye';

const Add = () => {
    return (
        <>
            <div className="flex justify-left gap-5 mx-10 my-5">
                <Link href="/employee" className="bg-gray-300 hover:bg-gray-400 px-3 py-3 rounded-full text-gray-800 text-sm font-medium transition-all">
                    <SlArrowLeft />
                </Link>
                <h1 className="text-3xl font-semibold text-sky-500">Add Employee</h1>
            </div>
            <EmployeeForm />
        </>
    );
};

export default Add;
