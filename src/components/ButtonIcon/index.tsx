import {TouchableOpacityProps} from 'react-native'
import {MaterialIcons} from '@expo/vector-icons'

import {Container, Icon, ButtonIconTypeStyleProps} from './styles'

type Props =  TouchableOpacityProps & {
    //Dessa forma podemos usar todos os icones baseado nessa biblioteca
    
    icon: keyof typeof MaterialIcons.glyphMap;
    type?: ButtonIconTypeStyleProps;
}

export function ButtonIcon({icon, type ='PRIMARY', ...rest}: Props){
    return(
        <Container {...rest}>
            <Icon
                name= {icon}
                type= {type}
            />
        </Container>
    )
}