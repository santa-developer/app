import _ from 'lodash'
import React from 'react'

export const GroupToStack = (
  Stack: any,
  group: Record<string, any>
): any => {
  return _.map(group, (val, key) => (
    <Stack.Screen
      key={key}
      name={key}
      component={val}
      options={val.navigationOptions}
    />
  ))
}
