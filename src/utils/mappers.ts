import type { ChoiceDto } from '../types/dto';
import type { Choice } from '../types/model';

export const mapChoice = (dto: ChoiceDto): Choice => {
  const model = {
    id: dto.id,
    name: dto.name,
  } satisfies Choice;

  return model;
};
