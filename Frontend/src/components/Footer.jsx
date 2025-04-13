import React from "react";
import { FaFacebook, FaYoutube, FaTwitter, FaInstagram } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div id="service" className="bg-black ">
      <footer className="bg   text-gray-400 py-7">
        <div className="container mx-auto flex justify-between flex-wrap p-4">
          <div className="w-full md:w-1/5 md:ml-5 mb-6 md:mb-0">
            <h4 className="text-yellow-600  mb-4 text-2xl rubfont">Innnno </h4>

            <div>
            Inno – Decentralized freelance platform powered by blockchain. Secure, transparent, and trustless collaboration..
              <div className="flex mt-2 ">
                <NavLink to="#" className={"removeLinkHover text-white "}>
                  Privacy Policy
                </NavLink>
                <NavLink to="#" className={"removeLinkHover text-white "}>
                  Download RuleBook
                </NavLink>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/5 md:ml-5 mb-6 md:mb-0 text-gray-400"  id="contact-section">
            <h4 className="text-yellow-600 font-bold mb-4">Contact Us</h4>

            <p>
              <strong>Phone No.:</strong> 909961XXXX
            </p>
            <p>
              <strong>Email:</strong> blockchain@inno.com
            </p>
            {/* <p>
              <strong>Address:</strong> Government Engineering College, Modasa
              383315
            </p> */}
          </div>
          <div>
              <h4 className="text-lg font-semibold text-white mb-4 text-yellow-600 font-bold">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">Community</a></li>
                {/* <li><a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">Blog</a></li> */}
                <li><a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">Guides</a></li>
              </ul>
            </div>
          <div>
              <h4 className="text-lg font-semibold text-white mb-4 text-yellow-600 font-bold">Platform</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">Find Work</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">Hire Talent</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">How It Works</a></li>
                {/* <li><a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">Pricing</a></li> */}
              </ul>
            </div>

          <div className="w-full md:w-1/4 mb-6 md:mb-0 ">
            <h4 className="text-yellow-600 font-bold mb-3">Our Social</h4>
            <div className=" flex gap-3">
              <a href="#" className="RLH text-yellow-600 hover:text-white">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="RLH text-yellow-600 hover:text-white">
                <FaYoutube size={24} />
              </a>
              <a href="#" className="RLH text-yellow-600 hover:text-white">
                <FaTwitter size={24} />
              </a>
              <a
                href="https://www.instagram.com/harsh__5979/profilecard/?igsh=MWVmMzFnM2ZmNmdqeQ=="
                className="RLH text-yellow-600 hover:text-white"
              >
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-7  text-center text-gray-400">
          <p>2025©Inno | All rights reserved.</p>
          {/* <p>Visitor Count:</p> */}
        </div>
      </footer>
    </div>
  );
};

export default Footer;
