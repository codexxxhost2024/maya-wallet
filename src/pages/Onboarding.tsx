import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackgroundSlide from '../components/onboarding/BackgroundSlide';
import OnboardingContent from '../components/onboarding/OnboardingContent';
import Logo from '../components/common/Logo';

const slides = [
  {
    image: 'https://firebasestorage.googleapis.com/v0/b/explore-malaysia-6d28d.appspot.com/o/onboarding%2Ffile-1BZoP7L7Aic2LtQyCzcjvr.webp?alt=media&token=0ed2e311-38e3-4121-a61c-ccf39c6765b3',
    title: 'Maritime Services',
    description: 'Access maritime services and track your shipments in real-time'
  },
  {
    image: 'https://firebasestorage.googleapis.com/v0/b/explore-malaysia-6d28d.appspot.com/o/onboarding%2Ffile-56nJx6aE2oGcqqaqRkuGUF.webp?alt=media&token=7caf998d-e1db-452f-8e08-963ff8fb3448',
    title: 'Entertainment Hub',
    description: 'Watch movies and play games during your free time'
  },
  {
    image: 'https://firebasestorage.googleapis.com/v0/b/explore-malaysia-6d28d.appspot.com/o/onboarding%2Ffile-Gwm3pBZcHipe13N28hFBUP.webp?alt=media&token=af13eb81-5180-4936-b84f-5ca15eea7f5f',
    title: 'Game Center',
    description: 'Access your favorite games anywhere, anytime'
  }
];

export default function Onboarding() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handleGetStarted = () => {
    navigate('/auth/signup'); // Fixed: Updated path to match route definition
  };

  return (
    <div className="h-screen relative overflow-hidden">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <BackgroundSlide
          key={slide.image}
          image={slide.image}
          isActive={currentSlide === index}
        />
      ))}

      {/* Logo */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10">
        <Logo className="w-[180px] h-[60px]" />
      </div>

      {/* Content */}
      {slides.map((slide, index) => (
        <OnboardingContent
          key={index}
          title={slide.title}
          description={slide.description}
          isActive={currentSlide === index}
        />
      ))}

      {/* Navigation Dots */}
      <div className="absolute bottom-24 left-0 right-0 flex justify-center space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentSlide === index ? 'bg-[#6CBF41] w-8' : 'bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Get Started Button */}
      <button
        onClick={handleGetStarted}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-[#6CBF41] text-white px-8 py-3 rounded-lg text-lg font-medium z-10"
      >
        Get Started
      </button>
    </div>
  );
}