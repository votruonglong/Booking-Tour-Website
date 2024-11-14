using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DA_K12_Tour.Migrations
{
    /// <inheritdoc />
    public partial class editTableTour : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bookings_Users_userId",
                table: "Bookings");

            migrationBuilder.DropIndex(
                name: "IX_Bookings_userId",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "userId",
                table: "Bookings");

            migrationBuilder.RenameColumn(
                name: "Price",
                table: "Tours",
                newName: "ChildPrice");

            migrationBuilder.AddColumn<string>(
                name: "AdultPrice",
                table: "Tours",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AdultPrice",
                table: "Tours");

            migrationBuilder.RenameColumn(
                name: "ChildPrice",
                table: "Tours",
                newName: "Price");

            migrationBuilder.AddColumn<Guid>(
                name: "userId",
                table: "Bookings",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_userId",
                table: "Bookings",
                column: "userId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bookings_Users_userId",
                table: "Bookings",
                column: "userId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
