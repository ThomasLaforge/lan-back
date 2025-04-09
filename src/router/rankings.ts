import { PrismaClient } from "@prisma/client";
import { Router } from "express";

export interface Rank {
  rank: number;
  équipe: string;
  win: number;
  loss: number;
}

export interface RankingProps {
  ranks: Rank[];
}
const prisma = new PrismaClient();

export const rankingsRouter = Router();

rankingsRouter.get("/", async (req, res) => {
  const results = await prisma.match.findMany();
  const teams = await prisma.team.findMany({
    include: {
      players: true,
    },
  });
  // Get nb wins and losses
  const wins = results.reduce((acc, match) => {
    if (match.score1 > match.score2) {
      acc[match.team1Id] = (acc[match.team1Id] || 0) + 1;
    } else if (match.score1 < match.score2) {
      acc[match.team2Id] = (acc[match.team2Id] || 0) + 1;
    }
    return acc;
  }, {} as Record<number, number>);
  const losses = results.reduce((acc, match) => {
    if (match.score1 < match.score2) {
      acc[match.team1Id] = (acc[match.team1Id] || 0) + 1;
    } else if (match.score1 > match.score2) {
      acc[match.team2Id] = (acc[match.team2Id] || 0) + 1;
    }
    return acc;
  }, {} as Record<number, number>);

  // Get ranks
  const unorderedRanks = teams.map((team) => {
    const teamWins = wins[team.id] || 0;
    const teamLosses = losses[team.id] || 0;
    return {
      équipe: team.name,
      acronym: team.acronym,
      win: teamWins,
      loss: teamLosses,
    };
  });
  // Sort ranks
  unorderedRanks.sort((a, b) => {
    if (a.win === b.win) {
      return a.loss - b.loss;
    }
    return b.win - a.win;
  });
  // Add rank number
  const ranks = unorderedRanks.map((rank, index) => ({
    ...rank,
    rank: index + 1,
  }));

  return res.json({
    ranks: unorderedRanks,
  });
});
