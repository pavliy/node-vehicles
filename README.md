# Demo Vehicles API

## Overview

This is demo project implemented with nodejs. Allows to work with vehicles and retrieve vehicle state using specified timestamp.

## Tech stack overview

- Implemented using nestjs framework with MVC model in mind
- Uses typeorm to work with database
- pnpm is used as a package manager
- Packaged into docker container for deployment to target server
- Uses automapper to convert models into DTOs
- Jest - for unit tests
- Winston for logs
- nvm is used to switch between nodes (useful if you work with multiple)
- Swagger is used for playing with API

## Tech debt

- API E2E tests coverage should be extended. Errors/success, pipeline cases - those things should be automated for sure
- Validation if vehicle exists or not - can be checked earlier using validators. And the same db repository can be then used inside service
- Cache is now in-memory. For production - I'd for sure go with REDIS or similar for production. Here it's easy to switch
- Ideally tracing metrics should be in place. I usually push to DataDog or ELK
- Ci/CD. Build and test on each MR. It's also nice to have temp deployment before merging in to check all stuff as well.  
  I usually work with Jenkins/Gitlab CI/Azure DevOPS
- Logging targets. Depending on infra - usually that's agent based logging. So we can write to file for instance and agent will capture it. In .NET it's possible to avoid file and write directly into std_out
- Database retries. I'd definitely get back to it. In .NET world Polly is a life saver to implement retries. But not sure about typeorm ecosystem - need to check more what it has
- Load tests should be added. I'd go with k6.io. It allows to run those tests using servers from github/gitlab etc
- For now it's public API, but sort of OAuth JWT based setup can be easily added here as well
- UML schema with overall design should be added
- In 2 places - process.env is used directly instead of config service. Should be corrected and aligned

## Thoughts & Notes

- Foreign key was added for statelog and vehicle relation - to improve performance. StateLog might also desire to have it's own ID of composite ID, but not a must here.  
  NOTE: it was added directly in SQL script, though migration could be written
- In terms of IDs - integer here is not the best way to go. That could be SERIAL for internal ID and GUID for external ID - in this case less chances to be 'hacked' by consumers
- Architecture and structure - is always specific to goals and targets and a matter to discuss/think. In .NET OOP world I really like Onion architecture, DDD and series of related patterns - where domain is center of application. For this specific sample - it makes no sense. But for complex project(s) - I'd revisit that. Though, JS world is different in that terms - modules are very attractive to make some things easy, but forget about some concerns separation
- In vehicles module - I've pushed `VehicleNotFoundException`, which inherits regular `HttpException`. For simplicity - I like this. However usually it should domain/service exceptions are more abstracted. And it might be a good idea in some projects to map domain error into http error inside exception filter
- Assuming that states # for car is not huge - I made decision to load them all as relation and filter needed state there. It's possible to filter at SQL side. But for simplicity I followed first path here. This also allows to test this logic quickly and easy. When it's SQL - requires more setup and boilerplate
- Nest has cool integration with automapper. And interceptor on controller level looked really nice. But it turned out to be tricky to test it at least at controller level. Also with interceptor for mapping - I believe there is some confusion in method declaration. So I decided to move on with regular mapper injection to service - similar to how it works in .NET for me many years
- Dev environment can be also adjusted to work without installation of nodejs/nvc - just using docker. But requires some more time and resources
- API is versioned. But concept is just for sample. It really depends on needs of client and company strategy
- In health check - I've added DB connection for sample. But it's a matter to argue - health endpoint is usually checked by K8S to see if node is fine. And team should be really careful with this - cause if wrong status is returned - cluster will restart app. But if there are issues with SQL server itself - that's not something really helpful, right?
- Epoch date is used. In REST world usually it's ISO formatted, though. But I don't know about the consumer of this API - it's other server - epoch might be better. For people - ISO is good
- E2E testing will be simpler in nest once they will merge replace module thing. Until then - have to check mode in dynamicmodule
- In tests where vehicle is created - tsignore is used. More often it's ok to have separate constructor for better usability. Just don't want to confuse domain layer here. In .NET it's easy to have internal constructor which is shared then only with tests assembly

## Getting Started

Before you start, make sure you have docker installed

### Just run

1. `docker-compose up`
2. Navigate to: [http://localhost:3000/api](http://localhost:3000/api)
3. Sample without timestamp: `http://localhost:3000/v1/vehicles/3`
4. Sample with timestamp: `http://localhost:3000/v1/vehicles/3?stateTimestamp=1662927367000`

NOTE: I could add scratch or postman stuff, but that's an overhead here

### For development

1. nvm or nodejs (see version [here](.nvmrc)

#### Running solution

- `docker-compose -f docker-compose-db.yml up`
- run `npm install -g pnpm & pnpm i & pnpm start:dev`

- Go to http://localhost:3000/api

#### More commands

Check [package.json](./package.json) to see more commands for dev purpose

## Code Styling

To force standards in team and organization:

- Eslint
- Prettier
- Stylelint
- Commitlint
- Husky

'conventional commit' practices is used for early checks of commit messages

## HealthCheck

This app implements healthz endpoint to let managers/clusters check how are things going
