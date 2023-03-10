import React, { useState } from "react";
import { logIn } from "../services/users";
import * as yup from "yup";
import { useStateValue, setUserAction } from "../state";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import { ErrorMessageWrapper } from "../utils/ErrorMessageWrapper";
import { useNavigate } from "react-router-dom";

const userLogInSchema = yup.object().shape({
  email: yup
    .string()
    .email("field should contain a valid e-mail")
    .max(255)
    .required(),
  password: yup.string().required().min(4).max(50),
});

const initialState = {
  email: "",
  password: "",
};

const LogIn = ({ setToken }) => {
  const [, dispatch] = useStateValue();
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (user) => {
    try {
      const res = await logIn(user);
      dispatch(setUserAction(res));
      setToken(res.id);
      navigate("/movies");
    } catch (error) {
      setError(error.message);
      console.log("error", error.message);
    }
  };

  return (
    <Formik
      initialValues={initialState}
      validationSchema={userLogInSchema}
      onSubmit={handleSubmit}
    >
      {(props) => (
        <div className="login-signup">
          <h1 className="login-signup__h1">Log In</h1>
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
            <button
              className="login-signup__form__submit"
              type="submit"
              disabled={!props.isValid}
            >
              Log In
            </button>
          </Form>
          <hr />
          <div>
            <Link to="/signup">
              <button className="login-signup__link-button">Or Sign Up</button>
            </Link>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default LogIn;
