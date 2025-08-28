'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail, Lock, Apple, Github, Chrome, LogIn } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Logging in with:', { email, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="max-w-md w-full shadow-xl border border-gray-200 dark:border-gray-700 rounded-2xl">
        <CardContent className="p-8 space-y-6">
          <h2 className="text-2xl font-semibold text-center text-gray-900 dark:text-gray-100">Welcome Back</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400 dark:text-gray-400" />
              <Input
                type="email"
                placeholder="Email"
                className="pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400 dark:text-gray-400" />
              <Input
                type="password"
                placeholder="Password"
                className="pl-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800 flex items-center justify-center gap-2">
              <LogIn className="w-4 h-4" /> Login
            </Button>
          </form>

          <div className="flex items-center gap-2">
            <span className="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
            <span className="text-xs text-gray-500 dark:text-gray-400">or continue with</span>
            <span className="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Button variant="outline" className="w-full flex justify-center items-center gap-2">
              <Apple className="w-5 h-5" />
            </Button>
            <Button variant="outline" className="w-full flex justify-center items-center gap-2">
              <Chrome className="w-5 h-5" />
            </Button>
            <Button variant="outline" className="w-full flex justify-center items-center gap-2">
              <Github className="w-5 h-5" />
            </Button>
          </div>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Don’t have an account? <Link href="/register" className="text-black dark:text-white hover:underline">Sign up</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
