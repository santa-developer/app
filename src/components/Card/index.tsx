import React from 'react'
import CardScreen from './CardScreen'
import { CardProps } from './CardModel'

export default function Card(props: CardProps): JSX.Element {
  return <CardScreen {...props} />
}
