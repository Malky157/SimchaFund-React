 To migrate the database:

 Run the following two commands in the `SimchaFund-React\SimchaFund-React.Data>`
 
 `dotnet ef migrations add {SomeMigration}`
and then `dotnet ef database update`

Then go to https://github.com/Malky157/SimchaFund-React/blob/master/SimchaFund-React.Web/appsettings.json
and change the Data Source to your SQL server name

This project is not completly finished yet.
