import { TouchableOpacityProps } from "react-native";
import { Container, Icon, Title } from "./styles";

//Juntando as tipagens. Dessa forma podemos usar as propriedades de um componente nativo e unir com as que criamos durante o desenvolvimento

type Props = TouchableOpacityProps & {
  title: string;
}

export function GroupCard({ title, ...rest }: Props) {
  return (
    <Container {...rest}>
      <Icon />
      <Title>
        {title}
      </Title>
    </Container>
  )
}