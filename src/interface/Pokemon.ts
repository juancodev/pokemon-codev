interface Pokemon {
  name?: string | undefined;
  abilities?: Array<Ability> | undefined;
  forms?: Array<Forms> | undefined;
  height?: number | undefined;
  id?: number | undefined;
  locationAreaEncounters?: string | undefined;
  species?: Species;
  sprites?: Sprites | undefined;
  stats?: Array<object> | undefined;
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

interface Sprites {
  frontDefault: string | undefined;
  backDefault?: string | undefined;
  frontShiny?: string | undefined;
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

export default Pokemon