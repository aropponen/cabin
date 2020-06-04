using System;
using System.Collections.Generic;

namespace CabinReservation.Models
{
    public partial class ResortServices
    {
        public int ServiceId { get; set; }
        public int ResortId { get; set; }

        public virtual Resort Resort { get; set; }
        public virtual Service Service { get; set; }
    }
}
