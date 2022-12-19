import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import ToggleableBlog from './ToggleableBlog';
import userEvent from "@testing-library/user-event";

describe('Toggleable Blog', () => {

  const blog = {
    title: 'Blog title',
    author: 'Blog Author',
    url: 'https://testurl.org',
    likes: 42,
    user: {
      username: 'Poster',
      name: 'Original Poster',
      id: '639b668c946070f810b976f8'
    },
    id: '639b8ce92a89cb54404dc8f6'
  }

  it('Renders title and author but not likes and url when compact', () => {
    render(<ToggleableBlog blog={blog} />);

    expect(screen.queryByText(blog.title)).toBeDefined();
    expect(screen.queryByText(blog.author)).toBeDefined();

    expect(screen.queryByText(blog.likes)).toBeNull();
    expect(screen.queryByText(blog.url)).toBeNull();
  });

  it('Renders title, author, likes and url when full', async () => {
    render(<ToggleableBlog blog={blog}/>);

    const user = userEvent.setup();
    const button = screen.queryByText('Show more');
    await user.click(button);

    expect(screen.queryByText(blog.title)).toBeDefined();
    expect(screen.queryByText(blog.author)).toBeDefined();

    expect(screen.queryByText(blog.likes)).toBeDefined();
    expect(screen.queryByText(blog.url)).toBeDefined();
  });

  it('Behaves as expected when liking a blog twice', async () => {
    const handleLike = jest.fn();

    render(<ToggleableBlog blog={blog} handleLike={handleLike}/>);

    const user = userEvent.setup();

    const showMoreButton = screen.queryByText('Show more');
    await user.click(showMoreButton);

    const likeButton = screen.queryByText('Like');
    await user.click(likeButton);
    await user.click(likeButton);

    expect(handleLike.mock.calls).toHaveLength(2);
  });

});
