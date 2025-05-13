import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import Button from '../common/Button';

const AuthForm = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (isSignUp) {
        await supabase.auth.signUp({ email, password });
        alert('Account created!');
      } else {
        await supabase.auth.signInWithPassword({ email, password });
        alert('Logged in!');
      }
      onSuccess();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="max-w-sm mx-auto p-6 bg-gray-900 rounded-lg">
      <h2 className="text-xl text-white text-center mb-4">
        {isSignUp ? 'Create Account' : 'Sign In'}
      </h2>
      
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 bg-gray-800 rounded text-white"
        />
        
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-3 bg-gray-800 rounded text-white"
        />
        
        <Button type="submit" variant="primary" className="w-full">
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </Button>
      </form>
      
      <button
        onClick={() => setIsSignUp(!isSignUp)}
        className="w-full mt-3 text-indigo-400"
      >
        {isSignUp ? 'Already have an account?' : 'Need an account?'}
      </button>
    </div>
  );
};

export default AuthForm;