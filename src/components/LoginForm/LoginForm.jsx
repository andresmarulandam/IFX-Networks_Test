import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../containers/UserContext';
import fetchData from '../../utils/axiosConfig';

import { Button, Form } from 'react-bootstrap';
import { Formik, ErrorMessage } from 'formik';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

const signInSchema = z.object({
  username: z.string(),
  password: z.string().min(6).max(16),
});

export default function LoginForm() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const initialvalues = {
    email: '',
    password: '',
  };

  function onSignIn() {
    navigate('/admin');
  }

  return (
    <>
      <Formik
        initialValues={initialvalues}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const response = await fetchData.post('/auth/login', values);
            const user = response.data;
            setUser(user);
            setSubmitting(false);
          } catch (error) {
            setFieldError('Incorrect');
            setSubmitting(false);
          }
        }}
        validationSchema={toFormikValidationSchema(signInSchema)}
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
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Enter Username</Form.Label>
              <Form.Control
                type="username"
                placeholder="Enter username"
                name="email"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  touched.username && errors.username ? 'is-invalid' : ''
                }
              />
              <ErrorMessage
                name="username"
                component="div"
                className="invalid-feedback"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  touched.password && errors.password ? 'is-invalid' : ''
                }
              />
              <ErrorMessage
                name="email"
                component="div"
                className="invalid-feedback"
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="rounded-pill text-white "
              style={{ width: '90%' }}
              disabled={isSubmitting}
              onClick={onSignIn}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}
