using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SimchaFund_React.Data.Migrations
{
    public partial class MISTAKE : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ContributerId",
                table: "Deposits");

            migrationBuilder.AlterColumn<int>(
                name: "ContributorId",
                table: "Deposits",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "ContributorId",
                table: "Deposits",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "ContributerId",
                table: "Deposits",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
