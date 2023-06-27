import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Pokemon from "../interface/Pokemon";

// const API = import.meta.env.VITE_APP_API;
// const VERSION = import.meta.env.VITE_APP_VERSION;

const Dashboard = () => {
  const [pokemon, setPokemon] = useState<Array<Pokemon>>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
          Promise.all(pokemonOnlyDetail).then((poke) => {
            setLoading(false);
            setPokemon(poke);
          });
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
          {loading ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="h-10 w-10 animate-spin"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          ) : (
            <div className="grid grid-cols-5 grid-rows-5 gap-3">
              {pokemon.map(
                (pokeItem: Pokemon, index): JSX.Element => (
                  <>
                    <Card key={index} sx={{ maxWidth: 345 }}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="150"
                          image={pokeItem.sprites?.front_default}
                          alt={pokeItem.name}
                          className="mb-1.5"
                        />
                        <button className="mx-9 rounded-3xl bg-lime-500 p-1.5">
                          <span className="font-semibold text-white">
                            WEIGHT:
                          </span>{" "}
                          {pokeItem.weight}
                        </button>
                        <CardContent>
                          {pokeItem.moves?.map((poke, index) => {
                            if (index < 2) {
                              return (
                                <Typography
                                  key={index}
                                  variant="body2"
                                  className="text-slate-500"
                                >
                                  <span className="text-gray-900">Moves:</span>{" "}
                                  {poke.move.name}
                                </Typography>
                              );
                            }
                            return null;
                          })}
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export { Dashboard };
