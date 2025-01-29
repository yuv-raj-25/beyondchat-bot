import { motion } from "framer-motion";
import { useState } from "react";
import { Code2, Mail, ExternalLink, X } from "lucide-react";
import Confetti from "react-confetti";
import { toast } from "react-hot-toast";
import "tailwindcss";

const DUMMY_SCRIPT = `<script>
  window.BEYONDCHATS_CONFIG = {
    botId: "your-bot-id",
    theme: "dark"
  };
</script>
<script src="https://cdn.beyondchats.com/widget.js" async></script>`;

export function IntegrationStep() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [email, setEmail] = useState("");

  const handleTestIntegration = () => {
    setShowSuccess(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(DUMMY_SCRIPT);
    toast.success("Code copied to clipboard!");
  };

  const handleSendEmail = () => {
    if (!email) {
      toast.error("Please enter an email address");
      return;
    }
    toast.success(`Instructions sent to ${email}`);
    setEmail("");
  };

  if (showSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        {showConfetti && <Confetti />}
        <h2 className="text-3xl font-bold mb-6">
          🎉 Integration Successful!
        </h2>

        <div className="space-y-4">
          <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            Explore Admin Panel
          </button>

          <button className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
            Start Talking to Your Chatbot
          </button>

          {/* Social Media Buttons */}
          <div className="flex gap-4 justify-center mt-6">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-[#1DA1F2] hover:bg-[#1a8cd8] rounded-full"
            >
              <ExternalLink className="w-5 h-5 text-white" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-[#0077B5] hover:bg-[#006097] rounded-full"
            >
              <ExternalLink className="w-5 h-5 text-white" />
            </a>
          </div>

          {/* Reset Button to Test Again */}
          <button
            onClick={() => setShowSuccess(false)}
            className="w-full mt-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <X className="w-5 h-5" />
            Test Again
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-2xl"
    >
      <div className="space-y-6">
        {/* Test Chatbot Button */}
        <button
          onClick={() =>
            window.open("https://beyondchats.com", "_blank")
          }
          className="fixed bottom-4 right-4 py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-colors flex items-center justify-center gap-2"
        >
          <ExternalLink className="w-5 h-5" />
          Test Chatbot
        </button>

        {/* Integration Options */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">
            Integration Options
          </h3>

          <div className="space-y-4">
            {/* Copy Code Section */}
            <div className="bg-gray-900 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-blue-500" />
                  <h4 className="font-medium">
                    Copy Integration Code
                  </h4>
                </div>
                <button
                  onClick={copyCode}
                  className="px-4 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm"
                >
                  Copy
                </button>
              </div>
              <pre className="bg-black rounded p-4 text-sm overflow-x-auto">
                {DUMMY_SCRIPT}
              </pre>
            </div>

            {/* Email Instructions Section */}
            <div className="bg-gray-900 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4">
                <Mail className="w-5 h-5 text-blue-500" />
                <h4 className="font-medium">
                  Email Instructions to Developer
                </h4>
              </div>
              <input
                type="email"
                placeholder="Developer's Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleSendEmail}
                className="w-full mt-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Send Instructions
              </button>
            </div>
          </div>
        </div>

        {/* Test Integration Button */}
        <button
          onClick={handleTestIntegration}
          className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
        >
          Test Integration
        </button>
      </div>
    </motion.div>
  );
}
