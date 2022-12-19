describe('Login', function() {

  const testUser = {
    username: 'TestGuy42',
    name: 'Guy Test',
    password: 'abc'
  }

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3000/api/testing/reset')
      .then(() => {
        cy.request('POST', 'http://localhost:3000/api/users', testUser).then(() => {
          cy.visit('http://localhost:3000');
        });
      });
  });

  it('Login form exists', function() {
    cy.contains('Login');

    cy.contains('Username');
    cy.contains('Password');
    cy.get('.login-button');
  });

  it('Login succeeds when username and password are correct', function() {
    cy.get('#username').type(testUser.username);
    cy.get('#password').type(testUser.password);
    cy.get('.login-button').click();

    cy.contains('Successfully logged in').as('notification');
    cy.get('@notification').should('have.class', 'success');

    cy.contains('Logged in as ' + testUser.username);
  });

  it('Login fails when username or password are incorrect', function() {
    cy.get('#username').type(testUser.username);
    cy.get('#password').type(testUser.password + 'x');
    cy.get('.login-button').click();

    cy.contains('Invalid username or password').as('notification');
    cy.get('@notification').should('have.class', 'error');
  });
});

describe('When logged in', function() {

  const hardcodedUser = {
    username: 'Jeff',
    name: 'Jeff',
    password: '123'
  }

  const hardcodedBlog1 = {
    title: 'Hardcoded Blog 1',
    author: 'Hardcoded Author',
    url: 'https://testurl.org'
  }

  const hardcodedBlog2 = {
    title: 'Hardcoded Blog 2',
    author: 'Hardcoded Author',
    url: 'https://testurl.org',
    likes: 7
  }

  const testUser = {
    username: 'TestGuy42',
    name: 'Guy Test',
    password: 'abc'
  }

  const testBlog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'https://testurl.org'
  }

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3000/api/testing/reset');
    cy.request('POST', 'http://localhost:3000/api/users', testUser);

    cy.request('POST', 'http://localhost:3000/api/users', hardcodedUser)
      .then(({ body }) => {

        const hardcodedUserId = body.id;

        cy.request('POST', 'http://localhost:3000/api/login', hardcodedUser)
          .then(({ body }) => {

            const hardcodedUserToken = body.token;

            cy.request({
              method: 'POST',
              url: 'http://localhost:3000/api/blogs',
              body: { ...hardcodedBlog1, userId: hardcodedUserId },
              auth: { bearer: hardcodedUserToken }
            })
              .then(() => {

                cy.request({
                  method: 'POST',
                  url: 'http://localhost:3000/api/blogs',
                  body: { ...hardcodedBlog2, userId: hardcodedUserId },
                  auth: { bearer: hardcodedUserToken }
                })
                .then(() => {
                  cy.request('POST', 'http://localhost:3000/api/login', testUser)
                    .then(({ body }) => {
                      localStorage.setItem('token', body.token);
                      localStorage.setItem('id', body.id);
                      localStorage.setItem('username', body.username);

                      cy.visit('http://localhost:3000');
                    });
                })
              });
          });
    });
  });

  it('Blogs can be created and deleted, but only by their owner', function () {
    cy.contains('New blog').click();

    cy.get('#title').type(testBlog.title);
    cy.get('#author').type(testBlog.author);
    cy.get('#url').type(testBlog.url);

    cy.contains('Add').click();

    cy.contains('Blog added successfully').as('notification');
    cy.get('@notification').should('have.class', 'success');

    cy.get('.blog-list').children().should('have.length', 3);

    cy.get('.blog-list').children().last().as('new-blog');
    cy.get('@new-blog').contains('Show more').click();
    cy.get('@new-blog').contains('Delete').click();

    cy.contains('Blog removed successfully').as('notification');
    cy.get('@notification').should('have.class', 'warning');

    cy.get('.blog-list').children().should('have.length', 2);

    cy.get('.blog-list').children().last().as('hardcoded-blog');
    cy.get('@hardcoded-blog').contains('Show more').click();

    cy.get('@hardcoded-blog').should('not.contain', 'Delete');
  });

  it('Blogs can be liked', function () {
    cy.get('.blog-list').children().last().as('hardcoded-blog');
    cy.get('@hardcoded-blog').contains('Show more').click();

    cy.get('@hardcoded-blog').get('.blog-likes').should('contain', 0);

    cy.get('@hardcoded-blog').get('.blog-like-button').click();

    cy.get('@hardcoded-blog').get('.blog-likes').should('contain', 1);
  });

  it('Blogs are ordered by number of likes', function () {
    cy.get('.blog-list').children().first().as('first')
    cy.get('.blog-list').children().last().as('last')

    cy.get('@first').contains('Show more').click();
    cy.get('@last').contains('Show more').click();

    cy.get('@first').get('.blog-likes').should('contain', 7);
    cy.get('@last').get('.blog-likes').should('contain', 0);
  });
});
