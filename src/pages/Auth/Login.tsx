import { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.scss';
import { API_URL } from '../../constants';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { PartialUser } from '../../interfaces/User';
import { useDispatch } from 'react-redux';
import { setToken } from '../../redux/userSlice';

const Login: React.FC = () => {
  const [userData, setUserData] = useState<PartialUser>({
    email: '',
    password: '',
  });
 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const url = `${API_URL.backend}/login`;

    try {
      const response = await axios({
        method: 'post',
        url,
        data: {
          email: userData.email,
          password: userData.password,
        },
        withCredentials: true,
      });

      toast.success(response.data.message);

      dispatch(setToken(response.data.token));
      localStorage.setItem('token', response.data.token);

      setUserData({
        email: '',
        password: '',
      });

      navigate('/', {
        state: response?.data?.data,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error);
        toast.error(error?.response?.data?.message);
      }
    }
  };

  return (
    <div className='auth'>
      <h1 className='auth__title'>Log in to your account</h1>
      <form className='form' onSubmit={handleSubmit}>
        <div className='form__block'>
          <label className='form__label' htmlFor='email'>
            Email:
          </label>
          <input
            className='form__input'
            type='email'
            id='email'
            name='email'
            placeholder='Enter your email'
            required
            value={userData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className='form__block'>
          <label className='form__label' htmlFor='password'>
            Password:
          </label>
          <input
            className='form__input'
            type='password'
            id='password'
            name='password'
            placeholder='Enter your password'
            required
            value={userData.password}
            onChange={handleInputChange}
          />
        </div>
        <button type='submit' className='form__submit-btn'>
          Login
        </button>
        <p className='form__ref'>
          Don't have an account?{' '}
          <Link to={'/register'} className='form__link'>
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
