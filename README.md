# README

## What is this repository for

The files in this repository are used to run Excel Online E2E tests using Playwright.

## Technology stack

<details>
<summary>List of technologies used in the project</summary>

- [TypeScript](https://www.typescriptlang.org/) - strongly typed programming language that builds on JavaScript.
- [Playwright](https://playwright.dev/) - framework for Web Testing and Automation.
- [ESLint](https://eslint.org/) - Static code analyzer.
- [Prettier](https://prettier.io/) - An opinionated code formatter.
- [Allure](https://docs.qameta.io/allure/) - Flexible lightweight multi-language test report tool.

</details>

## How to set up and run tests

<details>
<summary>To set up</summary>

- Pull the branch
- Create `.env` file according to [.env.example](.env.example)
- Run `npm install` from the root folder
- Run `npx playwright install` from the root folder (only for the first setup)

</details>

<details>
<summary>To run tests locally</summary>

- To run all the existing specs run `npm run test` from the root folder
- To run some specific spec add to previous command spec name, e.g. `npm run test formulas.spec.ts`
- To run some specific spec in debug mode use `test:debug` script, e.g. `npm run test:debug formulas.spec.ts`
- To run tests in headed mode use `test:headed` script, e.g. `npm run test:headed formulas.spec.ts`

</details>

<details>
<summary>To generate and open locally Allure report</summary>

After tests run you have created `allure-results` folder.
To generate and open an allure report locally run from the root folder:

`npm run allure`

</details>

## Best practices and project convention

<details>
<summary>XPath Guide</summary>

XPath (XML Path Language) is a query language used for navigating elements within the structure of HTML or XML documents.
In this project, XPath is used for:

- Locating elements by their text or attributes
- Navigating the DOM hierarchy (up, down, forward, backward)
- Filtering elements using conditions like `not`, `contains`, `last()`, etc.
- Building selectors in complex and dynamic layouts

Below is a reference table covering all key constructs and functions used in the project.

| XPath Expression                                                | Description                                                                                   |
|-----------------------------------------------------------------|-----------------------------------------------------------------------------------------------|
| `/`                                                             | Selects the **immediate child** of the current node (used for exact paths)                    |
| `//div`                                                         | Selects all `<div>` elements anywhere in the document                                         |
| `.`                                                             | Refers to the **current** node                                                                |
| `..`                                                            | Refers to the **parent** of the current node                                                  |
| `//input[@type="text"]`                                         | Finds all `<input>` elements with `type="text"`                                               |
| `//a[contains(@aria-label, "homepage")]`                        | Finds `<a>` elements where `aria-label` contains "homepage"                                   |
| `//input[@required]`                                            | Selects all `<input>` elements that **have** the `required` attribute                         |
| `//input[starts-with(@placeholder, "Enter")]`                   | Selects `<input>` where `placeholder` starts with "Enter"                                     |
| `//*[@*="some-value"]`                                          | Any element where **any attribute** equals `"some-value"`                                     |
| `//div[@role="dialog" and @aria-hidden="false"]`                | Selects `<div>` with both `role="dialog"` and `aria-hidden="false"`                           |
| `//div[@class="block"][last()]`                                 | Finds the **last** `<div>` with class `"block"`                                               |
| `//ul/li/span`                                                  | Finds all `<span>` elements inside `<li>` inside `<ul>`                                       |
| `//div/following-sibling::div/*[@viewBox]`                      | Finds children of following `div` siblings that have a `viewBox` attribute                    |
| `//section/descendant::button[text()="Submit"]`                 | Finds any `<button>` with text "Submit" inside a `<section>`                                  |
| `//div/parent::div/following-sibling::div[@role="listbox"]/div` | Finds a `div` inside a `div[role="listbox"]` that **follows the parent** of the current `div` |
| `//span[@class="label"]/preceding-sibling::input`               | Selects `<input>` that is a **preceding sibling** of `<span class="label">`                   |
| `//button/ancestor::form`                                       | Selects the closest ancestor `<form>` of a `<button>`                                         |
| `//button[text()="Submit"]`                                     | Finds a `<button>` with exact text "Submit"                                                   |
| `//span[text()="Done"]`                                         | Selects `<span>` with exact text "Done"                                                       |
| `//*[contains(text(), "Read more")]`                            | Finds any element containing the text "Read more"                                             |
| `//*[contains(., "text")]`                                      | Selects any element that **contains** the text "text", including text in **nested elements**  |
| `not(contains(text(), "Submit"))`                               | A condition: the text **does not contain** "Submit"                                           |
| `//div[1]//button[contains(@aria-label, "shopping cart")]`      | Finds a button inside the **first** `div`, where `aria-label` contains "shopping cart"        |
| `//div[3]`                                                      | Selects the **third** `<div>` among siblings at the same level                                |
| `//div[last()]`                                                 | Selects the **last** `<div>` in the current level                                             |
| `//li[position() < 3]`                                          | Finds the first two `<li>` elements                                                           |
| `//li[position() > 1 and position() < 4]`                       | Selects the 2nd and 3rd `<li>` elements                                                       |
| `//span[not(.//*[@viewBox])]`                                   | Finds `<span>` elements that **do not contain** any descendants with a `viewBox` attribute    |
| `//header[@id="header"]`                                        | Finds a `<header>` element with `id="header"`                                                 |

</details>

<details>
<summary>Code linting</summary>

After creating new tests or refactoring, something uses configured linter before pushing your changes for review.

- To analyze code and fix issues run from the root folder run:
  - `npm run lint` for analyzing and getting the list of all issues
  - `npm run lint:fix` for auto refactoring and fixing all the found issues

</details>

<details>
<summary>Branching policy</summary>

Depending on the purpose of the work, different types of branches are used.
The naming conventions below help maintain clarity and consistency across the repository.

- `main` – the main stable branch used to run automated tests
- `feature/*` – temporary branches created for developing new automated tests, implementing new features or approaches, or improving the current test framework. The branch name should follow the format: `feature/<ticket_id>-<feature_name>`. Once merged, the branch must be deleted
- `bugfix/*` – temporary branches used to fix existing automated tests, flaky behavior, or other issues. The branch name should follow the format: `bugfix/<ticket_id>-<short_description>`. Once merged, the branch must be deleted

</details>

<details>
<summary>Branch creating for development</summary>

To create a remote branch and check it out, follow these steps:

1. Make sure you don't have any local changes that haven't been stashed or pushed, as they may be lost
2. Run `git checkout main`
3. Run `git branch | grep -v "main" | xargs git branch -D`
4. Run `git fetch --prune`
5. Run `git pull origin main`
6. Run `git push origin main:<new_branch_name>`, e.g. `git push origin main:feature/TA-304-header`
7. Run `git checkout <new_branch_name>`, e.g. `git checkout feature/TA-304-header`

</details>

<details>
<summary>Rebasing</summary>

Before publishing pull request and asking folks for review, rebase your branch onto `main` and make sure everything still working. General steps onto `main` branch rebasing process:

1. Go to the branch in need of publish to PR
2. Enter `git fetch origin` (This syncs your main branch with the latest changes)
3. Enter `git rebase origin/main`
4. Fix merge conflicts that arise
5. Enter `git rebase --continue`
6. Repeat the previous 2 steps as necessary as merge conflicts arise in the later commits
7. Once the rebase is complete, enter `git push origin HEAD --force-with-lease`

You can learn more about rebasing in the official [git rebase](https://git-scm.com/docs/git-rebase) documentation or in [The Ultimate Guide to Git Merge and Git Rebase](https://www.freecodecamp.org/news/the-ultimate-guide-to-git-merge-and-git-rebase/) article.

</details>

<details>
<summary>Pull Requests</summary>

All pull requests that are not in `Draft` status must comply with the requirements listed below.
Once the pull request has been published and is ready for review, you must additionally notify other QAs in the Slack channel.

- `General Requirements`
  - `Isolation`: A pull request should address a single specific task.
    If a PR includes multiple concerns, it should be split into smaller ones.
    For example, developing new tests should not be mixed with unrelated refactoring or improvements.
  - `Title`:
    - Must be limited to 50 characters
    - Must not end with a period
    - Should use present tense or imperative mood
    - Must contain the task key
  - `Description`:
    - Must be clear and detailed
    - Must describe all the changes introduced
    - Must end with a period
    - Must include references to other PRs it depends, if any
    - Must include links to documentation for new libraries/tools if they were added
    - Must include references to related tasks, documentation, CI artifacts, etc., if needed
  - `Commits`:
    - All commits must be squashed into one
    - The branch must be rebased onto the latest `main` before the review
  - `Assignees`:
    - The PR author must assign themselves as the responsible person
    - Must maintain and accompany the pull request until it is completed
  - `Reviewers`:
    - The PR author must add all QA members as reviewers
- `Comments`
  - `Review Comments`:
    - All remarks and suggestions must be left as comments in the pull request
    - Comments must be constructive and aimed at improving the code
  - `Comment Resolution`: Every comment must be addressed:
    - Either by making the appropriate changes
    - Or by providing a clear explanation why the comment cannot be accepted

</details>

<details>
<summary>Review</summary>

During the review process, the following criteria must be followed:

- `Functionality`:
  - Code must fulfill its purpose according to the task and requirements
  - Code must not be flaky or depend on the application state or test execution order
- `Readability`:
  - Code must be easy to read and understand for other developers
  - Meaningful variable, function, and class names must be used
- `Testing`:
  - Tests must be up to date and pass without errors
  - There must be no interdependence between different tests
- `Architecture & Design`:
  - Code must follow the established project architecture
  - There must be no unnecessary complexity or code duplication
  - Code must be optimized
- `Security`:
  - Code must not contain any confidential data, such as logins, passwords, etc.
- `Code Style Compliance`:
  - Code must follow commonly accepted standards and project-specific style guidelines
  - Code must not contain comments except TODOs
  - Code must pass linters checks without errors
  - Code must not contain typos, unclear semantics, or ambiguous wording

</details>

## Assignment of folders and files

<details>
<summary>Folders and files</summary>

All test files with the `.spec.ts` extension are stored in the [specs](src/specs) folder.

- [fixtures](src/fixtures) - Here are all the supporting files with data that we are using in tests
- [pageobjects](src/pageobjects) - Here are page objects of all pages and components with elements of which we interact during running autotests
- [utils](src/utils) - Here are some helper functions, methods, and utils used across the project

At the root folder we have these files:

- [.env.example](.env.example) - example environment variables file used to document required .env keys for local configuration
- [.gitignore](.gitignore) - file that specifies which files and directories to ignore in a Git repository
- [config.ts](config.ts) - checks that environment variables are set; exits the process with an error if not
- [eslint.config.ts](eslint.config.ts) - basic configuration file for [ESLint](https://eslint.org/)
- [playwright.config.ts](playwright.config.ts) - basic configuration file for [Playwright](https://playwright.dev/)
- [prettier.config.cjs](prettier.config.cjs) - basic configuration file for [Prettier](https://prettier.io/)
- [tsconfig.json](tsconfig.json) - basic configuration file for [TypeScript](https://www.typescriptlang.org/)

</details>

## Environment Variables

<details>
<summary>Required Environment Variables</summary>

The following environment variables must be set in your `.env` file:

- `USER_EMAIL` - Email address for Microsoft Excel Online authentication
- `USER_PASSWORD` - Password for Microsoft Excel Online authentication
- `HEADLESS` - Set to `true` to run tests in headless mode, `false` for headed mode

Example `.env` file:

USER_EMAIL=your_email@example.com
USER_PASSWORD=your_password
HEADLESS=false


</details>

## Excel Online Testing

<details>
<summary>Testing Excel Online Features</summary>

This project focuses on testing Excel Online functionality including:

- Formula insertion and validation
- Cell content verification
- Date function testing (TODAY function)
- Workbook creation and management
- Authentication flow testing

The tests interact with Excel Online through iframe elements and use specific selectors for Excel's interface components.

</details>