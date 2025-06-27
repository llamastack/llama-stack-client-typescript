# Changelog

## 0.1.0-alpha.1 (2025-06-27)

Full Changelog: [v0.0.1-alpha.0...v0.1.0-alpha.1](https://github.com/llamastack/llama-stack-client-typescript/compare/v0.0.1-alpha.0...v0.1.0-alpha.1)

### Features

* **client:** add support for endpoint-specific base URLs ([4c942da](https://github.com/llamastack/llama-stack-client-typescript/commit/4c942da59c2e3d40b9dacd8198e52ee60b403849))


### Bug Fixes

* **client:** always overwrite when merging headers ([31ec06d](https://github.com/llamastack/llama-stack-client-typescript/commit/31ec06d09d5143cb2b545114a9436059e06e78d4))
* **client:** explicitly copy fetch in withOptions ([aa0e2a6](https://github.com/llamastack/llama-stack-client-typescript/commit/aa0e2a685e75c31678dbef7be8381ce55ff01800))
* **client:** get fetchOptions type more reliably ([5e30a99](https://github.com/llamastack/llama-stack-client-typescript/commit/5e30a9916c22bfb4d00bfaafa27449fb07fd8f68))
* compat with more runtimes ([625a6db](https://github.com/llamastack/llama-stack-client-typescript/commit/625a6db4c7d07936c854cbddc17b859290f9f2c4))
* publish script — handle NPM errors correctly ([39a151f](https://github.com/llamastack/llama-stack-client-typescript/commit/39a151fe741ebce64d96ee80c6abe954a4b7f92d))


### Chores

* adjust eslint.config.mjs ignore pattern ([f0198eb](https://github.com/llamastack/llama-stack-client-typescript/commit/f0198ebf4d831ecc7089b382e1ab8317d7caec34))
* avoid type error in certain environments ([c120307](https://github.com/llamastack/llama-stack-client-typescript/commit/c12030797aeb66958347d1c29d47e6bde73c6d19))
* change publish docs url ([8165807](https://github.com/llamastack/llama-stack-client-typescript/commit/8165807d5c54cd91549ec66e127e0c5afd2d595d))
* **ci:** enable for pull requests ([85ff8d9](https://github.com/llamastack/llama-stack-client-typescript/commit/85ff8d9c3b928405c85f682b1c56c22340efabc8))
* **client:** refactor imports ([b2ab744](https://github.com/llamastack/llama-stack-client-typescript/commit/b2ab74493d3d528f3db9bf84a7af3ffe291efa54))
* **deps:** bump eslint-plugin-prettier ([1041139](https://github.com/llamastack/llama-stack-client-typescript/commit/104113998e2c3412112a49d75596c4496d58fd43))
* **docs:** grammar improvements ([461216e](https://github.com/llamastack/llama-stack-client-typescript/commit/461216eaac75ed802adb8cda21d5f88498fbadcc))
* **docs:** use top-level-await in example snippets ([74b5549](https://github.com/llamastack/llama-stack-client-typescript/commit/74b5549f48e82f05e5b507393026542d939a6b27))
* improve publish-npm script --latest tag logic ([5dd9d90](https://github.com/llamastack/llama-stack-client-typescript/commit/5dd9d9031ded40d4d20ef3fb2aa101f743f7b593))
* **internal:** add pure annotations, make base APIResource abstract ([c239e7d](https://github.com/llamastack/llama-stack-client-typescript/commit/c239e7dad3fa8254cb90ea78a93d8aad5e3b90be))
* **internal:** fix readablestream types in node 20 ([287f657](https://github.com/llamastack/llama-stack-client-typescript/commit/287f657d36d0548502f12802b8ea17f627da1f20))
* **internal:** update jest config ([a36fe70](https://github.com/llamastack/llama-stack-client-typescript/commit/a36fe70319c6a033a9deedee714102bee04c97e1))
* **package:** remove engines ([6066770](https://github.com/llamastack/llama-stack-client-typescript/commit/6066770fb1c17521dcdc2237156ba88b42beed94))
* **readme:** update badges ([5239745](https://github.com/llamastack/llama-stack-client-typescript/commit/5239745b18dded8a88500cac31138bd170470fc9))
* **readme:** use better example snippet for undocumented params ([e035b8f](https://github.com/llamastack/llama-stack-client-typescript/commit/e035b8f9ac69949d6cc897be9f3bd221d8afed7e))
* update SDK settings ([e7d2cfc](https://github.com/llamastack/llama-stack-client-typescript/commit/e7d2cfcc355eb5990ef5e750cb18ace391e75b5b))


### Refactors

* **types:** replace Record with mapped types ([ef71453](https://github.com/llamastack/llama-stack-client-typescript/commit/ef7145362e215ac5dffbeb59ca3fdc944edfe183))
