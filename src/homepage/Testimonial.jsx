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
  return (
    <section className="flex flex-col justify-end gap-8 bg-amblue pb-[60vh]">
      <div className="flex flex-col gap-2 lg:gap-6 h-screen text-center px-8 sticky top-0 justify-center opacity-50 bg-project">
        <h1 className="text-amxl/[90%] lg:text-am6xl font-stn font-bold">What they say?</h1>
        <p className="uppercase text-sm lg:text-base font-light">Testimonials from those who received my service</p>
      </div>
      <div className="flex flex-col gap-4 pt-[80vh] pb-6 px-4 lg:relative lg
      min-h-screen">
        {items.map((testimonial, index) => (
            <div key={index} className={`aspect-52/43 w-full h-auto bg-amwhite text-amblue rounded-3xl ${index % 2 == 0 ? 'rotate-2' : '-rotate-2'} lg:absolute lg:w-70 ${testimonial.desktopPos}`}>
                <div className="flex flex-col justify-between gap-6 h-full p-6">
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
