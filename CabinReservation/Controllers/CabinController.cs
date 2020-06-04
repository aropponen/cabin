using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CabinReservation.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace CabinReservation.Controllers
{
    [Route("[controller]")]
    [ApiController]

    public class CabinController : ControllerBase
    {
        private readonly ILogger<CabinController> _logger;
        private readonly ReservationContext _context;
        public CabinController(ILogger<CabinController> logger, 
                                ReservationContext context)
        {
            _logger = logger;
            _context = context;
        }

        // GET: Cabin
        // Hakee kaikki mökit
        [HttpGet]
        public async Task<IEnumerable<Cabin>> GetCabin()
        {
            var cabins = await _context.Cabin.ToListAsync();
            return cabins;
        }

        // GET: Cabin/5
        // Hakee mökit ID:n mukaan
        [HttpGet("{id}", Name = "GetCabinById")]
        public async Task<ActionResult<Cabin>> GetCabinById(int Id)
        {
            Cabin cabin = await _context.Cabin.FirstOrDefaultAsync(a => a.Id == Id);
            if ( null == cabin)
            {
                return NotFound();
            }
            
            return cabin;
        }
       
        // POST: Cabin
        // Lisää mökki
        [HttpPost]
        public async Task<ActionResult<Cabin>> PostCabin([FromBody] Cabin cabin)
        {
            _context.Cabin.Add(cabin);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCabin), new { id = cabin.Id }, cabin);
        }

        // PUT: Cabin/5
        // Muuta mökin tietoja
        [HttpPut("{Id}")]
        public async Task<ActionResult> PutCabin(int id, [FromBody] Cabin cabin)
        {
            if (id != cabin.Id)
            {
                return BadRequest();
            }

            Cabin dbCabin = await _context.Cabin.FirstOrDefaultAsync(i => i.Id == id);
            if (null == dbCabin)
            {
                return NotFound();
            }
            dbCabin.CabinName = cabin.CabinName;
            dbCabin.Address = cabin.Address;
            dbCabin.PricePerNight = cabin.PricePerNight;
            dbCabin.Beds = cabin.Beds;
            dbCabin.CustomerId = cabin.CustomerId;
            dbCabin.ResortId = cabin.ResortId;
            await _context.SaveChangesAsync();
            return Ok();
        }

        // DELETE: Cabin/5
        // Poista mökki
        [HttpDelete("{Id}")]
        public async Task DeleteCabin(int id)
        {
            var cabin = await _context.Cabin.FirstOrDefaultAsync(i => i.Id == id);
            if (null != cabin)
            {
                _context.Cabin.Remove(cabin);
                await _context.SaveChangesAsync();
            }
        }
    }
}
