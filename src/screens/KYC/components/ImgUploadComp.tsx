import React from 'react'
import { Colors } from '@constants'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Text from '@components/Text'
import NoImage from '@images/svg/NoImage.svg'
import { getImageForm } from './getImageForm'
import { KYC_INFO } from '@models/KYC'

interface Props {
  form: {
    type: string
    state: KYC_INFO
    setState: React.Dispatch<React.SetStateAction<KYC_INFO>>
  }
  title: string
  desc: string
}

export default function ImgUploadComp(
  props: Props
): React.JSX.Element {
  const { form, title, desc } = props

  const handleUpload = async (): Promise<void> => {
    const { type, state, setState } = form
    const image = await getImageForm()

    switch (type) {
      case 'IDcard':
        setState({ ...state, authIdImg: [image] })
        break
      case 'Face':
        setState({ ...state, authFaceImg: [image] })
        break
      case 'POR':
        setState({ ...state, btnUploadIdcardImg: [image] })
        break
      case 'PORFace':
        setState({ ...state, btnUploadFaceImg: [image] })
        break
    }
  }

  return (
    <TouchableOpacity style={styles.uploadBox} onPress={handleUpload}>
      <View style={{ marginBottom: 10 }}>
        <NoImage />
      </View>

      <Text
        size={14}
        bold={`normal`}
        color={Colors.bl}
        style={{ lineHeight: 20, marginBottom: 3 }}
      >
        {title}
      </Text>
      <Text
        size={12}
        bold={`normal`}
        color={Colors.nagative}
        style={{ lineHeight: 14 }}
      >
        {desc}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  uploadBox: {
    width: '100%',
    height: 133,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.active,
    borderRadius: 4,
  },
})
