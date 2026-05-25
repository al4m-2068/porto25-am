import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registrasi plugin
gsap.registerPlugin(SplitText, ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Pecah teks menjadi BARIS dan KATA
      // Kita tambahkan overflow-hidden di setiap baris agar berfungsi sebagai topeng
      const split = new SplitText(textRef.current, { 
        type: "lines, words",
        linesClass: "overflow-hidden" // pb-2 agar ekor huruf seperti 'g', 'y', 'p' tidak kepotong
      });

      // 2. Animasi Kata (Words) meluncur dari bawah topeng
      gsap.from(split.words, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%", // Animasi mulai saat teks masuk 75% dari atas layar
          toggleActions: "play none none reverse",
        },
        y: "120%", // Tarik dari bawah (luar batas overflow-hidden baris)
        opacity: 0,
        rotationX: -40, // Sedikit kemiringan 3D saat muncul
        transformOrigin: "center top",
        duration: 0.8,
        stagger: 0.02, // Kecepatan aliran antar kata (sangat cepat dan rapat)
        ease: "power3.out",
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="flex flex-col justify-center items-center px-8 py-60 gap-8 bg-amblue text-aml lg:text-am2xl text-center"
    >
      {/* Hapus style inline-block dan biarkan text menjadi block (w-full) 
        agar SplitText bisa menghitung pemotongan baris dengan sempurna 
      */}
      <h1 
        ref={textRef} 
        className="uppercase font-light text-amwhite/50 w-full lg:w-220 [perspective:1000px] will-change-transform"
      >
        Hi there, <span className="font-stn normal-case font-bold text-amwhite text-amxl lg:text-am4xl">Albar</span> here! I’m a <span className="font-stn normal-case font-bold text-amwhite text-amxl lg:text-am4xl">Multidisciplinary Designer</span>, focused in <span className="font-stn normal-case font-bold text-amwhite text-amxl lg:text-am4xl">UI/UX</span> and <span className="font-stn normal-case font-bold text-amwhite text-amxl lg:text-am4xl">Branding Design</span>.
      </h1>
    </section>
  )
}