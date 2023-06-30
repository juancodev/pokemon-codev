interface PokemonCloseCard {
  name: string;
  sprites: string;
  weight: string;
  abilities: string;
  onClose: () => void;
}

export default PokemonCloseCard;