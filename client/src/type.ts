export interface WebpageStatus {
    url: string;
    status: 'scraped' | 'pending' | 'failed';
    chunks?: string[];
  }
  
  export interface FormData {
    name: string;
    email: string;
    password: string;
    companyName: string;
    companyUrl: string;
    companyDescription: string;
    verificationCode: string;
  }