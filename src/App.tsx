import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { QrCode, Link, FileText, Mail, Phone, MessageSquare, Download, Copy, RefreshCw, Heart, Home, Info, Shield, Github, Linkedin, Twitter } from 'lucide-react';

type QRType = 'url' | 'text' | 'email' | 'phone' | 'sms';
type Page = 'home' | 'privacy' | 'about' | 'terms' | 'contact';

function App() {
  const [qrType, setQrType] = useState<QRType>('url');
  const [input, setInput] = useState('');
  const [qrCodeData, setQrCodeData] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('home');

  useEffect(() => {
    const titles = {
      home: 'WeLoveQr❤️ - Free QR Code Generator',
      privacy: 'Privacy Policy - WeLoveQr❤️',
      about: 'About Us - WeLoveQr❤️',
      terms: 'Terms of Service - WeLoveQr❤️',
      contact: 'Contact Us - WeLoveQr❤️'
    };
    document.title = titles[currentPage];
  }, [currentPage]);

  const generateQRCode = async (value: string) => {
    try {
      setIsLoading(true);
      const url = await QRCode.toDataURL(value, {
        width: 400,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
      });
      setQrCodeData(url);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (input) {
      generateQRCode(input);
    }
  }, [input]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = qrCodeData;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(input);
  };

  const getPlaceholder = () => {
    switch (qrType) {
      case 'url':
        return 'Enter URL (e.g., https://example.com)';
      case 'text':
        return 'Enter text message';
      case 'email':
        return 'Enter email address';
      case 'phone':
        return 'Enter phone number';
      case 'sms':
        return 'Enter phone number for SMS';
      default:
        return 'Enter value';
    }
  };

  const qrTypes = [
    { type: 'url' as QRType, icon: Link, label: 'URL' },
    { type: 'text' as QRType, icon: FileText, label: 'Text' },
    { type: 'email' as QRType, icon: Mail, label: 'Email' },
    { type: 'phone' as QRType, icon: Phone, label: 'Phone' },
    { type: 'sms' as QRType, icon: MessageSquare, label: 'SMS' },
  ];

  const renderNavigation = () => (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              WeLoveQr<Heart className="text-red-500 fill-current" size={24} />
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentPage('home')}
              className={`flex items-center gap-2 px-3 py-2 rounded-md ${
                currentPage === 'home' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Home size={18} />
              Home
            </button>
            <button
              onClick={() => setCurrentPage('privacy')}
              className={`flex items-center gap-2 px-3 py-2 rounded-md ${
                currentPage === 'privacy' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Shield size={18} />
              Privacy
            </button>
            <button
              onClick={() => setCurrentPage('terms')}
              className={`flex items-center gap-2 px-3 py-2 rounded-md ${
                currentPage === 'terms' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FileText size={18} />
              Terms
            </button>
            <button
              onClick={() => setCurrentPage('about')}
              className={`flex items-center gap-2 px-3 py-2 rounded-md ${
                currentPage === 'about' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Info size={18} />
              About
            </button>
            <button
              onClick={() => setCurrentPage('contact')}
              className={`flex items-center gap-2 px-3 py-2 rounded-md ${
                currentPage === 'contact' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Mail size={18} />
              Contact
            </button>
          </div>
        </div>
      </div>
    </nav>
  );

  const renderHome = () => (
    <>
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">Create QR Codes Instantly</h2>
        <p className="text-gray-600">Generate beautiful QR codes for URLs, text, email, and more</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {qrTypes.map(({ type, icon: Icon, label }) => (
                <button
                  key={type}
                  onClick={() => setQrType(type)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    qrType === type
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon size={18} />
                  {label}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {qrType.charAt(0).toUpperCase() + qrType.slice(1)} Content
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={getPlaceholder()}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
                <button
                  onClick={handleCopy}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-lg"
                  title="Copy to clipboard"
                >
                  <Copy size={18} className="text-gray-500" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-xl">
            {isLoading ? (
              <div className="animate-spin">
                <RefreshCw size={32} className="text-blue-600" />
              </div>
            ) : qrCodeData ? (
              <>
                <img src={qrCodeData} alt="QR Code" className="w-64 h-64" />
                <button
                  onClick={handleDownload}
                  className="mt-4 flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Download size={18} />
                  Download QR Code
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center text-gray-500">
                <QrCode size={64} />
                <p className="mt-2">Enter content to generate QR code</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );

  const renderTerms = () => (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-3xl font-bold mb-6">Terms of Service</h2>
      <div className="space-y-6 text-gray-600">
        <section>
          <h3 className="text-xl font-semibold mb-3">1. Terms</h3>
          <p>
            By accessing WeLoveQr, you agree to be bound by these terms of service and agree that you are responsible for compliance with any applicable local laws.
          </p>
        </section>
        <section>
          <h3 className="text-xl font-semibold mb-3">2. Use License</h3>
          <p>
            Permission is granted to temporarily use WeLoveQr for personal, non-commercial transitory viewing only.
          </p>
        </section>
        <section>
          <h3 className="text-xl font-semibold mb-3">3. Disclaimer</h3>
          <p>
            The materials on WeLoveQr are provided on an 'as is' basis. WeLoveQr makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
        </section>
        <section>
          <h3 className="text-xl font-semibold mb-3">4. Limitations</h3>
          <p>
            In no event shall WeLoveQr or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use WeLoveQr.
          </p>
        </section>
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
      <div className="space-y-6">
        <p className="text-gray-600">
          We'd love to hear from you! If you have any questions, suggestions, or concerns, please don't hesitate to reach out.
        </p>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Get in Touch</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="text-blue-600" />
              <span>Email: contact@weloveqr.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Twitter className="text-blue-400" />
              <span>Twitter: @weloveqr</span>
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 bg-gray-50 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">Business Inquiries</h3>
          <p className="text-gray-600">
            For business partnerships, advertising opportunities, or other commercial inquiries, please email us at business@weloveqr.com
          </p>
        </div>
      </div>
    </div>
  );

  const renderPrivacyPolicy = () => (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-3xl font-bold mb-6">Privacy Policy</h2>
      <div className="space-y-6 text-gray-600">
        <section>
          <h3 className="text-xl font-semibold mb-3">Information Collection and Use</h3>
          <p>
            WeLoveQr is committed to protecting your privacy. We do not collect, store, or share any personal information. 
            All QR code generation is performed locally in your browser, and no data is transmitted to our servers.
          </p>
        </section>
        <section>
          <h3 className="text-xl font-semibold mb-3">Data Security</h3>
          <p>
            Your data security is important to us. Since all operations are performed client-side, 
            your input data never leaves your device. The QR codes you generate are created entirely in your browser.
          </p>
        </section>
        <section>
          <h3 className="text-xl font-semibold mb-3">Cookies and Tracking</h3>
          <p>
            We do not use cookies or any tracking mechanisms. Our service is completely stateless 
            and does not require any user data to function.
          </p>
        </section>
        <section>
          <h3 className="text-xl font-semibold mb-3">Changes to This Policy</h3>
          <p>
            We may update this privacy policy from time to time. Any changes will be posted on this page.
          </p>
        </section>
        <section>
          <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
          <p>
            If you have any questions about our Privacy Policy, please visit our About page to find our contact information.
          </p>
        </section>
      </div>
    </div>
  );

  const renderAbout = () => (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-3xl font-bold mb-6">About WeLoveQr</h2>
      <div className="space-y-6">
        <p className="text-gray-600">
          WeLoveQr is a free, open-source QR code generator that prioritizes privacy and ease of use. 
          Our tool allows you to create QR codes instantly without storing any of your data.
        </p>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Connect With Me</h3>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Github size={18} />
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Linkedin size={18} />
              LinkedIn
            </a>
            <a
              href="https://twitter.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors"
            >
              <Twitter size={18} />
              Twitter
            </a>
          </div>
        </div>

        <div className="mt-8 p-6 bg-gray-50 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">Features</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Generate QR codes for URLs, text, email, phone numbers, and SMS</li>
            <li>Instant QR code generation with live preview</li>
            <li>Download QR codes in high quality PNG format</li>
            <li>No registration required</li>
            <li>100% free and open source</li>
            <li>Privacy-focused - no data collection</li>
            <li>Works offline - all processing done in your browser</li>
            <li>Mobile-friendly design</li>
            <li>Clean and intuitive interface</li>
          </ul>
        </div>

        <div className="mt-8 p-6 bg-blue-50 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">Why Choose WeLoveQr?</h3>
          <div className="space-y-4 text-gray-600">
            <p>
              In a world where data privacy is increasingly important, WeLoveQr stands out by offering a completely secure, 
              client-side QR code generation solution. Unlike other services, we don't store your data or require any 
              registration - your information never leaves your device.
            </p>
            <p>
              Our tool is perfect for both personal and professional use, whether you're creating QR codes for your business 
              cards, marketing materials, or just sharing information with friends.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {renderNavigation()}
      <div className="max-w-4xl mx-auto p-6">
        {currentPage === 'home' && renderHome()}
        {currentPage === 'privacy' && renderPrivacyPolicy()}
        {currentPage === 'terms' && renderTerms()}
        {currentPage === 'about' && renderAbout()}
        {currentPage === 'contact' && renderContact()}
      </div>
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About WeLoveQr</h3>
              <p className="text-gray-600">
                Free, secure, and privacy-focused QR code generator for all your needs.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-600">
                <li><button onClick={() => setCurrentPage('privacy')}>Privacy Policy</button></li>
                <li><button onClick={() => setCurrentPage('terms')}>Terms of Service</button></li>
                <li><button onClick={() => setCurrentPage('contact')}>Contact Us</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                  <Github size={24} />
                </a>
                <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                  <Linkedin size={24} />
                </a>
                <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                  <Twitter size={24} />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-gray-600">
            <p>© {new Date().getFullYear()} WeLoveQr❤️. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;