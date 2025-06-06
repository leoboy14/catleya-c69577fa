import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AiJobSidebarProps {
  onAddJob: any;
}

export const AiJobSidebar = ({ onAddJob }: AiJobSidebarProps) => {
  return (
    <div className="w-80 bg-green-50 border-l border-green-200 p-6 min-h-screen">
      {/* Sidebar is empty. */}
    </div>
  );
};
