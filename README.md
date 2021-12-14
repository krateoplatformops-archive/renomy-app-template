# ReNoMy App Template

This is a demo template that shows the potential of krateo platformops - silver version.

## What does it do?

- Create a repository on github
- Build 2 docker images (app/api)
- Build helm chart
- Create app on you sonarcloud account
- Create a database in your AWS account
- Create and use a persistent volume
- Register ingress to expose your app and api

## Components

![Components](./docs/infrastructure.png 'Components')
This app is composed by these parts:

- frontend
- backend
- rds database
- persistent volume

### Frontend

This is a sample todo-app made with react js.

#### Home

![Frontend Home](./docs/fe_home.png 'Frontend Home')
You can show todo list, add and delete todos.
No confirm will be request clicking delete todo botton.
To add a todo you must fill the field in the top and click on the orange button wiht plus icon.

#### Logs

![Frontend Logs](./docs/fe_logs.png 'Frontend Logs')
Logs page show logs call to the api, every call will be logged (except GET logs).

### Backend

![Backend Swagger](./docs/swagger.png 'Backend Swagger')
This is a node js api, it uses a mysql database (AWS RDS) and a k8s persistent volume.
All the logs are written to PV in the file calls.log.
With this app template is provided a swagger.yaml file that you can import in any rest client.

## Krateo Import

### Register teplate

The first step is to register the plugin in your krateo platformops.
The url to register the template is:

```
https://github.com/projectkerberus/renomy-app-template/blob/main/template.yaml
```

After the import you can view the plugin in the "create" page.
![Krateo Create](./docs/krateo_create.png 'Krateo Create')

### Create App

There are three steps to the heaven 🤟

#### 1 - Demo App Values

![App Values](./docs/add_values.png 'App Values')

- Name: this is the name of your app (will be used in k8s namespace)
- Description: describe the app
- Database username: the username with highest privileges (default admin)
- Database password: the password for the admin (use a complex password because AWS requires it 🤫)
- Owner: the owner group of the app (dropdown)

#### 2 - Choose Url

![App Url](./docs/add_url.png 'App Url')
On deployment process the template creates two ingress, one for the app and one for the api.
You have to provide them without https:// only the domain (e.g. app-demo.krateo.io)

#### 3 - Choose a location

![App Location](./docs/add_location.png 'App Location')
Specify the git project where to deploy the app.

#### Review - Drunken Duck

![App Review](./docs/add_review.png 'App Review')

Here you can view the summery of your deployment.
Yes, we have call it drunken-duck 🦆.
When you click "create" krateo starts to deploy your application.

# Krateo

![Krateo Home](./docs/krateo_home.png 'Krateo Home')

In the homepage you can view that there are two components:

- drunken-duck-be (backend)
- drunken-duck-fe (frontend)

The two components are related to each other through apis and dependencies.

## Frontend

Each components has multiple tabs
![Krateo Component Tabs](./docs/krateo_component_tabs.png 'Krateo Component Tabs')

### Overview

![Frontend Overview](./docs/krateo_fe_overview.png 'Frontend Overview')
In the overview page you have:

- links to the github repository
- sonarcloud quality code card
- argocd status

### CI/CD

![Frontend CI/CD](./docs/krateo_fe_cicd.png 'Frontend CI/CD')
The status of the pipelines on GitHub.
If you click on pipeline title you can view steps and logs.

### API

![Frontend Api](./docs/krateo_fe_api.png 'Frontend Api')
You can view what apis it calls.

### Dependencies

![Frontend Dependencies](./docs/krateo_fe_depends.png 'Frontend Dependencies')
You can view component dependencies.

### Docs

![Frontend Docs](./docs/krateo_fe_docs.png 'Frontend Docs')
These info comes from the index.md file in the docs folder in your repository.

### Kubernetes

![Frontend Kubernetes](./docs/krateo_fe_kubernetes.png 'Frontend Kubernetes')
You can view all the components on your kubernetes cluster that refer to drunken-duck (in our case).

- pods
- services
- ingress

## Backend

The infos in the backend page are the same as in frontend but reversed.

### Dependencies

![Backend Dependencies](./docs/krateo_be_depends.png 'Backend Dependencies')
In this demo app are also defined

- database
- system

The relations are these
![System Diagram](./docs/krateo_diagram.png 'System Diagram')

## Api

Api page displays all the apis registered in Krateo.

### Overview

![Api Overview](./docs/krateo_api_overview.png 'Api Overview')
Here you can view providers and consumers of your api.

### Definition

![Api Definition](./docs/krateo_api_definition.png 'Api Definition')
In the definition tab you have a OpenAPI client (swagger) to test calls.

## Grafana

In the Grafana dashbaord you can view logs, create custom dashboard and more.
![Grafana](./docs/krateo_grafana.png 'Grafana')

## Portworx

In Portworx dashboard you can view the renomy PV. By default PV claims 10 MB, but default volume size of portworx is 1 GB.
The PV is used to save calls.log.

![Portworx](./docs/krateo_portworx.png 'Portworx')

## Kuma

In Kuma dashboard you can find 2 services and 2 proxies (api and app).
![Kuma Services](./docs/krateo_kuma.png 'Kuma Services')

![Kuma Proxies](./docs/krateo_kuma2.png 'Kuma Proxies')
