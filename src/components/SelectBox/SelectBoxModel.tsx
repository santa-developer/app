import React from 'react'

interface ItemsProps {
  label: string
  value: string
}

export interface SelectBoxProps {
  items: ItemsProps[]
  onValueChange: (value: any) => void
  selectedValue?: ItemsProps
  placeholder: string
  disabled?: boolean
  fontSize?: number
  placeholderColor?: string
  width?: number | string
  fontColor?: string
  children?: React.ReactNode
}
