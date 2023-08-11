export interface NavTabProps {
  tabLabel: string[]
  tabName: string[]
  components: any
  initialRoute?: string
  onIndexChange?: (index: number) => void
}
