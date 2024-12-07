import { FaHeartbeat, FaRegHandshake, FaTooth } from "react-icons/fa";

function OurServices() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-8">
          Our Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Service 1 */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
            <div className="text-pink-500 text-4xl mb-4">
              <FaHeartbeat />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Prenatal Care
            </h3>
            <p className="text-gray-600">
              Our expert team provides personalized prenatal care to ensure the
              health and well-being of both mother and baby.
            </p>
          </div>

          {/* Service 2 */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
            <div className="text-purple-500 text-4xl mb-4">
              <FaRegHandshake />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Postpartum Support
            </h3>
            <p className="text-gray-600">
              We offer support during the postpartum phase, helping new mothers
              recover and adjust to their new roles.
            </p>
          </div>

          {/* Service 3 */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
            <div className="text-indigo-500 text-4xl mb-4">
              <FaTooth />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Dental Care
            </h3>
            <p className="text-gray-600">
              Comprehensive dental care services to ensure both maternal and
              baby oral health throughout pregnancy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurServices;
