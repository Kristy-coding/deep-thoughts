//This file will store all of the GraphQL query requests.

import gql from 'graphql-tag';

//We've used similar syntax from the test query we wrote using the GraphQL Playground earlier. Now we've wrapped the entire query code in a tagged template literal using the imported gql function. We've also saved it as QUERY_THOUGHTS and exported it using the ES6 module export syntax.

//And just like that, we can import this query function by name and use it anywhere we need throughout the front end of the application. We'll do that next, so let's get to it!

//This query will be used on the homepage of the application
export const QUERY_THOUGHTS = gql `

    query thoughts($username: String) {
        thoughts(username: $username) {
            _id
            thoughtText
            createdAt
            username
            reactionCount
            reactions{
                _id
                createdAt
                username
                reactionBody
            }
        }
    }

`;