import React from 'react';
import * as Icons from 'lucide-react';

interface LucideIconProps {
  name: string;
  className?: string;
}

export const LucideIcon: React.FC<LucideIconProps> = ({ name, className = 'w-4 h-4' }) => {
  const IconComponent = (Icons as Record<string, any>)[name] || Icons.CircleDot;
  return <IconComponent className={className} />;
};
