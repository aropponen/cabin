using System;
using System.Collections.Generic;

namespace CabinReservation.Models
{
    public partial class ReservedService
    {
        public int ReservationId { get; set; }
        public int ServiceId { get; set; }
        public DateTime ServiceDate { get; set; }

        public virtual Reservation Reservation { get; set; }
        public virtual Service Service { get; set; }
    }
}
