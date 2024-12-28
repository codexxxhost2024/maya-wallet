type OnboardingSlideProps = {
  image: string;
  title: string;
  description: string;
};

export default function OnboardingSlide({ image, title, description }: OnboardingSlideProps) {
  return (
    <div className="h-full flex flex-col">
      <img 
        src={image} 
        alt={title}
        className="h-2/3 w-full object-cover"
      />
      <div className="p-6 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600 text-center mb-8">{description}</p>
      </div>
    </div>
  );
}