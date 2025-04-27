import Image from "next/image"
import Link from "next/link"
import Header from "@/components/ui/header"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header/>

      {/* Main Content */}
      <main className="flex-grow">
        {/* About Section */}
        <section className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold text-[#282041] mb-4">About Lotus Lynx</h1>
          <p className="max-w-4xl mx-auto text-gray-700">
            We offer specialized recruitment services tailored to your specific industry and needs. We offer specialized
            recruitment services tailored to your specific industry and needs. We offer specialized recruitment services
            tailored to your specific industry and needs.
          </p>
        </section>

        {/* Mission Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#282041] mb-4">Our Mission</h2>
              <p className="text-gray-700">
                The name LotusLynx was inspired by two powerful symbols: the lotus flower, representing growth and
                rebirth.
              </p>
            </div>
            <div>
              <Image
                src="/placeholder.svg?height=300&width=400"
                alt="Our Mission"
                width={400}
                height={300}
                className="w-full h-auto bg-[#eaeaea] rounded"
              />
            </div>
          </div>
        </section>

        {/* Heading Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <Image
                src="/placeholder.svg?height=300&width=400"
                alt="Company Image"
                width={400}
                height={300}
                className="w-full h-auto bg-[#eaeaea] rounded"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[#282041] mb-4">Heading</h2>
              <p className="text-gray-700">
                The name LotusLynx was inspired by two powerful symbols: the lotus flower, representing growth and
                rebirth.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-3xl font-bold text-[#282041] mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-40 h-40 rounded-full bg-[#eaeaea] mb-4"></div>
                <h3 className="text-xl font-semibold">First LastName</h3>
                <p className="text-gray-600">Founder & CEO</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-3xl font-bold text-[#282041] mb-4">Ready to Find Your Perfect Match? H3</h2>
          <p className="max-w-2xl mx-auto text-gray-700 mb-8">
            Whether you're looking to hire top talent or find your dream job, we're here to help you succeed.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-[#282041] text-white px-6 py-2 rounded flex items-center gap-2">
              <span className="w-4 h-4 bg-white rounded-sm inline-block"></span>
              I'm an Employer
            </button>
            <button className="border border-[#282041] text-[#282041] px-6 py-2 rounded flex items-center gap-2">
              <span className="w-4 h-4 border border-[#282041] rounded-sm inline-block"></span>
              I'm a Job Seeker
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#282041] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-6">
            <Image
              src="/placeholder.svg?height=40&width=120"
              alt="LotusLynx Logo"
              width={120}
              height={40}
              className="h-10 w-auto mb-6"
            />
            <nav className="flex justify-center space-x-6 mb-6">
              <Link href="/jobs" className="hover:underline">
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
            </nav>
            <div className="text-sm text-center">
              <p>Copyright © 2025 Lotus Lynx. All rights reserved. Privacy Policy.</p>
              <p>All rights reserved. Privacy Policy.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
