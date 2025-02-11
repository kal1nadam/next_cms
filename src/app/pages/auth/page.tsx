// src/app/auth/page.tsx
'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Button, Container, Paper, PasswordInput, TextInput, Title } from '@mantine/core';

export default function AuthPage() {
  // State to toggle between login and registration modes.
  const [isLogin, setIsLogin] = useState(true);
  // Common form state fields.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Additional field for registration.
  const [name, setName] = useState('');
  
  const router = useRouter();

  // Handler for login form submission.
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
      callbackUrl: '/dashboard',
    });
    if (result?.error) {
      alert('Login failed: ' + result.error);
    } else {
      router.push('/dashboard');
    }
  };

  // Handler for registration form submission.
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Call the registration API to create a new user.
      await axios.post('/api/auth/register', { email, password, name });
      // Optionally, sign in automatically after registration.
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
        callbackUrl: '/dashboard',
      });
      if (result?.error) {
        alert('Registration succeeded but sign in failed: ' + result.error);
      } else {
        router.push('/dashboard');
      }
    } catch (error: any) {
      alert('Registration failed: ' + error.response?.data?.error || error.message);
    }
  };

  return (
    <Container size="xs" p="md">
      <Paper radius="md" p="xl" withBorder>
        <Title order={1} mb="md">
          {isLogin ? 'Login' : 'Register'}
        </Title>

        {isLogin ? (
          <form onSubmit={handleLogin}>
            <TextInput
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              mb="md"
            />
            <PasswordInput
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              mb="xl"
            />
            <Button type="submit" fullWidth>
              Login
            </Button>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <TextInput
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              mb="md"
            />
            <TextInput
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              mb="md"
            />
            <PasswordInput
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              mb="xl"
            />
            <Button type="submit" fullWidth>
              Register
            </Button>
          </form>
        )}

        <Button
          variant="subtle" 
          fullWidth 
          mt="md"
          onClick={() => setIsLogin(!isLogin)}
        >
          Switch to {isLogin ? 'Register' : 'Login'}
        </Button>
      </Paper>
    </Container>
  );
}