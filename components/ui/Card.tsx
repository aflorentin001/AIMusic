import React from 'react';
import { cn } from '@/lib/utils';
import type { CardProps } from '@/types';

const Card: React.FC<CardProps> = ({ title, description, children, className, footer }) => {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl',
        className
      )}
    >
      {(title || description) && (
        <div className="px-6 py-5 border-b border-gray-100">
          {title && (
            <h3 className="text-xl font-semibold text-gray-900 mb-1">{title}</h3>
          )}
          {description && (
            <p className="text-sm text-gray-600">{description}</p>
          )}
        </div>
      )}
      <div className="px-6 py-5">{children}</div>
      {footer && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
