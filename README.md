# The Simcha Fund
This application allows an organizer to manage funds collected over time to be used in purchasing a community simcha gift

## Description
When a community has a facilitator who is responsible for collecting money from all the members of the community and then purchasing the gift for the baal simcha. Keeping track of all that money, who's is whose and what's for what, can quickly become a big mess and very confusing.


The Simcha Fund solves these issues by allowing the organizer to add contributors and take an initial deposit from them to put in their 'account' and at any later date they may add deposits. Then when there is a simcha the organizer can add a simcha and then can go through all the contributors and ask them if they would like to contribute to this simcha and how much, or alternatively the contributor can choose the option of giving the default amount of five dollars to every simcha.

For this project I used the following technologies:

[![My Skills](https://skillicons.dev/icons?i=cs,dotnet,js,vite,react,bootstrap&theme=dark&perline=30)](https://skillicons.dev)

 ## Installing and Running

First clone the repository.

Then run the following two commands in the `SimchaFund-React\SimchaFund-React.Data>` folder
 
 `dotnet ef migrations add {SomeMigration}`
and then `dotnet ef database update`.

Then go to the `SimchaFund-React.Web/appsettings.json` file
and change the Data Source to your SQL server name.

Then on the command line you can go to the web project folder `SimchaFund-React.Web/`
and run `dotnet watch run` 

##
This project is not completely  finished yet.
