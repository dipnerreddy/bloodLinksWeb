import React from "react";
import Developer2Image from "../assets/images/Developer2.jpg";
import Developer3Image from "../assets/images/Developer3.JPG";


const Home = () => {
  // Array of developers
  const developers = [
    {
      name: "Avuthu Dipner Reddy",
      image: "https://via.placeholder.com/150",
      quote: "Saving lives is a mission."
    },
    {
      name: "Developer 2",
      image: Developer2Image, // Local image
      quote: "Innovating for a better tomorrow."
    },
    {
      name: "Developer 3",
      image: Developer3Image, // Local image
      quote: "Empowering communities."
    },
    {
      name: "Developer 4",
      image: "https://via.placeholder.com/150",
      quote: "Building a brighter future."
    },
  ];

  return (
    <div className="bg-gray-100">
      <nav className="bg-red-600 text-white fixed top-0 w-full z-10 shadow-lg">
        <div className="container mx-auto flex justify-between items-center p-4">
          <h1 className="text-xl font-bold">Blood Links</h1>
          <ul className="flex space-x-4">
            <li><a href="#about" className="hover:underline">About Us</a></li>
            <li><a href="#why" className="hover:underline">Why Donate</a></li>
            <li><a href="#developers" className="hover:underline">Developers</a></li>
            <li><a href="/user-login"className = "hover:underline">Login</a></li>
          </ul>
        </div>
      </nav>

      <header className="bg-red-700 text-white py-80 text-center pt-80">
        <h2 className="text-2xl md:text-4xl lg:text-7xl font-bold tracking-tight">
          Welcome to Blood Links
          <div className="relative mx-auto inline-block w-max">
            <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500">
              <span>Connecting Donors and Recipients.</span>
            </div>
            <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
              <span>Connecting Donors and Recipients.</span>
            </div>
          </div>
        </h2>
        <p className="text-lg mt-4">Your trusted platform for finding blood banks</p>
      </header>

      <main className="pt-24">
        {/* About Us Section */}
        <section className="bg-white p-6 mx-4 my-4 rounded-lg shadow flex flex-col md:flex-row" id="about">
          <div className="md:w-1/2 flex justify-center items-center">
            <img
              src="https://www.lifeblood.com.au/sites/default/files/2024-09/life-is-the-reason-blood-L1-featured-530x398.jpg"
              alt="Blood Donation"
              className="rounded-lg shadow-md w-full h-auto"
            />
          </div>
          <div className="md:w-1/2 p-6">
            <h2 className="text-2xl font-semibold text-center">About Us</h2>
            <p className="mt-4">
            Blood Links is an innovative platform that connects individuals, blood donors, and blood banks to save lives. By bridging the gap between those in need and those who can help, we ensure timely access to life-saving resources during emergencies.
            </p>
            <p className="mt-2">
            Our platform offers:

Locate Blood Banks: Quickly find nearby blood banks using a user-friendly search system.
Blood Donation: Register as a donor, schedule donations, and contribute to saving lives.
Urgent Requests: Submit blood requests and get matched with available donors or blood banks.
Stock Updates: Access real-time information on blood availability at partner blood banks.
We believe every drop of blood counts, and our mission is to create an efficient, responsive network that supports patients during critical moments. Whether you want to donate blood or help someone in need, Blood Links simplifies the process and ensures no request goes unanswered.
            </p>
            <p className="mt-2">
            Join us today to make a difference. Together, we can build a community where timely support saves lives, offering hope to those who need it most. Let’s turn every act of generosity into a life-saving opportunity!
            </p>
          </div>
        </section>

        {/* Why Donate Section */}
        <section className="bg-white p-6 mx-4 my-4 rounded-lg shadow mt-2" id="why">
          <h2 className="text-2xl font-semibold text-center text-red-600">Why Donate Blood?</h2>
          <p className="text-center mt-4 text-gray-700">
            Blood donation is one of the most selfless acts of kindness. By donating blood, you’re saving lives and supporting individuals battling life-threatening conditions.
          </p>
          <p className="text-center mt-4 text-gray-700">
            A single pint of blood can save up to three lives.
          </p>
          <div className="flex justify-center mt-4">
            <a href="/#" className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">
              Download The App Now
            </a>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white p-8 mx-4 my-4 rounded-lg shadow-lg mt-2" id="faq">
          <h2 className="text-3xl font-semibold text-center text-red-600 mb-6">Your Most Asked Questions</h2>
          <ul className="space-y-6">
            <li className="p-4 border border-gray-300 rounded-lg shadow-sm">
              <div className="flex items-center">
                <svg className="w-6 h-6 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-1h2v1zm0-3H9V7h2v3z" />
                </svg>
                <strong className="text-lg">What prescribed medications will prevent me from donating?</strong>
              </div>
              <p className="mt-2">Certain medications may affect your eligibility. Please consult with your healthcare provider or the donation center.</p>
              <strong className="text-lg">How long after I've had a vaccination can I donate?</strong>
              <p className="mt-2">Wait at least 48 hours after most vaccinations if symptom-free. For live vaccines, wait 4 weeks before donating blood.</p>
              <strong className="text-lg">What prescribed medications will prevent me from donating?</strong>
              <p className="mt-2">Medications like isotretinoin, acitretin, warfarin, and certain chemotherapy drugs may disqualify you. Always inform the blood bank about prescriptions to confirm your eligibility before donating.</p>
            </li>

            {/* Other FAQ items can be added here */}
          </ul>
        </section>

        {/* Developers Section */}
        <section className="bg-white p-4 mx-2 my-2 rounded-lg shadow mt-2" id="developers">
  <h2 className="text-xl font-semibold text-center">Meet the People Behind The Idea</h2>
  <p className="text-center mt-2 text-sm">We are the team behind Blood Links, committed to saving lives.</p>

  <div className="flex flex-wrap justify-center mt-4">
    {developers.map((dev, index) => (
      <div key={index} className="w-full sm:w-1/3 lg:w-1/5 p-2 text-center">
        <img 
          src={dev.image} 
          alt={dev.name} 
          className="rounded-full w-20 h-20 mx-auto" 
        />
        <h3 className="text-md font-semibold mt-2">{dev.name}</h3>
        <p className="mt-1 text-xs italic">"{dev.quote}"</p>
      </div>
    ))}
  </div>
</section>

      </main>

      <footer className="bg-gray-800 text-white text-center py-4">
        <p>&copy; 2024 Blood Links. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
