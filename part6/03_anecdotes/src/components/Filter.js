import { useDispatch } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';

const Filter = () => {

  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    dispatch(setFilter(e.target.value));
  }

  return (
    <div style={{ marginBottom: 20 }}>
      <span>Filter:</span> <input onChange={handleChange} />
    </div>
  )
}

export default Filter;
