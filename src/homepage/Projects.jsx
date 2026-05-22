import { Arrows } from "../assets/Assets"

const items = [
    {
        title: 'KampusKITA',
        desc: 'An Islamic online campus for Islamic Study faculty held by Abu Dzar Foundation',
        bg: 'bg-[url(/src/assets/images/p-kampuskita.png)]',
        link: 'https://kampuskita.id'
    },
    {
        title: 'JLExplore Bus',
        desc: 'A multitrip tourist bus provider company by NariExplore',
        bg: 'bg-[url(/src/assets/images/p-jlexplore.png)]',
        link: 'https://jlexplorebus.com'
    },
    {
        title: 'AdzProject',
        desc: "Pondok Tahfizh PLUS Abu Dzar's students project portfolios",
        bg: 'bg-[url(/src/assets/images/p-adzproject.png)]',
        link: '#'
    },
    {
        title: 'Pacu Jalur',
        desc: "One popular Indonesian culture's information website",
        bg: 'bg-[url(/src/assets/images/p-pacujalur.png)]',
        link: 'https://pacujalur.vercel.app'
    },
    {
        title: 'Surauku',
        desc: "The information center for all Masjid in Indonesia",
        bg: 'bg-[url(/src/assets/images/p-surauku.png)]',
        link: 'https://kampuskita.id'
    },
]

export default function Projects() {
  return (
    <section className="flex flex-col lg:flex-row justify-end lg:justify-between gap-8 bg-amblue">
      <div className="flex flex-col gap-2 h-max lg:h-screen lg:w-170 px-8 lg:p-15.5 py-10.5 sticky top-0 justify-end lg:justify-center bg-project">
        <h2 className="text-aml/[110%] lg:text-am2xl font-bold tracking-tight font-stn">I Craft</h2>
        <h1 className="text-am4xl/[90%] lg:text-am6xl font-stn font-bold tracking-tight">Websites</h1>
        <p className="uppercase text-sm lg:text-base text-amwhite/50">That focuses in clear interface and great user experience</p>
        <button className="button border text-amyellow group cursor-pointer hover:bg-amyellow hover:text-amblue hover:-rotate-2 transition-all duration-300 *:transition-all *:duration-300 bg-amblue/60 backdrop-blur-xs mt-4 flex justify-between text-sm/[90%] items-center lg:w-62">Ask Me About This <Arrows type={'upright'} className={'size-6 group-hover:-translate-y-1 group-hover:translate-x-1'} /></button>
      </div>
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 pt-[80vh] lg:py-[100vh] lg:w-full pb-30 px-4 lg:items-center">
        {items.map((project, index) => (
            <div key={index} className={`aspect-52/43 w-full h-auto ${project.bg} bg-cover bg-center bg-projectcard rounded-3xl`}>
                <div className="flex gap-6 items-end h-full p-6 bg-projectcard-linear">
                  <span className="flex flex-col gap-4 w-full">
                    <h1 className="font-stn text-amm font-bold">{project.title}</h1>
                    <p className="text-xs uppercase">{project.desc}</p>
                  </span>
                  <a href={project.link} className="size-14 border shrink-0 flex justify-center items-center rounded-full"><Arrows type={'upright'} className={'size-6'}/></a>
                </div>
            </div>
        ))}
      </div>
    </section>
  )
}
