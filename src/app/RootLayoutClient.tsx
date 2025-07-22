'use client';

import React from 'react';
import StoreProvider from '../providers/StoreProvider';

interface RootLayoutClientProps {
  children: React.ReactNode;
}

export default function RootLayoutClient({ children }: RootLayoutClientProps) {
  return (
    <StoreProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {children}
      </div>
    </StoreProvider>
  );
}
