import React, { FC, ReactNode, useState } from 'react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'

import { TCar, BodyType } from '../src/types'

import Filter from '../src/components/filter'
import Carousel from '../src/components/carousel'
import CarListItem from '../src/components/car-list-item'

const Home: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ cars }) => {
  const [bodyTypeFilter, setBodyTypeFilter] = useState<'' | BodyType>('')
  const data = cars.reduce((acc: Array<ReactNode>, car: TCar) => {
    if (!bodyTypeFilter || car.bodyType === bodyTypeFilter)
      acc.push(<CarListItem key={car.id} car={car} />)
    return acc
  }, [])
  return (
    <>
      <Filter value={bodyTypeFilter} setValue={setBodyTypeFilter} />
      <Carousel data={data} key={`carousel-${bodyTypeFilter}`} />
    </>
  )
}

export const getStaticProps: GetStaticProps<{
  cars: Array<TCar>
}> = async () => {
  const res = await fetch('http://localhost:3000/api/cars')
  const cars = await res.json()

  return { props: { cars } }
}

export default Home
