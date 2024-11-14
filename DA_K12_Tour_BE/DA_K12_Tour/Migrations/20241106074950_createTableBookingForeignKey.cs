using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DA_K12_Tour.Migrations
{
    /// <inheritdoc />
    public partial class createTableBookingForeignKey : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "userId",
                table: "Bookings",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_userId",
                table: "Bookings",
                column: "userId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bookings_Users_userId",
                table: "Bookings",
                column: "userId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
        }
    }
}
