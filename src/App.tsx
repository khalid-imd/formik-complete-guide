import "./App.css";
import { InputRenderer } from "./components/input/InpuRenderer";
import { InputParent } from "./components/input/InputParent";
import ThemeToggle from "./components/ThemeToggle";

import { useFormik, type FormikErrors } from "formik";
import { initialValues } from "./constant/InitialValues";
import { DatePickerRenderer } from "./components/input/DatePickerRenderer";
import { RadioRenderer } from "./components/input/RadioRenderer";
import { TextareaRenderer } from "./components/input/TextareaRenderer";
import { SwitchRenderer } from "./components/input/SwitchRenderer";
import { CheckboxGroupRenderer } from "./components/input/CheckboxGroupRenderer";
import { CheckboxRenderer } from "./components/input/CheckboxRenderer";
import { SelectRenderer } from "./components/input/SelectRenderer";

function App() {
  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnMount: true,
    validate: async (values) => {
      const errors: FormikErrors<typeof initialValues> = {};

      await validatingUserName(values, errors);

      return errors;
    },
    onSubmit: async (values) => {
      console.log("Submitting:", values);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Submit completed");
    },
  });

  const validatingUserName = async (
    values: typeof initialValues,
    errors: FormikErrors<typeof initialValues>,
  ): Promise<FormikErrors<typeof initialValues>> => {
    console.log("valid");

    if (!values.user_name.trim()) {
      errors.user_name = "Username is required";
    } else {
      // Simulasi asynchronous validation 3 detik
      await new Promise((resolve) => setTimeout(resolve, 3000));

      if (values.user_name.length < 5) {
        errors.user_name = "Minimum 5 characters";
      } else if (values.user_name.length > 15) {
        errors.user_name = "Maximum 15 characters";
      } else if (/\s/.test(values.user_name)) {
        errors.user_name = "Username cannot contain spaces";
      } else if (!/[a-zA-Z]/.test(values.user_name)) {
        errors.user_name = "Must contain at least one letter";
      } else if (!/[0-9]/.test(values.user_name)) {
        errors.user_name = "Must contain at least one number";
      } else if (!/[@_.-]/.test(values.user_name)) {
        errors.user_name =
          "Must contain at least one special character (@, _, ., -)";
      }
    }

    return errors;
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">
              Employee Information
            </h1>

            <p className="text-sm text-muted-foreground">
              Employee form playground
            </p>
          </div>

          <ThemeToggle />
        </header>

        {/* Form Section */}

        <form
          onSubmit={formik.handleSubmit}
          className="mt-8 rounded-xl border border-border bg-card p-5 shadow-sm sm:p-7"
        >
          <section className="mb-15">
            <div className="mb-6 border-b border-border pb-4">
              <h2 className="text-lg font-semibold">Personal Information</h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Enter the employee's personal information below.
              </p>
            </div>

            <form onSubmit={formik.handleSubmit}>
              <InputParent columns={4}>
                <InputRenderer
                  label="First Name"
                  name="firstName"
                  type="text"
                  placeholder="Enter first name"
                  required
                  colSpan={2}
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.firstName
                      ? formik.errors.firstName
                      : undefined
                  }
                />
                <InputRenderer
                  label="Last Name"
                  name="lastName"
                  type="text"
                  placeholder="Enter last name"
                  required
                  colSpan={2}
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.lastName ? formik.errors.lastName : undefined
                  }
                />
                <InputRenderer
                  label="User Name"
                  name="user_name"
                  value={formik.isValidating ? "" : formik.values.user_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.user_name
                      ? formik.errors.user_name
                      : undefined
                  }
                  placeholder={
                    formik.isValidating
                      ? "Checking username..."
                      : "Enter user name"
                  }
                  required
                  colSpan={4}
                  disabled={formik.isValidating}
                />
                <InputRenderer
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email ? formik.errors.email : undefined}
                  placeholder="Enter email address"
                  required
                  colSpan={4}
                />
                <InputRenderer
                  label="Phone"
                  name="phone"
                  type="number"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your phone number"
                  colSpan={4}
                />
                <DatePickerRenderer
                  label="BirthDate"
                  name="birthDate"
                  value={formik.values.birthDate}
                  onChange={(date) => formik.setFieldValue("birthDate", date)}
                  onBlur={() => formik.setFieldTouched("birthDate", true)}
                  colSpan={4}
                />
                <RadioRenderer
                  label="Gender"
                  name="gender"
                  options={genderOptions}
                  value={formik.values.gender}
                  onChange={(value) => formik.setFieldValue("gender", value)}
                  onBlur={() => formik.setFieldTouched("gender", true)}
                  colSpan={2}
                />

                <TextareaRenderer
                  label="Address"
                  name="address"
                  placeholder="Enter full address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  colSpan={4}
                  rows={3}
                />
              </InputParent>
            </form>
          </section>

          <section className="mb-15">
            <div className="mb-6 border-b pb-4">
              <h2 className="text-lg font-semibold">Employment Information</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Configure employee department and skills.
              </p>
            </div>

            <InputParent columns={4}>
              <SelectRenderer
                label="Department"
                name="department"
                options={departmentOptions}
                placeholder="Select department"
                value={formik.values.department}
                onChange={(value) => formik.setFieldValue("department", value)}
                onBlur={() => formik.setFieldTouched("department", true)}
                colSpan={4}
              />

              <CheckboxGroupRenderer
                label="Technical Skills"
                name="skills"
                options={skillsOptions}
                value={formik.values.skills}
                onChange={(value) => formik.setFieldValue("skills", value)}
                onBlur={() => formik.setFieldTouched("skills", true)}
                colSpan={4}
              />

              <SwitchRenderer
                label="Active Employee"
                name="isActive"
                description="Enable or disable employee status."
                value={formik.values.isActive}
                onChange={(value) => formik.setFieldValue("isActive", value)}
                onBlur={() => formik.setFieldTouched("isActive", true)}
                colSpan={2}
              />

              <CheckboxRenderer
                label="Agree to Terms"
                name="agreeToTerms"
                description="I confirm that the information provided is correct."
                value={formik.values.agreeToTerms}
                onChange={(value) =>
                  formik.setFieldValue("agreeToTerms", value)
                }
                onBlur={() => formik.setFieldTouched("agreeToTerms", true)}
                colSpan={2}
              />
            </InputParent>
          </section>

          <div className="flex justify-end gap-3">
            {formik.dirty && !formik.isSubmitting && (
              <button
                type="button"
                onClick={() => formik.resetForm()}
                className="rounded-lg border px-5 py-2 text-sm font-medium hover:bg-muted"
              >
                Reset
              </button>
            )}
            {formik.dirty && formik.isValid && (
              <button
                type="submit"
                className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
              >
                {formik.isSubmitting ? "Sumbimting..." : "Submit"}
              </button>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}

const departmentOptions = [
  { label: "Engineering", value: "engineering" },
  { label: "Human Resources", value: "hr" },
  { label: "Finance", value: "finance" },
  { label: "Marketing", value: "marketing" },
  { label: "Operations", value: "operations" },
];

const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

const skillsOptions = [
  { label: "React.js", value: "react" },
  { label: "JavaScript", value: "javascript" },
  { label: "TypeScript", value: "typescript" },
  { label: "Node.js", value: "nodejs" },
  { label: "Flutter", value: "flutter" },
];

export default App;
