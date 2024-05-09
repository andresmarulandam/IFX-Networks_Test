import { useContext } from 'react';
import UserContext from '../containers/UserContext';

export default function User() {
  const { user } = useContext(UserContext);

  return (
    user && (
      <div>
        <div>
          <strong>{user.name}</strong>
        </div>
      </div>
    )
  );
}
