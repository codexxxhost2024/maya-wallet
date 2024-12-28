import { Link } from 'react-router-dom';

interface AuthFooterProps {
  mode: 'signup' | 'signin';
}

export default function AuthFooter({ mode }: AuthFooterProps) {
  const content = mode === 'signup' 
    ? {
        text: 'Already have an account?',
        linkText: 'Log in',
        to: '/auth/login',
        className: 'text-[#6CBF41] hover:text-[#5ba936] font-medium transition-colors duration-200'
      }
    : {
        text: 'Don\'t have an account?',
        linkText: 'Sign up',
        to: '/auth/signup',
        className: 'text-[#6CBF41] hover:text-[#5ba936] font-medium transition-colors duration-200'
      };

  return (
    <div className="text-center mt-6 pt-5 border-t border-gray-200">
      <p className="text-sm text-gray-600">
        {content.text}{' '}
        <Link 
          to={content.to}
          className={`${content.className} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6CBF41] rounded`}
          role="button"
          aria-label={content.linkText}
        >
          {content.linkText}
        </Link>
      </p>
    </div>
  );
}