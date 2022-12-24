import { useState } from 'react';

const AddBlogForm = ({ handleCreate }) => {

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    handleCreate(title, author, url);
  }

  return (
    <form onSubmit={handleSubmit}>
      <table>
        <tbody>
          <tr>
            <td>Title</td>
            <td><input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} /></td>
          </tr>
          <tr>
            <td>Author</td>
            <td><input type="text" id="author" value={author} onChange={(e) => setAuthor(e.target.value)} /></td>
          </tr>
          <tr>
            <td>URL</td>
            <td><input type="text" id="url" value={url} onChange={(e) => setUrl(e.target.value)} /></td>
          </tr>
          <tr>
            <td>
              <input type="submit" value="Add" />
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
}

export default AddBlogForm;
