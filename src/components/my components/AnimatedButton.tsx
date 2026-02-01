import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface AnimatedButtonProps {
  text: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "wide";
  decoration?: boolean;
  icon?: React.ReactNode;
}

const AnimatedButton = ({ text, onClick, variant = "primary", decoration, icon }: AnimatedButtonProps) => {
  const variantClasses = {
    primary: "bg-white text-skyblue dark:text-navy",
    secondary: "border-2 border-white bg-white/15 hover:bg-white/25 shadow-lg shadow-black/20",
    wide: "border-2 border-skyblue dark:border-blue-400 flex items-center gap-2 text-skyblue dark:text-blue-400 transition-all",
  };
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      className={`
        px-6 py-3 rounded-full font-semibold cursor-pointer inline-flex items-center gap-2
        ${variantClasses[variant]}
      `}
      onClick={onClick}
      aria-label={text}
    >
      {icon}
      {text}
      {decoration ? <ChevronDown /> : null}
    </motion.button>
  );
};

export default AnimatedButton;