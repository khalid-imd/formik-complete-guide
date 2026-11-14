export interface EmployeeFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  gender: string;
  department: string;
  birthDate: string;
  skills: string[];
  isActive: boolean;
}

export const initialValues: EmployeeFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  phone: "",
  gender: "",
  department: "",
  birthDate: "",
  skills: [],
  isActive: true,
};
