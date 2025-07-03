# Changelog

## 0.3.0 (2025-07-03)

Full Changelog: [v0.2.13...v0.3.0](https://github.com/llamastack/llama-stack-client-typescript/compare/v0.2.13...v0.3.0)

### Features

* **client:** add support for endpoint-specific base URLs ([1aedd4c](https://github.com/llamastack/llama-stack-client-typescript/commit/1aedd4c5b4d3e2eab7b008e2b07cc851ce7f069b))


### Bug Fixes

* **ci:** update version, skip a failing test ([#4](https://github.com/llamastack/llama-stack-client-typescript/issues/4)) ([7a5dbe7](https://github.com/llamastack/llama-stack-client-typescript/commit/7a5dbe7ed59b24feda5d73df8808fde2d337fc2a))
* **client:** always overwrite when merging headers ([f38ab33](https://github.com/llamastack/llama-stack-client-typescript/commit/f38ab33949e2f8b9eb42726a473e4186f5517ad4))
* **client:** don't send `Content-Type` for bodyless methods ([6806e8e](https://github.com/llamastack/llama-stack-client-typescript/commit/6806e8ef31302a0f2ca0ab9ae36e4781e5f0adf7))
* **client:** explicitly copy fetch in withOptions ([43b1b13](https://github.com/llamastack/llama-stack-client-typescript/commit/43b1b131d39926ce247bacc495f38db6dd11cd43))
* **client:** get fetchOptions type more reliably ([4ccde72](https://github.com/llamastack/llama-stack-client-typescript/commit/4ccde72189d521048d3056dd959e9438dbdbde98))
* compat with more runtimes ([04a0662](https://github.com/llamastack/llama-stack-client-typescript/commit/04a0662bcb5c6b6083f88a1efbc889b87481845f))
* publish script — handle NPM errors correctly ([b39a51b](https://github.com/llamastack/llama-stack-client-typescript/commit/b39a51bd7d5258e56ca61b8b8107ce41e1f71675))


### Chores

* adjust eslint.config.mjs ignore pattern ([6f2ebb4](https://github.com/llamastack/llama-stack-client-typescript/commit/6f2ebb47f22f2a9e7ca6a3408555e43845c67f73))
* avoid type error in certain environments ([f63451d](https://github.com/llamastack/llama-stack-client-typescript/commit/f63451dec43fd57af1e9a4d7e19ca59e029d7061))
* change publish docs url ([18f74bc](https://github.com/llamastack/llama-stack-client-typescript/commit/18f74bc0397e69dcdceec37bad5f11633ed79f70))
* **ci:** enable for pull requests ([cdb3e21](https://github.com/llamastack/llama-stack-client-typescript/commit/cdb3e218b3579a3bdfc013fc23d1167ccd2054cd))
* **client:** refactor imports ([1ca0d4d](https://github.com/llamastack/llama-stack-client-typescript/commit/1ca0d4d2c9eea8d3be991a6724a98d33f136c464))
* **deps:** bump eslint-plugin-prettier ([e3d70df](https://github.com/llamastack/llama-stack-client-typescript/commit/e3d70dfdbc704dd715acf3c266b26bd5b433ba0d))
* **docs:** grammar improvements ([ec9f51b](https://github.com/llamastack/llama-stack-client-typescript/commit/ec9f51bde2d1da8f76627b4b1eadc6f5e2c69d72))
* **docs:** use top-level-await in example snippets ([d4f2e4a](https://github.com/llamastack/llama-stack-client-typescript/commit/d4f2e4a7c2d5252a1799281a071b122df86c87bc))
* improve publish-npm script --latest tag logic ([ce89fc0](https://github.com/llamastack/llama-stack-client-typescript/commit/ce89fc0692a765e739aa33239d523112432dd7ed))
* **internal:** add pure annotations, make base APIResource abstract ([f3d650e](https://github.com/llamastack/llama-stack-client-typescript/commit/f3d650e247ff981eb7274e85da47e9e4185adbd6))
* **internal:** codegen related update ([79e7896](https://github.com/llamastack/llama-stack-client-typescript/commit/79e78969a31df16ef35901c3ce4c003f70d59778))
* **internal:** fix readablestream types in node 20 ([ad42eb3](https://github.com/llamastack/llama-stack-client-typescript/commit/ad42eb34ca89ab73bdbc37a4fc1cd367e18d1b5c))
* **internal:** update jest config ([1c7ea01](https://github.com/llamastack/llama-stack-client-typescript/commit/1c7ea019518b4d7a04315355eecbffb64cfe0a7a))
* mention unit type in timeout docs ([c2b9867](https://github.com/llamastack/llama-stack-client-typescript/commit/c2b986793dd9f2fa55e8f4ce9c463a4d99635ab4))
* **package:** remove engines ([5e60291](https://github.com/llamastack/llama-stack-client-typescript/commit/5e602915fb031ff570292fb649de0f66520fbbf3))
* **readme:** update badges ([8d2cffe](https://github.com/llamastack/llama-stack-client-typescript/commit/8d2cffe5a1ef45965aaf953bfb3b53ef2fcc6c5c))
* **readme:** use better example snippet for undocumented params ([806b784](https://github.com/llamastack/llama-stack-client-typescript/commit/806b7846d04d90f707179ffcb543cf65972d44ee))
* update SDK settings ([21dd96b](https://github.com/llamastack/llama-stack-client-typescript/commit/21dd96b77989e0fff77cd45f9db557ebd9c012d2))


### Refactors

* **types:** replace Record with mapped types ([992acaa](https://github.com/llamastack/llama-stack-client-typescript/commit/992acaa8badf3175fc2495e79d05c8aa91d8a109))

## 0.1.0-alpha.3 (2025-06-28)

Full Changelog: [v0.1.0-alpha.2...v0.1.0-alpha.3](https://github.com/llamastack/llama-stack-client-typescript/compare/v0.1.0-alpha.2...v0.1.0-alpha.3)

### Chores

* **ci:** only run for pushes and fork pull requests ([70cf3b4](https://github.com/llamastack/llama-stack-client-typescript/commit/70cf3b4cfe81f5d4757f05ea0372342c9c8ce08b))

## 0.1.0-alpha.2 (2025-06-27)

Full Changelog: [v0.1.0-alpha.1...v0.1.0-alpha.2](https://github.com/llamastack/llama-stack-client-typescript/compare/v0.1.0-alpha.1...v0.1.0-alpha.2)

### Features

* **api:** update via SDK Studio ([a00f961](https://github.com/llamastack/llama-stack-client-typescript/commit/a00f961a3a4a8961cd54ad6a92a52aa34cb0d041))
* **api:** update via SDK Studio ([bef1e47](https://github.com/llamastack/llama-stack-client-typescript/commit/bef1e47ad9fe9a03e8ffdaa632981c0666919b73))
* **api:** update via SDK Studio ([7fb44fa](https://github.com/llamastack/llama-stack-client-typescript/commit/7fb44fab41cd95410115d12a7855fd12fbd3b34c))

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
