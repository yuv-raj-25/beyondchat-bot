import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Menu, X, LogIn, UserPlus, ChevronDown } from 'lucide-react';
import { AuthPopup } from './AuthPopup';
import "tailwindcss";

export function NavBar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authType, setAuthType] = useState<'signin' | 'signup'>('signin');

  const handleAuthClick = (type: 'signin' | 'signup') => {
    setAuthType(type);
    setShowAuthPopup(true);
  };

  return (
    <>
      <nav className="bg-gray-800/50 backdrop-blur-lg border-b border-gray-700 fixed w-full top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Bot className="w-8 h-8 text-blue-500" />
              <a href="/home" className="text-xl font-bold">BeyondChats</a>
              {/* <span className="text-xl font-bold">BeyondChats</span> */}
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
              <a href="#docs" className="text-gray-300 hover:text-white transition-colors">Documentation</a>
              
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setShowAuthPopup(!showAuthPopup)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
                  >
                    <span>My Account</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <AnimatePresence>
                    {showAuthPopup && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden"
                      >
                        <a href="/dashboard" className="block px-4 py-2 hover:bg-gray-700 transition-colors">Dashboard</a>
                        <a href="/settings" className="block px-4 py-2 hover:bg-gray-700 transition-colors">Settings</a>
                        <button
                          onClick={() => setIsLoggedIn(false)}
                          className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700 transition-colors"
                        >
                          Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleAuthClick('signin')}
                    className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                  >
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </button>
                  <button 
                    onClick={() => handleAuthClick('signup')}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
                  >
                    <UserPlus className="w-4 h-4" />
                    Sign Up
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-700"
            >
              <div className="container mx-auto px-4 py-4 space-y-4">
                <a href="#features" className="block text-gray-300 hover:text-white transition-colors">Features</a>
                <a href="#pricing" className="block text-gray-300 hover:text-white transition-colors">Pricing</a>
                <a href="#docs" className="block text-gray-300 hover:text-white transition-colors">Documentation</a>
                
                {isLoggedIn ? (
                  <div className="space-y-2">
                    <a href="/dashboard" className="block text-gray-300 hover:text-white transition-colors">Dashboard</a>
                    <a href="/settings" className="block text-gray-300 hover:text-white transition-colors">Settings</a>
                    <button
                      onClick={() => setIsLoggedIn(false)}
                      className="w-full text-left text-red-400 hover:text-red-300 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <button
                      onClick={() => handleAuthClick('signin')}
                      className="w-full flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                    >
                      <LogIn className="w-4 h-4" />
                      Sign In
                    </button>
                    <button 
                      onClick={() => handleAuthClick('signup')}
                      className="w-full flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
                    >
                      <UserPlus className="w-4 h-4" />
                      Sign Up
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <AnimatePresence>
        {showAuthPopup && (
          <AuthPopup
            isOpen={showAuthPopup}
            onClose={() => setShowAuthPopup(false)}
            type={authType}
          />
        )}
      </AnimatePresence>
    </>
  );
}