import { motion } from 'framer-motion';
import { Mail, Lock, User, Github } from 'lucide-react';
import { FormData } from '../type';
import "tailwindcss";

interface Props {
  formData: FormData;
  setFormData: (data: FormData) => void;
  onNext: () => void;
  showVerification: boolean;
}

export function RegistrationStep({ formData, setFormData, onNext, showVerification }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md"
    >
      <div className="space-y-4">
        <div className="relative">
          <User className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="relative">
          <Mail className="absolute left-3 top-3 text-gray-400" />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-3 text-gray-400" />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {showVerification && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="relative"
          >
            <input
              type="text"
              placeholder="Verification Code"
              value={formData.verificationCode}
              onChange={(e) => setFormData({ ...formData, verificationCode: e.target.value })}
              className="w-full pl-4 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </motion.div>
        )}

        <button
          onClick={onNext}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          {showVerification ? 'Verify & Continue' : 'Continue'}
        </button>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-gray-700 w-full"></div>
          <span className="bg-gray-900 px-4 text-sm text-gray-400">or</span>
          <div className="border-t border-gray-700 w-full"></div>
        </div>

        <button className="w-full py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2">
          <Github className="w-5 h-5" />
          Continue with Google
        </button>
      </div>
    </motion.div>
  );
}