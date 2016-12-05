'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var heroCtrlStub = {
  index: 'heroCtrl.index',
  show: 'heroCtrl.show',
  create: 'heroCtrl.create',
  upsert: 'heroCtrl.upsert',
  patch: 'heroCtrl.patch',
  destroy: 'heroCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var heroIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './hero.controller': heroCtrlStub
});

describe('Hero API Router:', function() {
  it('should return an express router instance', function() {
    heroIndex.should.equal(routerStub);
  });

  describe('GET /api/heroes', function() {
    it('should route to hero.controller.index', function() {
      routerStub.get
        .withArgs('/', 'heroCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/heroes/:id', function() {
    it('should route to hero.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'heroCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/heroes', function() {
    it('should route to hero.controller.create', function() {
      routerStub.post
        .withArgs('/', 'heroCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/heroes/:id', function() {
    it('should route to hero.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'heroCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/heroes/:id', function() {
    it('should route to hero.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'heroCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/heroes/:id', function() {
    it('should route to hero.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'heroCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
