# azurejwtservice
# azurejwtservice

#Deploying node js application in Azure as Web/API Application using Visual Studio Code

This document captures the steps required to deploy a nods js application, which returns json web token, in Azure without having to configure any VM using Visual Studio Code. Azure App Service Extension in Visual Studio Code, takes care of spinning off the required resources for the application from the Visual Studio Code console. 

#Pre-requisites:
Azure Account
Visual Studio Code
Node js and NPM
Azure APP Service Extension
The detailed steps for pre-requisites can be found at https://docs.microsoft.com/en-us/azure/app-service/containers/quickstart-nodejs

#Steps for deploying the JWT service in Azure:

- Download the node app which exposes the jwt generation api endpoint from below repo: https://github.com/ShantanuGh-Kore/azurejwtservice
- Open the project in Visual Studio Code
- Update the config.json file with the appId and apiKey for the app created while enabling the Web/Mobile client channel in Kore bot builder tool
- Login to Azure portal from the browser https://portal.azure.com/ 
- In Visual Studio Code, navigate to the Azure panel in the left menu panel. Azure panel gets enabled after installing the Azure APP Service Extension in the Visual Studio Code and click on the blue up arrow to login to the Azure account from Visual Studio
- Users will be taken to the browser and will be prompted to provide their Azure account credentials.
- You will see all the applications in your Azure account listed upon expansion after successful login
- Click on the blue arrow to deploy the application 
- User will be prompted to select the project folder which needs to be zipped 
- Select the project already opened in the Visual Studio Code
- Next, users will be prompted to give name to their application 
- Provide the suitable name to the application. You will using the same name to invoke the api <appname>.azurewebsites.net
- Next, users will be prompted to select the Node version - select Node LTS
- Application deployment begins and users can monitor the progress in the output terminal

Upon successful deployment, users will be presented with the below options to access the application in the browser. Click on “Browse Website” to ensure the application has been deployed successfully

Below page opens 


In order to generate the jwt use the below curl (remember to replace your domain end point):
curl -X POST "https://delloitejwt.azurewebsites.net/api/users/sts" --data '{ "identity" : "shantanu.ghorai@gmail.com", "isAnonymous" : true}'
Response: 
{"jwt":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODcwMTQwMDY1MjUsImV4cCI6MTU4NzEwMDQwNjUyNSwiYXVkIjoiaHR0cHM6Ly9pZHByb3h5LmtvcmUuY29tL2F1dGhvcml6ZSIsImlzcyI6ImNzLTcwYzE4OTMxLWY5MWYtNTcxOC04NzNkLTFkYWRiMmM1NWFhNiIsInN1YiI6IiIsImlzQW5vbnltb3VzIjpmYWxzZX0._1gYopdf1QioTFk8uYjDIO6ZpWL0UM2V5sFyB950ztk"}



 
