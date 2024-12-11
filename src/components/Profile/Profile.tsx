import './Profile.scss';
import getRandomBgColor from '../../services/getRandomColor';
import { bgColors } from '../../constants';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

type Props = {
  userId?: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
};

const Profile: React.FC<Props> = ({
  userId,
  firstName,
  lastName,
  imageUrl,
}) => {
  const { onlineUsers } = useSelector((state: RootState) => state.user);

  const isUserOnline = userId && onlineUsers.includes(userId);

  const profileInitials =
    firstName && lastName ? firstName[0] + lastName[0] : 'NN';

  return (
    <div className='profile'>
      {imageUrl ? (
        <img
          className='profile__img'
          src={imageUrl}
          alt={`${firstName} ${lastName}`}
        />
      ) : (
        <div
          style={{ backgroundColor: getRandomBgColor(0, bgColors.length - 1) }}
          className='profile__initials'
        >
          {profileInitials}
        </div>
      )}

      {isUserOnline && <div className='profile__online-status'></div>}
    </div>
  );
};

export default Profile;
