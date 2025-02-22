import { Carousel } from "@material-tailwind/react";

const SliderComponent = ({ arrSlides = [], loop, autoplay }) => {
  return (
    <Carousel
      className="h-[350px] w-full"
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all ${
                activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
      loop={loop}
      autoplay={autoplay}
    >
      {arrSlides.map((slide, index) => (
        <div
          key={index}
          className="w-full h-full flex items-center justify-center"
        >
          <img
            src={slide}
            alt={`Slide ${index}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </Carousel>
  );
};

export default SliderComponent;
