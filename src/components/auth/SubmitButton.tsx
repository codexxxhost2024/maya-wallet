import React from 'react';

type SubmitButtonProps = {
  loading: boolean;
  loadingText?: string;
  text: string;
  onClick?: () => void;
  type?: 'submit' | 'button';
  disabled?: boolean;
};

export default function SubmitButton({
  loading,
  loadingText = 'Processing...',
  text,
  onClick,
  type = 'submit',
  disabled = false
}: SubmitButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#6CBF41] hover:bg-[#5ba936] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6CBF41] disabled:opacity-50"
    >
      {loading ? loadingText : text}
    </button>
  );
}