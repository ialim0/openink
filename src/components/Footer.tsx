import React from 'react';
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope } from 'react-icons/fa';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-200 text-gray-700 py-8">
            <div className="container mx-auto px-6">
                <div className="flex flex-wrap justify-between">
                    <div className="w-full md:w-auto mb-6 md:mb-0">
                        <h3 className="text-lg font-semibold">Connect with me</h3>
                        <div className="flex space-x-4 mt-4">
                            <a href="https://www.linkedin.com/in/alimoudine-idrissou/" className="text-blue-500 hover:text-blue-700">
                                <FaLinkedin className="text-2xl" />
                            </a>
                            <a href="https://github.com/alimoudine-idrissou" className="text-gray-700 hover:text-gray-900">
                                <FaGithub className="text-2xl" />
                            </a>
                            <a href="https://twitter.com/alimoudine_i" className="text-blue-400 hover:text-blue-600">
                                <FaTwitter className="text-2xl" />
                            </a>
                            <a href="mailto:alimoudine.idrissou@gmail.com" className="text-red-500 hover:text-red-700">
                                <FaEnvelope className="text-2xl" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-300 mt-8 pt-8 text-sm text-center">
                    <p>&copy; {new Date().getFullYear()} Alimoudine IDRISSOU. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
