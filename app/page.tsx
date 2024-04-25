'use client'
import ListEmployees from "./components/organ/ListEmployees";
import type { RootState } from './GlobalRedux/store';
import { useSelector, useDispatch } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();

  return (
    <>
    <div className="mx-5">
      <h1 className="text-3xl font-semibold my-6">Employees</h1>
      <form action="pages/add" method="post">
          <button type="submit" className="inline-block rounded-lg bg-sky-500 px-4 py-2 mb-5 text-xs font-medium text-white hover:bg-sky-200 transition-all">
            <span className="block text-center">Add Employee</span>
          </button>
      </form>
      <ListEmployees/>
    </div>
    </>
  );
}
