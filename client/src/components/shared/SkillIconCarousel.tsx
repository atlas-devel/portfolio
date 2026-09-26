import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css";
import { skillIcons } from "../../assets/data";
import SkillIconCard from "./SkillIconCard";

const SkillIconCarousel = () => (
  <Swiper
    modules={[Pagination, Autoplay]}
    autoplay={{ delay: 2000, disableOnInteraction: false }}
    loop
    spaceBetween={20}
    slidesPerView={1}
    centeredSlides
    breakpoints={{
      640: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      1024: { slidesPerView: 4 },
    }}
    className="relative z-10 min-h-[150px] w-full"
  >
    {skillIcons.map((item) => (
      <SwiperSlide key={item.name} className="!h-auto">
        <SkillIconCard {...item} />
      </SwiperSlide>
    ))}
  </Swiper>
);

export default SkillIconCarousel;
