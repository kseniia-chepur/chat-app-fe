import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../redux/store';
import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { PartialUser } from '../../interfaces/User';
import './Chat.scss';
import Profile from '../Profile/Profile';
import { NetworkStatus } from '../../constants';
import { IoIosSend } from 'react-icons/io';
import { Message } from '../../interfaces/Message';
import moment from 'moment';

const Chat: React.FC = () => {
  const { userId } = useParams();
  const { socketConnection } = useSelector((state: RootState) => state.user);
  const currentUser = useSelector((state: RootState) => state?.user);
  const [userData, setUserData] = useState<PartialUser>({
    _id: '',
    firstName: '',
    lastName: '',
    email: '',
    photo: '',
    online: false,
  });

  const [message, setMessage] = useState('');
  const [allMessages, setAllMessages] = useState([]);

  const currentMsgRef = useRef<HTMLDivElement | null>(null);

  
  const networkStatus = userData.online
    ? NetworkStatus.ONLINE
    : NetworkStatus.OFFLINE;

  useEffect(() => {
    if (currentMsgRef?.current) {
      currentMsgRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  }, [allMessages]);


  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit('chat page', userId);

      socketConnection.emit('read messages', userId);
       
      socketConnection.on('chat user', (data) => {
        setUserData(data);
      });

      socketConnection.on('messages', (data) => {
        setAllMessages(data);
      });
    }
  }, [socketConnection, userId, currentUser]);
 
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setMessage(value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (message.trim()) {
      if (socketConnection) {
        socketConnection?.emit('new message', {
          sender: currentUser._id,
          receiver: userId,
          text: message,
          sentBy: currentUser._id,
        });
        
        setMessage('');
      }
    }
  };

  return (
    <div>
      <header className='chat__header'>
        <div className='chat__user user'>
          <Profile
            userId={userData._id}
            firstName={userData.firstName}
            lastName={userData.lastName}
            imageUrl={userData.photo}
          />
        </div>
        <div className='user__data'>
          <h3 className='user__name'>{`${userData.firstName} ${userData.lastName}`}</h3>
          <p className='user__status'>{networkStatus}</p>
        </div>
      </header>

      <section className='chat__content'>
        <div className='chat__messages'>
          {allMessages.map((msg: Message) => (
            <div
              ref={currentMsgRef}
              key={msg._id}
              className={`message ${
                currentUser._id === msg.sentBy && 'message--current-user'
              }`}
            >
              <p
                className={`message__text ${
                  currentUser._id === msg.sentBy &&
                  'message__text--current-user'
                }`}
              >
                {msg.text}
              </p>
              <p className='message__time'>
                {moment(msg.createdAt).format('D/M/YYYY, h:mm A')}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className='chat__new-message'>
        <form className='chat__form' onSubmit={handleSubmit}>
          <input
            type='text'
            name='text'
            className='chat__new-message-input'
            placeholder='Message'
            onChange={handleInputChange}
            value={message}
          />
          <button type='submit' className='chat__send-btn'>
            <IoIosSend size={25} />
          </button>
        </form>
      </section>
    </div>
  );
};

export default Chat;