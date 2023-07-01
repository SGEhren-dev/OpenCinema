module.exports = {
	root: true,
	parser: "@typescript-eslint/parser",
	plugins: [
		"@typescript-eslint",
		"react",
	],
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/eslint-recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react/recommended"
	],
	rules: {
		"@typescript-eslint/explicit-function-return-type": 0,
		"@typescript-eslint/naming-convention": [
			"error",
			{
				"selector": "interface",
				"format": [ "PascalCase" ],
				"custom": {
					"regex": "^I[A-Z]",
					"match": true
				}
			},
			{
				"selector": "default",
				"format": [ "camelCase" ]
			},
			{
				"selector": "variable",
				"format": [ "camelCase", "UPPER_CASE", "PascalCase" ]
			},
			{
				"selector": "parameter",
				"format": [ "camelCase", "PascalCase" ],
				"leadingUnderscore": "allow"
			},
			{
				"selector": "memberLike",
				"modifiers": [ "private" ],
				"format": [ "camelCase" ],
				"leadingUnderscore": "require"
			},
			{
				"selector": "typeLike",
				"format": [ "PascalCase" ]
			},
			{
				"selector": "typeProperty",
				"format": [ "camelCase", "PascalCase" ]
			},
			{
				"selector": "classProperty",
				"format": [ "camelCase", "UPPER_CASE", "PascalCase" ]
			},
			{
				"selector": "enumMember",
				"format": [ "UPPER_CASE" ]
			},
			{
				"selector": "function",
				"format": [ "camelCase", "PascalCase", "UPPER_CASE" ]
			},
			{
				"selector": "objectLiteralProperty",
				"format": null
			},
			{
				"selector": "variable",
				"modifiers": [ "destructured" ],
				"format": null
			}
		],
		"@typescript-eslint/no-inferrable-types": 0,
		"@typescript-eslint/no-use-before-define": 0,
		"react/no-array-index-key": "error",
		"quotes": [
			"error",
			"double",
			{
				"allowTemplateLiterals": true
			}
		],
		"indent": [
			"error",
			"tab",
			{
				"SwitchCase": 1
			}
		],
		"max-len": [
			"warn",
			{
				"code": 145,
				"tabWidth": 4
			}
		],
		"spaced-comment": [
			"error",
			"always"
		],
		"array-bracket-spacing": [
			"error",
			"always"
		],
		"object-curly-spacing": [
			"error",
			"always"
		],
		"template-curly-spacing": [
			"error",
			"always"
		],
		"space-before-blocks": [
			"error",
			"always"
		],
		"react/jsx-curly-spacing": [
			"error",
			"always"
		],
		"no-multiple-empty-lines": [
			"error",
			{
				"max": 1
			}
		],
		"no-trailing-spaces": [
			"error"
		],
		"eol-last": [
			"error"
		],
		"padding-line-between-statements": [
			"error",
			{
				"blankLine": "never",
				"prev": [ "const", "let" ],
				"next": [ "const", "let" ]
			},
			{
				"blankLine": "always",
				"prev": [ "const", "let" ],
				"next": "expression"
			},
			{
				"blankLine": "always",
				"prev": "expression",
				"next": [ "const", "let" ]
			},
			{
				"blankLine": "always",
				"prev": [ "multiline-const" , "multiline-let", "import" ],
				"next": "*"
			},
			{
				"blankLine": "never",
				"prev": "import",
				"next": "import"
			},
			{
				"blankLine": "always",
				"prev": "*",
				"next": [ "return", "throw", "switch", "block-like" ]
			}
		],
		"semi": [
			"error",
			"always"
		]
	},
	"settings": {
		"react": {
			"version": "detect"
		}
	}
};
