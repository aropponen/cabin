using System;
using System.Collections.Generic;

namespace CabinReservation.Models
{
    public partial class Invoice
    {
        public Invoice()
        {
            Reservation = new HashSet<Reservation>();
        }

        public int Id { get; set; }
        public DateTime InvoiceCreated { get; set; }
        public DateTime? InvoicePaid { get; set; }

        public virtual ICollection<Reservation> Reservation { get; set; }
    }
}
