import "./App.css";
import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

function App() {
  const [hasRegistred, setHasRegistred] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Required")
      .min(3, "Name should consist of more than two symbol"),
    email: Yup.string().required("Required").email("Invalid email address"),
    password: Yup.string()
      .required("Required")
      .min(6, "Password should has length more than 6 symbols")
      .matches(
        /^[A-Z0-9._%+-]/i,
        "The password must contain the symbols A-Z, 0-9 and ._%+-."
      ),
    confirmPassword: Yup.string().test(
      "passwords-match",
      "Password confirmation does not match",
      function (value) {
        return this.parent.password === value;
      }
    ),
    DOB: Yup.date()
      .required("Required")
      .max(
        new Date(Date.now() - 1000 * 60 * 60 * 24 * 365 * 12),
        "You must be at least 12 years old"
      ),
    gender: Yup.string().required("Required"),
    phoneNumber: Yup.string()
      .required("Required")
      .matches(/80\d{8}/, "Phone number should have format 80(29)3456789 "),
  });

  //

  return (
    <div className="App">
      <h1>Registration form</h1>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          DOB: "",
          gender: "",
          phoneNumber: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
            setHasRegistred(true);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <div class="row">
              <div class="col-25">
                <label for="name"> Name: </label>
              </div>
              <div class="col-75">
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
                {errors.name && touched.name && errors.name}
              </div>
            </div>
            <div class="row">
              <div class="col-25">
                <label>E-mail:</label>
              </div>
              <div class="col-75">
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {errors.email && touched.email && errors.email}
              </div>
            </div>
            <div class="row">
              <div class="col-25">
                <label>Password:</label>
              </div>
              <div class="col-75">
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                {errors.password && touched.password && errors.password}
              </div>
            </div>
            <div class="row">
              <div class="col-25">
                <label>Confirm password:</label>
              </div>
              <div class="col-75">
                <input
                  type="password"
                  name="confirmPassword"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmPassword}
                />

                {errors.confirmPassword &&
                  touched.confirmPassword &&
                  errors.confirmPassword}
              </div>
            </div>
            <div class="row">
              <div class="col-25">
                <label>Date of birth</label>
              </div>
              <div class="col-75">
                <input
                  type="date"
                  name="DOB"
                  value={values.DOB}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <br />
                {errors.DOB && touched.DOB && errors.DOB}
              </div>
            </div>
            <div class="row">
              <div class="col-25">Gender:</div>
              <div class="col-75">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <label for="male" style={{ color: "#000" }}>
                  Male
                </label>
                <input
                  style={{ marginLeft: "20px" }}
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <label for="female" style={{ color: "#000" }}>
                  Female
                </label>
                <br />
                {errors.gender && touched.gender && errors.gender}
              </div>
            </div>
            <div class="row">
              <div class="col-25">
                <label>Phone number:</label>
              </div>
              <div class="col-75">
                <input
                  type="tel"
                  name="phoneNumber"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.phoneNumber &&
                  touched.phoneNumber &&
                  errors.phoneNumber}
              </div>
            </div>

            <button class="submit-button" type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>

      {hasRegistred && (
        <h3 style={{ marginTop: "120px" }}>
          Registration completed successfully
        </h3>
      )}
    </div>
  );
}

export default App;
