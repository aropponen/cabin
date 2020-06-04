using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CabinReservation.Models;
using Microsoft.Extensions.Logging;

namespace CabinReservation.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly ILogger<ServiceController> _logger;
        private readonly ReservationContext _context;

        public ReservationController(ILogger<ServiceController> logger, 
                                        ReservationContext context)
        {
            _logger = logger;
            _context = context;
        }

        // GET: Reservation
        // Hakee kaikki varaukset
        [HttpGet]
        public async Task<IEnumerable<Reservation>> GetReservation()
        {
            var reservations = await _context.Reservation.ToListAsync();
            return reservations;
        }

        // GET: Reservation/5
        // Hae varaukset Id:n mukaan
        [HttpGet("{id}", Name= "GetReservationById")]
        public async Task<ActionResult<Reservation>> GetReservationById(int id)
        {
            Reservation reservation = await _context.Reservation.FindAsync(id);

            if (null == reservation)
            {
                return NotFound();
            }

            return reservation;
        }
        // GET: Reservation/Cabinowner/reservations/5
        // haetaan mökinomistajan mökin varaukset
        [HttpGet("cabinowner/reservations/{Id}", Name = "GetCabinOwnerReservations")]
        public async Task<IEnumerable<Reservation>> GetCabinOwnerReservations(long Id)
        {
            var cust = await _context.Cabin
                .Include(r=>r.Reservation)
                .Where(r => r.CustomerId == Id)
                .SelectMany(r=>r.Reservation)
                .ToListAsync();
            
            return cust;
        }
        // PUT: Reservation/5
        // Muuta varauksen tietoja

        [HttpPut("{id}")]
        public async Task<IActionResult> PutReservation(int id, Reservation reservation)
        {
            if (id != reservation.Id)
            {
                return BadRequest();
            }

            _context.Entry(reservation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReservationExists(id))
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

        // POST: Reservation
        // Lisää varaus

        [HttpPost]
        public async Task<ActionResult<Service>> PostReservation(Reservation reservation)
        {
            _context.Reservation.Add(reservation);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetReservation", new { id = reservation.Id }, reservation);
        }

        // DELETE: aReservation/5
        // Poista varaus
        [HttpDelete("{id}")]
        public async Task<ActionResult<Reservation>> DeleteReservation(int id)
        {
            var reservation = await _context.Reservation.FindAsync(id);
            if (reservation == null)
            {
                return NotFound();
            }

            _context.Reservation.Remove(reservation);
            await _context.SaveChangesAsync();

            return reservation;
        }

        private bool ReservationExists(int id)
        {
            return _context.Service.Any(e => e.Id == id);
        }
    }
}
