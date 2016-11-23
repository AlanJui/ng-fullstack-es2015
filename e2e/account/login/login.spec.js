'use strict';

var config = browser.params;
var UserModel = require(config.serverConfig.root + '/server/api/user/user.model').default;

describe('Login View', function() {
  var page;

  var loadPage = function() {
    let promise = browser.get(config.baseUrl + '/login');
    page = require('./login.po');
    return promise;
  };

  var testUser = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'test'
  };

  before(function() {
    return UserModel
      .remove()
      .then(function() {
        return UserModel.create(testUser);
      })
      .then(loadPage);
  });

  after(function() {
    return UserModel.remove();
  });

  it('should include login form with correct inputs and submit button', function() {
    page.form.email.getAttribute('type').should.eventually.equal('email');
    page.form.email.getAttribute('name').should.eventually.equal('email');
    page.form.password.getAttribute('type').should.eventually.equal('password');
    page.form.password.getAttribute('name').should.eventually.equal('password');
    page.form.submit.getAttribute('type').should.eventually.equal('submit');
    page.form.submit.getText().should.eventually.equal('Login');
  });

  it('should include oauth buttons with correct classes applied', function() {
    page.form.oauthButtons.facebook.getText().should.eventually.equal('Connect with Facebook');
    page.form.oauthButtons.facebook.getAttribute('class').should.eventually.contain('btn-block');
    page.form.oauthButtons.google.getText().should.eventually.equal('Connect with Google+');
    page.form.oauthButtons.google.getAttribute('class').should.eventually.contain('btn-block');
    page.form.oauthButtons.twitter.getText().should.eventually.equal('Connect with Twitter');
    page.form.oauthButtons.twitter.getAttribute('class').should.eventually.contain('btn-block');
  });

  describe('with local auth', function() {

    it('should login a user and redirecting to "/"', function() {
      return page.login(testUser).then(() => {
        var navbar = require('../../components/navbar/navbar.po');

        return browser.wait(
          () => element(by.css('.hero-unit')),
          5000,
          `Didn't find .hero-unit after 5s`
        ).then(() => {
          browser.getCurrentUrl().should.eventually.equal(config.baseUrl + '/');
          navbar.navbarAccountGreeting.getText().should.eventually.equal('Hello ' + testUser.name);
        });
      });
    });

    describe('and invalid credentials', function() {
      before(function() {
        return loadPage();
      })

      it('should indicate login failures', function() {
        page.login({
          email: testUser.email,
          password: 'badPassword'
        });

        browser.getCurrentUrl().should.eventually.equal(config.baseUrl + '/login');

        var helpBlock = page.form.element(by.css('.form-group.has-error .help-block.ng-binding'));
        helpBlock.getText().should.eventually.equal('This password is not correct.');
      });

    });

  });
});
