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

    public class ServiceController : ControllerBase
    {
        private readonly ILogger<ServiceController> _logger;
        private readonly ReservationContext _context;

        public ServiceController(ILogger<ServiceController> logger,
                                    ReservationContext context)
        {
            _logger = logger;
            _context = context;
        }

        // GET: Service
        // Hakee kaikki palvelut
        [HttpGet]
        public async Task<IEnumerable<Service>> GetService()
        {
            var services = await _context.Service.ToListAsync();
            return services;
        }

        // GET: Service/5
        // Hakee palvelut ID:n mukaan
        [HttpGet("{id}", Name = "GetServiceById")]
        public async Task<ActionResult<Service>> GetServiceById(int id)
        {
            Service service = await _context.Service.FirstOrDefaultAsync(i => i.Id == id);
            if (null == service)
            {
                return NotFound();
            }
            return service;
        }

        /*
        // GET: Service/5
        // Hakuehtona muu kuin Id
        [HttpGet("{...? }", Name = "Search")]
        public IEnumerable<string> Get(hakuparametrit)
        {
            return services;
        }*/

        // POST: Service
        // Lis‰‰ palvelu
        [HttpPost]
        public async Task<ActionResult<Service>> PostService([FromBody] Service service)
        {
            _context.Service.Add(service);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetService), new { id = service.Id }, service);
        }

        // PUT: Service/5
        // Muuta palvelun tietoja
        [HttpPut("{id}")]
        public async Task<IActionResult> PutService(int id, [FromBody] Service service)
        {
            if (id != service.Id)
            {
                return BadRequest();
            }

            Service dbService = await _context.Service.FirstOrDefaultAsync(i => i.Id == id);
            if (null == dbService)
            {
                return NotFound();
            }
            dbService.ServiceName = service.ServiceName;
            dbService.Description = service.Description;
            dbService.PricePerService = service.PricePerService;
            dbService.ServiceProviderId = service.ServiceProviderId;

            await _context.SaveChangesAsync();
            return Ok();
        }

        // DELETE: aService/5
        // Poista palvelu
        [HttpDelete("{id}")]
        public async Task DeleteService(int id)
        {
            var service = await _context.Service.FirstOrDefaultAsync(i => i.Id == id);
            if (null != service)
            {
                _context.Service.Remove(service);
                await _context.SaveChangesAsync();
            }
        }
    }
}
