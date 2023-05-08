import React, {useRef} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Link} from 'react-router-dom';
import SwiperCore, {Keyboard, Mousewheel} from 'swiper/core';
SwiperCore.use([Keyboard, Mousewheel]);


export const SwiperMovies = ({items}) => {
    const swiperRef = useRef(null);

    const handleSlideClick = (index) => {
        swiperRef.current.slideTo(index);
    };

    return (
        <Swiper
            ref={swiperRef}
            grabCursor={true}
            spaceBetween={9}
            slidesPerView={'auto'}
            direction={'horizontal'}
            mousewheel={{
                forceToAxis: true,
            }}
            keyboard={false}
            className='my-swiper'
        >
            {items.map((item, index) => (
                <SwiperSlide key={item.id}>
                    <Link to={`/film/${item.id}`} onClick={() => handleSlideClick(index)}>
                        <div className='swiper-cards'>
                            <img
                                src={
                                    item.backdrop_path !== null
                                        ? 'https://image.tmdb.org/t/p/original' + item.backdrop_path
                                        : '/movie-bg.png'
                                }
                                alt={`Affiche ${item.title}`}
                            />
                            <p>{item.title}</p>
                        </div>
                    </Link>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};
export default SwiperMovies;