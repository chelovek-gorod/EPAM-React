import avatar from '../../img/avatar.png';
import './Avatar.css';

function Avatar() {
  return (
    <div className="avatar border">
      <img src={avatar} alt="Avatar"/>
    </div>
  );
}

export default Avatar;