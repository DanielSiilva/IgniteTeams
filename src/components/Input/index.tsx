import {useTheme} from 'styled-components/native'

import { TextInputProps, TextInput } from "react-native";
import { Container } from "./styles";

type Props = TextInputProps & {
  inputRef?: React.RefObject<TextInput>;
}


export function Input({ inputRef,...rest }: Props) {
  //acessando as cores atraves da Hook useTheme
  const {COLORS} = useTheme()

  return (
    <Container 
      ref={inputRef}
      placeholderTextColor={COLORS.GRAY_300}
      {...rest} 
    />
  )
}