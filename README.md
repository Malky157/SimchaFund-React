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

## Users Guide
#### **Home page**

To add a Simcha click the add simcha buuton

![image](https://github.com/Malky157/SimchaFund-React/assets/129129116/bedd52a2-2821-44ef-80c2-4c860f126f79)

The screen will then change to this and you can fill out the information and press save.
> Note: The date is defaulted to the current date

![image](https://github.com/Malky157/SimchaFund-React/assets/129129116/ce20b7e9-6068-4aae-8cfe-c6986ba53f35)

To view a simchas contributions click on its contributions button

![image](https://github.com/Malky157/SimchaFund-React/assets/129129116/5104dd12-f124-4fa5-b66b-af0abf79779d)

and you will see a page that looks like this, where it will show you which contributors are contributing and how much. You can change any of this information on this page and then click update.
> Note: If a contributor doesn't have enough funds to contribute to the simcha then it will not go through

![image](https://github.com/Malky157/SimchaFund-React/assets/129129116/0680da7a-2a9e-4a15-95fb-dad4b9bcc774)


#### **Contributions page**

To add a contributor press the add contributor button
![image](https://github.com/Malky157/SimchaFund-React/assets/129129116/23474e1b-db0c-4896-923e-5c0549f0ccec)

and you will be taken to this page, fill out all information and then click save
![image](https://github.com/Malky157/SimchaFund-React/assets/129129116/1a6df164-071e-45b0-9d51-13e56a6850c3)

To add a deposit click the deposit button and a modal will pop up
![image](https://github.com/Malky157/SimchaFund-React/assets/129129116/20d22bfb-ff04-4979-9a96-3a8ee858addc)

fill out the pertinent information and click save
![image](https://github.com/Malky157/SimchaFund-React/assets/129129116/974010fb-a740-46be-99c1-5f5f042aac18)

You can also edit a contributor by clicking the edit button in the action column
![image](https://github.com/Malky157/SimchaFund-React/assets/129129116/dc118c42-51cb-46b2-a0d7-77ef11cfe758)

as soon as you click it the contributor's row will switch to edit mode, when you finish making your changes you can click save
![image](https://github.com/Malky157/SimchaFund-React/assets/129129116/3093c111-2d56-49cd-a956-34697adc375d)


You can also click Show History to see all of the contributor's deposits and contributions
![image](https://github.com/Malky157/SimchaFund-React/assets/129129116/e29b018d-7545-471c-96a9-b5607dc03cde)

![image](https://github.com/Malky157/SimchaFund-React/assets/129129116/1be5290b-77fa-4df6-9585-5bdc694b0ee0)





##
This project is not completely finished yet.
