import React, { useEffect, useState } from 'react'
import SpaceRecommend from './SpaceRecommend'
import { useRecoilValue } from 'recoil'
import { spaceLocationState } from '@recoil/atoms/Space/space'
import SpaceFollowing from './SpaceFollowing'
import SpaceOwner from './SpaceOwner'
import space from '@api/space.api'
import { FlatList, View } from 'react-native'
import BLTB from '@models/Common/BLTB'
import Card from '@components/Card'
import HomeModal from '@components/Modal/HomeModal/HomeModal'

export default function SpaceHome(): JSX.Element {
  const componentFlag = useRecoilValue(spaceLocationState)
  const [component, setComponent] = useState(<SpaceRecommend />)
  const [feedList, setFeedList] = useState<BLTB[]>([])

  useEffect(() => {
    space.spaceHome
      .get()
      .then((data) => setFeedList(data.response.list))
  }, [])

  useEffect(() => {
    if (componentFlag === 'recommend')
      setComponent(<SpaceRecommend />)
    if (componentFlag === 'follow') setComponent(<SpaceFollowing />)
    if (componentFlag === 'owner') setComponent(<SpaceOwner />)
  }, [componentFlag])

  return (
    <View>
      {feedList && (
        <FlatList
          keyExtractor={(item, index): string =>
            `${item.postMgmtNmbr}_${index}`
          }
          data={feedList}
          renderItem={Card}
          ListHeaderComponent={component}
        />
      )}
      <HomeModal />
    </View>
  )
}
