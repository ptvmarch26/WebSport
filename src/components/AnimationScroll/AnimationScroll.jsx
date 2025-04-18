import { motion } from "framer-motion";

const presets = {
  fade: {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
  },
  fadeUp: {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
  },
  slideLeft: {
    initial: { opacity: 0, x: 100 },
    whileInView: { opacity: 1, x: 0 },
  },
  slideRight: {
    initial: { opacity: 0, x: -100 },
    whileInView: { opacity: 1, x: 0 },
  },
  zoomIn: {
    initial: { opacity: 0, scale: 0.8 },
    whileInView: { opacity: 1, scale: 1 },
  },
};

const AnimationScroll = ({
  children,
  type = "fadeUp",
  duration = 0.6,
  delay = 0,
}) => {
  const { initial, whileInView } = presets[type] || presets.fadeUp;

  return (
    <motion.div
      initial={initial}
      whileInView={whileInView}
      exit={initial}
      transition={{ duration, delay }}
      viewport={{ once: false, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

export default AnimationScroll;
