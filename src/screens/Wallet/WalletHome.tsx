import React from 'react'
import NavTab from '@components/NavTab'
import WalletMyHIBS from './WalletMyHIBS'
import WalleStakingHome from './WalletMyStaking'
import Body from '@components/Body'

export default function WalletHome(): JSX.Element {
  return (
    <Body>
      <NavTab
        tabLabel={['나의 HIBS', '스테이킹']}
        tabName={['나의 HIBS', '스테이킹']}
        components={[WalletMyHIBS, WalleStakingHome]}
      />
    </Body>
  )
}
