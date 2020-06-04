using System;
using System.Collections.Generic;

namespace CabinReservation.Models
{
    public partial class Reservation
    {
        public Reservation()
        {
            ReservedService = new HashSet<ReservedService>();
        }

        public int Id { get; set; }
        public DateTime ReservationDate { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public decimal? TotalPrice { get; set; }
        public byte Confirmed { get; set; }
        public int CustomerId { get; set; }
        public int? InvoiceId { get; set; }
        public int CabinId { get; set; }

        public virtual Cabin Cabin { get; set; }
        public virtual Customer Customer { get; set; }
        public virtual Invoice Invoice { get; set; }
        public virtual ICollection<ReservedService> ReservedService { get; set; }
    }
}