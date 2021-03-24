const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!']
    },
    password: {
      type: String,
      required: true,
      minlength: 5
    },
    thoughts: [
      {

        // thought IDs will be in here as an array
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
    friends: [
      {
        // friend IDs will be in here as an array 
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

//For the User model, we have a few new things in place to handle user password hashing using the bcrypt library. This works similar to how we implemented it with Sequelize in previous projects, but the Mongoose way of doing it is slightly different, as the following code shows:

//Just like Express.js, Mongoose implements something called middleware to capture our data before getting to or coming from the database and manipulating it. In our case, we check to see if the data is new or if the password has been modified. This way we can use this same middleware for both new users and users who are updating their information but don't want to update their password values.

// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;
