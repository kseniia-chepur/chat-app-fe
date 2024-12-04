import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import './UserSearch.scss';
import { IoSearchOutline } from 'react-icons/io5';
import UserSearchCard from '../UserSearchCard/UserSearchCard';
import { IoClose } from 'react-icons/io5';
import { API_URL } from '../../constants';
import axios from 'axios';
import { User } from '../../interfaces/User';

type Props = {
  onClose: () => void;
};

const UserSearch: React.FC<Props> = ({ onClose }) => {
  const [userSearchResult, setUserSearchResult] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [notFoundMsg, setNotFoundMsg] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSearch(e.currentTarget.value);

  const handleUserSearch = async () => {
    setIsLoading(true);
    const URL = `${API_URL.backend}/search`;
    try {
      const response = await axios.post(URL, { search });
      setIsLoading(false);

      setUserSearchResult(response.data.user);
      if (!response.data?.user) {
        setNotFoundMsg(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleUserSearch();
  }, [search]);

  return (
    <div className='search'>
      <form className='search__form'>
        <input
          type='text'
          placeholder='Search user by name or email'
          className='search__input'
          onChange={handleInputChange}
          value={search}
        />
        <div className='search__icon'>
          <IoSearchOutline size={20} />
        </div>
      </form>
      
      <div className='search__result'>
        {notFoundMsg && !userSearchResult?.length && (
          <p className='search__not-found-msg'>User not found</p>
        )}

        {!!userSearchResult?.length &&
          !isLoading &&
          userSearchResult.map((user) => (
            <UserSearchCard key={user._id} user={user} onClose={onClose} />
          ))}
      </div>

      <button className='close-btn' onClick={onClose}>
        <IoClose />
      </button>
    </div>
  );
};

export default UserSearch;
