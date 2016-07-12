/* eslint-disable no-use-before-define */

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const schema = new Schema({
  name: { type: String,
          required: true,
          minlength: 3,
          validate: { validator: duplicateDogNameValidator } },
  age: { type: Number },
  health: { type: Number, min: 0, max: 100 },
  toy: { type: String, enum: ['Bones', 'Kibble', 'Frisbee'] },
  dateCreated: { type: Date, default: Date.now },
});

schema.methods.feed = function(){
  if (this.health > 90) this.health = 100
  else this.health += 10;
  return this.health;
};

function duplicateDogNameValidator(name, cb) {
  this.model('Dog').find({ name }, (err, dogs) => {
    cb(!dogs.length);
  });
}

module.exports = mongoose.model('Dog', schema);
