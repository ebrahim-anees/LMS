import { assets, dummyTestimonial } from '../../assets';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

export default function TestimonialsSection() {
  const { theme } = useContext(AppContext);

  return (
    <div className="pb-14 px-8 md:px-0">
      <h2
        className={`text-3xl font-medium ${
          theme === 'light' ? 'text-light-purple' : 'text-dark-gold'
        }`}
      >
        Testimonials
      </h2>
      <p
        className={`md:text-base ${
          theme === 'light' ? 'text-light-dGray' : 'text-dark-gray'
        } mt-3`}
      >
        Hear from our learners as they share their journeys of transformation,
        success, and how our <br /> platform has made a difference in their
        lives.
      </p>
      <div className="grid grid-cols-auto gap-8 mt-14">
        {dummyTestimonial.map((testimonial, i) => (
          <div
            key={i}
            className={`bg-gradient-to-t border ${
              theme === 'light'
                ? 'border-light-purple from-light-sky-07 to-light-sky-40'
                : 'border-dark-dGray from-dark-gold-001 to-dark-gold-35'
            } text-sm text-left pb-6 rounded-lg shadow-black/5 overflow-hidden`}
          >
            <div className="flex gap-4 items-center px-5 py-4 bg-gray-500/10">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="font-medium text-lg">
                  {testimonial.name}
                </h3>
                <p className="text-gray-800/80">{testimonial.role}</p>
              </div>
            </div>
            <div className="p-5 pb-7 text-center">
              <div className="flex gap-0.5 justify-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <img
                    className="h-5"
                    key={i}
                    src={
                      Math.floor(testimonial.rating) > i
                        ? (theme === 'light'? assets.light_star: assets.dark_star)
                        : (theme === 'light'? assets.light_star_blank: assets.dark_star_blank)
                    }
                    alt="star"
                  />
                ))}
              </div>
              <p
                className={`${
                  theme === 'light' ? 'text-light-dGray' : 'text-dark-gray'
                } mt-5`}
              >
                {testimonial.feedback}
              </p>
            </div>
            <a
              href="#"
              className={`${
                theme === 'light' ? 'text-light-purple' : 'text-dark-gold'
              } underline px-5`}
            >
              Read More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
