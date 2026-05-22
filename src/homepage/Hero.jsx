import { Arrows } from "../assets/Assets";

export default function Hero() {
  return (
    <section className="h-screen flex flex-col lg:flex-row justify-end lg:justify-between lg:items-end px-8 py-10.5 gap-8 bg-[url('/src/assets/images/bg-home-mobile.png')] lg:bg-[url('/src/assets/images/bg-home.png')] bg-cover bg-bottom">
      <div className="flex flex-col gap-6.5">
        <h1 className="font-stn font-bold text-am5xl/[90%] lg:text-am7xl">
          Albar<br/>
          Abdul<br/>
          Malik
        </h1>
        <h2 className="uppercase text-sm lg:text-base font-stt font-light text-amwhite/50">A <b className="font-bold text-amwhite">designer</b> portfolio, Serving remotely <br className="hidden lg:inline"/> from <b className="font-bold text-amwhite">Tangerang, Indonesia</b></h2>
      </div>
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
        <div className="flex items-center gap-4">
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

        <span className="block h-px lg:h-auto self-stretch lg:w-px bg-amwhite"></span>

        <button className="button border text-amyellow group cursor-pointer hover:bg-amyellow hover:text-amblue hover:-rotate-2 transition-all duration-300 *:transition-all *:duration-300 flex justify-between self-center lg:w-48">Hire Me <Arrows type={'upright'} className={'size-6 group-hover:-translate-y-1 group-hover:translate-x-1'}/></button>
      </div>
    </section>
  )
}
