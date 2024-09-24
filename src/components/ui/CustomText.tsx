import { View, Text, TextStyle, StyleSheet } from "react-native"
import React from "react"
import { Colors, Fonts } from "@utils/Constants"
import { RFValue } from "react-native-responsive-fontsize"

interface Props {
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "h7" | "h8" | "h9" | "body"
  fontFamily?: Fonts
  fontSize?: number
  style?: TextStyle | TextStyle[]
  children?: React.ReactNode
  numberOfLines?: number
  onLayout?: (event: object) => void
}

const CustomText: React.FC<Props> = ({
  variant = "body",
  fontFamily = Fonts.Regular,
  fontSize,
  style,
  children,
  numberOfLines,
  onLayout,
  ...props
}) => {
  let computedFontSize: number

  switch (variant) {
    case "h1":
      computedFontSize = RFValue(fontSize || 22)
    case "h2":
      computedFontSize = RFValue(fontSize || 20)
    case "h3":
      computedFontSize = RFValue(fontSize || 18)
    case "h4":
      computedFontSize = RFValue(fontSize || 16)
    case "h5":
      computedFontSize = RFValue(fontSize || 14)
    case "h6":
      computedFontSize = RFValue(fontSize || 12)
    case "h7":
      computedFontSize = RFValue(fontSize || 12)
    case "h8":
      computedFontSize = RFValue(fontSize || 10)
    case "h9":
      computedFontSize = RFValue(fontSize || 9)
    case "body":
      computedFontSize = RFValue(fontSize || 12)
      break
  }

  const fontFamilyStyle = {
    fontFamily,
  }
  return (
    <Text
      onLayout={onLayout}
      style={[
        styles.text,
        { color: Colors.text, fontSize: computedFontSize },
        fontFamilyStyle,
        style,
      ]}
      numberOfLines={numberOfLines !== undefined ? numberOfLines : undefined}
      {...props}
    >
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  text: {
    textAlign: "left",
  },
})

export default CustomText