import React, { useState } from 'react';

import { useMutation } from '@apollo/react-hooks';

import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

// we already have functionality for capturing form field data from a user and storing it in state using the useState() Hook from React. All we need to do is create the functionality for taking that data on submit and sending it to the server through our mutation

const Signup = () => {

  const [formState, setFormState] = useState({ username: '', email: '', password: '' });

  //You might initially think this is immediately executing the ADD_USER mutation, just as useQuery() would. Instead, the useMutation() Hook creates and prepares a JavaScript function that wraps around our mutation code and returns it to us. In our case, it returns in the form of the addUser function that's returned. We also get the ability to check for errors
  const [addUser,  { error }] = useMutation(ADD_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form (notice the asyn!)
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // use try/catch instead of promises to handle errors
    try {
      // execute addUser mutation and pass in variable data from form
      //With this updated function, we will now pass the data from the form state object as variables for our addUser mutation function. Upon success, we destructure the data object from the response of our mutation and simply log it to see if we're getting our token
      const { data } = await addUser ({
        // here we are passing in our varaible to the addUser function 
        // we are passing in username, email,and password ???
        variables: {...formState }
      });
      // the data returned is our token and user info 
      //console.log(data);
      // we are padding data.addUser.token as the idToken to our login method on auth.js
      //Now when you sign up successfully, you'll be redirected to the homepage with your token stored in localStorage!
      Auth.login(data.addUser.token)
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className='flex-row justify-center mb-4'>
      <div className='col-12 col-md-6'>
        <div className='card'>
          <h4 className='card-header'>Sign Up</h4>
          <div className='card-body'>
            <form onSubmit={handleFormSubmit}>
              <input
                className='form-input'
                placeholder='Your username'
                name='username'
                type='username'
                id='username'
                value={formState.username}
                onChange={handleChange}
              />
              <input
                className='form-input'
                placeholder='Your email'
                name='email'
                type='email'
                id='email'
                value={formState.email}
                onChange={handleChange}
              />
              <input
                className='form-input'
                placeholder='******'
                name='password'
                type='password'
                id='password'
                value={formState.password}
                onChange={handleChange}
              />
              <button className='btn d-block w-100' type='submit'>
                Submit
              </button>
            </form>
            {error && <div> Sign up failed </div>}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
