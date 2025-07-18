import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaGlobe } from 'react-icons/fa'

export default function ContactPage() {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#e0f2f1] to-[#f1f8e9] bg-cover bg-center"
      style={{ backgroundImage: "url('/images/ethan-background.jpg')" }}
    >
      <div className="backdrop-blur-md bg-white/70 min-h-screen">
        <div className="max-w-6xl mx-auto py-20 px-6 space-y-16 text-base font-bold text-gray-800">
          
          {/* Title */}
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-green-900 relative inline-block">
              Contact Ethan
              <span className="block h-1 w-1/2 bg-green-500 mx-auto mt-2 rounded-full animate-pulse"></span>
            </h1>
            <p className="mt-4 text-gray-600 font-semibold">
              We're excited to hear from you — let’s make something amazing together.
            </p>
          </div>

          {/* Grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 items-stretch">
            
            {/* Info box */}
            <div className="md:col-span-2 bg-white p-8 rounded-2xl shadow-[0_15px_35px_-10px_rgba(0,0,0,0.15)] border border-gray-200 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold text-green-800 mb-4">📍 Ethan Head Office</h2>
                <p className="text-gray-600 mb-6 font-semibold">
                  Visit us, call us, or drop a message. We’re always ready to connect.
                </p>

                <ul className="space-y-4 text-gray-800">
                  <li className="flex items-center gap-3">
                    <FaMapMarkerAlt className="text-green-700" />
                    61/1G Vo Dong 2, Gia Kiem, Thong Nhat, Dong Nai
                  </li>
                  <li className="flex items-center gap-3">
                    <FaPhoneAlt className="text-blue-600" />
                    <a href="tel:+84967473979" className="hover:underline text-blue-600">+84 967 473 979</a>
                  </li>
                  <li className="flex items-center gap-3">
                    <FaEnvelope className="text-blue-600" />
                    <a href="mailto:hr@ethanecom.com" className="hover:underline text-blue-600">hr@ethanecom.com</a>
                  </li>
<li className="flex items-center gap-3">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4 text-blue-600"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M22 12.07C22 6.486 17.523 2 12 2S2 6.486 2 12.07C2 17.053 5.656 21.2 10.438 22v-6.999H7.898v-2.93h2.54V9.845c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.196 2.238.196v2.47h-1.26c-1.243 0-1.63.77-1.63 1.562v1.875h2.773l-.443 2.93h-2.33V22C18.344 21.2 22 17.053 22 12.07z" />
  </svg>
  <a
    href="https://www.facebook.com/ethanecom3979"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:underline text-blue-600"
  >
    facebook.com/ethanecom3979
  </a>
</li>

                </ul>
              </div>
 
            </div>

            {/* Map */}
            <div className="md:col-span-3">
              <div className="w-full h-[400px] rounded-2xl overflow-hidden border border-gray-300 shadow-lg bg-white">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.217393698736!2d107.1718264!3d11.0282733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174f1b31482ccdd%3A0xd88f760c662ca310!2sEthan%20Ecom!5e0!3m2!1sen!2s!4v1689580000000!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

          {/* Call to action */}
          <div className="bg-white/80 backdrop-blur-md rounded-xl p-10 text-center shadow-lg">
            <h3 className="text-2xl mb-3 text-green-800">Have a project in mind or just want to say hello?</h3>
            <p className="mb-6 text-gray-700 font-semibold">
              We’d love to hear from you — start the conversation today.
            </p>
            <a
              href="mailto:hr@ethanecom.com"
              className="inline-block mt-2 px-8 py-3 bg-green-700 text-white rounded-full hover:bg-green-800 transition font-semibold"
            >
              Contact us now
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
