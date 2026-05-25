import { useEffect, useRef, useState, useMemo } from "react";
import { Outlet } from "react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registrasi ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function Layout() {
    const [hasClicked, setHasClicked] = useState(false);
    const [message, setMessage] = useState("");
    
    const textareaRef = useRef(null);
    const footerRef = useRef(null); 
    
    // 1. Ref untuk efek Dotted Logo
    const svgRef = useRef(null);
    const dotsRef = useRef([]);

    // 2. Generate Grid Titik (Sekali saja saat komponen di-mount)
    const dots = useMemo(() => {
        const arr = [];
        // Jarak antar titik = 8px
        for (let x = 0; x < 302; x += 8) {
            for (let y = 0; y < 215; y += 8) {
                // x + 4 dan y + 4 agar titik berada di tengah sel grid
                arr.push({ x: x + 4, y: y + 4 }); 
            }
        }
        return arr;
    }, []);

    // 3. Fungsi Interaksi Mouse (Bypass React State demi Performa)
    const handleMouseMove = (e) => {
        if (!svgRef.current) return;
        const rect = svgRef.current.getBoundingClientRect();
        
        // Kalkulasi posisi kursor relatif terhadap ukuran asli SVG (302x215)
        const clientX = e.clientX - rect.left;
        const clientY = e.clientY - rect.top;
        const viewBoxX = (clientX / rect.width) * 302;
        const viewBoxY = (clientY / rect.height) * 215;

        const hoverRadius = 45; // Radius area jangkauan kursor

        dotsRef.current.forEach((dotEl, i) => {
            if (!dotEl) return;
            const dot = dots[i];
            const dx = dot.x - viewBoxX;
            const dy = dot.y - viewBoxY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Jika titik masuk dalam radius kursor, perbesar skalanya
            if (dist < hoverRadius) {
                // Skala maksimal 2.8x (makin dekat kursor, makin besar)
                const scale = 1 + (1.8 * (1 - dist / hoverRadius));
                dotEl.style.transform = `scale(${scale})`;
            } else {
                dotEl.style.transform = `scale(1)`; // Normal
            }
        });
    };

    const handleMouseLeave = () => {
        // Kembalikan semua titik ke ukuran normal saat kursor keluar footer
        dotsRef.current.forEach((dotEl) => {
            if (dotEl) dotEl.style.transform = `scale(1)`;
        });
    };

    const handleFocus = () => {
        if (!hasClicked) {
            setHasClicked(true);
            setMessage("Dear Albar, ");
            
            setTimeout(() => {
                if (textareaRef.current) {
                    textareaRef.current.selectionStart = textareaRef.current.selectionEnd = 12;
                }
            }, 0);
        }
    };

    const socialLinks = [
        { name: "IG", me: "https://instagram.com", work: "https://instagram.com" },
        { name: "LN", me: "https://linkedin.com", work: "https://linkedin.com" },
        { name: "TW", me: "https://x.com", work: "https://x.com" },
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            const footerItems = gsap.utils.toArray('.footer-item');
            gsap.from(footerItems, {
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: "top 85%", 
                    toggleActions: "play none none reverse",
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15, 
                ease: "power3.out"
            });
        }, footerRef);

        return () => ctx.revert();
    }, []);

    return (
        <>
            <header></header>
            <main className="font-stt overflow-x-clip bg-amblue">
                <Outlet/>
            </main>
            
            <footer 
                ref={footerRef} 
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                // Tambahkan relative di sini agar background absolute tidak lari
                className="h-screen relative font-stt flex flex-col lg:flex-row lg:justify-between lg:items-end gap-10.5 px-8 pb-10.5 bg-amblue *:text-amwhite overflow-hidden"
            >
                {/* --- BACKGROUND DOTTED LOGO --- */}
                {/* z-0 dan pointer-events-none agar tidak menghalangi tombol/input text */}
                <div className="absolute inset-0 z-0 pointer-events-none flex justify-center items-center opacity-15 lg:opacity-20">
                    <svg 
                        ref={svgRef} 
                        viewBox="0 0 302 215" 
                        className="w-full max-w-[400px] lg:max-w-[600px]"
                    >
                        <defs>
                            {/* Jadikan path logo kamu sebagai topeng (masking) */}
                            <clipPath id="logo-mask">
                                <path d="M64.678 0.200045C75.4012 -3.35526 104.911 41.1014 130.454 84.0008C151.023 75.2001 170.937 64.628 186.887 52.2C204.799 38.2431 227.289 7.96665 227.289 7.96665C227.289 7.96665 204.609 46.9093 184.549 67.0565C171.312 80.3512 156.052 91.3927 140.104 100.435C158.682 132.505 173.17 159.862 173.197 159.913C217.798 108.136 246.321 34.9806 264.686 33.9666C283.05 32.9537 326.598 98.685 283.136 194.354C272.815 217.073 269.821 214.648 269.781 214.614C269.781 214.614 279.51 181.609 283.136 159.913C296.652 79.0317 264.686 77.1864 264.686 77.1864C264.628 77.279 191.22 194.354 173.197 194.354C163.364 194.354 136.754 151.784 114.586 113.07C103.683 117.759 92.7837 121.612 82.2893 124.708C82.7018 157.202 82.5928 189.265 80.7053 194.354C76.6984 205.159 65.8708 203.393 62.3411 194.354C61.0223 190.977 58.172 163.964 56.1809 131.096C43.736 133.505 32.5791 134.727 23.6077 134.927C-13.7519 135.756 0.515954 120.545 16.8772 117.844C22.2194 116.962 36.4342 114.147 55.0403 109.291C52.8303 58.7667 53.5538 3.88866 64.678 0.200045ZM80.7053 51.1864C80.7053 51.1864 81.3977 74.1004 81.9192 101.639C89.0722 99.4263 96.4889 96.9849 104.007 94.3104C90.5807 70.1689 80.7053 51.1864 80.7053 51.1864Z" />
                            </clipPath>
                        </defs>
                        
                        {/* Terapkan topeng ke seluruh titik yang ada di dalam <g> */}
                        <g clipPath="url(#logo-mask)">
                            {dots.map((dot, i) => (
                                <circle
                                    key={i}
                                    ref={(el) => (dotsRef.current[i] = el)}
                                    cx={dot.x}
                                    cy={dot.y}
                                    r={2}
                                    fill="#F3AE41" // Warna kuning dari logo kamu
                                    // Class Tailwind untuk mengatur transisi kembalinya titik ke ukuran normal
                                    className="transition-transform duration-200 ease-out" 
                                    style={{ transformOrigin: `${dot.x}px ${dot.y}px` }} 
                                />
                            ))}
                        </g>
                    </svg>
                </div>

                {/* --- KONTEN FOOTER (Pastikan relative & z-10 agar menutupi background) --- */}
                <div className="relative z-10 flex flex-col gap-6 w-auto">
                    <h1 className="footer-item font-stn text-aml/[120%] lg:text-am2xl font-bold will-change-transform pointer-events-none">
                        Interested to<br/>collaborate? Let’s<br/>get in touch!
                    </h1>
                    
                    <div className="footer-item flex flex-col gap-2 will-change-transform">
                        <label htmlFor="email" className="text-sm font-bold font-stn">Email</label>
                        <span className="relative flex pb-1 border-b border-amwhite group text-sm lg:text-base *:uppercase">
                            {!hasClicked && (
                                <p className="absolute pointer-events-none font-bold">Dear Albar, </p>
                            )}
                            <textarea 
                                ref={textareaRef} 
                                onChange={(e) => setMessage(e.target.value)} 
                                value={message} 
                                onFocus={handleFocus} 
                                className={`w-full py-0 bg-transparent font-light outline-none placeholder-gray-400 overflow-hidden ${!hasClicked ? "indent-23 lg:indent-27 h-6" : "indent-0 min-h-6"}`} 
                                type="text" 
                                id="email" 
                                name="email" 
                                placeholder="Type your message here" 
                            />
                        </span>
                    </div>

                    <div className="footer-item flex flex-col gap-2 -mb-4 will-change-transform">
                        <p className="text-sm font-bold font-stn">Follow</p>
                        <div className="flex gap-6">
                            {socialLinks.map((item, index) => (
                                <div key={index} className="group flex flex-col gap-1 cursor-pointer text-sm lg:text-base">
                                    <span className="font-bold">{item.name}</span>
                                    <div className="flex gap-1.5 max-w-0 opacity-0 invisible transition-all duration-300 ease-out group-hover:max-w-38 group-hover:opacity-100 group-hover:visible group-hover:translate-x-0 whitespace-nowrap text-xs uppercase font-light text-amwhite/60">
                                        <a className="hover:text-amwhite transition-colors" href={item.me} target="_blank" rel="noreferrer">( Me )</a>
                                        <a className="hover:text-amwhite transition-colors" href={item.work} target="_blank" rel="noreferrer">( Work )</a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="relative z-10 footer-item uppercase font-light flex flex-col gap-4.5 lg:w-103 lg:text-right shrink-0 will-change-transform mt-8 lg:mt-0 pointer-events-none">
                    <h1 className="font-light uppercase text-sm lg:text-base">
                        “So remain, (O Muhammad), you and those who have returned with you (to the fold of faith and obedience from unbelief and rebellion) steadfast (in adhering to the straight way) as you were commanded. And do not exceed the limits of (service to Allah). For certainly He is aware of all what you do.”
                    </h1>
                    <p className="font-light text-xs lg:text-sm">
                        (Holy Qur’an, Surah Hud Verse 112)
                    </p>
                </div>
            </footer>
        </>
    )
}