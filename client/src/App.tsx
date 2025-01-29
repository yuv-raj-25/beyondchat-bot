import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { Bot } from 'lucide-react';
import { NavBar } from './components/NavBar';
import { StepIndicator } from './components/StepIndicator';
import { OrganizationStep } from './components/OrganizationStep';
import { TrainingStep } from './components/TrainingStep';
import { IntegrationStep } from './components/IntegrationStep';
import { FormData } from './type';
import "tailwindcss";

const STEPS = ['Organization', 'Training', 'Integration'];

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    companyName: '',
    companyUrl: '',
    companyDescription: '',
    verificationCode: ''
  });

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Toaster position="top-right" />
      <NavBar />
      
      <div className="container mx-auto px-4 py-8 mt-16">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <Bot className="w-8 h-8 text-blue-500" />
          <h1 className="text-3xl font-bold">BeyondChats</h1>
        </motion.div>

        <div className="flex flex-col items-center">
          <StepIndicator currentStep={currentStep} steps={STEPS} />

          <AnimatePresence mode="wait">
            <div className="w-full flex justify-center">
              {currentStep === 0 && (
                <OrganizationStep
                  formData={formData}
                  setFormData={setFormData}
                  onNext={handleNext}
                />
              )}
              {currentStep === 1 && (
                <TrainingStep onNext={handleNext} />
              )}
              {currentStep === 2 && (
                <IntegrationStep />
              )}
            </div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default App;