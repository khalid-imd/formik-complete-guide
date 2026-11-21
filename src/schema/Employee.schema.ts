import * as Yup from "yup";

export const employeeSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().required("Email is required"),
  userName: Yup.string()
    .min(5, "Minimum 5 characters")
    .max(15, "Maximum 15 characters")
    .matches(/[a-zA-Z]/, "Must contain a letter")
    .matches(/[0-9]/, "Must contain a number")
    .matches(/[@_.-]/, "Must contain a special character")
    .required("Username is required"),
});
