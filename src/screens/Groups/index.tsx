import { useState } from 'react';
import { FlatList } from 'react-native';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Container } from './styles';
import { ListEmpty } from '@components/ListEmpty';
import { GroupCard } from '@components/GroupsCard';
import {Button} from '@components/Button'

export function Groups() {
  const [groups, setGroups] = useState<string[]>([]);

  function handleNewGroup(){
    
  }

  return (
    <Container>
      <Header />

      <Highlight 
        title="Turmas"
        subtitle="jogue com sua turma"
      />

      <FlatList 
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <GroupCard 
            title={item} 
          />
        )}

        contentContainerStyle={groups.length === 0 && { flex: 1 }}

        ListEmptyComponent={() => (
          <ListEmpty message="Que tal cadastrar a primeira turma?" />
        )}

        showsHorizontalScrollIndicator={false}
      />

      <Button 
        title='Criar nova turma'
        onPress={handleNewGroup}
      />
    </Container>
  );
}