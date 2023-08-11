import Login from '@screens/Auth/Login'
import React from 'react'

import DormantEmail from '@screens/Auth/Dormant/DormantEmailScreen'
import DormantPass from '@screens/Auth/Dormant/DormantPassScreen'
import DormantSms from '@screens/Auth/Dormant/DormantSmsScreen'

import LoginPswdUpdate from '@screens/Auth/Login/PswdUpdateScreen'
import LoginStepBirth from '@screens/Auth/Login/StepBirthScreen'
import LoginStepEmail from '@screens/Auth/Login/StepEmailScreen'

import SignUpStepAgreement from '@screens/Auth/SignUp/StepAgreementScreen'
import SignUpStepBirth from '@screens/Auth/SignUp/StepBirthScreen'
import SignUpStepEmail from '@screens/Auth/SignUp/StepEmailScreen'
import SignUpStepId from '@screens/Auth/SignUp/StepIdScreen'
import SignUpStepPw from '@screens/Auth/SignUp/StepPwScreen'

import FindID from '@screens/Auth/Find/ID'
import FindIDResult from '@screens/Auth/Find/ID/FindIDResultScreen'
import FindPW from '@screens/Auth/Find/PW'
import FindPWResult from '@screens/Auth/Find/PW/FindPWResultScreen'
import ResetPW from '@screens/Auth/Find/PW/ResetPWScreen'

import { Colors } from '@constants'
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack'
import { GroupToStack } from './GroupTostack'

const Stack = createStackNavigator()

export default function AuthNavigator(): JSX.Element {
  const loginGroup = {
    LoginPswdUpdate,
    LoginStepEmail,
    LoginStepBirth,
  }
  const dormantGroup = {
    DormantEmail,
    DormantPass,
    DormantSms,
  }
  const signUpGroup = {
    SignUpStepEmail,
    SignUpStepId,
    SignUpStepPw,
    SignUpStepBirth,
    SignUpStepAgreement,
  }
  const findGroup = {
    FindID,
    FindPW,
    ResetPW,
    FindIDResult,
    FindPWResult,
  }
  const resetGroup = {}

  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: Colors.wh },
        cardStyleInterpolator:
          CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen
        name={'Auth'}
        component={Login}
        options={{
          headerShown: false,
          gestureEnabled: false,
          cardStyleInterpolator: undefined,
        }}
      />
      {GroupToStack(Stack, loginGroup)}
      {GroupToStack(Stack, dormantGroup)}
      {GroupToStack(Stack, signUpGroup)}
      {GroupToStack(Stack, findGroup)}
      {GroupToStack(Stack, resetGroup)}
    </Stack.Navigator>
  )
}
