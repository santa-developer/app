import React from 'react'
import HyperlinkScreen from './HyperLinkScreen'
import { hyperLinkProps } from './HyperlinkModel'

export default function Hyperlink(
  props: hyperLinkProps
): JSX.Element {
  return <HyperlinkScreen {...props} />
}
