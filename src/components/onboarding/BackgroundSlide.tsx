import { motion, AnimatePresence } from 'framer-motion';

type BackgroundSlideProps = {
  image: string;
  isActive: boolean;
};

export default function BackgroundSlide({ image, isActive }: BackgroundSlideProps) {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <img
            src={image}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}