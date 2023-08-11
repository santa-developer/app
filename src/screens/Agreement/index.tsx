import Fourteen from '@screens/Agreement/Fourteen'
import Marketing from '@screens/Agreement/Marketing'
import Person from '@screens/Agreement/Person'
import Privacy from '@screens/Agreement/Privacy'
import Terms from '@screens/Agreement/Terms'
import React from 'react'
import { Modal } from 'react-native'

export default function AgreementModal({
  isTerms,
  isPrivacy,
  isPerson,
  isMarketing,
  isFourteen,
  setIsTerms,
  setIsPrivacy,
  setIsPerson,
  setIsMarketing,
  setIsFourteen,
}: {
  isTerms?: boolean
  isPrivacy?: boolean
  isPerson?: boolean
  isMarketing?: boolean
  isFourteen?: boolean
  setIsTerms?: React.Dispatch<React.SetStateAction<boolean>>
  setIsPrivacy?: React.Dispatch<React.SetStateAction<boolean>>
  setIsPerson?: React.Dispatch<React.SetStateAction<boolean>>
  setIsMarketing?: React.Dispatch<React.SetStateAction<boolean>>
  setIsFourteen?: React.Dispatch<React.SetStateAction<boolean>>
}): React.JSX.Element | null {
  const visible =
    isTerms || isPrivacy || isPerson || isMarketing || isFourteen

  const onCloseModal = (): void => {
    setIsTerms && setIsTerms(false)
    setIsPrivacy && setIsPrivacy(false)
    setIsPerson && setIsPerson(false)
    setIsMarketing && setIsMarketing(false)
    setIsFourteen && setIsFourteen(false)
  }

  return visible ? (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={onCloseModal}
    >
      {isTerms ? (
        <Terms setIsTerms={onCloseModal} />
      ) : isPrivacy ? (
        <Privacy setIsPrivacy={onCloseModal} />
      ) : isPerson ? (
        <Person setIsPerson={onCloseModal} />
      ) : isMarketing ? (
        <Marketing setIsMarketing={onCloseModal} />
      ) : isFourteen ? (
        <Fourteen setIsFourteen={onCloseModal} />
      ) : (
        <></>
      )}
    </Modal>
  ) : null
}
