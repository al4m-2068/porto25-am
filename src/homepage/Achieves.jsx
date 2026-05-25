import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GitLogo, ReactLogo } from "../assets/Assets";

// Registrasi ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const items = [
    {
        title: 'Git',
        desc: 'That focuses in clear interface and great user experience',
        style: 'bg-[#DE4C36]',
        icn: GitLogo,
    },
    {
        title: 'React+',
        desc: 'That focuses in clear interface and great user experience',
        style: 'bg-[#61DAFB] text-[#0C0C0C]',
        icn: ReactLogo,
    },
]

export default function Achieves() {
  const sectionRef = useRef(null);
  const leftSideRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Animasi Teks Sticky (Kiri)
      const leftElements = leftSideRef.current.children;
      
      gsap.from(leftElements, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%", // Eksekusi saat seksi masuk 60% layar
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15, // Efek muncul berurutan
        ease: "power3.out"
      });

      // 2. Animasi Cards (Kanan)
      const cards = gsap.utils.toArray('.achieve-card');
      
      cards.forEach((card) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%", // Eksekusi saat kartu menyentuh 85% layar
            toggleActions: "play none none reverse",
          },
          y: 80,
          scale: 0.9,
          opacity: 0,
          duration: 0.8,
          ease: "back.out(1.2)" // Pantulan halus ala kartu melayang masuk
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="flex flex-col lg:flex-row justify-end lg:justify-between gap-8 bg-amblue lg:min-h-screen">
      
      {/* BAGIAN KIRI - STICKY TEXT */}
      <div 
        ref={leftSideRef} 
        className="z-3 flex flex-col gap-2 h-max px-8 py-10.5 lg:p-15.5 sticky top-0 justify-end lg:justify-center bg-project lg:h-screen"
      >
        <h2 className="text-aml/[110%] lg:text-am2xl font-bold tracking-tight font-stn">My</h2>
        <h1 className="text-am4xl/[90%] font-stn font-bold tracking-tight lg:text-7xl">Achieves</h1>
        <p className="uppercase text-sm lg:text-base text-amwhite/50">My Skillstack Updates</p>
      </div>

      {/* BAGIAN KANAN - CARDS */}
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 pt-[60vh] pb-[20vh] px-6 lg:py-[100vh]">
        {items.map((achieves, index) => (
            <div 
              key={index} 
              // Menambahkan class 'achieve-card' dan 'will-change-transform' untuk performa
              className={`achieve-card relative aspect-17/10 w-full h-auto ${achieves.style} rounded-3xl flex flex-col justify-end p-6 gap-4 overflow-hidden will-change-transform`}
            >
                <h1 className="font-stn text-amm font-bold z-2">{achieves.title}</h1>
                <p className="text-xs uppercase z-2">{achieves.desc}</p>
                <achieves.icn className={'absolute -top-4 -right-4 opacity-30 w-40 text-white -rotate-12 h-auto z-1'}/>
            </div>
        ))}
      </div>
      
    </section>
  )
}