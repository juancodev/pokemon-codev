import { useState, useEffect, ChangeEvent } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Pokemon from "../interface/Pokemon";

const Dashboard = () => {
  const [pokemon, setPokemon] = useState<Array<Pokemon>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchPokemon, setSearchPokemon] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0);

  const getPokemon = async () => {
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
            <div className="search-pokemon">
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
              <div className="grid grid-cols-5 grid-rows-2 gap-3">
                {pokemon
                  .map(
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
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                              className="text-center text-slate-500"
                            >
                              {pokeItem.name}
                            </Typography>
                            <div className="mx-9 rounded-3xl bg-lime-500 p-1.5 text-center">
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
                                      className="text-slate-500"
                                    >
                                      <span className="text-gray-900">
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
          </div>
          <div className="mt-5 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"></div>
          <div className="flex flex-1 justify-between sm:hidden">
            <a
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              onClick={previousPage}
            >
              Previous
            </a>
            <a
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              onClick={nextPage}
            >
              Next
            </a>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center">
            <div>
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <a
                  className="relative inline-flex cursor-pointer items-center rounded-l-md p-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-[#088BED] hover:text-white focus:z-20 focus:outline-offset-0"
                  onClick={previousPage}
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span className="">Previous</span>
                </a>
                &nbsp;&nbsp;
                <a
                  className="relative inline-flex cursor-pointer items-center rounded-r-md p-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-[#088BED] hover:text-white focus:z-20 focus:outline-offset-0"
                  onClick={nextPage}
                >
                  <span className="">Next</span>
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { Dashboard };
