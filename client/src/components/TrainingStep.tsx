import { motion } from 'framer-motion';
import { useState } from 'react';
import { WebpageStatus } from '../type';
import { CheckCircle2, Clock, XCircle, ChevronDown, ChevronUp } from 'lucide-react';
import "tailwindcss";

const dummyWebpages: WebpageStatus[] = [
  {
    url: '/about',
    status: 'scraped',
    chunks: [
      'Company founded in 2020',
      'Specializing in AI solutions',
      'Global team of experts'
    ]
  },
  {
    url: '/services',
    status: 'pending'
  },
  {
    url: '/contact',
    status: 'failed'
  }
];

export function TrainingStep({ onNext }: { onNext: () => void }) {
  const [expandedUrl, setExpandedUrl] = useState<string | null>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scraped':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-2xl"
    >
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Website Scraping Progress</h3>
        
        <div className="space-y-4">
          {dummyWebpages.map((webpage) => (
            <div key={webpage.url} className="bg-gray-900 rounded-lg p-4">
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setExpandedUrl(expandedUrl === webpage.url ? null : webpage.url)}
              >
                <div className="flex items-center gap-3">
                  {getStatusIcon(webpage.status)}
                  <span>{webpage.url}</span>
                </div>
                {webpage.chunks && (
                  expandedUrl === webpage.url ? 
                    <ChevronUp className="w-5 h-5" /> : 
                    <ChevronDown className="w-5 h-5" />
                )}
              </div>
              
              {expandedUrl === webpage.url && webpage.chunks && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-4 pl-8 space-y-2"
                >
                  {webpage.chunks.map((chunk, index) => (
                    <div key={index} className="text-sm text-gray-400 bg-gray-800 p-2 rounded">
                      {chunk}
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-between">
          <div className="text-sm text-gray-400">
            Training Progress: 33%
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '33%' }}
                className="bg-blue-500 h-2 rounded-full"
              />
            </div>
          </div>
        </div>

        <button
          onClick={onNext}
          className="w-full mt-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          Continue to Integration
        </button>
      </div>
    </motion.div>
  );
}