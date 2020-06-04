using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CabinReservation.Models;

namespace CabinReservation.Helpers
{
    public static class ExtensionMethods
    {
        public static IEnumerable<Customer> WithoutPasswords(this IEnumerable<Customer> customer)
        {
            return customer.Select(x => x.WithoutPassword());
        }

        public static Customer WithoutPassword(this Customer customer)
        {
            customer.Password = null;
            return customer;
        }
    }
}
