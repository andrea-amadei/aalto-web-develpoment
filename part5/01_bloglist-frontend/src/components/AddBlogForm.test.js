import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import ToggleableBlog from './ToggleableBlog';
import userEvent from "@testing-library/user-event";
import AddBlogForm from "./AddBlogForm";

describe('Add Blog form', () => {

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

  it('Calls the handling function correctly when submitting the form', async () => {
    const handleCreate = jest.fn();
    const user = userEvent.setup();

    const element = render(<AddBlogForm handleCreate={handleCreate}/>);

    const titleInput = element.container.querySelector('#title');
    const authorInput = element.container.querySelector('#author');
    const urlInput = element.container.querySelector('#url');

    await user.type(titleInput, blog.title);
    await user.type(authorInput, blog.author);
    await user.type(urlInput, blog.url);

    const submitButton = screen.queryByText('Add');
    await user.click(submitButton);

    expect(handleCreate.mock.calls).toHaveLength(1);
    expect(handleCreate.mock.calls[0]).toEqual([blog.title, blog.author, blog.url]);
  });

});
