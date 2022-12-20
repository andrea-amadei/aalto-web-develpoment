import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector(state => state.notification);

  const style = {
    border: '1px solid green',
    color: 'green',
    padding: (notification ? 10 : 0),
    borderRadius: 5,
    visibility: (notification ? '' : 'hidden')
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification;
