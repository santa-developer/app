import React from 'react'
import SearchScreen from './SearchScreen'
import { SearchProps } from './SearchModel'

export default function Search(props: SearchProps): JSX.Element {
  return <SearchScreen {...props} />
}
