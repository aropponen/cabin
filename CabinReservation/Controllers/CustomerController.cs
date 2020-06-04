using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CabinReservation.Models;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;

namespace CabinReservation.Controllers
{
    //[Authorize]
    [Route("[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ILogger<CustomerController> _logger;
        private readonly ReservationContext _context;

        public CustomerController(ILogger<CustomerController> logger, 
                        ReservationContext context)
        {
            _logger = logger;
            _context = context;
        }

        // GET: Customer
        // Hae kaikki asiakkaat
        [AllowAnonymous]
        [HttpGet]
        public async Task<IEnumerable<Customer>> GetCustomer()
        {
            var customers = await _context.Customer.ToListAsync();
            return customers;
        }

        // GET: Customer/5
        // Hakee asiakkaat Id:n mukaan
        [HttpGet("{id}", Name = "GetCustomerById")]
        public async Task<ActionResult<Customer>> GetCustomerById(int id)
        {
            Customer customer = await _context.Customer.FirstOrDefaultAsync(i => i.Id == id);
            if (null == customer)
            {
                return NotFound();
            }

            return customer;
        }
        // GET: Customer/Invoice/5
        // haetaan asiakkaan varaukset
        [HttpGet("reservations/{Id}", Name = "GetCustomerReservations")]
        public async Task<IEnumerable<Customer>> GetCustomerReservations(long Id)
        {
            var customers = await _context.Customer
                .Include(c => c.Reservation)
                .Where(r => r.Id == Id)
                .ToListAsync();
            return customers;
        }
        // GET: Customer/Cabinowner/5
        // haetaan mökinomistajan mökit
        [HttpGet("cabinowner/{Id}", Name = "GetCabinOwner")]
        public async Task<IEnumerable<Customer>> GetCabinOwner(long Id)
        {
            var cust = await _context.Customer
                .Include(c => c.Cabin)
                .Where(r => r.Id == Id)
                .ToListAsync();
            return cust;
        }
        
        // PUT: Customer/5
        // Muuta asiakkaan tietoja
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomer(int id, [FromBody] Customer customer)
        {
            if (id != customer.Id)
            {
                return BadRequest();
            }

            _context.Entry(customer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: Customer
        // Lisää asiakas
        [HttpPost]
        public async Task<ActionResult<Customer>> PostCustomer([FromBody] Customer customer)
        {
            _context.Customer.Add(customer);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCustomer), new { id = customer.Id }, customer);
        }
        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody]AuthenticateModel model)
        
        {
            
            var customer = _context.Customer.SingleOrDefault(x => x.Email == model.Email && x.Password == model.Password);
            

            //return customer.WithoutPassword();
            if (customer == null)
                return BadRequest(new { message = "Email or password is incorrect" });//vaihda

            return Ok(customer);
        }


        // DELETE: Customer/5
        // Poista Asiakas
        [HttpDelete("{id}")]
        public async Task<ActionResult<Customer>> DeleteCustomer(int id)
        {
            var customer = await _context.Customer.FirstOrDefaultAsync(i => i.Id == id);
            if (customer == null)
            {
                return NotFound();
            }

            _context.Customer.Remove(customer);
            await _context.SaveChangesAsync();

            return customer;
        }

        private bool CustomerExists(int id)
        {
            return _context.Customer.Any(e => e.Id == id);
        }
    }
}
