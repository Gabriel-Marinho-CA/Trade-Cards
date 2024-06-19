import React from 'react'
import Slider from "react-slick";

import CardElement from '../cards/CardElement';

import { TradeCards } from '../../types/Trades';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


interface TradeUserListProps {
    data: TradeCards[],
    isOffering: boolean
}

const TradeUserList = ({ data, isOffering }: TradeUserListProps) => {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3
              }
            },
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            },
            {
              breakpoint: 547,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
    };


    return (
        <Slider {...settings} className={isOffering ? "trade trade-offering" : "trade trade-receiving"}>
            {

                data.map((card: TradeCards, idx: number) => {
                    return (
                        <li key={idx}>
                            <CardElement card={card.card} />
                        </li>
                    )

                })
            }
        </Slider>
    )
}

export default TradeUserList