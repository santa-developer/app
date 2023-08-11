import React from 'react'
import PersonComponet from './Person'

const Person = ({
  setIsPerson,
}: {
  setIsPerson: React.Dispatch<React.SetStateAction<boolean>>
}): JSX.Element => <PersonComponet setIsPerson={setIsPerson} />

export default Person
