'use client'

import React, { useState, ChangeEvent, FormEvent } from 'react';
import Input from '../atom/Input';
import Select from '../atom/Select';
import Checkbox from '../atom/Checkbox';

interface EmployeeFormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

interface FormData {
  name: string;
  joinDate: Date;
  job: string;
  shift: string;
  status: boolean;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ formData, setFormData }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'date' ? new Date(value) : newValue
    }));
  };

  return (
    <>
      <Input
        label="Employee Name"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <Input
        label="Join Date"
        type="date"
        name="joinDate"
        value={formData.joinDate}
        onChange={handleChange}
        placeholder="Join Date"
        required
      />
      <Select
        label="Job"
        name="job"
        value={formData.job}
        onChange={handleChange}
        options={[
          "Admin Inventory",
          "Admin Accounting",
          "Marketing",
          "Frontdesk",
          "Doctor",
          "Nurse"
        ]}
        placeholder="Pilih Posisi"
        required
      />
      <Select
        label="Shift"
        name="shift"
        value={formData.shift}
        onChange={handleChange}
        options={[
          "Shift 01",
          "Shift 02",
          "Shift 03"
        ]}
        placeholder="Pilih Shift"
        required
      />
      <Checkbox
        label="Status"
        name="status"
        checked={formData.status}
        onChange={handleChange}
      />
    </>
  );
};

export default EmployeeForm;
