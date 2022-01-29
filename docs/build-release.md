# Build and Release

This project is built on top of vanilla `create-react-app`. The default build
process provided by `create-react-app` depends on `webpack`. The extend merge
request and releaser processes are managed by Github actions for simplicity and
as a means of demonstrating a full development and CI/CD process.

My preferred approach to software development is to implement as of much of the
development-to-production workflow as possible as soon as possible. This
approach removes the future stress associated with releasing software by solving
this before it becomes a problem. Once established and documented, the release
process should be straightforward, not stressful, and considered a solved
problem.

## Development

```bash
npm run dev
```

## Code Quality

```bash
npm run test
```

## Release Process

The release process is tag based and is triggered vi a developer triggered
process managed by `release-it`. Running the command below will present prompts
to answer some version and release documentation questions and upon completion
will tag a release and generate the appropriate documentation. Nothing will
actually be published by this process as this application is not a library. The
deployment process will be triggered upon successful tag creation and pushing to
upstream.

```bash
npm run release
```
