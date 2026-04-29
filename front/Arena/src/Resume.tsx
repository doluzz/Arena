import { Grid, Text, Button, Heading, Box, Avatar, Flex  } from "@radix-ui/themes";
import HonoClient from './HonoClient'
type BixProps = {
  i: number,
  player: Player,
  iconUrl: string
};

type Player = {
  name: string,
  elo: string,
  icon: string
}

export function Page(){
  const players = [
  {
    name:"doluzz",
    elo: "Master",
    icon: "Jax"
  },{
    name:"Pisse",
    elo: "Bronze",
    icon: "Nunu"
  },{
    name:"Oneezuka",
    elo: "Unranked",
    icon: "Tristana"
  },{
    name:"Strylax",
    elo: "Silver",
    icon: "Belveth"
  },{
    name:"LeSPQR844",
    elo: "Gold",
    icon: "Olaf"
  },{
    name:"matmat1504",
    elo: "Challenger",
    icon: "Warwick"
  }]

  return (
    <>
    <Grid columns={{ initial: "1", md: "2", xl: "3" }} gap="4" >
      {players.map((v, i) => (
        <Bix key={i} i={i} player={v} iconUrl={`./src/assets/${v.icon}.png`} />
      ))}
    </Grid>
    </>
  )
}

function Bix({i, player, iconUrl}: BixProps){
  return (
    <>
      <Flex style={{ backgroundColor: "red" }} m="auto" width="70%" mt="40px" align="center" direction="column">
        <Avatar src={iconUrl} fallback={player.icon}></Avatar>
        <Heading mb="2" size="4" >{player.name} : {player.elo}</Heading>
        <Text size="2">Numéro : {i}</Text>
        <HonoClient></HonoClient>
      </Flex >
    </>
  )
}