const BlogEntry = ({ blog, setFull }) => {
  return (
    <div className="blog">
      <button onClick={() => setFull(true)}>Show more</button>
      <div><b>{blog.title}</b> - <span>{blog.author}</span></div>
    </div>
  );
}

export default BlogEntry;
