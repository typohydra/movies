import React, { useState } from "react";
import { signUp } from "../services/users";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessageWrapper } from "../utils/ErrorMessageWrapper";

const initialState = {
  email: "",
  password: "",
  repeatPassword: "",
  favourites: [],
};

const userSignUpSchema = yup.object().shape({
  email: yup
    .string()
    .email("field should contain a valid e-mail")
    .max(255)
    .required(),
  password: yup.string().required().min(4).max(50),
  repeatPassword: yup
    .string()
    .required("repeat password is a required field")
    .min(4, "repeat password must be at least 4 characters")
    .max(50, "repeat password must be at most 50 characters"),
});

const SignUp = () => {
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (user) => {
    try {
      await signUp(user);
      navigate("/");
    } catch (error) {
      setError(error.message);
      console.log("error", error.message);
    }
  };

  return (
    <Formik
      initialValues={initialState}
      validationSchema={userSignUpSchema}
      onSubmit={handleSubmit}
    >
      {(props) => (
        <div className="login-signup">
          <h1 className="login-signup__h1">Sign Up</h1>
          <div className="validation-error-message">{error}</div>
          <Form className="login-signup__form">
            <div>
              <Field
                className="login-signup__form__field"
                type="text"
                placeholder="email"
                name="email"
              ></Field>
              <div>
                <ErrorMessage name="email">{ErrorMessageWrapper}</ErrorMessage>
              </div>
            </div>
            <div>
              <Field
                className="login-signup__form__field"
                type="password"
                placeholder="password"
                name="password"
              ></Field>
              <div>
                <ErrorMessage name="password">
                  {ErrorMessageWrapper}
                </ErrorMessage>
              </div>
            </div>
            <div>
              <Field
                className="login-signup__form__field"
                type="password"
                placeholder="repeat password"
                name="repeatPassword"
              ></Field>
              <div>
                <ErrorMessage name="repeatPassword">
                  {ErrorMessageWrapper}
                </ErrorMessage>
              </div>
            </div>
            <button
              className="login-signup__form__submit"
              type="submit"
              name="submit"
              disabled={!props.isValid}
            >
              Sign Up
            </button>
          </Form>
          <hr />
          <div className="">
            <Link to="/">
              <button className="login-signup__link-button">Or Log In</button>
            </Link>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default SignUp;
