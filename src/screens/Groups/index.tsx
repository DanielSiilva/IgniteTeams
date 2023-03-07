import {useState} from 'react';
import {FlatList} from 'react-native'

import { GroupCard } from '@components/GrupsCard';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';


import {
  Container, 
} from './styles'

export default function Groups() {
  const [groups, setGroups] = useState<string[]>(['Galera a igreja', 'Galera do trabalho'])


  return (
    <Container >
      <Header/>

      <Highlight
        title="Turmas"
        subtitle="jogue com  sua turma"
      />

      <FlatList 
        data={groups}
        keyExtractor={item => item}
        renderItem= {({item})=>(
          <GroupCard 
            title={item}
          />
        )}
      
      />


    </Container>
  );
}


