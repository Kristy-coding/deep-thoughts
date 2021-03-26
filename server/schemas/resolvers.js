//add the following code to import the Mongoose models:
const { User, Thought } = require('../models');

const { AuthenticationError } = require('apollo-server-express');

const { signToken } = require('../utils/auth')

//That's all we need to get this sample code up and running. Nothing to import for the moment, just a simple object called resolvers with a Query nested object that holds a series of methods. These methods get the same name of the query or mutation they are resolvers for. This way, when we use the query helloWorld, this helloWorld() method will execute and return the string "Hello world!


// the resolver queries the MongoDB database and retrieves thought data/ data

// resolvers are similar to controllers we've useed in other projects they define what the routes should execute 

// it serves as the means for performing an action on a data source based on a request. Resolvers are just a bit more specific at times.

//Now when we query thoughts, we will perform a .find() method on the Thought model. We're also returning the thought data in descending order, as can be seen in the .sort() method that we chained onto it. We don't have to worry about error handling here because Apollo can infer if something goes wrong and will respond for us.

//parent: This is if we used nested resolvers to handle more complicated actions, as it would hold the reference to the resolver that executed the nested resolver function. We won't need this throughout the project, but we need to include it as the first argument.

//args: This is an object of all of the values passed into a query or mutation request as parameters. In our case, we destructure the username parameter out to be used.

//context: This will come into play later. If we were to need the same data to be accessible by all resolvers, such as a logged-in user's status or API access token, this data will come through this context parameter as an object.

//info: This will contain extra information about an operation's current state. This isn't used as frequently, but it can be implemented for more advanced uses

const resolvers = {
    Query: {
      //In resolvers.js, you'll need to update the me() method to check for the existence of context.user. If no context.user property exists, then we know that the user isn't authenticated and we can throw an AuthenticationError
      me: async (parent, args, context) => {
        if (context.user) {
          const userData = await User.findOne({ _id: context.user._id })
            .select('-__v -password')
            .populate('thoughts')
            .populate('friends');
      
          return userData;
        }
      
        throw new AuthenticationError('Not logged in');
      },
      thoughts: async (parent, { username }) => {
        const params = username ? { username } : {};
        return Thought.find(params).sort({createdAt: -1 });
      },
      //As you can see in the preceding code, similar to how we handled thoughts, we destructure the _id argument value and place it into our .findOne() method to look up a single thought by its _id
      thought: async (parent, { _id }) => {
        return Thought.findOne ({ _id });
      },
      //With these query resolvers, we can now look up either all users or a single user by their username value. Both of them will omit the Mongoose-specific __v property and the user's password information, which doesn't ever have to return anyway. We also populate the fields for friends and thoughts, so we can get any associated data in return

      // get all users 
      users: async()=> {
        return User.find()
          .select('-__v -password')
          .populate('friends')
          .populate('thoughts');
      },
      // get a user by username 
      user: async(parent, { username }) => {
        return User.findOne({ username })
          .select('-__v -password')
          .populate('friends')
          .populate('thoughts');
      }
    },
    Mutation: {
 
      addUser: async(parent, args) => {
        //Here, the Mongoose User model creates a new user in the database with whatever is passed in as the args
        
        const user = await User.create(args);
        //////Next, update the two mutation resolvers to sign a token and return an object that combines the token with the user's data.
        const token = signToken(user);

        return { token, user };
      },
      login: async(parent, { email, password }) => {
        const user = await User.findOne({ email });

        if (!user) {
          throw new AuthenticationError('Incorrect credentials');
        }
        const correctPw = await user.isCorrectPassword(password);

        if(!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }
        //Next, update the two mutation resolvers to sign a token and return an object that combines the token with the user's data.
        const token = signToken(user);
        return { token, user };

      }
    }
  };
  
  module.exports = resolvers;