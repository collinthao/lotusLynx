import Image from "next/image";
import Link from "next/link";

export default function Footer()
{
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
              <Link href="/about" className="hover:underline">
                About
              </Link>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </div>
          </div>
          <div className="text-center text-xs text-gray-400 border-t border-gray-700 pt-8">
            <p>Copyright © 2025 Lotus Lynx. All rights reserved. Privacy Policy</p>
            <p>All rights reserved. Privacy Policy.</p>
          </div>
        </div>
      </footer>
    );
}