import React from 'react'
import { CardProps } from './CardModel'

import Hr from '@components/Hr'
import CardUserInfo from './component/CardUserInfo'
import CardPost from './component/CardPost'
import CardAction from './component/CardAction'
import CardContents from './component/CardContents'
import CardComment from './component/CardComment'

export default function CardScreen({
  item,
  children,
}: CardProps): JSX.Element {
  return (
    <>
      {children && children}
      <CardUserInfo item={item} />
      <CardPost item={item} />
      <CardAction item={item} />
      <CardContents item={item} />
      <Hr />
      <CardComment item={item} />
    </>
  )
}
