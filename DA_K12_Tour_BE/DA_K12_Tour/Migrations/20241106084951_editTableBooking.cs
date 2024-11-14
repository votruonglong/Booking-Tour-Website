using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DA_K12_Tour.Migrations
{
    /// <inheritdoc />
    public partial class editTableBooking : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "tourId",
                table: "Bookings",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_tourId",
                table: "Bookings",
                column: "tourId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bookings_Tours_tourId",
                table: "Bookings",
                column: "tourId",
                principalTable: "Tours",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bookings_Tours_tourId",
                table: "Bookings");

            migrationBuilder.DropIndex(
                name: "IX_Bookings_tourId",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "tourId",
                table: "Bookings");
        }
    }
}
