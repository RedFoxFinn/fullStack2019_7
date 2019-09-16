const blogs = [
  {
    author: 'Mockery Inc',
    id: '5a451df7571c224a31b5c8ce',
    likes: 69,
    title: 'Mocking with ease',
    url: 'http://mockery.inc',
    addedBy: {
      id: '5a437a9e514ab7f168ddf138',
      userName: 'mluukkai',
      name: 'Matti Luukkainen',
      blogs: []
    }
  },
  {
    author: 'ReactIon Org',
    id: '5a451e21e0b8b04a45638211',
    likes: 666,
    title: 'Reaction by React',
    url: 'http://reaction.org',
    addedBy: {
      id: '5a437a9e514ab7f168ddf138',
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      blogs: []
    }
  },
  {
    author: 'Gov. of Jestonia',
    id: '5a451e30b5ffd44a58fa79ab',
    likes: 7,
    title: 'Jest from Jestonia',
    url: 'http://jestonia.gov',
    addedBy: {
      id: '5a437a9e514ab7f168ddf138',
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      blogs: []
    }
  }
];

const getAll = () => {
  return Promise.resolve(blogs);
};

export default {getAll};