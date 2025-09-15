import * as constants from '@fixtures/constants';

export type FormulasType = (typeof constants.formulas)[keyof typeof constants.formulas];
