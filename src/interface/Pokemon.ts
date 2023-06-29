interface Pokemon {
  name?: string | undefined;
  abilities?: Array<Ability> | undefined;
  forms?: Array<Forms> | undefined;
  moves?: Array<Moves> | undefined | [];
  height?: number | undefined;
  id?: number | undefined;
  locationAreaEncounters?: string | undefined;
  species?: Species;
  sprites?: Sprites | undefined;
  stats?: Array<object> | undefined;
  types?: Array<Types> | undefined;
  weight?: number | undefined;
}

interface Ability {
  name: string | undefined | unknown;
  url?: string | undefined | unknown;
  is_hide?: boolean | undefined;
  slot?: number | undefined;
}

interface Forms {
  name?: string | undefined;
  url?: string | undefined;
}

interface Moves {
  move: {
    name: string;
  }
}

interface Sprites {
  front_default: string | undefined;
  back_default?: string | undefined;
  front_shiny?: string | undefined;
}

interface Species {
  color: {
    name: string;
    url: string;
  }
  generation: {
    name: string
  }
  names: {
    name: string
  }
}

interface Types {
  type: {
    name: string;
  }
}


export default Pokemon