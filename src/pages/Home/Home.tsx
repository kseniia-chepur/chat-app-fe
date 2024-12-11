import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { API_URL } from '../../constants';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import {
  setOnlineUsers,
  setSocketConnection,
  setUser,
} from '../../redux/userSlice';
import Sidebar from '../../components/Sidebar/Sidebar';
import './Home.scss';
import io from 'socket.io-client';

const Home: React.FC = () => {
  const dispatch = useDispatch();

  const fetchUserDetails = async () => {
    const url = `${API_URL.backend}/profile`;
    try {
      const response = await axios({
        url,
        withCredentials: true,
      });
      dispatch(setUser(response.data.user));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  useEffect(() => {
    const socketConnection = io(API_URL.backend, {
      auth: {
        token: localStorage.getItem('token'),
      },
    });

    socketConnection.on('onlineUsers', (users) => {
      dispatch(setOnlineUsers(users));
    });

    dispatch(setSocketConnection(socketConnection));

    return () => {
      socketConnection.disconnect();
    };
  }, []);

  return (
    <div className='home'>
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Home;
