import React from 'react'
import NavTab from '@components/NavTab'
import AccountScreen from './Account/AccountScreen'
import FeedScreen from './Feed/FeedScreen'
import HashTagScreen from './HashTag/HashTagScreen'

export default function SearchTabMenu(): React.JSX.Element {
  const accountCount = 0
  const feedCount = 0
  const hashtagCount = 0

  const tabLabels = [
    `계정 ${accountCount}`,
    `피드 ${feedCount}`,
    `해시태그 ${hashtagCount}`,
  ]
  const tabNames = ['account', 'feed', 'hashtag']
  const components = [AccountScreen, FeedScreen, HashTagScreen]
  return (
    <>
      <NavTab
        tabLabel={tabLabels.map((label) => label.toString())}
        tabName={tabNames.map((name) => name.toString())}
        components={components}
      />
    </>
  )
}
