using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CabinReservation.Models;
using CabinReservation.Helpers;

namespace CabinReservation.Services
{
   
        public interface ICustomerService
        {
            Customer Authenticate(string email, string password);
            IEnumerable<Customer> GetAll();
            Customer GetById(int id);

        }
        public class CustomerService : ICustomerService
        {
            private ReservationContext _context;

            public CustomerService(ReservationContext context)
            {
                _context = context;
            }

            public Customer Authenticate(string email, string password)
            {


                //var customer = _context.Customer.SingleOrDefault(x => x.Email == email);
                var customer = _context.Customer.SingleOrDefault(x => x.Email == email && x.Password == password);
                // check if username exists
                if (customer == null)
                    return null;


                return customer.WithoutPassword();
            }

            public IEnumerable<Customer> GetAll()
            {
                return _context.Customer.WithoutPasswords();
            }

            public Customer GetById(int id)
            {
                return _context.Customer.Find(id);
            }


        }
    }
