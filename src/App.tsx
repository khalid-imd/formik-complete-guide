import "./App.css";
import { InputRenderer } from "./components/input/InpuRenderer";
import { InputParent } from "./components/input/InputParent";
import ThemeToggle from "./components/ThemeToggle";

import { useFormik } from "formik";
import { initialValues } from "./constant/InitialValues";

function App() {
  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validateOnChange: true,
    onSubmit: () => {},
  });

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

        <section className="mt-8 rounded-xl border border-border bg-card p-5 shadow-sm sm:p-7">
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
                colSpan={4}
                onChange={formik.handleChange}
                value={formik.values.firstName}
              />
              <InputRenderer
                label="Last Name"
                name="lastName"
                type="text"
                placeholder="Enter last name"
                required
                colSpan={2}
              />
              <InputRenderer
                label="Email Address"
                name="email"
                type="email"
                placeholder="Enter email address"
                required
                colSpan={2}
              />
            </InputParent>
          </form>
        </section>
      </div>
    </main>
  );
}

export default App;
