export interface Sprite {
	back_default: string;
	back_female?: any;
	back_shiny: string;
	back_shiny_female?: any;
	front_default: string;
	front_female?: any;
	front_shiny: string;
	front_shiny_female?: any;
}

export interface Ability {
	name: string;
	url: string;
}

export interface Ability {
	ability: Ability;
	is_hidden: boolean;
	slot: number;
}

export interface Type {
	name: string;
	url: string;
}

export interface Type {
	slot: number;
	type: Type;
}

export interface PokemonBasicDataModel {
    id: number;
    name: string;
    types: Type[];
    weight: number,
    abilities: Ability[];
    sprite: Sprite;
}
