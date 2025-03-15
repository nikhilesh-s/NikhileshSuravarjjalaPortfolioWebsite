import { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { titleContentSlideIn } from "../utils/motion";
import { styles } from "../styles";
import { SectionWrapper } from "../utils/wrapper";
import { Send } from "lucide-react";

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const animations = titleContentSlideIn();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
        'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
        {
          from_name: form.name,
          to_name: "Nikhilesh",
          from_email: form.email,
          to_email: "your-email@example.com",
          message: form.message,
        },
        'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
      )
      .then(() => {
        setLoading(false);
        alert("Thank you. I will get back to you as soon as possible.");
        setForm({
          name: "",
          email: "",
          message: "",
        });
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        alert("Something went wrong. Please try again.");
      });
  };

  return (
    <div id="contact" className="padding-x padding-y max-w-7xl mx-auto relative z-0">
      <motion.div 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={animations.title}
        className="mb-12"
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h2 className={styles.sectionHeadText}>Contact.</h2>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={animations.content}
        className="bg-tertiary rounded-2xl p-8 mt-12 w-full max-w-4xl mx-auto"
      >
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col gap-8"
        >
          <div className="flex flex-col sm:flex-row gap-6">
            <label className="flex flex-col flex-1">
              <span className="text-white font-medium mb-4">Your Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="What's your name?"
                className="bg-primary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
              />
            </label>
            <label className="flex flex-col flex-1">
              <span className="text-white font-medium mb-4">Your Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="What's your email?"
                className="bg-primary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
              />
            </label>
          </div>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Message</span>
            <textarea
              rows={7}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What do you want to say?"
              className="bg-primary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
            />
          </label>

          <button
            type="submit"
            className="bg-gradient-to-r from-purple-600 to-blue-600 py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl mx-auto flex items-center gap-2"
          >
            {loading ? "Sending..." : (
              <>
                <Send size={18} />
                Send Message
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
