import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import Button from '../common/Button';
import toast from 'react-hot-toast';

const AuthForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        toast.success('Account created successfully!');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success('Welcome back!');
      }
      onSuccess();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto p-8 bg-gray-900 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-white text-center mb-6">
        Welcome to MyHealth
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 text-white focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 text-white focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        
        <Button 
          type="submit" 
          variant="primary" 
          className="w-full"
          disabled={loading}
        >
          {loading ? 'Loading...' : (isSignUp ? 'Create Account' : 'Sign In')}
        </Button>
      </form>
      
      <button
        onClick={() => setIsSignUp(!isSignUp)}
        className="w-full mt-4 text-sm text-indigo-400 hover:text-indigo-300"
      >
        {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
      </button>
    </div>
  );
};

export default AuthForm;