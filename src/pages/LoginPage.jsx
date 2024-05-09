import { Card } from 'react-bootstrap';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';
import User from '../components/User';

export default function LoginPage() {
  return (
    <>
      <div className=" d-flex flex-column justify-content-center align-items-center ">
        <Card style={{ width: '25%' }}>
          <Card.Body>
            <h1 className="fs-4 my-2 fw-bolder text-center">Sign In</h1>
            <LoginForm />
          </Card.Body>
        </Card>
        <User />
      </div>
    </>
  );
}
