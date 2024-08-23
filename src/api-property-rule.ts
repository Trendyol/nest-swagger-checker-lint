import {TSESLint} from '@typescript-eslint/utils';
import { SwaggerAnalyzer, Error, ErrorKind } from 'nest-swagger-checker';

type MessageIds = 'swaggerError';

const now = () => Date.now() / 1000;

// * State

let ERRORS: Record<string, any> = {};
let FIRST_RUN = true;

// * SwaggerAnalyzer stuff

const swaggerAnalyzer = new SwaggerAnalyzer({
    interactive: false,
});

ERRORS = swaggerAnalyzer.run();

// HACK: ...
setTimeout(() => {
    FIRST_RUN = false;
}, 5000);

const getErrors = (overwrittenFiles) => {
    if (FIRST_RUN) {
        return ERRORS;
    }
    return swaggerAnalyzer.run({ overwrittenFiles });
};
const apiPropertyRule: TSESLint.RuleModule<MessageIds> = {
    defaultOptions: [],
    meta: {
        type: 'problem',
        messages: {
            swaggerError: "{{errorMessage}}"
        },
        docs:{
            description: 'Rule to check whether field of payload or query has correct information\'s in ApiProperty decorator',
            url: 'https://github.com/ozkersemih/nest-swagger-checker/blob/master/README.md'
        },
        schema: [], // no options
    },

    create: function(context) {
        return {
            ClassDeclaration(){
                getErrors([[context.filename, context.sourceCode.text]])[context.filename]?.forEach((error: Error) => {
                    if (error.kind === ErrorKind.ApiPropertyError){
                        context.report({
                            messageId: 'swaggerError',
                            data: {
                                errorMessage: error.description
                            },
                            loc: {
                                column: error.col,
                                line: error.line,
                            }
                        });
                    }
                });
            }
       }
    },
};

export default apiPropertyRule;
