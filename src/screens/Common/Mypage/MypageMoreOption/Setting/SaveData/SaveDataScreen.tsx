import Body from '@components/Body'
import Text from '@components/Text'
import ToggleSwitch from '@components/ToggleSwitch'
import StorageService, { StorageKey } from '@service/StorageService'
import $t from 'i18n'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'

function SaveDataScreen(): React.JSX.Element {
  const [isOnToggle, setIsOnToggle] = useState(false)

  const _changeOption = (): void => {
    const change = !isOnToggle
    StorageService.setItem(
      StorageKey.PLAY_ONLY_WIFI,
      change ? 'Y' : 'N'
    ).then(() => setIsOnToggle(change))
  }

  useEffect(() => {
    StorageService.getItem(StorageKey.PLAY_ONLY_WIFI).then(
      (saveDataOption) => setIsOnToggle(saveDataOption === 'Y')
    )
  }, [])

  return (
    <Body>
      <SettingList disabled>
        <ListTitle>
          {/* Wi-Fi에서만 영상 자동재생 */}
          {$t('MP.MP_STS_PLAY_VIDEO_ON_WIFI')}
        </ListTitle>
        <ToggleSwitch isOn={isOnToggle} onPress={_changeOption} />
      </SettingList>
    </Body>
  )
}

export default SaveDataScreen

const SettingList = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
`
const ListTitle = styled(Text)`
  font-size: 16px;
`
