import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Colors } from '@constants'
import Text from '@components/Text'
import IconDot from '@images/svg/IconDot.svg'
import IconCurrDot from './IconCurrDot'

interface Props {
  title: string
  step: number
}

function FirstStep(): JSX.Element {
  return (
    <>
      <IconCurrDot order={1} />
      <View style={styles.dotBox}>
        <IconDot color={Colors.disabled} />
      </View>
      <View style={styles.dotBox}>
        <IconDot color={Colors.disabled} />
      </View>
    </>
  )
}

function SecondStep(): JSX.Element {
  return (
    <>
      <IconDot color={Colors.nagative} />
      <View style={styles.dotBox}>
        <IconCurrDot order={2} />
      </View>
      <View style={styles.dotBox}>
        <IconDot color={Colors.disabled} />
      </View>
    </>
  )
}

function ThirdStep(): JSX.Element {
  return (
    <>
      <IconDot color={Colors.nagative} />
      <View style={styles.dotBox}>
        <IconDot color={Colors.nagative} />
      </View>
      <View style={styles.dotBox}>
        <IconCurrDot order={3} />
      </View>
    </>
  )
}

export default function KYCHeader(props: Props): JSX.Element {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.titleContainer}>
        <View>
          <Text
            size={14}
            bold={'normal'}
            color={Colors.nagative}
          >{`KYC 인증하기`}</Text>
          <Text size={24} bold={'500'} color={Colors.bl}>
            {props.title}
          </Text>
        </View>

        <View style={styles.dotsContainer}>
          {props.step === 1 ? (
            <FirstStep />
          ) : props.step === 2 ? (
            <SecondStep />
          ) : (
            <ThirdStep />
          )}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 19,
    paddingBottom: 25,
    paddingHorizontal: 15,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 54,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dotBox: {
    marginLeft: 10,
  },
})
