import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Mail, Lock, User, AlertCircle, ToggleLeft as Google } from 'lucide-react';
import { toast } from 'react-hot-toast';
import "tailwindcss";

interface AuthPopupProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'signin' | 'signup';
}

export function AuthPopup({ isOpen, onClose, type }: AuthPopupProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerification, setShowVerification] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (type === 'signup' && !showVerification) {
      setShowVerification(true);
      toast.success('Verification code sent to your email!');
      return;
    }
    // Handle auth logic here
    toast.success(type === 'signin' ? 'Signed in successfully!' : 'Account created successfully!');
    onClose();
  };

  const handleGoogleAuth = () => {
    // Handle Google auth logic here
    toast.success('Google authentication successful!');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-800 p-6 rounded-xl shadow-xl w-full max-w-md relative"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold mb-6">
          {type === 'signin' ? 'Welcome Back' : 'Create Account'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {type === 'signup' && !showVerification && (
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          )}

          {!showVerification && (
            <>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </>
          )}

          {showVerification && (
            <div className="space-y-4">
              <div className="bg-blue-900/50 border border-blue-800 rounded-lg p-4 flex gap-3">
                <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-200">
                  We've sent a verification code to your email. Please enter it below to complete your registration.
                </p>
              </div>
              <input
                type="text"
                placeholder="Enter verification code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            {type === 'signin' 
              ? 'Sign In' 
              : showVerification 
                ? 'Verify & Create Account' 
                : 'Continue'}
          </button>

          <div className="relative flex items-center justify-center my-6">
            <div className="border-t border-gray-600 w-full"></div>
            <span className="bg-gray-800 px-4 text-sm text-gray-400">or</span>
            <div className="border-t border-gray-600 w-full"></div>
          </div>

          <button
            type="button"
            onClick={handleGoogleAuth}
            className="w-full py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Google className="w-5 h-5" />
            Continue with Google
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}