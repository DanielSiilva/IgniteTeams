import { GroupCard } from '@components/GrupsCard';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';

import {
  Container, 
} from './styles'

export default function Groups() {
  return (
    <Container >
      <Header/>

      <Highlight
        title="Turmas"
        subtitle="jogue com  sua turma"
      />

      <GroupCard 
        title='Galera do Ignite'
      />

    </Container>
  );
}


