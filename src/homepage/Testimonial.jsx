import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registrasi ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const items = [
    {
      nama: "Thasha",
      company: "Founder of MEA-MEA",
      testimoni: "“Omnicious design! Best person to work with!”",
      desktopPos: "lg:top-[10%] lg:left-[25%] lg:rotate-[6deg]",
    },
    {
      nama: "Munawwar",
      company: "Founder of HAMU & Minne",
      testimoni: "“Omnicious design! Best person to work with!”",
      desktopPos: "lg:top-[35%] lg:right-[15%] lg:rotate-[-4deg]",
    },
    {
      nama: "Rafli Ahmad",
      company: "Digital Marketing of Praboi",
      testimoni: "“Omnicious design! Best person to work with!”",
      desktopPos: "lg:bottom-[25%] lg:left-[10%] lg:rotate-[-6deg]",
    },
    {
      nama: "Baraka Ramadhan",
      company: "Freelance Designer",
      testimoni: "“Omnicious design! Best person to work with!”",
      desktopPos: "lg:bottom-[10%] lg:left-[45%] lg:rotate-[3deg]",
    },
]

export default function Testimonial() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // 1. Animasi Teks Judul (Background Sticky)
      // Teks akan muncul agak membesar lalu mengecil ke posisi normalnya
      gsap.from(headerRef.current.children, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%", // Mulai pas seksi masuk 60% viewport
          toggleActions: "play none none reverse",
        },
        y: 40,
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        stagger: 0.2, // Teks muncul berurutan
        ease: "back.out(1.2)"
      });

      // 2. Animasi Kartu Polaroid Berserakan
      const cards = gsap.utils.toArray('.testimonial-card');

      cards.forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            // Kita pakai pembungkus luar (parentElement) sebagai trigger
            // karena dia yang memegang posisi absolut secara akurat
            trigger: card.parentElement, 
            start: "top 90%", // Muncul ketika posisi kartu mau masuk layar
            toggleActions: "play none none reverse",
          },
          y: 100, // Muncul dari bawah
          scale: 0.4, // Mulai dari kecil
          opacity: 0,
          duration: 1,
          ease: "back.out(1.6)", // Efek memantul asik seolah kartunya dilempar
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="flex flex-col justify-end gap-8 bg-amblue pb-[60vh]">
      
      {/* JUDUL STICKY (BACKGROUND) */}
      <div 
        ref={headerRef} 
        className="flex flex-col gap-2 lg:gap-6 h-screen text-center px-8 sticky top-0 justify-center opacity-50 bg-project pointer-events-none"
      >
        <h1 className="text-amxl/[90%] lg:text-am6xl font-stn font-bold">What they say?</h1>
        <p className="uppercase text-sm lg:text-base font-light">Testimonials from those who received my service</p>
      </div>

      {/* KARTU TESTIMONIAL */}
      <div className="flex flex-col gap-4 pt-[80vh] pb-6 px-4 lg:relative lg:min-h-screen">
        {items.map((testimonial, index) => (
            
            /* PEMBUNGKUS LUAR: Mengatur posisi Absolute & Rotasi Tailwind */
            <div 
              key={index} 
              className={`w-full lg:w-70 lg:absolute ${testimonial.desktopPos} ${index % 2 == 0 ? 'rotate-2' : '-rotate-2'} z-10`}
            >
                {/* PEMBUNGKUS DALAM: Target Animasi GSAP (Pop-in) */}
                <div className="testimonial-card flex flex-col justify-between gap-6 w-full h-full aspect-52/43 p-6 bg-amwhite text-amblue rounded-3xl will-change-transform shadow-xl">
                  <span className="flex flex-col gap-3">
                    <h1 className="font-stn text-amm/[90%] font-bold">{testimonial.nama}</h1>
                    <p className="text-xs font-light">{testimonial.company}</p>
                  </span>
                  <p className="text-base font-light">{testimonial.testimoni}</p>
                </div>

            </div>
            
        ))}
      </div>
    </section>
  )
}