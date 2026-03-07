# Contributing to ReactNativeMagic

Thank you for considering contributing. Contributions help keep this template useful for everyone.

This project adheres to a [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold it.

## How to contribute

- **Bug reports & feature ideas** – Open an [issue](https://github.com/fadyshawky/ReactNativeMagic/issues).
- **Code or docs** – Open a pull request (see below).

## Development setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/fadyshawky/ReactNativeMagic.git
   cd ReactNativeMagic
   ```

2. **Work inside the template**
   The app that users get lives in the `template/` folder. To test changes:
   ```bash
   cd template
   npm install
   npm start          # Metro
   npm run ios        # or use an android:* script
   ```

3. **Test with a fresh init (recommended)**
   Create a new app using the local template to ensure init still works:
   ```bash
   npx @react-native-community/cli init TestApp --template file:/absolute/path/to/ReactNativeMagic
   cd TestApp && npm install && npm start
   ```

## Before submitting

- **Lint** – Run `npm run lint` from the `template/` directory and fix any errors.
- **Scope** – Prefer small, focused PRs (one fix or one feature).
- **Docs** – If you change behavior or add options, update the README or `template/docs/` as needed.

## Pull request process

1. Fork the repo and create a branch from `main`.
2. Make your changes in `template/` (and root files like README, CONTRIBUTING, or `template.config.js` if relevant).
3. Ensure the template still runs and that a new project can be created with `--template file:...` as above.
4. Open a PR with a clear title and description. Link any related issues.
5. After review, a maintainer will merge when ready.

## What to contribute

- **Bug fixes** – Crashes, wrong behavior, or broken init/build.
- **Template improvements** – Dependencies, structure, theme, or docs that benefit most users.
- **Documentation** – Fixes or clarifications in README, CONTRIBUTING, or `template/docs/`.

If you’re unsure whether a change fits, open an issue first and we can discuss it.

## License

By contributing, you agree that your contributions will be licensed under the same [MIT License](LICENSE.md) as the project.
