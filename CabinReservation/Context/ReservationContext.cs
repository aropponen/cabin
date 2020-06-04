using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace CabinReservation.Models
{
    public partial class ReservationContext : DbContext
    {
        public ReservationContext()
        {
        }

        public ReservationContext(DbContextOptions<ReservationContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Cabin> Cabin { get; set; }
        public virtual DbSet<Customer> Customer { get; set; }
        public virtual DbSet<Invoice> Invoice { get; set; }
        public virtual DbSet<Reservation> Reservation { get; set; }
        public virtual DbSet<ReservedService> ReservedService { get; set; }
        public virtual DbSet<Resort> Resort { get; set; }
        public virtual DbSet<ResortServices> ResortServices { get; set; }
        public virtual DbSet<Service> Service { get; set; }
        public virtual DbSet<ServiceProvider> ServiceProvider { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("DbConnection");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Cabin>(entity =>
            {
                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.CabinName)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.PricePerNight).HasColumnType("decimal(10, 2)");

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.Cabin)
                    .HasForeignKey(d => d.CustomerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Cabin_Customer");

                entity.HasOne(d => d.Resort)
                    .WithMany(p => p.Cabin)
                    .HasForeignKey(d => d.ResortId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Cabin_Resort");
            });

            modelBuilder.Entity<Customer>(entity =>
            {
                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.CompanyName).HasMaxLength(50);

                entity.Property(e => e.Details).HasMaxLength(100);

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.Property(e => e.Phone)
                    .IsRequired()
                    .HasMaxLength(15);

                entity.Property(e => e.Role)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsFixedLength();
            });

            modelBuilder.Entity<Invoice>(entity =>
            {
                entity.Property(e => e.InvoiceCreated)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.InvoicePaid).HasColumnType("datetime");
            });

            modelBuilder.Entity<Reservation>(entity =>
            {
                entity.Property(e => e.EndDate).HasColumnType("date");

                entity.Property(e => e.ReservationDate)
                    .HasColumnType("date")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.StartDate).HasColumnType("date");

                entity.Property(e => e.TotalPrice).HasColumnType("decimal(10, 2)");

                entity.HasOne(d => d.Cabin)
                    .WithMany(p => p.Reservation)
                    .HasForeignKey(d => d.CabinId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Reservation_Cabin");

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.Reservation)
                    .HasForeignKey(d => d.CustomerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Reservation_Customer");

                entity.HasOne(d => d.Invoice)
                    .WithMany(p => p.Reservation)
                    .HasForeignKey(d => d.InvoiceId)
                    .HasConstraintName("FK_Reservation_Invoice");
            });

            modelBuilder.Entity<ReservedService>(entity =>
            {
                entity.HasKey(e => new { e.ReservationId, e.ServiceId });

                entity.Property(e => e.ServiceDate).HasColumnType("datetime");

                entity.HasOne(d => d.Reservation)
                    .WithMany(p => p.ReservedService)
                    .HasForeignKey(d => d.ReservationId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ReservedService_Reservation");

                entity.HasOne(d => d.Service)
                    .WithMany(p => p.ReservedService)
                    .HasForeignKey(d => d.ServiceId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ReservedService_Service");
            });

            modelBuilder.Entity<Resort>(entity =>
            {
                entity.Property(e => e.Description).HasMaxLength(100);

                entity.Property(e => e.Location)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<ResortServices>(entity =>
            {
                entity.HasKey(e => new { e.ServiceId, e.ResortId });

                entity.HasOne(d => d.Resort)
                    .WithMany(p => p.ResortServices)
                    .HasForeignKey(d => d.ResortId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ResortServices_Resort");

                entity.HasOne(d => d.Service)
                    .WithMany(p => p.ResortServices)
                    .HasForeignKey(d => d.ServiceId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ResortServices_Service");
            });

            modelBuilder.Entity<Service>(entity =>
            {
                entity.Property(e => e.Description).HasMaxLength(100);

                entity.Property(e => e.PricePerService).HasColumnType("decimal(10, 2)");

                entity.Property(e => e.ServiceName)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.HasOne(d => d.ServiceProvider)
                    .WithMany(p => p.Service)
                    .HasForeignKey(d => d.ServiceProviderId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Service_ServiceProvider");
            });

            modelBuilder.Entity<ServiceProvider>(entity =>
            {
                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.CompanyName)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Email).HasMaxLength(50);

                entity.Property(e => e.Phone)
                    .IsRequired()
                    .HasMaxLength(15);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}