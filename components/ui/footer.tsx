import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faFacebookF } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="bg-[#282041] text-white py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/Stationery Cut - Transparent.png"
            alt="LotusLynx Logo"
            width={120}
            height={40}
            className="h-10 mb-8"
          />
          <div className="flex space-x-8 text-sm">
            <Link href="/job-listings" className="hover:underline">
              Job List
            </Link>
            <Link href="/services" className="hover:underline">
              Services
            </Link>
            <Link href="/about-us" className="hover:underline">
              About
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
          </div>
        </div>

        <div className="flex justify-center space-x-6 mb-8">
          <Link href="https://www.linkedin.com/company/lotuslynx/posts/?feedView=all" target="_blank" rel="noreferrer" aria-label="LotusLynx LinkedIn">
            <FontAwesomeIcon icon={faLinkedin} className="text-xl hover:text-blue-500 transition" />
          </Link>
          <Link href="https://www.facebook.com/lotuslynx" target="_blank" rel="noreferrer" aria-label="LotusLynx Facebook">
            <FontAwesomeIcon icon={faFacebookF} className="text-xl hover:text-blue-400 transition" />
          </Link>
        </div>

        <div className="text-center text-xs text-gray-400 border-t border-gray-700 pt-8">
          <p>Copyright © 2025 Lotus Lynx. All rights reserved. Privacy Policy</p>
        </div>
      </div>
    </footer>
  );
}
