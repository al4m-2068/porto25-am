import About from "./About";
import Achieves from "./Achieves";
import Hero from "./Hero";
import Projects from "./Projects";
import Testimonial from "./Testimonial";

export default function Homepage() {
    return (
        <>
            <Hero/>
            <About/>
            <Projects/>
            <Achieves/>
            <Testimonial/>
        </>
    )
}