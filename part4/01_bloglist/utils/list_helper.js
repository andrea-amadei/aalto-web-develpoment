const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
}

const favoriteBlog = (blogs) => {
  if(blogs.length === 0)
    return null;

  return blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current);
}

const mostBlogs = (blogs) => {
  if(blogs.length === 0)
    return null;

  let authorCount = {};

  blogs.forEach(blog => {
    if(authorCount[blog.author] === undefined)
      authorCount[blog.author] = 1;
    else
      authorCount[blog.author] += 1;
  });

  const author = Object
    .keys(authorCount)
    .reduce((prev, current) => (authorCount[prev] > authorCount[current]) ? prev : current);

  return { author: author, blogs: authorCount[author] };
}

const mostLikes = (blogs) => {
  if(blogs.length === 0)
    return null;

  let authorTotalLikes = {};

  blogs.forEach(blog => {
    if(authorTotalLikes[blog.author] === undefined)
      authorTotalLikes[blog.author] = blog.likes;
    else
      authorTotalLikes[blog.author] += blog.likes;
  });

  const author = Object
    .keys(authorTotalLikes)
    .reduce((prev, current) => (authorTotalLikes[prev] > authorTotalLikes[current]) ? prev : current);

  return { author: author, likes: authorTotalLikes[author] };
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
