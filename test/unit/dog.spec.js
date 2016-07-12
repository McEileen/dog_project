/* eslint-disable no-unused-expressions */

const expect = require('chai').expect;
const Dog = require('../../dst/models/dog');
const sinon = require('sinon');

describe('Dog', () => {
  beforeEach(() => {
    sinon.stub(Dog, 'find').yields(null, []);
  });

  afterEach(() => {
    Dog.find.restore();
  });

  describe('#feed', () => {
    it('should add 10 to the dogs health', () => {
      const d = new Dog({ name: 'fido',
                          age: 3,
                          health: 50,
                          toy: 'Bones' });
      d.feed((health) => {
        expect(health).to.equal(60);
      });
    });
    it('should add only 5 to the dogs health', () => {
      const d = new Dog({ name: 'fido',
                          age: 3,
                          health: 95,
                          toy: 'Bones' });
      d.feed((health) => {
        expect(health).to.equal(100);
      });
    });
    it('should add nothing to the dogs health, already max', () => {
      const d = new Dog({ name: 'fido',
                          age: 3,
                          health: 100,
                          toy: 'Bones' });
      d.feed((health) => {
        expect(health).to.equal(100);
      });
    });
  });

// Chyld's example below
  // describe('#feed', () => {
  //   it('should add 10 to the dogs health', sinon.test(function (done) {
  //     const d = new Dog({ name: 'fido',
  //                         age: 3,
  //                         health: 50,
  //                         toy: 'Bones' });
  //     this.stub(d, 'save').yields(null, { health: 60 });
  //     d.feed((health) => {
  //       sinon.assert.calledOnce(d.save);
  //       expect(health).to.equal(60);
  //       done();
  //     });
  //   }));
  // });

  describe('constructor', () => {
    it('should create a dog object', (done) => {
      const d = new Dog({ name: 'fido',
                          age: 3,
                          health: 50,
                          toy: 'Bones' });
      d.validate(err => {
        expect(err).to.be.undefined;
        expect(d.name).to.equal('fido');
        expect(d._id).to.be.ok;
        expect(d.dateCreated).to.be.ok;
        done();
      });
    });
    it('should NOT create a dog object - negative health', (done) => {
      const d = new Dog({ name: 'fido',
                          age: 3,
                          health: -50,
                          toy: 'Bones' });
      d.validate(err => {
        expect(err).to.be.ok;
        done();
      });
    });
    it('should NOT create a dog object - excessive health', (done) => {
      const d = new Dog({ name: 'fido',
                          age: 3,
                          health: 150,
                          toy: 'Bones' });
      d.validate(err => {
        expect(err).to.be.ok;
        done();
      });
    });
    it('should NOT create a dog object - no name', (done) => {
      const d = new Dog({ age: 3,
                          health: 10,
                          toy: 'Bones' });
      d.validate(err => {
        expect(err).to.be.ok;
        done();
      });
    });
    it('should NOT create a dog object - name too short', (done) => {
      const d = new Dog({ name: 'bb',
                          age: 3,
                          health: 90,
                          toy: 'Bones' });
      d.validate(err => {
        expect(err).to.be.ok;
        done();
      });
    });
    it('should NOT create a dog object - invalid toy', (done) => {
      const d = new Dog({ name: 'Animal',
                          age: 3,
                          health: 90,
                          toy: 'Cat' });
      d.validate(err => {
        expect(err).to.be.ok;
        done();
      });
    });
    it('should NOT create a dog object - duplicate dog found', (done) => {
      Dog.find.yields(null, [{ name: 'max' }]);
      const d = new Dog({ name: 'max',
                          age: 3,
                          health: 90,
                          toy: 'Bones' });
      d.validate(err => {
        expect(err).to.be.ok;
        sinon.assert.calledWith(Dog.find, { name: 'max' });
        done();
      });
    }); // end sinon.test
    // it('should NOT create a dog object - duplicate dog found', sinon.test(function(done) {
    //   this.stub(Dog, 'find').yields(null, [{ name: 'max' }]);
    //   const d = new Dog({ name: 'max',
    //                       age: 3,
    //                       health: 90,
    //                       toy: 'Bones' });
    //   d.validate(err => {
    //     expect(err).to.be.ok;
    //     sinon.assert.calledWith(Dog.find, { name: 'max' });
    //     done();
    //   });
    // })); // end sinon.test
  }); // end constructor
}); // end dog
