import { useState, useEffect, ChangeEvent } from "react";
import { getPokemon, getPokemonDetails } from "../api/PokeApi";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Pokemon from "../interface/Pokemon";
import { PokeBallLoader } from "../components/loader/PokeBallLoader";
import { Pagination } from "../components/pagination/Pagination";
import { createPortal } from "react-dom";
import { PokeInfo } from "../components/pokemoncard/PokeInfo";

const Dashboard = () => {
  const [pokemon, setPokemon] = useState<Array<Pokemon>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchPokemon, setSearchPokemon] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [showPokemonCard, setShowPokemonCard] = useState<boolean>(false);
  const [pokedex, setPokedex] = useState({
    name: "",
    sprites: "",
    weight: "",
    abilities: "",
  });

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

  const filterPokemon = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(0);
    setSearchPokemon(target.value);
    filterSearchPokemon(target.value);
  };

  const filterSearchPokemon = (searchNamePokemon: string) => {
    const searchResult = pokemon.filter((poke) => {
      if (poke.name?.includes(searchNamePokemon)) {
        return poke;
      }
    });
    setPokemon(searchResult.slice(currentPage, currentPage + 10));
  };

  const nextPage = () => {
    if (currentPage < pokemon.length) {
      setCurrentPage(currentPage + 10);
    }
  };

  const previousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 10);
    }
  };

  return (
    <>
      <div>
        <div className="flex w-full flex-col justify-center p-12">
          <div className="flex flex-col items-center gap-y-24">
            <div>
              <input
                type="text"
                name=""
                id=""
                className="form-input"
                placeholder="Search Pokemon..."
                value={searchPokemon}
                onChange={filterPokemon}
              />
            </div>
            {loading ? (
              <PokeBallLoader />
            ) : (
              <div className="grid grid-cols-5 grid-rows-2 gap-3 max-md:grid-cols-3 max-sm:grid-cols-2">
                {pokemon
                  .map(
                    (pokeItem: Pokemon, index): JSX.Element => (
                      <>
                        <Card
                          key={index}
                          sx={{ maxWidth: 345 }}
                          onClick={() => {
                            setPokedex({
                              name: `${pokeItem.name}`,
                              sprites: `${pokeItem.sprites?.front_default}`,
                              weight: `${pokeItem.weight}`,
                              abilities: `${pokeItem.abilities?.map(
                                (ability) => ability.ability.name
                              )}`,
                            });
                            setShowPokemonCard(true);
                          }}
                        >
                          <CardActionArea>
                            <CardMedia
                              component="img"
                              height="150"
                              image={pokeItem.sprites?.front_default}
                              alt={pokeItem.name}
                              className="mb-1.5"
                            />
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                              className="text-center text-slate-500"
                            >
                              {pokeItem.name}
                            </Typography>
                            <div className="mx-2 rounded-3xl bg-lime-500 p-1.5 text-center max-lg:text-sm max-lg:mx-1">
                              <span className="font-semibold text-white">
                                {pokeItem.types?.map((pokemonType) =>
                                  pokemonType.type.name.toUpperCase()
                                )}
                              </span>
                            </div>
                            <CardContent>
                              {pokeItem.moves?.map((poke, index) => {
                                if (index < 2) {
                                  return (
                                    <Typography
                                      key={index}
                                      variant="body2"
                                      className="text-slate-500 max-lg:text-sm"
                                    >
                                      <span className="text-gray-900 max-lg:text-xs">
                                        Moves:
                                      </span>{" "}
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
                  )
                  .slice(currentPage, currentPage + 10)}
              </div>
            )}
            {showPokemonCard &&
              createPortal(
                <PokeInfo
                  sprites={pokedex.sprites}
                  weight={pokedex.weight}
                  name={pokedex.name}
                  abilities={pokedex.abilities}
                  onClose={() => {
                    setShowPokemonCard(false);
                  }}
                />,
                document.body
              )}
          </div>
          <Pagination previousPage={previousPage} nextPage={nextPage} />
        </div>
      </div>
    </>
  );
};

export { Dashboard };
