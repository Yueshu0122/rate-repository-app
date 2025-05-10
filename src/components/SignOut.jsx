// src/pages/SignOutPage.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-native'; // 或 react-router-dom
import { useSignOut } from '../hooks/useSignOut';

const SignOut = () => {
    const navigate = useNavigate();
    const [signOut] = useSignOut(); // 解构出 signOut 函数
  
    useEffect(() => {
      const handleSignOut = async () => {
        try {
          await signOut(); // 调用 signOut 函数
          navigate('/repositories', { replace: true });
        } catch (error) {
          console.error('Sign out failed:', error);
        }
      };
  
      handleSignOut();
    }, [navigate, signOut]);
  
    return null;
  };
  
  export default SignOut;