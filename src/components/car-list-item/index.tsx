import React from 'react'
import { useFela } from 'react-fela'
import { Block, Text, useTheme, Link, Flex } from 'vcc-ui'

import { TCar } from '../../types'

import { useIsMobile } from '../../hooks'

type Props = {
  car: TCar
}

const CarListItem: React.FC<Props> = ({ car }) => {
  const theme = useTheme()
  const { css } = useFela()
  const { isMobile } = useIsMobile()

  return (
    <Block>
      <a href={`/learn/${car.id}`} className={css({ textDecoration: 'none' })}>
        <Block extend={{ flex: 1 }}>
          <Text
            extend={{
              textTransform: 'uppercase',
              color: theme.color.foreground.secondary,
            }}
            variant="bates"
            subStyle="emphasis"
          >
            {car.bodyType}
          </Text>

          <Block
            as="h4"
            extend={{
              flexWrap: 'wrap',
              margin: '0 0 4px 0',
              flexDirection: 'row',
              display: isMobile ? undefined : 'flex',
            }}
          >
            <Text
              as="span"
              extend={{ marginRight: 5 }}
              subStyle="emphasis"
              variant="columbus"
            >
              {car.modelName}
            </Text>

            <Text
              as="span"
              extend={{
                textTransform: 'capitalize',
                color: theme.color.foreground.secondary,
              }}
              variant="columbus"
            >
              {car.modelType}
            </Text>
          </Block>
        </Block>

        <Block extend={{ margin: '16px 0' }}>
          <img
            className={css({ width: '100%' })}
            src={car.imageUrl}
            alt={car.modelName}
          />
        </Block>
      </a>
      <Flex
        extend={{
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          flexDirection: 'row',
        }}
      >
        <Link href={`/learn/${car.id}`} arrow="right">
          Learn
        </Link>
        <Link href={`/shop/${car.id}`} arrow="right">
          Shop
        </Link>
      </Flex>
    </Block>
  )
}

export default CarListItem
