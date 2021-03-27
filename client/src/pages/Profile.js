import React from 'react';


//The useParams Hook retrieves the username from the URL, which is then passed to the useQuery Hook. The user object that is created afterwards is used to populate the JSX. This includes passing props to the ThoughtList component to render a list of thoughts unique to this user.
import { useParams } from 'react-router-dom';

import { useQuery } from '@apollo/react-hooks';

import { QUERY_USER } from '../utils/queries';

import ThoughtList from '../components/ThoughtList';

import FriendList from '../components/FriendList';

const Profile = () => {

  const { username: userParam } = useParams();

  const { loading, data } = useQuery(QUERY_USER, {variables: { username: userParam}});

  const user = data?.user || {}

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex-row mb-3">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
          {/* Viewing <usernames>'s profile. */}
          Viewing {user.username}'s profile.
        </h2>
      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
          {/* PRINT THOUGHT LIST 
          
          The user object that is created afterwards is used to populate the JSX. This includes passing props to the ThoughtList component to render a list of thoughts unique to this user
          */}
          <ThoughtList thoughts={user.thoughts} title={`${user.username}'s thoughts...`}/>
          </div>
              
        <div className="col-12 col-lg-3 mb-3">
                {/* PRINT FRIEND LIST 
                friends= and array 
                */}
              <FriendList
                  username = {user.username}
                  friendCount={user.friendCount}
                  friends={user.friends}
              />
          
          </div>
      </div>
    </div>
  );
};

export default Profile;
