"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CheckCircle2, Grip, TrendingUp, Zap, Smile, Clock, Phone } from "lucide-react";

const processSteps = [
  {
    id: 1,
    title: "1. Let's Chat (Discovery Call)",
    description: "First, we sit down for a real conversation. We want to hear your story, understand what you’re trying to build, and figure out who you’re trying to reach. By the end of this, we’ll have a clear picture of exactly how to bring your brand to life."
  },
  {
    id: 2,
    title: "2. Building the Game Plan",
    description: "Next, our creative team gets to work. We don't just guess; we brainstorm ideas and write scripts that are tailored specifically for your audience. Our goal is to create content that doesn't just look good but actually makes people stop and listen."
  },
  {
    id: 3,
    title: "3. Making it Happen",
    description: "Once you’re happy with the plan, we bring it to life. Whether it’s filming, designing, or editing, we handle all the heavy lifting. We focus on every tiny detail to make sure the final result is high-quality and stands out from the crowd."
  },
  {
    id: 4,
    title: "4. The Final Look & Launch",
    description: "Finally, we go over everything together to make sure it’s exactly what you imagined. When you give the thumbs up, we’ll help you get it out there on the right platforms so it hits hard and gets the attention it deserves."
  }
];

const servicesList = [
  {
    title: "Branding",
    span: "md:col-span-4",
    items: [
      "Logo Design",
      "Package Design",
      "Brand Strategy",
      "Brand Guidelines",
      "Rebranding"
    ]
  },
  {
    title: "Graphic Design",
    span: "md:col-span-2",
    items: [
      "Social Media Graphics",
      "Advertising Banners",
      "Infographics",
      "Print Design"
    ]
  },
  {
    title: "Marketing",
    span: "md:col-span-2",
    items: [
      "Organic Content",
      "Performance Marketing",
      "SEO Services",
      "Email Marketing",
      "Paid Advertising"
    ]
  },
  {
    title: "Social Media Management",
    span: "md:col-span-4",
    items: [
      "Social Media Strategy",
      "Content Scheduling",
      "Social Media Advertising",
      "Community Engagement",
      "Analytics And Reporting"
    ]
  },
  {
    title: "Video Production",
    span: "md:col-span-6",
    items: [
      "Sound Design And Mixing",
      "Script Writing And Storyboarding",
      "Filming And Editing",
      "Motion Graphics And Animation",
      "Video Optimization For Social Media"
    ]
  },
  {
    title: "Content Creation",
    span: "md:col-span-3",
    items: [
      "YouTube Video Production",
      "Vlog Content Development",
      "Social Media Story Videos",
      "Instagram Reels Creation",
      "Influencer Collaboration Videos"
    ]
  },
  {
    title: "Web Development",
    span: "md:col-span-3",
    items: [
      "Custom Website Design",
      "E-Commerce Solutions",
      "UX/UI Design",
      "CMS Development",
      "Website Maintenance"
    ]
  }
];

