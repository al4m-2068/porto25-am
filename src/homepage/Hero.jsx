import { useEffect, useRef } from "react";
import { Arrows } from "../assets/Assets";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

// Registrasi plugin SplitText
gsap.registerPlugin(SplitText);

export default function Hero() {
  const heroRef = useRef(null);
  const nameRef = useRef(null);
  const subtitleRef = useRef(null);
  const statsRef = useRef(null);
  const lineRef = useRef(null); // Tambahan: Ref untuk garis pemisah
  const buttonRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      const split = new SplitText(nameRef.current, { 
        type: "lines, chars",
        linesClass: "overflow-hidden" 
      });

      // Set state awal, tambahkan lineRef.current ke sini
      gsap.set([subtitleRef.current, statsRef.current, lineRef.current, buttonRef.current], { 
        opacity: 0, 
        y: 40 
      });
      
      const tl = gsap.timeline({
        delay: 0.1 
      });

      tl.from(heroRef.current, {
        backgroundScale: 1.1,
        backgroundPosition: "center 30%",
        opacity: 0,
        duration: 1.4,
        ease: "power3.out"
      });

      tl.from(split.chars, {
        y: 120,
        rotateX: -90,
        transformOrigin: "0% 50% -50",
        opacity: 0,
        duration: 1.1,
        stagger: 0.03,
        ease: "power4.out"
      }, "-=1.0"); 

      tl.to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.6");

      tl.to(statsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.5");

      // Tambahan: Animasi untuk Garis Pemisah
      tl.to(lineRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.6"); // Muncul barengan ujung animasi stats

      tl.to(buttonRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.7)"
      }, "-=0.4");

    }, heroRef);

    return () => ctx.revert(); 
  }, []);

  return (
    <section 
      ref={heroRef}
      className="h-screen flex flex-col lg:flex-row justify-end lg:justify-between lg:items-end px-8 py-10.5 gap-8 bg-[url('/src/assets/images/bg-home-mobile.avif')] lg:bg-[url('/src/assets/images/bg-home.avif')] bg-cover bg-bottom will-change-transform"
    >
      <div className="flex flex-col gap-6.5">
        <h1 
          ref={nameRef} 
          className="font-stn font-bold text-am5xl/[90%] lg:text-am7xl [perspective:1000px]"
        >
          Albar<br/>
          Abdul<br/>
          Malik
        </h1>
        <h2 ref={subtitleRef} className="uppercase text-sm lg:text-base font-stt font-light text-amwhite/50">
          A <b className="font-bold text-amwhite">designer</b> portfolio, Serving remotely <br className="hidden lg:inline"/> from <b className="font-bold text-amwhite">Tangerang, Indonesia</b>
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
        <div ref={statsRef} className="flex items-center gap-4">
          <span>
            <h1 className="text-aml lg:text-am3xl font-stn font-bold">10+</h1>
            <p className="">Projects</p>
          </span>
          <span className="block w-px h-[40%] bg-amwhite"></span>
          <span>
            <h1 className="text-aml lg:text-am3xl font-stn font-bold">3y+</h1>
            <p className="">Experience</p>
          </span>
        </div>

        {/* Pasang lineRef di sini */}
        <span ref={lineRef} className="block h-px lg:h-auto self-stretch lg:w-px bg-amwhite"></span>

        <button 
          ref={buttonRef}
          className="button border text-amyellow group cursor-pointer hover:bg-amyellow hover:text-amblue hover:-rotate-2 transition-all duration-300 *:transition-all *:duration-300 flex justify-between self-center w-full lg:w-48"
        >
          Hire Me 
          <Arrows type={'upright'} className={'size-6 group-hover:-translate-y-1 group-hover:translate-x-1'}/>
        </button>
      </div>
    </section>
  )
}