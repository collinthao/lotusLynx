import Image from "next/image"
import Link from "next/link"
import Header from "@/components/ui/header"
import Footer from "@/components/ui/footer"

const founders = [
  {
    "Name": "Ashley Bender",
    "Role": "Founder/Principal Recruiter",
    "Link": "https://www.linkedin.com/in/ashley-bender-6730b578/",
    "Image": './ashley_headshot.png'
  },
  {
    "Name": "Kevin McKenzie",
    "Role": "Director of Operations & Strategy",
    "Link": "",
    "Image": './default_picture.webp'
  },
]

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header/>

      {/* Main Content */}
      <main className="flex-grow">
        {/* About Section */}
        <section className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold text-[#282041] mb-4">About LotusLynx</h1>
          <p className="max-w-4xl mx-auto text-gray-700">
            We offer specialized recruitment services tailored to your specific industry and needs. We offer specialized
            recruitment services tailored to your specific industry and needs. We offer specialized recruitment services
            tailored to your specific industry and needs.
          </p>
        </section>

        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <Image
                src="./ashley_headshot_2.jpeg"
                alt="Company Image"
                width={400}
                height={300}
                className="w-full h-auto bg-[#eaeaea] rounded"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[#282041] mb-4">Mission</h2>
              <p className="text-gray-700">
              At LotusLynx, we specialize in connecting top talent with outstanding companies. As a full-service recruitment agency, we provide tailored hiring solutions across a wide range of industries. Our mission is to simplify the recruitment process, delivering qualified, motivated candidates who align with your business goals and company culture.
              </p>
            </div>
          </div>
        </section>

        {/* Heading Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <Image
                src="./ashley_family.jpg"
                alt="Company Image"
                width={400}
                height={300}
                className="w-full h-auto bg-[#eaeaea] rounded"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[#282041] mb-4">Vision</h2>
              <p className="text-gray-700">
              To be the most trusted and innovative recruitment partner, empowering businesses to thrive and individuals to achieve their full potential through meaningful career connections.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="container mx-auto px-4 py-12 text-center">
  <h2 className="text-3xl font-bold text-[#282041] mb-12">Our Team</h2>
  <div className="flex flex-wrap justify-center gap-36">
    {[0, 1].map((i) => (
      <div key={i} className="flex flex-col items-center">
        <a href={founders[i]["Link"]} target="_blank" rel="noopener noreferrer">
          <img
            src={founders[i]["Image"]}
            alt={founders[i]["Name"]}
            className="w-40 h-40 rounded-full object-cover mb-4 hover:opacity-90 transition"
          />
        </a>
        <h3 className="text-xl font-semibold">{founders[i]["Name"]}</h3>
        <p className="text-gray-600">{founders[i]["Role"]}</p>
      </div>
    ))}
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
      </main>

      {/* Footer */}
      <Footer/>
    </div>
  )
}