function ProcessSection() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Rotate from 0 to -135 degrees (3 steps * 45 degrees)
  const rotation = useTransform(scrollYProgress, [0, 1], [0, -135]);

  // Opacity maps for each description
  const opacities = [
    useTransform(scrollYProgress, [0, 0.1, 0.25], [1, 1, 0]),
    useTransform(scrollYProgress, [0.08, 0.33, 0.58], [0, 1, 0]),
    useTransform(scrollYProgress, [0.41, 0.66, 0.91], [0, 1, 0]),
    useTransform(scrollYProgress, [0.75, 0.9, 1], [0, 1, 1]),
  ];

  // Y-translation for smooth entry/exit of text
  const yTranslations = [
    useTransform(scrollYProgress, [0, 0.25], [0, -20]),
    useTransform(scrollYProgress, [0.08, 0.33, 0.58], [20, 0, -20]),
    useTransform(scrollYProgress, [0.41, 0.66, 0.91], [20, 0, -20]),
    useTransform(scrollYProgress, [0.75, 1], [20, 0]),
  ];

  return (
    <div ref={containerRef} className="h-[400vh] w-full relative bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-start pt-20">

        {/* Header */}
        <div className="relative z-20 flex flex-col items-center">
          <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full mb-8 border border-white/10">
            <Grip className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-medium">Process</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-20 tracking-tight">Our Process</h1>
        </div>

        {/* Visual Arc (Static) */}
        <div className="absolute top-[350px] md:top-[400px] left-1/2 -translate-x-1/2 w-[2000px] md:w-[3000px] h-[2000px] md:h-[3000px] rounded-[50%] bg-gradient-to-b from-white/5 via-black to-black border-t border-white/20 -z-10" />

        {/* Rotating Planet Container */}
        <div className="absolute top-[350px] md:top-[400px] left-1/2 -translate-x-1/2 w-[2000px] md:w-[3000px] h-[2000px] md:h-[3000px] z-10 pointer-events-none">
          <motion.div
            style={{ rotate: rotation }}
            className="w-full h-full rounded-[50%] origin-center"
          >
            {processSteps.map((step, index) => {
              const angle = index * 45; // Place at 0, 45, 90, 135 degrees

              return (
                <div
                  key={step.id}
                  className="absolute top-0 left-0 w-full h-full origin-center"
                  style={{ transform: `rotate(${angle}deg)` }}
                >
                  {/* The Ball */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 rounded-full bg-[#5ce1e6] flex items-center justify-center text-center p-6 text-black font-extrabold text-xl md:text-2xl shadow-[0_0_60px_rgba(92,225,230,0.6)]">
                    <span className="leading-tight">{step.title}</span>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Dynamic Descriptions */}
        <div className="relative z-20 mt-[250px] md:mt-[300px] w-full max-w-4xl px-6 h-40">
          {processSteps.map((step, index) => (
            <motion.p
              key={step.id}
              style={{
                opacity: opacities[index],
                y: yTranslations[index]
              }}
              className="absolute inset-x-6 top-0 text-center text-gray-400 text-lg md:text-xl lg:text-2xl font-medium leading-relaxed"
            >
              {step.description}
            </motion.p>
          ))}
        </div>

      </div>
    </div>
  );
}

const extraordinaryFeatures = [
  {
    title: "Steady, Data-Backed Scaling",
    description: "Vedyx utilizes proven analytics to deliver reliable results, turning your social channels into a powerhouse for brand awareness and revenue.",
    icon: TrendingUp
  },
  {
    title: "Enduring Brand Value",
    description: "We go beyond simple content creation to foster an engaged community that serves as a permanent, high-value asset for your business.",
    icon: Zap
  },
  {
    title: "Plug-and-Play Excellence",
    description: "Skip the hiring headaches and gain instant access to a full suite of marketing specialists, from master strategists to expert creative designers.",
    icon: Smile
  },
  {
    title: "Zero-Hassle Management",
    description: "Stay focused on your core operations while our team handles every aspect of your digital footprint, from initial strategy to daily audience engagement.",
    icon: Clock
  }
];

function ExtraordinarySection() {
  return (
    <div className="container mx-auto px-6 pt-32 pb-40 relative z-10 max-w-7xl">
      <div className="flex flex-col items-center mb-16">
        <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full mb-6 border border-white/10">
          <Grip className="w-4 h-4 text-white" />
          <span className="text-white text-sm font-medium">Features</span>
        </div>

        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight text-center">
          What Makes Us <span className="text-[#5ce1e6]">Extraordinary</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {extraordinaryFeatures.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              className="bg-[#050505] p-8 md:p-12 rounded-[2.5rem] border border-[#5ce1e6]/30 shadow-[0_10px_40px_-15px_rgba(92,225,230,0.15)] hover:shadow-[0_10px_50px_-10px_rgba(92,225,230,0.3)] transition-all duration-300 relative overflow-hidden group flex flex-col items-center text-center"
            >
              {/* Subtle gradient background */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#111111] to-[#000000] z-0" />

              <div className="relative z-10 flex flex-col items-center">
                <Icon className="w-8 h-8 text-[#5ce1e6] mb-6" strokeWidth={2.5} />
                <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                <p className="text-gray-400 font-medium leading-relaxed max-w-sm">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function MiniContactSection() {
  return (
    <div className="container mx-auto px-6 pb-32 relative z-10 flex flex-col items-center">
      <div className="flex flex-col items-center mb-12">
        <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full mb-6 border border-white/10">
          <Phone className="w-4 h-4 text-white" />
          <span className="text-white text-sm font-medium">Contact</span>
        </div>

        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight text-center">
          Contact Us
        </h2>
      </div>

      <form className="w-full max-w-2xl flex flex-col gap-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col flex-1">
            <label className="text-sm text-white font-semibold mb-2">Name</label>
            <input type="text" placeholder="Thor" className="px-4 py-3 bg-[#f5f5f5] text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5ce1e6]" />
          </div>
          <div className="flex flex-col flex-1">
            <label className="text-sm text-white font-semibold mb-2">Email</label>
            <input type="email" placeholder="thor@gmail.com" className="px-4 py-3 bg-[#f5f5f5] text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5ce1e6]" />
          </div>
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-white font-semibold mb-2">Message</label>
          <textarea rows={5} placeholder="Your message..." className="px-4 py-3 bg-[#f5f5f5] text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5ce1e6] resize-none" />
        </div>
        <button type="submit" className="w-full bg-[#1a1a1a] border border-white/10 text-white font-bold text-lg py-4 rounded-xl mt-4 hover:bg-white hover:text-black transition-all duration-300">
          Submit
        </button>
      </form>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <div className="bg-black relative">
      <main className="relative">
        {/* Starry Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        {/* Section 1: What We Can Do For You */}
        <div className="container mx-auto px-6 pt-40 pb-32 relative z-10 max-w-7xl">

          <div className="flex flex-col items-center mb-16">
            <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full mb-6 border border-white/10">
              <Grip className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-medium">Services</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight text-center">
              What <span className="text-[#5ce1e6]">We Can</span> Do For You
            </h1>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            {servicesList.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                className={`${service.span} bg-[#050505] p-8 md:p-12 rounded-[2.5rem] border border-[#5ce1e6]/30 shadow-[0_10px_40px_-15px_rgba(92,225,230,0.15)] hover:shadow-[0_10px_50px_-10px_rgba(92,225,230,0.3)] transition-all duration-300 relative overflow-hidden group`}
              >
                {/* Subtle gradient background */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#111111] to-[#000000] z-0" />

                {/* Glow at the bottom */}
                <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[#5ce1e6] opacity-[0.08] blur-[45px] group-hover:opacity-[0.2] transition-opacity duration-500 z-0 pointer-events-none" />

                <div className="relative z-10">
                  <h3 className="text-2xl md:text-3xl font-bold mb-8 text-white tracking-tight">{service.title}</h3>
                  <ul className="space-y-4">
                    {service.items.map((item, i) => (
                      <li key={i} className="flex items-center text-gray-300 group/item">
                        <CheckCircle2 className="w-[18px] h-[18px] mr-3 text-white flex-shrink-0 group-hover/item:text-[#5ce1e6] transition-colors" />
                        <span className="font-medium text-[15px] md:text-[16px]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section 2: Our Process (Sticky Scroll Animation) */}
        <ProcessSection />

        {/* Section 3: What Makes Us Extraordinary */}
        <ExtraordinarySection />

        {/* Section 4: Mini Contact Form */}
        <MiniContactSection />

      </main>
    </div>
  );
}
