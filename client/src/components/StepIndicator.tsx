import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import "tailwindcss";
interface StepIndicatorProps {
  currentStep: number;
  steps: string[];
}

export function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  return (
    <div className="flex justify-between w-full max-w-3xl mb-8">
      {steps.map((step, index) => (
        <div key={step} className="flex flex-col items-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 
              ${index < currentStep ? 'bg-green-500' : 
                index === currentStep ? 'bg-blue-500' : 'bg-gray-700'}`}
          >
            {index < currentStep ? (
              <Check className="w-6 h-6 text-white" />
            ) : (
              <span className="text-white">{index + 1}</span>
            )}
          </motion.div>
          <span className="text-sm text-gray-400">{step}</span>
        </div>
      ))}
    </div>
  );
}