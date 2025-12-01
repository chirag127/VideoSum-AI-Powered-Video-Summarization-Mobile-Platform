---
name: '🚀 Feature, Bug Fix, or Enhancement'
about: 'Propose changes for review and integration into the codebase.'
title: 'feat: Add new video summarization model integration'
labels: ['pending-review']
assignees: []
---

## ✨ PR Submission Checklist

Before submitting your Pull Request, please ensure you have completed the following:

- [ ] I have read and adhered to the project's [CONTRIBUTING.md](/.github/CONTRIBUTING.md) guidelines.
- [ ] My code follows the **Apex Technical Authority** standards (SOLID, DRY, KISS, CQS).
- [ ] My code passes all **Biome** linting and formatting checks (`biome check --apply`).
- [ ] I have added **Vitest** unit tests for new or changed functionality, achieving **100% coverage**.
- [ ] I have added or updated **Playwright** E2E tests for critical user flows.
- [ ] All existing tests (`vitest` & `playwright`) pass successfully.
- [ ] I have updated the `README.md` and `AGENTS.md` (if necessary) to reflect any new features, configuration, or architectural changes.
- [ ] My changes are fully documented within the codebase (self-documenting code, `JSDoc` for complex APIs).
- [ ] I have considered accessibility (WCAG compliance) for any UI changes.
- [ ] I have considered security implications and applied OWASP Top 10 2025 best practices (e.g., input sanitization).
- [ ] My changes do not introduce any regressions and maintain optimal performance (INP < 200ms).
- [ ] I have followed **Conventional Commits** specification for my commit messages (e.g., `feat:`, `fix:`, `docs:`, `chore:`).
- [ ] The CI/CD pipeline passes successfully for this branch.


## 💡 Description

Please provide a clear and concise description of the changes introduced in this Pull Request.

*What problem does this PR solve?*
*How does it solve it?*


## 🔗 Related Issues

Link any related GitHub issues or external documentation here (e.g., `Closes #123`, `Fixes #456`, `Resolves #789`).


## 🏷️ Type of Change

What kind of change does this PR introduce? (Select all that apply)

- [ ] `feat`: A new feature
- [ ] `fix`: A bug fix
- [ ] `docs`: Documentation only changes
- [ ] `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc.)
- [ ] `refactor`: A code change that neither fixes a bug nor adds a feature
- [ ] `perf`: A code change that improves performance
- [ ] `test`: Adding missing tests or correcting existing tests
- [ ] `chore`: Changes to the build process or auxiliary tools and libraries suchs as documentation generation
- [ ] `security`: Addressing security vulnerabilities
- [ ] `ci`: Changes to our CI configuration files and scripts


## 📝 Detailed Changes

- Added `[feature/component/logic]` to `[path/to/file]`.
- Modified `[function/method]` in `[path/to/file]` to `[describe change]`.
- Refactored `[old_component]` into `[new_component]` for `[reason]`.


## 📸 Screenshots / Videos (if applicable)

If this PR introduces UI/UX changes, please provide screenshots or short video demonstrations.


## ✅ How Has This Been Tested?

Describe the tests that you ran to verify your changes. Provide instructions so we can reproduce. Please also list any relevant details for your test configuration.

- **Unit Tests:** `npm run test:unit`
- **E2E Tests:** `npm run test:e2e`
- **Manual Testing:**
  - Scenario 1: `[Step-by-step instructions]`
  - Scenario 2: `[Step-by-step instructions]`


## 🔍 Reviewers

@github/team-name or @individual-reviewer


## 🚀 Deployment Notes

Are there any special considerations or steps required for deploying this change (e.g., database migrations, environment variables, feature flags)?


---

### 🛡️ Security Notice

By submitting this Pull Request, you confirm that your changes adhere to our security guidelines outlined in [.github/SECURITY.md](/SECURITY.md). Any potential vulnerabilities have been mitigated or clearly documented.

---
