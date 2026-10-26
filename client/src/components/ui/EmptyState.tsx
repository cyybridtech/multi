import React from 'react';
import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  variant?: 'empty' | 'error' | 'loading';
}

export function EmptyState({ title, description, icon, action, variant = 'empty' }: EmptyStateProps) {
  return (
    <div
      role={variant === 'error' ? 'alert' : 'status'}
      aria-live="polite"
      className="flex flex-col items-center justify-center px-4 py-16 text-center"
    >
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-300">
        <span aria-hidden="true">{icon || <Inbox size={32} />}</span>
      </div>
      <h3 className="text-base font-semibold text-gray-700">{title}</h3>
      {description && <p className="mt-1 max-w-sm text-sm text-gray-500">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
