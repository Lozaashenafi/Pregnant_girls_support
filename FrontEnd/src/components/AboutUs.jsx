import aboutImage from "../assets/image/aboutus.jpg"; // Make sure to replace with your image path

function AboutUs() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto flex flex-col lg:flex-row items-center">
        {/* Left: Description */}
        <div className="lg:w-1/2 p-6">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-4">
            About Us
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            We are a dedicated team focused on providing exceptional care and
            support for expectant mothers and their families. Our goal is to
            ensure that every step of your pregnancy journey is met with
            compassion, expertise, and personalized attention.
          </p>
          <p className="text-lg text-gray-600">
            With years of experience and a commitment to excellence, we offer a
            range of services to guide and support you through every phase of
            your pregnancy and postpartum journey. We prioritize your health,
            well-being, and peace of mind.
          </p>
        </div>

        {/* Right: Image */}
        <div className="lg:w-1/2 mt-8 lg:mt-0">
          <img
            src={aboutImage}
            alt="About Us"
            className="object-cover w-full h-96 rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
