import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import './UserDetailsEdit.scss';
import Profile from '../Profile/Profile';
import uploadFile from '../../services/uploadFile';
import axios, { AxiosError } from 'axios';
import { API_URL } from '../../constants';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlice';

type Props = {
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    photo?: string;
  };
  onClose: () => void;
};

const UserDetailsEdit: React.FC<Props> = ({ user, onClose }) => {
  const token = localStorage.getItem('token');
  const [userData, setUserData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    photo: user?.photo,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    setUserData((prevData) => ({
      ...prevData,
      ...user,
    }));
  }, [user]);

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

      const uploadedPhoto = await uploadFile(file);

      setUserData((prevData) => ({
        ...prevData,
        photo: uploadedPhoto?.url,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log('x')

    const URL = `${API_URL.backend}/update`;

    try {
      const response = await axios.put(URL, { token, userData });
      toast.success(response?.data?.message);

      dispatch(setUser(response.data.user));
      onClose();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message);
      }
    }
  };

  return (
    <div className='userDetailsEditMode'>
      <h2 className='userDetailsEditMode__title'>{`Hello, ${user.firstName}!`}</h2>
      <h3 className='userDetailsEditMode__subtitle'>Edit account details:</h3>
      <form onSubmit={handleSubmit}>
        <div className='form__block'>
          <label className='form__label' htmlFor='firstName'>
            First name:
          </label>
          <input
            className='form__input'
            type='text'
            id='firstName'
            name='firstName'
            value={userData.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div className='form__block'>
          <label className='form__label' htmlFor='lastName'>
            Last name:
          </label>
          <input
            className='form__input'
            type='text'
            id='lastName'
            name='lastName'
            value={userData.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div className='form__block form__block--photo'>
          <Profile
            userId={user._id}
            firstName={userData.firstName}
            lastName={userData.lastName}
            imageUrl={userData.photo}
          />
          <label className='form__label form__label--photo' htmlFor='photo'>
            Change photo
            <input
              className='form__input form__input--photo'
              type='file'
              id='photo'
              name='photo'
              onChange={handleUploadPhoto}
            />
          </label>
        </div>
        <div className='form__btn-group'>
          <button onClick={onClose} className='form__secondary-btn'>
            Cancel
          </button>
          <button onSubmit={handleSubmit} className='form__secondary-btn'>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserDetailsEdit;
