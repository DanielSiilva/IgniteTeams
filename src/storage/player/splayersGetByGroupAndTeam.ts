import {playersGetByGroup} from './playersGetByGroup'

export async function playersGetByGroupAndTeam(group: string, team: string){
    try {
        const storage = await playersGetByGroup(group)

        const player = storage.filter(player => player.team === team)

        return player;
        
    } catch (error) {
        throw error;    
    }


}