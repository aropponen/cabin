using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace CabinReservation.Models
{
    public partial class Cabin
    {
        public Cabin()
        {
            Reservation = new HashSet<Reservation>();
        }
        public int Id { get; set; }
        public string CabinName { get; set; }
        public string Address { get; set; }
        public decimal PricePerNight { get; set; }
        public int Beds { get; set; }
        public int CustomerId { get; set; }
        public int ResortId { get; set; }
        [JsonIgnore]
        public virtual Customer Customer { get; set; }
        [JsonIgnore]
        public virtual Resort Resort { get; set; }
        public virtual ICollection<Reservation> Reservation { get; set; }
    }
}
