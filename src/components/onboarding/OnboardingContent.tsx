import { motion } from 'framer-motion';

type OnboardingContentProps = {
  title: string;
  description: string;
  isActive: boolean;
};

export default function OnboardingContent({ title, description, isActive }: OnboardingContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="absolute bottom-32 left-0 right-0 text-center px-6"
    >
      <h2 className="text-3xl font-bold mb-4 text-white">{title}</h2>
      <p className="text-lg text-gray-200">{description}</p>
    </motion.div>
  );
}