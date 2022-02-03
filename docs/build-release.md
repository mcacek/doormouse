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

Install application dependencies.

```bash
# Node v17.3.1 was used during development but any version v14.x and beyond should be fine.
npm install
```

Start development server.

```bash
npm run dev
```

## Release Process

The build process was originally intended to deploy to GH Pages but due to the
project time limitation this has been removed and the is no formal deployment
process. This application is assembled using `create-react-app` and can be built
from the command line, ideally during an automated build process. There is a
small amount of external configuration required and is provied by a `.env` file
in the root of the project. Reasonable defaults exist in the `.env.schema` file
in the root of the project. Simply copy the values in this file intoto a new
file named `.env` in the root of the project. An automated build system would
likely expose these values as environmental variables during the build process.

```bash
npm run build
```

Upon successful build the contents of `/build` can be manually copied to a web
server or ideally pushed to a server in a more automated fashion. A common
approach is to push the files to a uniquely named directory in a cloud storage
system (ie. S3) and updating an edge delivery system (Cloudfront) with the new
directory path as the new entry point.
