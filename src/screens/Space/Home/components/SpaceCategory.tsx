import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import space from '@api/space.api'
import { HispCategoryVO } from '@models/Common/SPACE'
import SpaceCategoryMember from './SpaceCategoryMember'

/**
 * 스페이스 검색카테고리
 */
export default function SpaceCategory(): JSX.Element {
  const [categoryList, setCategoryList] = useState<HispCategoryVO[]>(
    []
  )

  useEffect(() => {
    space.category
      .get({ includeSpaceCnt: true })
      .then((data) => setCategoryList(data.response))
  }, [])

  return (
    <FlatList
      numColumns={4}
      data={categoryList}
      renderItem={(item): JSX.Element => (
        <SpaceCategoryMember
          title={item.item.ctgrName}
          count={item.item.spaceCnt}
          categoryID={item.item.hispCtgrMgmtNmbr}
        />
      )}
      keyExtractor={(item): string => item.ctgrName}
      columnWrapperStyle={{ gap: 8, paddingVertical: 8 }}
    />
  )
}
