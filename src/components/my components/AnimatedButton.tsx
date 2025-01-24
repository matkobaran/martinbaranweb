import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface AnimatedButtonProps {
  text: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "wide";
  decoration?: boolean;
}

const AnimatedButton = ({ text, onClick, variant = "primary", decoration }: AnimatedButtonProps) => {
  const variantClasses = {
    primary: "bg-white text-skyblue dark:text-navy",
    secondary: "border-2 border-white",
    wide: "border-2 border-skyblue dark:border-blue-400 flex items-center gap-2 text-skyblue dark:text-blue-400 transition-all",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      className={`
        px-6 py-3 rounded-full font-semibold cursor-pointer 
        ${variantClasses[variant]}
      `}
      onClick={onClick}
      aria-label={text}
    >
      {text}
    {
      decoration?
      <ChevronDown />
        : ""
    }
    </motion.button>
  );
};

export default AnimatedButton;