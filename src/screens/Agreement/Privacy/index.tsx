import React from 'react'
import PrivacyComponent from './Privacy'

const Privacy = ({
  setIsPrivacy,
}: {
  setIsPrivacy: React.Dispatch<React.SetStateAction<boolean>>
}): JSX.Element => <PrivacyComponent setIsPrivacy={setIsPrivacy} />

export default Privacy
