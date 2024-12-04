import './Sidebar.scss';
import { FaUserPlus } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Profile from '../Profile/Profile';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/userSlice';
import Cookies from 'js-cookie';
import UserSearch from '../UserSearch/UserSearch';
import UserDetailsEdit from '../UserDetailsEdit/UserDetailsEdit';

const Sidebar: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [searchUserMode, setSearchUserMode] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (!user.firstName && !user.lastName) {
      navigate('/login');
    } else {
      setIsEditingUser(true);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    Cookies.remove('token');
    navigate('/login');
  };

  return (
    <section className='sidebar'>
      <div className='sidebar__top'>
        <button
          className='sidebar__profile'
          title={`${user?.firstName} ${user?.lastName}`}
          onClick={handleProfileClick}
        >
          <Profile
            firstName={user.firstName}
            lastName={user.lastName}
            imageUrl={user.photo}
          />
        </button>

        {isEditingUser && (
          <UserDetailsEdit
            user={user}
            onClose={() => setIsEditingUser(false)}
          />
        )}

        <button
          className='sidebar__top-btn'
          onClick={() => setSearchUserMode(true)}
        >
          <FaUserPlus size={25} />
        </button>
        {searchUserMode && (
          <UserSearch onClose={() => setSearchUserMode(false)} />
        )}

        <button
          className='sidebar__top-btn'
          onClick={handleLogout}
          title='Logout'
        >
          <FiLogOut size={25} />
        </button>
      </div>
      <div className='sidebar__chat-list'>
        <h2 className='sidebar__title'>Chats</h2>
      </div>
    </section>
  );
};

export default Sidebar;
