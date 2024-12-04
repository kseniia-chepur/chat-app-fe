import { Link } from 'react-router-dom';
import Profile from '../Profile/Profile';
import './UserSearchCard.scss';

type Props = {
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    photo?: string;
  };

  onClose: () => void;
};

const UserSearchCard: React.FC<Props> = ({ user, onClose }) => {
  return (
    <Link to={'/' + user._id} className='link' onClick={onClose}>
      <div className='userSearchCard'>
        <div>
          <Profile
            firstName={user.firstName}
            lastName={user?.lastName}
            imageUrl={user?.photo}
          />
        </div>
        <p className='userSearchCard__name'>{`${user.firstName} ${user.lastName}`}</p>
      </div>
    </Link>
  );
};

export default UserSearchCard;
