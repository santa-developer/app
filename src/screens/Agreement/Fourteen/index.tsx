import React from 'react'
import FourteenComponent from './Fourteen'

const Fourteen = ({
  setIsFourteen,
}: {
  setIsFourteen: React.Dispatch<React.SetStateAction<boolean>>
}): JSX.Element => <FourteenComponent setIsFourteen={setIsFourteen} />

export default Fourteen
