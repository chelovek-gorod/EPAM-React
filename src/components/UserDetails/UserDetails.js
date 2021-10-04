import Avatar from '../Avatar/Avatar';
import Userinfo from '../Userinfo/Userinfo';
import './UserDetails.css';

function UserDetails() {
  return (
    <div className="user-details border">
      <Avatar />
      <Userinfo />
    </div>
  );
}

export default UserDetails;