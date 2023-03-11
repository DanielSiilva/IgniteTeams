import {useState, useEffect, useRef} from 'react'
import {Alert, FlatList, TextInput, Keyboard} from 'react-native'
import { useRoute } from '@react-navigation/native';

import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { PlayerCard } from '@components/PlayerCard';
import {ListEmpty} from '@components/ListEmpty'
import {Button} from '@components/Button'

import { AppError } from '@utils/AppError';
import { playerAddByGroup } from '@storage/player/playerAddByGroup';


import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";
import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO';
import { playersGetByGroupAndTeam } from '@storage/player/splayersGetByGroupAndTeam';
import { playerRemoveByGroup } from '@storage/player/srcplayerRemoveByGroup';

type RouteParams = {
    group: string;
}



export function Players(){
    const [newPlayerName, setNewPlayerName] = useState('')
    const [team, setTeam] = useState('Time A')
    const [players, setPlayers] = useState<PlayerStorageDTO[]>([])

    const route = useRoute();
    const {group} = route.params as RouteParams

    const newPlayerNameInputRef = useRef<TextInput>(null)


    async function handleAddPlayer(){
        if(newPlayerName.trim().length === 0){
            return Alert.alert('Nova pessoa', 'Informe o nome da pessoa para adicionar ')
        }

        const newPlayer = {
            name: newPlayerName,
            team
        }

        try {
            await playerAddByGroup(newPlayer, group);
            setNewPlayerName('')
            fetchPlayerByTeam();

        } catch (error) {

            if(error instanceof AppError){
                Alert.alert('Nova pessoa', error.message)
            }else{
                console.log(error)
                Alert.alert('Nova pessoa', 'Não foi possivel adicionar ')
            }
        }
    }


    async function fetchPlayerByTeam(){
        try {
            const playersByTeam = await playersGetByGroupAndTeam(group, team)
            setPlayers(playersByTeam)
            
        } catch (error) {
            console.log(error)
            Alert.alert('Pessoas', 'Não foi posviel carregar as pessoas de time selecionado')
        }
    }


    async function handlePlayerRemove(playerName: string){
        try {
            await playerRemoveByGroup(playerName, group)
            fetchPlayerByTeam()
            
        } catch (error) {
            throw error;

            Alert.alert('Remover pessoa', 'Não foi possível remover essa pessoa.');
        }
    }


    useEffect(() => {
        fetchPlayerByTeam();
    }, [team])


    return(
        <Container>
            <Header showBackButton/>

            <Highlight 
                title={group}
                subtitle="adcione a galera e separe os times"
            />

            <Form>

                <Input
                    inputRef={newPlayerNameInputRef}
                    placeholder="Nome da pessoa"
                    value={newPlayerName}
                    onChangeText={setNewPlayerName}
                    autoCorrect={false}
                    onSubmitEditing={handleAddPlayer}
                    returnKeyType="done"
                />

                <ButtonIcon 
                    icon="add"
                    type="PRIMARY"
                    onPress={handleAddPlayer}
                />

            </Form>

            <HeaderList>
                <FlatList 
                    data={['Time A', 'Time B']}
                    keyExtractor={item => item}
                    renderItem={({ item }) => (
                        <Filter 
                            title={item}
                            isActive={item === team}
                            onPress={() => setTeam(item)}
                        />
                    )}
                    horizontal
                />

                <NumberOfPlayers>
                    {players.length}
                </NumberOfPlayers>
            </HeaderList>

            <FlatList
                data={players}
                keyExtractor={item => item.name}
                renderItem={({item}) => (
                    <PlayerCard 
                        name={item.name}
                        onRemove ={() => handlePlayerRemove(item.name)}
                    
                    />
                )}
                ListEmptyComponent={() => (
                    <ListEmpty message="Não há pessoas nesse time" />
                  )}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={[
                        { paddingBottom: 100 }, 
                        players.length === 0 && { flex: 1 }
                    ]}
            />

            <Button 
                title="Remover Turma"
                type="SECONDARY"
            />
        </Container>
    )
}