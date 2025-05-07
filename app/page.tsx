import Image from "next/image"
import Link from "next/link"
import { Phone } from "lucide-react"
import Header from "@/components/ui/header"
import Footer from "@/components/ui/footer"
import Stats from "@/components/ui/stats"

const testimonials = [
  {
    "Name": "Michael Prescher",
    "Position": "Active Senior DevOps Engineer",
    "Company": "Jewelers Mutual Group",
    "Testimonial": `I am delighted to recommend Ashley and her team for their exceptional work in finding me opportunities and preparing me for interviews. Ashley’s dedication to communication and relationship-building truly set her apart. She took the time to understand my needs and advocate for me as an investment, ensuring I was well-prepared for every opportunity.` 
  },
  {
    "Name": "Svetlana Barilova",
    "Position": "Automation SQA Engineer",
    "Company": "Brady Corporation",
    "Testimonial": `I can strongly recommend Ashley to work with. She’s very responsible, fast, professional, knowledgeable, attentive to details. Thanks to her, I found my new position very fast.` 
  }
];

const services = 
[
  {
    "Name": "Recruiting Solutions",
    "Description": "Lorem Ipsum Dolor Sit Amet"
  } , 
  {
    "Name": "Career Services",
    "Description": "Lorem Ipsum Dolor Sit Amet"
  } , 
  {
    "Name": "Talent Strategy & Hiring Support",
    "Description": "Lorem Ipsum Dolor Sit Amet"
  }
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header/>

      {/* Hero Section */}
      <section className="bg-[#282041] text-white py-16">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight w-3/4">
              Connecting Top Talent with Leading Employers
            </h1>
            <p className="text-lg w-3/4">
            The Missing Link Between Talent and Opportunity: A boutique talent firm redefining the recruitment experience
              through personalized hiring strategies.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/become-client"
                className="bg-white text-[#282041] px-6 py-3 rounded-md font-medium flex items-center justify-center"
              >
                I'm an Employer
              </Link>
              <Link
                href="/job-listings"
                className="bg-transparent border border-white text-white px-6 py-3 rounded-md font-medium flex items-center justify-center"
              >
                I'm a Job Seeker
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
          <Image
  src="/austin-distel-jpHw8ndwJ_Q-unsplash.jpg"
  alt="Recruitment Services"
  width={600}
  height={400}
  className="rounded-lg"
  style={{ width: '700px', height: '400px' }} // Explicitly set fixed size
/>

          </div>
        </div>
      </section>

      {/* Stats Section */}
      
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
                src="/two_people_arms_crossed.avif"
                alt="Recruitment Services"
                width={500}
                height={300}
                className="rounded-lg bg-[#eaeaea]"
                style={{ width: '700px', height: '400px' }} 
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
                src="/girl_smiling_at_guy.avif"
                alt="Recruitment Services"
                width={500}
                height={300}
                className="rounded-lg bg-[#eaeaea]"
                style={{ width: '700px', height: '400px' }} 

              />
            </div>
            <div className="space-y-6 order-1 md:order-2">
              <h2 className="text-3xl font-bold text-[#282041]">Recruitment Services Offered by Lotus Lynx</h2>
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
              {[0, 1, 2].map((i) => (
                <div key={i} className="border rounded-lg p-6 text-center">
                  <div className="w-12 h-12 bg-[#282041] rounded-full flex items-center justify-center mx-auto mb-6">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{services[i]["Name"]}</h3>
                  <p className="text-gray-600 text-sm mb-6">
                    Find top-tier executives and leaders for your organization with our specialized search process.
                  </p>
                  <Link href="/services" className="border px-6 py-3 rounded-md text-[#282041] font-medium hover:underline">
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
              {[0, 1].map((i) => (
                <div key={i} className="border rounded-lg p-8">
                  <div className="text-4xl text-[#282041] font-serif mb-4">"</div>
                  <p className="text-gray-700 mb-6">
                {testimonials[i]["Testimonial"]}
            </p>
                  <div>
                    <p className="font-semibold">{testimonials[i]["Name"]}</p>
                    <p className="text-sm text-gray-600">{testimonials[i]["Position"]}, {testimonials[i]["Company"]}</p>
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
            <Link href="//become-client" className="bg-[#282041] text-white px-6 py-3 rounded-md font-medium">
              I'm an Employer
            </Link>
            <Link
              href="/job-listings"
              className="bg-transparent border border-[#282041] text-[#282041] px-6 py-3 rounded-md font-medium"
            >
              I'm a Job Seeker
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer/>
    </div>
  )
}
