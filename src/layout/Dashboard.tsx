import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Heading,
  Stack,
} from "@chakra-ui/react";
import Pokemon from "../interface/Pokemon";
const API = import.meta.env.VITE_APP_API;
const VERSION = import.meta.env.VITE_APP_VERSION;

const Dashboard = () => {
  const [pokemon, setPokemon] = useState<Array<Pokemon>>([]);

  const getPokemon = async (API: string, VERSION: string) => {
    const getData = await fetch(`${API}/${VERSION}/pokemon?limit=100&offset=0`);
    const response = await getData.json();
    return response.results;
  };

  useEffect(() => {
    try {
      getPokemon(API, VERSION).then((data) => {
        setPokemon(data);
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
          <div className="card-list-pokemon grid grid-cols-5 grid-rows-5">
            {pokemon.map(
              (pokeItem: Pokemon): JSX.Element => (
                <>
                  {/* <div className="h-32 w-32 border">
                    <div>{pokeItem.name}</div>
                  </div> */}
                  <Card maxW="md" borderWidth="10px">
                    <CardBody>
                      <Stack mt="6" spacing="3">
                        <Heading size="lg">{pokeItem.name}</Heading>
                        <Text>1</Text>
                      </Stack>
                    </CardBody>
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
