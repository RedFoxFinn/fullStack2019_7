import React, {} from 'react';
import {fireEvent, render} from '@testing-library/react';
import SimpleBlog from './SimpleBlog.js';
import Blog from './Blog.js';

const blog = {
  addedBy: {
    blogs: [],
    id: 'testUserId0',
    name: 'testUser',
    userName: 'testUserName'
  },
  author: 'FUBAR',
  id: 'testBlogId0',
  likes: 666,
  title: 'Blog for Tests 0',
  url: 'http://test.blog'
};

describe('blog tests, pt.1', () => {
  const incrementClicks = jest.fn(() => console.log('click'));
  let testBlog = blog.valueOf();
  let component, titleAuthor, likes, likeButton;
  const setup = () => {
    component = render(<SimpleBlog blogInfo={testBlog} clicker={incrementClicks} />);
    titleAuthor = component.container.querySelector('.titleAuthor');
    likes = component.container.querySelector('.likes');
    likeButton = component.container.querySelector('.likeButton');
  };
  test('title exists, pt.1', async (done) => {
    setup();
    expect(titleAuthor).toBeDefined();
    done();
  });
  test('likes exists, pt.1', async (done) => {
    setup();
    expect(likes).toBeDefined();
    done();
  });
  test('like-button exists, pt.1', async (done) => {
    setup();
    expect(likeButton).toBeDefined();
    done();
  });
  test('renders blog, pt.1', async (done) => {
    setup();
    expect(titleAuthor.textContent).toBe(testBlog.title + ' by ' + testBlog.author);
    expect(likes.textContent).toBe('liked: ' + testBlog.likes + ' times');
    expect(likeButton.textContent).toBe('Like Blog');
    done();
  });
  test('event handler value at start is 0, pt.1', async (done) => {
    setup();
    expect(incrementClicks.mock.calls.length).toBe(0);
    done();
  });
  test('likeButton test, event handler called, pt.1', async () => {
    setup();
    for (let x = 0; x < 5; x++) {
      fireEvent.click(likeButton);
    }
    expect(incrementClicks.mock.calls.length).toBe(5);
    fireEvent.click(likeButton);
    expect(incrementClicks.mock.calls.length).toBe(6);
  });
});

describe('blog tests, pt.2', () => {
  const mockLikeBlog = jest.fn(() => console.log('like'));
  const mockDeleteBlog = jest.fn(() => console.log('delete'));
  let testBlog = blog.valueOf();
  let component, foundBlog, titleAuthor, likes, url, likeButton, deleteButton;
  const setup = () => {
    component = render(<Blog like={mockLikeBlog} loggedUser={testBlog.addedBy.userName}
      blogInfo={testBlog} deleteBlog={mockDeleteBlog}/>);
    foundBlog = component.container.querySelector('.blog');
    fireEvent.click(foundBlog);
    titleAuthor = component.container.querySelector('.titleAuthor');
    likes = component.container.querySelector('.likes');
    url = component.container.querySelector('.url');
    likeButton = component.container.querySelector('.likeButton');
    deleteButton = component.container.querySelector('.deleteButton');
  };
  test('title exists, pt.2', async (done) => {
    setup();
    expect(titleAuthor).toBeDefined();
    done();
  });
  test('likes exists, pt.2', async (done) => {
    setup();
    expect(likes).toBeDefined();
    done();
  });
  test('url exists, pt.2', async (done) => {
    setup();
    expect(url).toBeDefined();
    done();
  });
  test('like-button exists, pt.2', async (done) => {
    setup();
    expect(likeButton).toBeDefined();
    done();
  });
  test('delete-button exists, pt.2', async (done) => {
    setup();
    expect(deleteButton).toBeDefined();
    done();
  });
  test('blog renders, pt.2', async (done) => {
    setup();
    expect(foundBlog).toBeDefined();
    expect(titleAuthor.textContent).toBe(testBlog.title + ' by ' + testBlog.author);
    expect(likes.textContent).toBe('liked: ' + testBlog.likes + ' times');
    expect(url.textContent).toBe(testBlog.url);
    expect(likeButton.textContent).toBe('Like Blog');
    expect(deleteButton.textContent).toBe('Delete Blog');
    done();
  });
  test('event handler values at start is 0, pt.2', async (done) => {
    setup();
    expect(mockLikeBlog.mock.calls.length).toBe(0);
    expect(mockDeleteBlog.mock.calls.length).toBe(0);
    done();
  });
  test('deleteButton test, event handler called, pt.2', async () => {
    setup();
    fireEvent.click(deleteButton);
    fireEvent.click(deleteButton);
    expect(mockDeleteBlog.mock.calls.length).toBe(2);
  });
  test('likeButton test, event handler called, pt.2', async () => {
    setup();
    for (let x = 0; x < 5; x++) {
      fireEvent.click(likeButton);
    }
    expect(mockLikeBlog.mock.calls.length).toBe(5);
  });
});