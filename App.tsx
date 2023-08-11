import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { RecoilEnv, RecoilRoot } from 'recoil'
import Main from './Main'
import { QueryClient, QueryClientProvider } from 'react-query'

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false
const queryClient = new QueryClient()

function App(): JSX.Element {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <Main />
        </SafeAreaProvider>
      </QueryClientProvider>
    </RecoilRoot>
  )
}

export default App
