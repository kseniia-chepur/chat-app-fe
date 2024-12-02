import {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useState,
} from 'react';
import './Registration.scss';
import { MdClose } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import uploadFile from '../../services/uploadFile';
import { API_URL } from '../../constants';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { User } from '../../interfaces/User';

const Registration = () => {
  const [userData, setUserData] = useState<User>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    photo: '',
  });

  const [uploadedPhoto, setUploadedPhoto] = useState<File | null>(null);

  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUploadPhoto = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files) {
      const file = files[0];

       setUploadedPhoto(file);

      const uploadedPhoto = await uploadFile(file);
     
      setUserData((prevData) => ({
        ...prevData,
        photo: uploadedPhoto?.url,
      }));
    }        
  };

  const handleUploadPhotoCancel = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setUploadedPhoto(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const URL = `${API_URL.backend}/register`;

    try {
      const response = await axios.post(URL, userData);
      toast.success(response.data.message);

      setUserData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        photo: '',
      });

      navigate('/login');
    
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message);
      }
    }
  };

  return (
    <div className='registration'>
      <h1 className='registration__title'>Registration</h1>
      <form className='form' onSubmit={handleSubmit}>
        <div className='form__block'>
          <label className='form__label' htmlFor='firstName'>
            First name:
          </label>
          <input
            className='form__input'
            type='text'
            id='firstName'
            name='firstName'
            placeholder='Enter your first name'
            required
            value={userData.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div className='form__block'>
          <label className='form__label' htmlFor='lasttName'>
            Last name:
          </label>
          <input
            className='form__input'
            type='text'
            id='lastName'
            name='lastName'
            placeholder='Enter your last name'
            required
            value={userData.lastName}
            onChange={handleInputChange}
          />
        </div>
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
        <div className='form__block form__block--photo'>
          <label className='form__label form__label--photo' htmlFor='photo'>
            {uploadedPhoto?.name ?? 'Upload profile photo'}
            {uploadedPhoto?.name && (
              <button
                className='form__close-icon'
                onClick={handleUploadPhotoCancel}
              >
                <MdClose />
              </button>
            )}
          </label>

          <input
            className='form__input form__input--photo'
            type='file'
            id='photo'
            name='photo'
            onChange={handleUploadPhoto}
          />
        </div>
        <button type='submit' className='form__submit-btn'>
          Create account
        </button>
        <p className='form__login-ref'>
          Already registered?{' '}
          <Link to={'/login'} className='form__login-link'>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Registration;
