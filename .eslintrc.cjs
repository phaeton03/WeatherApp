module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "jest/globals": true
    },
    "extends": ["eslint:recommended", "prettier"],
    "overrides": [
    ],
    "plugins": ["jest"],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        "jest/no-disabled-tests": "warn",
        "jest/no-focused-tests": "error",
        "jest/no-identical-title": "error",
        "jest/prefer-to-have-length": "warn",
        "jest/valid-expect": "error"
    },
    "settings": {
        "jest": {
            "globalAliases": {
                "describe": ["context"],
                "fdescribe": ["fcontext"],
                "xdescribe": ["xcontext"]
            }
        }
    }
}
