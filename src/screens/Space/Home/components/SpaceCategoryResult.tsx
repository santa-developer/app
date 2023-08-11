import React, { useEffect, useState } from 'react'
import SpaceSearchResultHeader from './SpaceSearchResultHeader'
import { StackNavigationOptions } from '@react-navigation/stack'
import { CommonHeader } from '@components/Header'
import { useRecoilValue } from 'recoil'
import { selectedSpaceCategoryInfo } from '@recoil/atoms/Space/space'
import { useNavigation } from '@react-navigation/native'
import Body from '@components/Body'
import space from '@api/space.api'
import { SpaceCategory } from '@models/Common/SPACE'
import { ScrollView } from 'react-native'
import SpaceToSearch from './SpaceToSearch'

/**
 * 스페이스 카테고리 중에 하나 클릭해서 들어가는 특정 카테고리 검색 결과 화면
 */
export default function SpaceCategoryResult(): JSX.Element {
  const navigation = useNavigation()
  const selectedInfo = useRecoilValue(selectedSpaceCategoryInfo)
  const [categoryList, setCategoryList] = useState<SpaceCategory[]>(
    []
  )
  useEffect(() => {
    const option: StackNavigationOptions = CommonHeader({
      title: `${selectedInfo.title} ${selectedInfo.count}개`,
    })
    space.spaceInCategory
      .get({
        hispCtgrMgmtNmbr: selectedInfo.categoryID,
      })
      .then((data) => setCategoryList(data.response.list))

    navigation.setOptions(option)
  }, [selectedInfo, navigation])

  return (
    <Body>
      <SpaceSearchResultHeader />
      <ScrollView
        style={{
          marginVertical: 18,
          flex: 1,
        }}
      >
        {categoryList.map((item, index) => (
          <SpaceToSearch
            key={index}
            spaceName={item.hispName}
            category={item.ctgrName}
            followCnt={item.flwgCnt}
            intro={item.hispInf}
          />
        ))}
      </ScrollView>
    </Body>
  )
}
