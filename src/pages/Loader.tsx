import { motion } from 'framer-motion';
import { Plane } from 'lucide-react';

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center">
      <div className="w-full max-w-xs px-8">
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <div className="relative">
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-20 h-20 bg-cornflower-blue-500 rounded-2xl flex items-center justify-center shadow-lg"
            >
              <Plane className="w-10 h-10 text-white" strokeWidth={2} />
            </motion.div>

            {/* Pulse effect */}
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeOut',
              }}
              className="absolute inset-0 bg-cornflower-blue-500 rounded-2xl"
            />
          </div>
        </div>

        {/* Brand */}
        <div className="text-center mb-5">
          <h1 className="text-3xl font-semibold text-gray-700 mb-2">
            FlightSearch
          </h1>
          <p className="text-gray-400 text-sm">
            Initializing your flight search experience
          </p>
        </div>

        {/* Loading dots */}
        <div className="flex justify-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-2 h-2 bg-cornflower-blue-500 rounded-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Loader;
