import React from 'react'

const Footer = () => {
  return (
    <footer className="mt-16 bg-gradient-to-b from-slate-900 to-slate-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold text-white mb-3">CloudShare</h2>

          <p className="text-md text-gray-400 leading-relaxed">
            Securely upload, manage and share your files anywhere. Fast,
            reliable and simple cloud storage platform built for modern
            workflows.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-bold mb-4">Quick Links</h3>

          <ul className="space-y-2 text-md">
            <li className="hover:text-white transition cursor-pointer">
              Dashboard
            </li>

            <li className="hover:text-white transition cursor-pointer">
              Upload Files
            </li>

            <li className="hover:text-white transition cursor-pointer">
              My Files
            </li>

            <li className="hover:text-white transition cursor-pointer">
              Subscriptions
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white font-bold mb-4">Support</h3>

          <p className="text-md text-gray-400">
            Need help with your account or billing?
          </p>

          <p className="text-md text-gray-400 mt-2">
            vikaschaudhary7373@gmail.com
          </p>
          <p className="text-md text-gray-400 mt-2">
             Phone +91 8792934456
          </p>

          <div className="flex gap-4 mt-4 text-gray-400">
            <span className="hover:text-white cursor-pointer">🌐</span>
            <span className="hover:text-white cursor-pointer">🐙</span>
            <span className="hover:text-white cursor-pointer">✉️</span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-slate-800"></div>

      {/* Bottom */}
      <div className="text-center text-sm text-gray-400 py-5">
        © {new Date().getFullYear()} CloudShare — All rights reserved.
      </div>
    </footer>
  );
}

export default Footer