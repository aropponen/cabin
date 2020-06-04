using System;
using System.Collections.Generic;

namespace CabinReservation.Models
{
    public partial class Resort
    {
        public Resort()
        {
            Cabin = new HashSet<Cabin>();
            ResortServices = new HashSet<ResortServices>();
        }

        public int Id { get; set; }
        public string Location { get; set; }
        public string Description { get; set; }

        public virtual ICollection<Cabin> Cabin { get; set; }
        public virtual ICollection<ResortServices> ResortServices { get; set; }
    }
}
