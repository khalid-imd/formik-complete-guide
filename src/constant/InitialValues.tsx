export interface EmployeeFormValues {
  firstName: string;
  lastName: string;
  user_name: string;
  email: string;
  phone: string;
  gender: string;
  department: string;
  birthDate: string;
  skills: string[];
  isActive: boolean;
  address: string;
  agreeToTerms: boolean;
}

export const initialValues: EmployeeFormValues = {
  firstName: "",
  lastName: "",
  user_name: "",
  email: "",
  phone: "",
  gender: "",
  department: "",
  birthDate: "",
  address: "",
  skills: [],
  isActive: true,
  agreeToTerms: false,
};
