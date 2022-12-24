const FullBlogEntry = ({ blog, setFull, handleLike, handleDelete }) => {

  const userId = localStorage.getItem('id');

  return (
    <div className="blog">
      <button onClick={() => setFull(false)}>Show less</button>
      <table>
        <tbody>
          <tr>
            <td><b>Title</b></td>
            <td>{blog.title}</td>
          </tr>
          <tr>
            <td><b>Author</b></td>
            <td>{blog.author}</td>
          </tr>
          <tr>
            <td><b>URL</b></td>
            <td><a href={blog.url}>{blog.url}</a></td>
          </tr>
          <tr>
            <td><b>Likes</b></td>
            <td><span className="blog-likes">{blog.likes}</span> <button className="blog-like-button" onClick={() => handleLike(blog)}>Like</button></td>
          </tr>
          <tr>
            <td><b>Posted by</b></td>
            <td><span>{blog.user.username}</span></td>
          </tr>
          <tr>
            <td><b>Remove</b></td>
            <td>{(userId === blog.user.id ?
              <button onClick={() => handleDelete(blog)}>Delete</button>
              :
              'Only the owner of the blog can delete it'
            )}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default FullBlogEntry;
