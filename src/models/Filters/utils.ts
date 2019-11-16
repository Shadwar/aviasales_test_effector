import { declOfNum } from "../NormalizedTicket/utils";

/** Получение надписи фильра */
export const getFilterLabel = (n: number): string => {
  if (n === -1) return 'Все';
  if (n === 0) return 'Без пересадок';
  return declOfNum(n, ['пересадка', 'пересадки', 'пересадок']);
};
