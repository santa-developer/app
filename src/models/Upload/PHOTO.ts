import { SimpleHeaderProps } from '@components/Header/HeaderModel'
import { ViewStyle } from 'react-native'

export type ImageProps = {
  uri: string
  name: string
  type: string
  width?: number
  height?: number
  fileSize?: number | null
}

export interface PhotoProps {
  filename: string | null
  uri: string
  height: number
  width: number
  fileSize: number | null
  playableDuration: number | null
}

interface ImageListProps {
  initialNumToRender?: number
  containerWidth?: number
  ListEmptyComponent?: JSX.Element
  imagesPerRow?: number
  imageMargin?: number
}

interface ZoomImageProps {
  closeButton?: JSX.Element
  closeContainerStyle?: ViewStyle
}

export interface PhotoSelectorProps {
  maximum?: number
  // assetType?: CameraRoll.AssetType
  selectSingleItem?: boolean
  callback: (
    selectedImages: PhotoProps[],
    currentImage: PhotoProps
  ) => void
  selectedImages?: ImageProps[]
  selectedMarker?: ((index: number) => JSX.Element) | JSX.Element
  zoomImageOption?: ZoomImageProps
  imageListOption?: ImageListProps
  // cameraOption?: CameraProps
  headerOption?: SimpleHeaderProps
  photoType?: string
}
