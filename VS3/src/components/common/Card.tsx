import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hover = false,
}) => {
  return (
    <div
      className={`
        bg-gray-900 rounded-xl p-4 
        border border-gray-800 
        ${hover ? 'transition-transform duration-200 hover:scale-[1.02] hover:shadow-lg' : ''} 
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;