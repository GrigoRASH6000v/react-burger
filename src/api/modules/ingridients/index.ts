import http from '@/plugins/http.ts';

import type { IngredientsResponse } from './types';

const getAll = async (): Promise<IngredientsResponse> => await http('/ingredients');

export default {
  getAll,
};
