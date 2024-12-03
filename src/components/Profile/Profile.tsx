import './Profile.scss';
import getRandomBgColor from '../../services/getRandomBgColor';
import { bgColors } from '../../constants';

type Props = {
  firstName: string;
  lastName: string;
  imageUrl?: string;
};

const Profile: React.FC<Props> = ({ firstName, lastName, imageUrl}: Props) => {
  const profileInitials = firstName[0] + lastName[0];

  return (
    <div className='profile'>
      {imageUrl ? (
        <img className='profile__img' src={imageUrl} alt={`${firstName} ${lastName}`} />
      ) : (
        <div
          style={{ backgroundColor: getRandomBgColor(0, bgColors.length - 1) }}
          className='profile__initials'
        >
          {profileInitials}
        </div>
      )}
    </div>
  );
};

export default Profile;
