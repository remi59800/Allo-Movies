import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import SwiperCore, { Keyboard, Mousewheel } from 'swiper/core';
SwiperCore.use([Keyboard, Mousewheel]);


export const SwiperMovies = ({ items }) => {
    return (
        <Swiper
            grabCursor={true}
            spaceBetween={9}
            slidesPerView={'auto'}
            direction={'horizontal'}
            mousewheel={{
                forceToAxis: true,
            }}
            keyboard={true}
            className='my-swiper'
        >
            {items.map((item) => (
                <SwiperSlide key={item.id}>
                    <Link to={`/film/${item.id}`}>
                        <div className='swiper-cards'>
                            <img
                                src={
                                    item.backdrop_path !== null
                                        ? 'https://image.tmdb.org/t/p/original' + item.backdrop_path
                                        : '/movie-bg.png'
                                }
                                alt={`Affiche ${item.title}`}
                            />
                            <h4>{item.title}</h4>
                        </div>
                    </Link>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};
export default SwiperMovies;