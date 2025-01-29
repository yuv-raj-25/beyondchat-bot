import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Building2, Globe, FileText, Loader2 } from 'lucide-react';
import { FormData } from '../type';
import "tailwindcss";

// const apiUrl =  "https://beyondchat-bot.vercel.app"// Replace with your actual deployed backend URL
 // Use localhost for development


//  const apiUrl = "http://localhost:4000"
interface Props {
  formData: FormData;
  setFormData: (data: FormData) => void;
  onNext: () => void;
}

export function OrganizationStep({ formData, setFormData, onNext }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMetaDescription = useCallback(async (url: string) => {
    if (!url) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url);
      const text = await response.text();

      // Parse the HTML
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, "text/html");

      // Extract meta description
      const description =
        doc.querySelector('meta[name="description"]')?.getAttribute("content") ||
        doc.querySelector('meta[property="og:description"]')?.getAttribute("content") ||
        "No description found.";

      setFormData({ ...formData, companyDescription: description });
    } catch (error) {
      console.error("Failed to fetch meta description", error);
      setError("Failed to fetch description (CORS blocked)");
    } finally {
      setLoading(false);
    }
  }, [formData, setFormData]);
  useEffect(() => {
    if (formData.companyUrl) {
      fetchMetaDescription(formData.companyUrl);
    }
  }, [formData.companyUrl, fetchMetaDescription]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md"
    >
      <div className="space-y-4">
        <div className="relative">
          <Building2 className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Company Name"
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="relative">
          <Globe className="absolute left-3 top-3 text-gray-400" />
          <input
            type="url"
            placeholder="Company Website URL"
            value={formData.companyUrl}
            onChange={(e) => setFormData({ ...formData, companyUrl: e.target.value })}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="relative">
          <FileText className="absolute left-3 top-3 text-gray-400" />
          <textarea
            placeholder="Company Description"
            value={formData.companyDescription}
            onChange={(e) => setFormData({ ...formData, companyDescription: e.target.value })}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32 resize-none"
          />
          {loading && <Loader2 className="absolute right-3 top-3 animate-spin text-gray-400" />}
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={onNext}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          Continue to Training
        </button>
      </div>
    </motion.div>
  );
}
