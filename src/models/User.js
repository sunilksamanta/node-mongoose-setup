const mongoose = require("mongoose");
const  { Schema } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

class User {

  initSchema() {
    const schema = new Schema({
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        unique: true,
        required: true,
      },
      password: {
        type: String,
        required: true,
        select: false
      },
      role: {
        type: String,
        enum: ['admin'],
        default: 'admin'
      },
      status: {
        type: Boolean,
        required: true,
        default: true
      }
    }, { timestamps: true });
    schema.pre('save', function(next) {
      const user = this;

      // only hash the password if it has been modified (or is new)
      if (!user.isModified('password')) return next();

      // generate a salt
      bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) return next(err);

          // override the cleartext password with the hashed one
          user.password = hash;
          next();
        });
      });
    });
    schema.methods.comparePassword = async function(candidatePassword) {
      return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
          if (err) {
            reject(err);
          } else {
            resolve(isMatch);
          }
        });
      });
    };
    schema.statics.findByEmail = function(email) {
      return this.findOne({ email: email });
    };
    schema.plugin(uniqueValidator);
    try {
      mongoose.model("user", schema);
    }catch (e) {

    }

  }

  getInstance() {
    this.initSchema();
    return mongoose.model("user");
  }
}

module.exports = { User };
