// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
// GraphQL demands that we explicitly define the type of data that is returning
// With this custom data type, we are able to instruct the thoughts query so that each thought that returns can include _id, thoughtText, username, and reactionCount fields with their respective GraphQL scalars. The new ones here, ID and Int, are indeed new to us. ID is essentially the same as String except that it is looking for a unique identifier; and Int is simply an integer.

const typeDefs = gql`
    
    type Thought {
        _id: ID
        thoughtText: String
        createdAt: String
        username: String
        reactionCount: Int
        reactions: [Reaction]
    }
    
    type Reaction {
        _id: ID
        reactionBody: String
        createdAt: String
        username: String
    }

    type User {
        _id: ID 
        username: String
        email: String
        friendCount: Int
        thoughts: [Thought]
        friends: [User]
    }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
        thoughts(username: String): [Thought]
        thought(_id: ID!): Thought
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addThought(thoughtText: String!): Thought
        addReaction(thoughtId: ID!, reactionBody: String!): Thought
        addFriend(friendId: ID!): User
}
    type Auth {
        token: ID!
        user: User
    }
`;

// export the typeDefs
module.exports = typeDefs;