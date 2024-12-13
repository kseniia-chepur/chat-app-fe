import './Sidebar.scss';
import { FaUserPlus } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Profile from '../Profile/Profile';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/userSlice';
import Cookies from 'js-cookie';
import UserSearch from '../UserSearch/UserSearch';
import { Conversation } from '../../interfaces/Conversation';
import CurrentUserCard from '../UserDetailsEdit/CurrentUserCard';

const Sidebar: React.FC = () => {
  const currentUser = useSelector((state: RootState) => state.user);
  const { socketConnection } = useSelector((state: RootState) => state.user);
  const [viewAccountDetails, setViewAccountDetails] = useState(false);
  const [searchUserMode, setSearchUserMode] = useState(false);
  const [allUsersChats, setAllUsersChats] = useState<Conversation[]>([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit('sidebar', currentUser._id);

      socketConnection.on('conversation', (data) => {
        const conversationUser = data.map((chat: Conversation) => {
          const userDetails =
            currentUser._id === chat.receiver._id ? chat.sender : chat.receiver;

          return {
            ...chat,
            userDetails,
          };
        });
        setAllUsersChats(conversationUser);
      });
    }
  }, [socketConnection, currentUser]);

  const handleProfileClick = () => {
    if (!currentUser.firstName && !currentUser.lastName) {
      navigate('/login');
    } else {
      setViewAccountDetails(true);
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
          title={`${currentUser?.firstName} ${currentUser?.lastName}`}
          onClick={handleProfileClick}
        >
          <Profile
            userId={currentUser._id}
            firstName={currentUser.firstName}
            lastName={currentUser.lastName}
            imageUrl={currentUser?.photo}
          />
        </button>

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
        <div className='sidebar__preview'>
          {allUsersChats.map((chat) => (
            <NavLink
              to={`/${chat.userDetails._id}`}
              key={chat._id}
              className='preview'
            >
              <div className='preview__user'>
                <div className='preview__photo'>
                  <Profile
                    userId={chat.userDetails._id}
                    firstName={chat.userDetails.firstName}
                    lastName={chat.userDetails.lastName}
                    imageUrl={chat.userDetails?.photo}
                  />
                </div>
                <div className='preview__content'>
                  <h3 className='preview__name'>{`${chat.userDetails.firstName} ${chat.userDetails.lastName}`}</h3>
                  <p className='preview__last-msg'>{chat?.lastMsg?.text}</p>
                </div>
              </div>
              {!!chat.unreadMsg && (
                <p className='preview__unread-msg'>{chat.unreadMsg}</p>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      {viewAccountDetails && (
        <CurrentUserCard
          user={currentUser}
          onClose={() => setViewAccountDetails(false)}
        />
      )}
    </section>
  );
};

export default Sidebar;
