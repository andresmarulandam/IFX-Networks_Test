import { useContext } from 'react';
import { UserContext } from '../containers/UserContext';

const UserDisplay = () => {
  const { user } = useContext(UserContext);
  console.log(user);
  return (
    <div>
      <h2>User Information</h2>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
};

export default UserDisplay;
