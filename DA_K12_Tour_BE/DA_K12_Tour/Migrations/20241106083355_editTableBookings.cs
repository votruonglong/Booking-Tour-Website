﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DA_K12_Tour.Migrations
{
    /// <inheritdoc />
    public partial class editTableBookings : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateOnly>(
                name: "departureDate",
                table: "Bookings",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));

            migrationBuilder.AddColumn<string>(
                name: "phoneNumber",
                table: "Bookings",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "departureDate",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "phoneNumber",
                table: "Bookings");
        }
    }
}
