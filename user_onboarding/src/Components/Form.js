import React from 'react';
import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';

const UserForm = ({ setUsers, users }) => {
  const initialForm = {
    name: '',
    email: '',
    password: '',
    tos: false,
    role: ''
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required('Please provide a name'),
    email: yup
      .string()
      .email()
      .required('Please provide a valid email address'),
    password: yup
      .string()
      .required('Please provide a password')
      .min(8),
    tos: yup.bool().oneOf([true], 'Please accept the terms and conditions')
  });

  const onSubmit = (values, actions) => {
    const formData = {
      name: values.name,
      email: values.email,
      password: values.password,
      tos: values.tos,
      role: values.role
    };

    axios.post('https://reqres.in/api/users', formData).then(res => {
      setUsers([...users, res.data]);
      actions.resetForm();
    });
  };

  const validateEmail = formData => {
    const errors = {};
    if (formData.email === 'waffle@syrup.com') {
      errors.name = 'That email is already taken';
    }
    return errors;
  };
  return (
    <>
      <h1>A Form!!</h1>
      <Formik
        initialValues={initialForm}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validate={validateEmail}
        render={props => {
          return (
            <Form>
              <label>
                Name:
                <Field type="text" name="name" />
                <ErrorMessage name="name" component="div" />
              </label>
              <br />
              <label>
                Email:
                <Field type="email" name="email" />
                <ErrorMessage name="email" component="div" />
              </label>
              <br />
              <label>
                Password:
                <Field type="password" name="password" />
                <ErrorMessage name="password" component="div" />
              </label>
              <br />
              <label>
                Role:
                <Field
                  name="role"
                  component="select"
                  placeholder="Select a role"
                >
                  <option value="" defaultValue disabled hidden>
                    Choose a Role
                  </option>
                  <option value="Full Stack Developer">
                    Full Stack Developer
                  </option>
                  <option value="Backend Developer">Backend Developer</option>
                  <option value="Frontend Developer">Frontend Developer</option>
                  <option value="UX Designer">UX Designer</option>
                </Field>
                <ErrorMessage name="role" component="div" />
              </label>
              <br />
              <label>
                <Field type="checkbox" name="tos" checked={props.values.tos} />
                I have read and I accept the Terms of Service
                <ErrorMessage name="tos" component="div" />
              </label>
              <br />
              <button type="submit">Submit</button>
            </Form>
          );
        }}
      />
    </>
  );
};

export default UserForm;
{
  /* <Formik
      initialValues={{ email: '', password: '' }}
      validate={values => {
        let errors = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="email" name="email" />
          <ErrorMessage name="email" component="div" />
          <Field type="password" name="password" />
          <ErrorMessage name="password" component="div" />
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik> */
}
