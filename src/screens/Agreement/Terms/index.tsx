import React from 'react'
import TermsComponet from './Terms'

const Terms = ({
  setIsTerms,
}: {
  setIsTerms: React.Dispatch<React.SetStateAction<boolean>>
}): JSX.Element => <TermsComponet setIsTerms={setIsTerms} />

export default Terms
