import { TSESLint } from '@typescript-eslint/utils';
import apiPropertyRule from "./api-property-rule";
import apiInformationRule from "./api-information-rule";
import apiParamRule from "./api-param-rule";

export const rules = {
    'api-property-rule': apiPropertyRule,
    'api-information-rule': apiInformationRule,
    'api-param-rule': apiParamRule,
} satisfies Record<string, TSESLint.RuleModule<string, Array<unknown>>>;
