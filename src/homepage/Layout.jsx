import { useRef, useState } from "react";
import { Outlet } from "react-router";

export default function Layout() {
    const [hasClicked, setHasClicked] = useState(false);
    const [message, setMessage] = useState("");
    const textareaRef = useRef(null);

    const handleFocus = () => {
        if (!hasClicked) {
            setHasClicked(true);
            setMessage("Dear Albar, ");
            
            // Opsional: Memaksa kursor berada di paling akhir teks setelah focus
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
    return (
        <>
            <header></header>
            <main className="font-stt overflow-x-clip">
                <Outlet/>
            </main>
            <footer className="font-stt flex flex-col lg:flex-row lg:justify-between lg:items-end gap-10.5 px-8 pb-10.5 bg-amblue *:text-amwhite">
                <div className="flex flex-col gap-6">
                    <h1 className="font-stn text-aml/[120%] lg:text-am2xl font-bold">Interested to<br/>collaborate? Let’s<br/>get in touch!</h1>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-sm font-bold font-stn">Email</label>
                        <span className="relative flex pb-1 border-b border-amwhite group text-sm lg:text-base *:uppercase">
                            {!hasClicked && (
                                <p className="absolute pointer-events-none font-bold
                                ">Dear Albar, </p>
                            )}
                            <textarea ref={textareaRef} onChange={(e) => setMessage(e.target.value)} value={message} onFocus={handleFocus} className={`w-full py-0 bg-transparent font-light outline-none placeholder-gray-400 overflow-hidden ${!hasClicked ? "indent-23 lg:indent-27 h-6" : "indent-0 min-h-6"}`} type="text" id="email" name="email" placeholder="Type your message here" />
                        </span>
                    </div>
                    <div className="flex flex-col gap-2 -mb-4">
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
                <div className="uppercase font-light flex flex-col gap-4.5 lg:w-103 lg:text-right">
                    <h1 className="font-light uppercase font-light text-sm lg:text-base">
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