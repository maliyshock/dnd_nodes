export type HandleType = "table" | "petri_net";

export type Input = {
  id: string;
  type: HandleType;
};

export type Output = {
  id: string;
  type: HandleType;
};

export type KnimeNode = {
  id: string;
  name: string;
  color: string;
  inputs: Input[];
  outputs: Output[];
};

export type AutocompleteResult<T> = {
  id: string;
  name: string;
  value: T;
};
