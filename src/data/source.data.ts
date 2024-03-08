export type TSourceValue =
  | ESourceOptions.NEWSAPI
  | ESourceOptions.GUARDIANAPIS
  | ESourceOptions.NYTIMES
  | ESourceOptions.BBC_NEWS;

export type TSourceOption = { value: string; label: string };

export enum ESourceOptions {
  NEWSAPI = "newsapi",
  GUARDIANAPIS = "guardianapis",
  NYTIMES = "nytimes",
  BBC_NEWS = "bbc-news",
}

export const SourceOptions: TSourceOption[] = [
  { value: "newsapi", label: "News Api" },
  { value: "bbc-news", label: "BBC News" },
  { value: "guardianapis", label: "The Guardian Api" },
  { value: "nytimes", label: "New York Times API" },
];
