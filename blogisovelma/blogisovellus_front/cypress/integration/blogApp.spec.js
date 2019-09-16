import {testUser, user, clearUrl, addUserUrl, addBlogUrl, loginUrl} from '../../cypress.variables.js';

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2
  }
];
const initialEntry = {
  title: 'wtf is node.js?',
  author: 'Gov. of Nodestania',
  url: 'http://blog.nodestania.org/article_1',
  likes: 69
};
const testBlog = {
  title: 'Cypress is not just a tree',
  author: 'Cypress.io',
  url: 'http://cypress.io/blogs',
  likes: 99
};
const setBlogs = () => {
  initialBlogs.forEach((blog) => {
    cy.request('POST', 'http://localhost:3003/api/blogs', blog);
  });
  return true;
};

before(function() {
  cy.request('POST', `${clearUrl}`);
  cy.request('POST', `${addUserUrl}`, testUser);
  cy.request('POST', `${addUserUrl}`, user);
  cy.request('POST', `${loginUrl}`, {
    userName: testUser.username, pw: testUser.password})
    .then((res) => {
      if (res.status === 200) {
        cy.request({method: 'POST', url: `${addBlogUrl}`,
          headers: {Authorization: `bearer ${res.body.token}`}, body: initialEntry,
        });
      }
    });
});

describe('Login', function() {
  beforeEach(function() {
    cy.visit('/');
  });

  it('Login page loads', function() {
    cy.url().should('match', /login/);
    cy.contains('Saved blogs');
    cy.contains('Login');
  });

  it('Login test - fail', function() {
    cy.url().should('match', /login/);
    cy.get('[data-cy=username]').type(`${testUser.name}`);
    cy.get('[data-cy=password]').type(`${testUser.password}`);
    cy.get('[data-cy=loginSubmit]').click();
    cy.contains('Saved blogs');
    cy.contains('Login');
  });

  it('Login test - success', function() {
    cy.url().should('match', /login/);
    cy.get('[data-cy=username]').type(`${testUser.username}`);
    cy.get('[data-cy=password]').type(`${testUser.password}`);
    cy.get('[data-cy=loginSubmit]').click();
    cy.contains('Saved blogs');
    cy.contains(`Logged: ${name}`);
    cy.contains('Blogs');
    cy.url().should('match', /\//);
  });
});

describe('Logout', function() {
  beforeEach(function() {
    cy.visit('/');
    cy.get('[data-cy=username]').type(`${testUser.username}`);
    cy.get('[data-cy=password]').type(`${testUser.password}`);
    cy.get('[data-cy=loginSubmit]').click();
  });

  it('Login test - logout', function() {
    cy.url().should('match', /\//);
    cy.get('[data-cy=logoutButton]').click();
    cy.contains('Saved blogs');
    cy.contains('Login');
    cy.url().should('match', /login/);
  });
});

describe('Sections', function() {
  beforeEach(function() {
    cy.visit('/');
    cy.get('[data-cy=username]').type(`${testUser.username}`);
    cy.get('[data-cy=password]').type(`${testUser.password}`);
    cy.get('[data-cy=loginSubmit]').click();
  });

  it('Sections - Menu exists', function() {
    cy.contains('home');
    cy.contains('add new');
    cy.contains('users');
  });

  it('Sections - Users', function() {
    cy.get('[data-cy=menuUsers]').click();
    cy.contains('user');
    cy.contains('blogs added');
    cy.url().should('match', /users/);
  });

  it('Sections - Add new', function() {
    cy.get('[data-cy=menuAdd]').click();
    cy.contains('Blog submission');
    cy.url().should('match', /add/);
  });

  it('Sections - Home', function() {
    cy.get('[data-cy=menuAdd]').click();
    cy.get('[data-cy=menuHome]').click();
    cy.contains('Blogs');
    cy.url().should('match', /\//);
  });
});

describe('Functions', function() {
  beforeEach(function() {
    cy.visit('/');
    cy.get('[data-cy=username]').type(`${testUser.username}`);
    cy.get('[data-cy=password]').type(`${testUser.password}`);
    cy.get('[data-cy=loginSubmit]').click();
  });

  it('Functions - Users', function() {
    cy.get('[data-cy=menuUsers]').click();
    cy.contains('user');
    cy.contains('blogs added');
    cy.url().should('match', /users/);
    cy.get(`[data-cy=${testUser.username}]`).click();
    cy.contains(`${name} - ${testUser.username}`);
    cy.contains('added blogs:');
  });

  it('Functions - Blogs', function() {
    cy.url().should('match', /\//);
    cy.get(`[data-cy='${initialEntry.title}']`).click();
    cy.url().should('contain', /blogs/);
  });

  it('Functions - Add new', function() {
    cy.get('[data-cy=menuAdd]').click();
    cy.url().should('match', /add/);
    cy.get('[data-cy=blogTitle]').type(`${testBlog.title}`);
    cy.get('[data-cy=blogAuthor]').type(`${testBlog.author}`);
    cy.get('[data-cy=blogUrl]').type(`${testBlog.url}`);
    cy.get('[data-cy=blogLikes]').type(`${testBlog.likes}`).trigger('change');
    cy.get('[data-cy=blogSubmit]').click();
    cy.get('[data-cy=menuHome]').click();
  });
});