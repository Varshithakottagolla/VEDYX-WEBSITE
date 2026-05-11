"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // "success" | "error"

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 4000);
    }
  };

  return (
    <section id="contact" className="py-24 bg-black text-white">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-16 items-start">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-2 block">
              Contact
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
              Contact Us
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-md">
              Ready to take your brand to the next level? Fill out the form, and our team will get back to you within 24 hours.
            </p>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-lg">Email Us</h4>
                <a href="mailto:hello@vedyx.com" className="text-gray-400 hover:text-primary transition-colors">
                  hello@vedyx.com
                </a>
              </div>
              <div>
                <h4 className="font-semibold text-lg">Call Us</h4>
                <p className="text-gray-400">+91 70130 50719</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#111111] p-8 md:p-10 rounded-3xl shadow-xl border border-white/10"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#5ce1e6] transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#5ce1e6] transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#5ce1e6] transition-all resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              {submitStatus === "success" && (
                <div className="bg-green-500/10 border border-green-500/20 text-green-400 text-sm px-4 py-3 rounded-xl">
                  ✓ Thank you! We'll get back to you within 24 hours.
                </div>
              )}
              {submitStatus === "error" && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl">
                  Something went wrong. Please try again.
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#5ce1e6] text-black py-4 rounded-xl font-bold text-lg hover:bg-white transition-all duration-300 transform hover:-translate-y-1 shadow-lg disabled:opacity-60"
              >
                {submitting ? "Sending..." : "Submit"}
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
