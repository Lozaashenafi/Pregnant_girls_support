import React from "react";
import Header from "../components/Header"; // Adjust the path as necessary
import Navbar from "../components/Navbar";

function ContactPage() {
  return (
    <>
      <Header />
      <Navbar />
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-8">
            Contact Us
          </h2>

          <div className="flex flex-col items-center justify-center space-y-8 md:flex-row md:space-x-12 md:space-y-0">
            {/* Left: Contact Details */}
            <div className="w-full md:w-1/2 text-left">
              <p className="text-xl text-gray-600 mb-4">
                We’d love to hear from you! Feel free to get in touch with us if
                you have any questions or need assistance.
              </p>

              <div className="mb-6">
                <p className="font-semibold text-gray-800">Email</p>
                <p className="text-gray-600">contact@yourcompany.com</p>
              </div>

              <div className="mb-6">
                <p className="font-semibold text-gray-800">Phone</p>
                <p className="text-gray-600">+1 234 567 890</p>
              </div>

              <div className="mb-6">
                <p className="font-semibold text-gray-800">Address</p>
                <p className="text-gray-600">
                  123 Your Street, Your City, Your Country
                </p>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="w-full md:w-1/2">
              <form className="space-y-6">
                <div className="flex items-center space-x-4">
                  <label
                    htmlFor="name"
                    className="text-gray-800 font-semibold w-32 text-left"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="px-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div className="flex items-center space-x-4">
                  <label
                    htmlFor="email"
                    className="text-gray-800 font-semibold w-32 text-left"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="px-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Your email address"
                    required
                  />
                </div>

                <div className="flex items-center space-x-4">
                  <label
                    htmlFor="subject"
                    className="text-gray-800 font-semibold w-32 text-left"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="px-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Subject of your message"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="message"
                    className="text-gray-800 font-semibold"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="6"
                    className="px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Your message"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 mt-4 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactPage;
