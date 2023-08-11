import { Colors } from '@constants'
import React from 'react'
import { Circle, G, Svg } from 'react-native-svg'
import styled from 'styled-components/native'

export default function DonutChart(): React.JSX.Element {
  // 반지름과 원주값
  const radius = 70
  const circleCircumference = 2 * Math.PI * radius

  // 임시 데이터
  const activity = 17000
  const staking = 1500
  const total = activity + staking

  // 합계에 따른 백분율
  const activityPercent = (activity / total) * 100
  const stakingPercent = (staking / total) * 100

  // 범위 값
  const activityDashOffset =
    circleCircumference -
    (circleCircumference * activityPercent) / 100
  const stakingDashOffset =
    circleCircumference - (circleCircumference * stakingPercent) / 100

  // 각도계산
  // const activityAngle = (activity / total) * 360
  // const stakingAngle = (staking / total) * 360

  return (
    <GraphContainer>
      <PieWrapper>
        <Svg height={160} width={160} viewBox="0 0 180 180">
          <G rotation={-90} originX={90} originY={90}>
            {total === 0 ? (
              <Circle
                cx="50%"
                cy="50%"
                r={radius}
                stroke="#efefef"
                fill="transparent"
                strokeWidth={40}
              />
            ) : (
              <>
                <Circle
                  cx="50%"
                  cy="50%"
                  r={radius}
                  stroke={Colors.active}
                  fill="transparent"
                  strokeWidth={40}
                  // strokeDasharray={[circleCircumference, 100]}
                  strokeDashoffset={activityDashOffset}
                />
                <Circle
                  cx="50%"
                  cy="50%"
                  r={radius}
                  stroke={Colors.staking}
                  fill="transparent"
                  strokeWidth={40}
                  strokeDasharray={circleCircumference}
                  strokeDashoffset={stakingDashOffset}
                />
              </>
            )}
          </G>
        </Svg>
      </PieWrapper>
    </GraphContainer>
  )
}

const GraphContainer = styled.View`
  justify-content: center;
  align-items: center;
`

const PieWrapper = styled.View`
  align-items: center;
  justify-content: center;
`
