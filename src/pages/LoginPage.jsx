import { Card } from 'react-bootstrap';
import LoginForm from '../components/LoginForm/LoginForm';

import './LoginPage.css';

export default function LoginPage() {
  return (
    <>
      <div className="form-container">
        <Card style={{ width: '25%' }}>
          <Card.Body>
            <h1 className="fs-4 my-2 fw-bolder text-center">Sign In</h1>
            <LoginForm />
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
