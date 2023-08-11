import React from 'react'
import MarketingComponet from './Marketing'

const Marketing = ({
  setIsMarketing,
}: {
  setIsMarketing: React.Dispatch<React.SetStateAction<boolean>>
}): JSX.Element => (
  <MarketingComponet setIsMarketing={setIsMarketing} />
)

export default Marketing
