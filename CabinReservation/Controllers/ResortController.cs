using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CabinReservation.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace CabinReservation.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ResortController : ControllerBase
    {
        private readonly ILogger<ResortController> _logger;
        private readonly ReservationContext _context;
        public ResortController(ILogger<ResortController> logger, ReservationContext context)
        {
            _logger = logger;
            _context = context;
        }

        // GET: Resort
        // haetaan kaikki toimipaikat
        [HttpGet]
        public async Task<IEnumerable<Resort>> GetResort()
        {
            var resorts = await _context.Resort.ToListAsync();
            return resorts;
        }

        // GET: Resort/Cabin/5
        // haetaan kaikki toimipaikan mökit
        [HttpGet("cabin/{Id}", Name = "GetResortCabin")]
        public async Task<IEnumerable<Resort>> GetResortCabin(long Id)
        {
            var resorts = await _context.Resort
                .Include(c => c.Cabin)
                .Where(r => r.Id == Id)
                .ToListAsync();
            return resorts;
        }

        // GET: Resort/5
        // haetaan toimipaikat ID:n mukaan
        [HttpGet("{id}", Name = "GetResort")]
        public async Task<ActionResult<Resort>> GetResortById(int Id)
        {
            var resort = await _context.Resort.FirstOrDefaultAsync(a => a.Id == Id);
            if ( null == resort)
            {
                return NotFound();
            }
            return resort;

        }

        // POST: Resort
        // Lisätään toimipaikka
        [HttpPost]
        public async Task<ActionResult<Resort>> PostResort([FromBody] Resort resort)
        {
            _context.Resort.Add(resort);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetResort), new { id = resort.Id }, resort);
        }

        // PUT: Resort/5
        // Muokataan toimipaikan tietoja
        [HttpPut("{Id}")]
        public async Task<ActionResult> Put(long id, [FromBody] Resort resort)
        {
            if (id != resort.Id)
            {
                return BadRequest();
            }

            Resort dbResort = await _context.Resort.FirstOrDefaultAsync(i => i.Id == id);
            if (null == dbResort)
            {
                return NotFound();
            }
            dbResort.Location = resort.Location;
            dbResort.Description = resort.Description;

            await _context.SaveChangesAsync();
            return Ok();
        }

        // DELETE: Resort/5
        // poistetaan toimipaikka
        [HttpDelete("{Id}")]
        public async Task DeleteResort(long id)
        {
            var resort = await _context.Resort.FirstOrDefaultAsync(i => i.Id == id);
            if (null != resort)
            {
                _context.Resort.Remove(resort);
                await _context.SaveChangesAsync();
            }
        }
    }
}
