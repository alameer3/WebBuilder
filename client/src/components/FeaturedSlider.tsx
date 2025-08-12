// Featured Content Slider - مطابق للأصل
import { useState, useEffect } from 'react';
import Swiper from './Swiper';

interface FeaturedItem {
  id: string;
  title: string;
  image: string;
  type: 'movie' | 'series';
  href: string;
}

const featuredContent: FeaturedItem[] = [
  {
    id: "1",
    title: "حرب الجبالي",
    image: "https://img.downet.net/thumb/270x400/uploads/KrvOM.jpg",
    type: "series",
    href: "/series/4960/حرب-الجبالي"
  },
  {
    id: "2", 
    title: "28 Years Later",
    image: "https://img.downet.net/thumb/270x400/uploads/Gn5bw.webp",
    type: "movie",
    href: "/movie/9995/28-years-later"
  },
  {
    id: "3",
    title: "Dexter Resurrection", 
    image: "https://img.downet.net/thumb/270x400/uploads/dexter.jpg",
    type: "series",
    href: "/series/4994/dexter-resurrection"
  },
  {
    id: "4",
    title: "The Dogs",
    image: "https://img.downet.net/thumb/270x400/uploads/dogs.jpg", 
    type: "movie",
    href: "/movie/9993/the-dogs"
  },
  {
    id: "5",
    title: "The Life of Chuck",
    image: "https://img.downet.net/thumb/270x400/uploads/chuck.jpg",
    type: "movie", 
    href: "/movie/9994/the-life-of-chuck"
  },
  {
    id: "6",
    title: "Nobody's Home",
    image: "https://img.downet.net/thumb/270x400/uploads/nobody.jpg",
    type: "movie",
    href: "/movie/9996/nobodys-home"
  }
];

export default function FeaturedSlider() {
  return (
    <div className="widget-3 widget widget-style-1 mb-5">
      <div className="container">
        <header className="widget-header mb-4">
          <h2 className="header-title font-size-18 font-weight-bold mb-0">
            <span className="header-link text-white">المميزة</span>
          </h2>
          <img src="/style/assets/images/icn-w-header.png" className="header-img" alt="icn-w-header" />
        </header>
      </div>
      <div className="container-fluid">
        <div className="widget-body" style={{ height: '400px', overflow: 'hidden' }}>
          <Swiper
            slidesPerView={6}
            spaceBetween={6}
            loop={true}
            autoplay={{ delay: 3000 }}
            navigation={true}
            className="swiper-container"
          >
            {featuredContent.map((item) => (
              <div key={item.id} className="entry-box entry-box-1">
                <div className="entry-image">
                  <a href={item.href} className="box">
                    <picture>
                      <img src={item.image} className="" alt={item.title} />
                    </picture>
                  </a>
                </div>
                <div className="entry-body px-3 pb-3 text-center">
                  <div className="actions d-flex justify-content-center">
                    <a href={item.href} className="icn play">
                      <i className="icon-play"></i>
                      <div>مشاهدة</div>
                    </a>
                    <a href="javascript:;" className="icn add-to-fav mr-4" data-id={item.id} data-type={item.type}>
                      <i className="icon-plus"></i>
                      <i className="icon-check font-size-20"></i>
                      <div>قائمتي</div>
                    </a>
                  </div>
                  <div className="line my-3"></div>
                  <h3 className="entry-title font-size-14 m-0">
                    <a href={item.href} className="text-white">{item.title}</a>
                  </h3>
                </div>
              </div>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}