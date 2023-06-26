import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Pokemon from "../interface/Pokemon";

// const API = import.meta.env.VITE_APP_API;
// const VERSION = import.meta.env.VITE_APP_VERSION;

const Dashboard = () => {
  const [pokemon, setPokemon] = useState<Array<Pokemon>>([]);

  const getPokemon = async () => {
    // const getData = await fetch(`${API}/${VERSION}/pokemon?limit=100&offset=0`);
    const getData = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=100&offset=0`
    );
    const response = await getData.json();
    return response;
  };

  const getPokemonDetails = async (pokeDetail: string) => {
    const response = await fetch(`${pokeDetail}`);
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    try {
      getPokemon()
        .then((response) => response)
        .then((data) => {
          const pokemonOnlyDetail = data.results.map(
            (pokemonData: PokemonResult) => {
              return getPokemonDetails(pokemonData.url).then(
                (response) => response
              );
            }
          );
          Promise.all(pokemonOnlyDetail).then((poke) => setPokemon(poke));
        });
    } catch (error) {
      console.log(error);
    }
  }, [pokemon]);

  return (
    <>
      <div className="flex h-screen w-full justify-center p-12">
        <div className="flex flex-col items-center gap-y-24">
          <div className="search-pokemon">
            <input
              type="text"
              name=""
              id=""
              className="form-input"
              placeholder="Search Pokemon..."
            />
          </div>
          <div className="grid grid-cols-5 grid-rows-5 gap-2">
            {pokemon.map(
              (pokeItem: Pokemon, index: number): JSX.Element => (
                <>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        image={pokeItem.sprites?.front_default}
                        alt={pokeItem.name}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {pokeItem.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Height: {pokeItem.height}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Weight: {pokeItem.weight}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Moves: {pokeItem.moves[index]?.move.name}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button size="small" color="primary">
                        Share
                      </Button>
                    </CardActions>
                  </Card>
                </>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export { Dashboard };
