import { useContext } from 'react';
import UserContext from '../containers/UserContext';

export default function User() {
  const { user } = useContext(UserContext);

  return (
    user && (
      <div>
        <div>
          <strong>{user.name.firstname}</strong>
          <strong>{user.name.lastname}</strong>
        </div>
      </div>
    )
  );
}
