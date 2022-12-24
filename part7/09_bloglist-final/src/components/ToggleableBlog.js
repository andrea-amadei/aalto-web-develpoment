import { useState } from 'react';
import FullBlogEntry from './FullBlogEntry';
import BlogEntry from './BlogEntry';

const ToggleableBlog = ({ blog, handleLike, handleDelete }) => {

  const [full, setFull] = useState(false);

  return (
    <>
      {(full ?
        <FullBlogEntry blog={blog} setFull={setFull} handleLike={handleLike} handleDelete={handleDelete} />
        :
        <BlogEntry blog={blog} setFull={setFull} />
      )}
    </>
  );
}

export default ToggleableBlog;
