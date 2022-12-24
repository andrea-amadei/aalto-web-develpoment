import './Notification.css'
import { useSelector } from 'react-redux';

const Notification = () => {
  const { message, type } = useSelector(state => state.notification);

  return (
    !message ?
      <></>
    :
      <div className={'notification ' + type}>
        {message}
      </div>
  )
}

export default Notification;
