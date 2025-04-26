import Image from "next/image"
import Link from "next/link"
import { Phone } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-[#282041] text-white">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Phone className="h-4 w-4" />
            <span className="text-sm">+1 262-234-5467</span>
          </div>
          <div>
            <Link href="/login" className="text-sm hover:underline">
              Client Login
            </Link>
          </div>
        </div>
        <nav className="bg-white text-black">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/placeholder.svg?height=40&width=120"
                alt="LotusLynx Logo"
                width={120}
                height={40}
                className="h-10"
              />
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/job-list" className="hover:text-[#282041]/80">
                Job List
              </Link>
              <Link href="/services" className="hover:text-[#282041]/80">
                Services
              </Link>
              <Link href="/about" className="hover:text-[#282041]/80">
                About
              </Link>
              <Link href="/contact" className="hover:text-[#282041]/80">
                Contact
              </Link>
              <Link href="/become-client" className="bg-[#282041] text-white px-4 py-2 rounded hover:bg-[#282041]/90">
                Become a Client
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-[#282041] text-white py-16">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Connecting Top Talent with Leading Employers
            </h1>
            <p className="text-lg">
              Linking Talent with Opportunity: A boutique talent advisory firm redefining the recruitment experience
              through personalized hiring strategies.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/employer"
                className="bg-white text-[#282041] px-6 py-3 rounded-full font-medium flex items-center justify-center"
              >
                I'm an Employer
              </Link>
              <Link
                href="/job-seeker"
                className="bg-transparent border border-white text-white px-6 py-3 rounded-full font-medium flex items-center justify-center"
              >
                I'm a Job Seeker
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <Image
              src="/placeholder.svg?height=400&width=500"
              alt="Recruitment Services"
              width={500}
              height={400}
              className="rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <h3 className="text-3xl md:text-4xl font-bold text-[#282041]">5,000+</h3>
              <p className="text-sm text-gray-600">Placements Made</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl md:text-4xl font-bold text-[#282041]">1,200+</h3>
              <p className="text-sm text-gray-600">Client Companies</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl md:text-4xl font-bold text-[#282041]">98%</h3>
              <p className="text-sm text-gray-600">Client Satisfaction</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl md:text-4xl font-bold text-[#282041]">24hr</h3>
              <p className="text-sm text-gray-600">Average Response Time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section 1 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-[#282041]">Recruitment Services Offered by Lotus Lynx</h2>
              <p className="text-gray-700">
                The name LotusLynx was inspired by two powerful symbols: the lotus flower, representing growth and
                rebirth.
              </p>
            </div>
            <div>
              <Image
                src="/placeholder.svg?height=300&width=500"
                alt="Recruitment Services"
                width={500}
                height={300}
                className="rounded-lg bg-[#eaeaea]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section 2 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <Image
                src="/placeholder.svg?height=300&width=500"
                alt="Recruitment Services"
                width={500}
                height={300}
                className="rounded-lg bg-[#eaeaea]"
              />
            </div>
            <div className="space-y-6 order-1 md:order-2">
              <h2 className="text-3xl font-bold text-[#282041]">Recruitment Services Offered by Lotus Lynx H2</h2>
              <p className="text-gray-700">
                The name LotusLynx was inspired by two powerful symbols: the lotus flower, representing growth and
                rebirth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="space-y-8">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-[#282041]">Our Recruitment Services H3</h2>
              <p className="mt-4 text-gray-600">
                We offer specialized recruitment services tailored to your specific industry and needs.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border rounded-lg p-6 text-center">
                  <div className="w-12 h-12 bg-[#282041] rounded-full flex items-center justify-center mx-auto mb-6">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{i === 1 ? "Executive Search" : "Heading 4"}</h3>
                  <p className="text-gray-600 text-sm mb-6">
                    Find top-tier executives and leaders for your organization with our specialized search process.
                  </p>
                  <Link href="#" className="text-[#282041] font-medium hover:underline">
                    Learn More
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="space-y-12">
            <div>
              <h5 className="text-sm font-medium uppercase tracking-wider text-gray-500">TESTIMONIALS</h5>
              <h2 className="text-3xl font-bold text-[#282041] mt-2">What Our Clients Say</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[1, 2].map((i) => (
                <div key={i} className="border rounded-lg p-8">
                  <div className="text-4xl text-[#282041] font-serif mb-4">"</div>
                  <p className="text-gray-700 mb-6">
                    Lotus Lynx helped us find the perfect CTO in just three weeks. Their understanding of our needs was
                    impressive.
                  </p>
                  <div>
                    <p className="font-semibold">Sarah Johnson</p>
                    <p className="text-sm text-gray-600">CEO, Techstan Inc.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl font-bold text-[#282041] mb-4">Ready to Find Your Perfect Match?</h2>
          <p className="text-gray-700 mb-8">
            Whether you're looking to hire top talent or find your dream job, we're here to help you succeed.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/employer" className="bg-[#282041] text-white px-6 py-3 rounded-full font-medium">
              I'm an Employer
            </Link>
            <Link
              href="/job-seeker"
              className="bg-transparent border border-[#282041] text-[#282041] px-6 py-3 rounded-full font-medium"
            >
              I'm a Job Seeker
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#282041] text-white py-12 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-8">
            <Image
              src="/placeholder.svg?height=40&width=120"
              alt="LotusLynx Logo"
              width={120}
              height={40}
              className="h-10 mb-8"
            />
            <div className="flex space-x-8 text-sm">
              <Link href="/job-list" className="hover:underline">
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
    </div>
  )
}
