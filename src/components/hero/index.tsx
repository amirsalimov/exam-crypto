import { CarouselPlugin } from "./hero-carousel";
import "./style.css";

const Hero = () => {
  return (
    <section className={`hero pb-5 sm:pb-10 pt-12 sm:pt-14 md:pt-16 lg:pt-20`}>
      <div
        className="w-full flex flex-col gap-10 md:gap-14"
        style={{ maxWidth: "1250px", margin: "0 auto", padding: "0 10px" }}
      >
        <div className="flex flex-col justify-center items-center gap-2">
          <h1 className="uppercase text-sky-300 font-bold tracking-tight text-3xl text-center sm:text-4xl md:text-5xl lg:text-6xl">
            CRYPTOFOLIO WATCH LIST
          </h1>
          <p className="text-center text-sm font-semibold tracking-wide text-gray-500 capitalize">
            Get all the Info regarding your favorite Crypto Currency
          </p>
        </div>
        <CarouselPlugin />
      </div>
    </section>
  );
};

export default Hero;
