import React from 'react';

import { Link } from 'react-router-dom';

  //Here we instruct that the ThoughtList component will receive two props: a title and the thoughts array being render from the profile component in Profile.js and also from the hompage component (the props mean different things depending on where the thoughlist is being rendered)... 
const ThoughtList = ({ thoughts, title }) => {

    //We conditionally render JSX by checking to see if there's even any data in the thoughts array first. If there's no data, then we return a message stating that. If there is data, then we return a list of thoughts using the .map() method
    if (!thoughts.length) {
        return <h3> Thoughts Yet </h3>;
    }

    return (
        <div>
            <h3>{title}</h3>
            {/* short circuit conditionals... if thoughts is true run thoughts.map
                map will return a new array where the function has run on each item
                , also remember map always needs a key to help with virtual dom
                ..It helps React internally track which data needs to be re-rendered if something changes
            */}
            {thoughts &&
            thoughts.map(thought => (
                <div key={thought._id} className="card mb-3">
                    <p className="card-header">
                        <Link
                            to={`/profile/${thought.username}`}
                            style= {{ fontWeight: 700 }}
                            className = "text-light"
                        >
                            {thought.username}
                        </Link> {''}
                            thought on {thought.createdAt}
                    </p>
                    <div className="card-body">
                        <Link to={`/thought/${thought._id}`}>
                            <p>{thought.thoughtText}</p>
                            <p className="mb-0">
                            {/* conditional/ ternary operator If condition is true, the operator has the value of val1. Otherwise it has the value of val2. You can use the conditional operator anywhere you would use a standard operator.
                            
                            Notice how we also check to see the value of thought.reactionCount. We're conditionally displaying a message to contextualize what the call to action should be. If there are no reactions, the user will start the discussion by adding the first reaction. If there are reactions, the user will view or add their own reaction to an existing list.
                            
                            */}
                            Reactions: {thought.reactionCount} || Click to{' '}
                            {thought.reactionCount ? 'see' : 'start'} the discussion!
                            </p>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}; 


export default ThoughtList;