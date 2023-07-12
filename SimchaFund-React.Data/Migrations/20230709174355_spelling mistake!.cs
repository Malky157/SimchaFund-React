using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SimchaFund_React.Data.Migrations
{
    public partial class spellingmistake : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Contributions",
                table: "Contributions");

            migrationBuilder.DropColumn(
                name: "ContributerId",
                table: "Contributions");

            migrationBuilder.AlterColumn<int>(
                name: "ContributorId",
                table: "Contributions",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Contributions",
                table: "Contributions",
                columns: new[] { "SimchaId", "ContributorId" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Contributions",
                table: "Contributions");

            migrationBuilder.AlterColumn<int>(
                name: "ContributorId",
                table: "Contributions",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "ContributerId",
                table: "Contributions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Contributions",
                table: "Contributions",
                columns: new[] { "SimchaId", "ContributerId" });
        }
    }
}
