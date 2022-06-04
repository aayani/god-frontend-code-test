import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import React from 'react'
import Slider from 'react-slick'
import { useFela } from 'react-fela'
import { Block, Click, Icon, useTheme } from 'vcc-ui'

import { useIsMobile } from '../../hooks'

const SLIDES_TO_SHOW_DEFAULT = 4

const arrowStyle = {
  position: 'absolute',
  bottom: '-50px',
  right: '12px',
  transition: 'opacity 0.5s',
}
const disabledArrowStyle = { opacity: 0.5 }

interface ArrowProps {
  currentSlide: number
  slideCount: number
  slidesToShow: number
}

const setArrowDisabled = (props: ArrowProps, isNextBtn: boolean) => {
  const isDisabled = isNextBtn
    ? props.currentSlide === props.slideCount - props.slidesToShow
    : props.currentSlide === 0

  return isDisabled ? disabledArrowStyle : {}
}

const PrevArrow = (props: ArrowProps) => {
  const { css } = useFela()

  return (
    <Click
      {...props}
      className={css({
        ...arrowStyle,
        right: 60,
        ...setArrowDisabled(props, false),
      })}
    >
      <Icon type="mediacircled-previous-32" />
    </Click>
  )
}
const NextArrow = ({ ...props }: ArrowProps) => {
  const { css } = useFela()

  return (
    <Click
      {...props}
      className={css({ ...arrowStyle, ...setArrowDisabled(props, true) })}
    >
      <Icon type="mediacircled-next-32" />
    </Click>
  )
}

type Props = {
  data: Array<React.ReactNode>
  slidesToShow?: number
}

const Carousel: React.FC<Props> = ({
  data,
  slidesToShow = SLIDES_TO_SHOW_DEFAULT,
}) => {
  const theme = useTheme()
  const { css } = useFela()
  const { isMobile } = useIsMobile()

  const desktopSettings = {
    dots: false,
    slidesToShow: slidesToShow,
    touchMove: false,
    infinite: false,
    prevArrow: ((props) => (
      <PrevArrow slidesToShow={slidesToShow} {...props} />
    ))(),
    nextArrow: ((props) => (
      <NextArrow slidesToShow={slidesToShow} {...props} />
    ))(),
  }
  const mobileSettings = {
    dots: true,
    slidesToShow: 1,
    arrows: false,
    infinite: false,
    variableWidth: true,
    swipeToSlide: true,
    dotsClass: css({
      display: 'flex !important',
      justifyContent: 'center',
      margin: '10px',
      padding: 0,
      listStyle: 'none',
      '& li': {
        display: 'block',
        borderRadius: '50%',
        height: '8px',
        width: '8px',
        margin: '0 4px',
        overflow: 'hidden',
        background: theme.color.ornament.divider,
        '&.slick-active': {
          background: theme.color.foreground.primary,
        },
        '& button': {
          cursor: 'pointer',
          opacity: 0,
        },
      },
    }),
  }

  return (
    <Block extend={{ paddingBottom: '60px' }}>
      <Slider {...(isMobile ? mobileSettings : desktopSettings)}>
        {data.map((item, ind) => (
          <Block key={ind}>
            <Block
              extend={{
                margin: '0 12px',
                width: isMobile
                  ? window.innerWidth *
                    (window.innerWidth < theme.breakpoint.size.medium
                      ? 0.8
                      : 0.4)
                  : 'auto',
              }}
            >
              {item}
            </Block>
          </Block>
        ))}
      </Slider>
    </Block>
  )
}

export default Carousel
