import { Colors, Fonts } from "@utils/Constants"
import { FC } from "react"
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from "react-native"
import CustomText from "./CustomText"

interface ButtonProps {
  onPress: () => void
  title: string
  disabled: boolean
  loading: boolean
}

const Button: FC<ButtonProps> = ({ disabled, loading, onPress, title }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      style={[
        styles.btn,
        {
          backgroundColor: disabled ? Colors.disabled : Colors.secondary,
        },
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color="white"
          size="small"
        />
      ) : (
        <CustomText
          variant="h6"
          style={styles.text}
          fontFamily={Fonts.SemiBold}
        >
          {title}
        </CustomText>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btn: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 15,
    marginVertical: 15,
    width: "100%",
  },
  text: {
    color: "#fff",
  },
})

export default Button