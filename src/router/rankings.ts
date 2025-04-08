export interface Rank {
  rank: number;
  équipe: string;
  win: number;
  loss: number;
}

export interface RankingProps {
  ranks: Rank[];
}