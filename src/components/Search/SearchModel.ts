export interface SearchProps {
  text: string
  placeholder?: string
  onSearch: () => void
  onClear: () => void
  onChangeText: (text: string) => void
  onFocus?: () => void
  onBlur?: () => void
}
