import React from 'react';

type LogoProps = {
  className?: string;
};

export default function Logo({ className = "w-[150px] h-[50px]" }: LogoProps) {
  return (
    <picture>
      {/* Dark mode logo */}
      <source
        srcSet="https://firebasestorage.googleapis.com/v0/b/explore-malaysia-6d28d.appspot.com/o/logo.png?alt=media&token=9fcd6314-8504-4512-8f6d-9a9e4dc4a70e"
        media="(prefers-color-scheme: dark)"
      />
      {/* Light mode logo */}
      <img
        src="https://firebasestorage.googleapis.com/v0/b/explore-malaysia-6d28d.appspot.com/o/logo1.png?alt=media&token=376ad770-6a70-433e-86ec-9bc746c16035"
        alt="Panyero"
        className={`object-contain ${className}`}
      />
    </picture>
  );
}