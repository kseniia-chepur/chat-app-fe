import './CurrentUserCard.scss';
import Profile from '../Profile/Profile';

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

const CurrentUserCard: React.FC<Props> = ({ user, onClose }) => {
  return (
    <div className='currentUserCard'>
      <h2 className='currentUserCard__title'>{`Hello, ${user.firstName}!`}</h2>
      <h3 className='currentUserCard__subtitle'>Account details:</h3>

      <div className='currentUserCard__content'>
        <p className='currentUserCard__data'>
          First name: <span>{user.firstName}</span>
        </p>
        <p className='currentUserCard__data'>
          Last name: <span>{user.lastName}</span>
        </p>
        <p className='currentUserCard__data'>
          Email: <span>{user.email}</span>
        </p>
      </div>

      <Profile
        userId={user._id}
        firstName={user.firstName}
        lastName={user.lastName}
        imageUrl={user?.photo}
      />

      <div className='currentUserCard__close'>
        <button onClick={onClose} className='currentUserCard__close-btn'>
          Close
        </button>
      </div>
    </div>
  );
};

export default CurrentUserCard;
