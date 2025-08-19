import type { ChoiceDto, GameResultDto } from '../types/dto';
import type { Choice, GameResult } from '../types/model';

export const mapChoice = (dto: ChoiceDto): Choice => {
  const model = {
    id: dto.id,
    name: dto.name,
  } satisfies Choice;

  return model;
};

export const mapGameResult = (dto: GameResultDto): GameResult => {
  const model = {
    results: dto.results,
    player: dto.player,
    computer: dto.computer,
  } satisfies GameResult;

  return model;
};
