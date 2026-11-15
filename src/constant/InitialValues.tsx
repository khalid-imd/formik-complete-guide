export interface EmployeeFormValues {
  firstName: string;
  lastName: string;
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
