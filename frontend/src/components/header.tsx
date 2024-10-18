import React from 'react';
import '../stylesheets/header.css';

interface HeaderProps {
  title: string;
  subtitle: string;
}

const Header: React.FC<HeaderProps> = ({ title , subtitle}) => {
  return (
    <header>
      <h1>{title}</h1>
      <h4>{subtitle}</h4>
    </header>
  );
};

export default Header;
