import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Arrows } from "../assets/Assets";

// Registrasi plugin
gsap.registerPlugin(ScrollTrigger);

const items = [
  {
    title: 'KampusKITA',
    desc: 'An Islamic online campus for Islamic Study faculty held by Abu Dzar Foundation',
    bg: 'bg-[url(/src/assets/images/p-kampuskita.avif)]',
    link: 'https://kampuskita.id'
  },
  {
    title: 'JLExplore Bus',
    desc: 'A multitrip tourist bus provider company by NariExplore',
    bg: 'bg-[url(/src/assets/images/p-jlexplore.avif)]',
    link: 'https://jlexplorebus.com'
  },
  {
    title: 'AdzProject',
    desc: "Pondok Tahfizh PLUS Abu Dzar's students project portfolios",
    bg: 'bg-[url(/src/assets/images/p-adzproject.avif)]',
    link: '#'
  },
  {
    title: 'Pacu Jalur',
    desc: "One popular Indonesian culture's information website",
    bg: 'bg-[url(/src/assets/images/p-pacujalur.avif)]',
    link: 'https://pacujalur.vercel.app'
  },
  {
    title: 'Surauku',
    desc: "The information center for all Masjid in Indonesia",
    bg: 'bg-[url(/src/assets/images/p-surauku.avif)]',
    link: 'https://kampuskita.id'
  },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const leftSideRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Animasi untuk Sticky Text (Kiri)
      // Mengambil semua elemen anak langsung dari leftSideRef
      const leftElements = leftSideRef.current.children;
      
      gsap.from(leftElements, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%", // Mulai saat top section masuk 60% layar
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15, // Berurutan: H2 -> H1 -> p -> button
        ease: "power3.out"
      });

      // 2. Animasi untuk Project Cards (Kanan)
      const cards = gsap.utils.toArray('.project-card');
      
      cards.forEach((card) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%", // Mulai saat kartu menyentuh 85% layar bawah
            toggleActions: "play none none reverse",
          },
          y: 80,
          scale: 0.9, // Memberi efek membesar sedikit saat muncul
          opacity: 0,
          duration: 0.8,
          ease: "back.out(1.2)" // Memberi sedikit efek pantulan halus
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="flex flex-col lg:flex-row justify-end lg:justify-between gap-8 bg-amblue">
      
      {/* BAGIAN KIRI - STICKY */}
      <div 
        ref={leftSideRef}
        className="flex flex-col gap-2 h-max lg:h-screen lg:w-170 px-8 lg:p-15.5 py-10.5 sticky top-0 justify-end lg:justify-center bg-project z-6"
      >
        <h2 className="text-aml/[110%] lg:text-am2xl font-bold tracking-tight font-stn">I Craft</h2>
        <h1 className="text-am4xl/[90%] lg:text-am6xl font-stn font-bold tracking-tight">Websites</h1>
        <p className="uppercase text-sm lg:text-base text-amwhite/50">That focuses in clear interface and great user experience</p>
        
        {/* BUNGKUS BUTTON DENGAN DIV AGAR TIDAK BENTROK DENGAN GSAP */}
        <div className="mt-4">
          <button className="button border text-amyellow group cursor-pointer hover:bg-amyellow hover:text-amblue hover:-rotate-2 transition-all duration-300 *:transition-all *:duration-300 bg-amblue/60 backdrop-blur-xs flex justify-between w-full text-sm/[90%] items-center lg:w-62">
            Ask Me About This <Arrows type={'upright'} className={'size-6 group-hover:-translate-y-1 group-hover:translate-x-1'} />
          </button>
        </div>
      </div>

      {/* BAGIAN KANAN - SCROLLABLE CARDS */}
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 pt-[80vh] lg:py-[100vh] lg:w-full pb-30 px-4 lg:items-center">
        {items.map((project, index) => (
          <div 
            key={index} 
            // Tambahkan class 'project-card' untuk target GSAP
            className={`project-card aspect-52/43 w-full h-auto ${project.bg} bg-cover bg-center bg-projectcard rounded-3xl will-change-transform`}
          >
            <div className="flex gap-6 items-end h-full p-6 bg-projectcard-linear">
              <span className="flex flex-col gap-4 w-full">
                <h1 className="font-stn text-amm font-bold">{project.title}</h1>
                <p className="text-xs uppercase">{project.desc}</p>
              </span>
              <a href={project.link} className="size-14 border shrink-0 flex justify-center items-center rounded-full hover:bg-amyellow transition-all duration-300 *:transition-all *:duration-300 group hover:-rotate-2">
                <Arrows type={'upright'} className={'size-6 group-hover:-translate-y-1 group-hover:translate-x-1'}/>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}