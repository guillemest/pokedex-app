export interface Evolution {
	name: string;
	url: string;
  image: string;
}

export interface PokemonDetailData {
	description: string;
	evolution: Evolution[];
}
