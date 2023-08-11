import NavTab from '@components/NavTab'
import React from 'react'
import ActivityRanking from './Component/ActivityRanking'
import StakingRanking from './Component/StakingRanking'
import $t from 'i18n'

export default function RankingTab(): React.JSX.Element {
  return (
    <>
      <NavTab
        tabLabel={[$t('COMM.COMM_WORD_20'), $t('WALT.WALT_WORD_67')]}
        tabName={[`activity`, `staking`]}
        components={[ActivityRanking, StakingRanking]}
      />
    </>
  )
}
