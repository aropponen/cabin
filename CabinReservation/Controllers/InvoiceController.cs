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
    public class InvoiceController : ControllerBase
    {
        private readonly ILogger<InvoiceController> _logger;
        private readonly ReservationContext _context;

        public InvoiceController(ILogger<InvoiceController> logger,
                        ReservationContext context)
        {
            _logger = logger;
            _context = context;
        }

        // GET: Invoice
        // Hae kaikki laskut
        [HttpGet]
        public async Task<IEnumerable<Invoice>> GetInvoice()
        {
            var invoices = await _context.Invoice.ToListAsync();
            return invoices;
        }

        // GET: Invoice/5
        // Hakee laskut Id:n mukaan
        [HttpGet("{id}", Name = "GetInvoiceById")]
        public async Task<ActionResult<Invoice>> GetInvoiceById(int id)
        {
            Invoice invoice = await _context.Invoice.FirstOrDefaultAsync(i => i.Id == id);
            if (null == invoice)
            {
                return NotFound();
            }

            return invoice;
        }

        // PUT: Invoice/5
        // Muuta laskun tietoja
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInvoice(int id, [FromBody] Invoice invoice)
        {
            if (id != invoice.Id)
            {
                return BadRequest();
            }

            _context.Entry(invoice).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InvoiceExists(id))
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

        // POST: Invoice
        // Lisää lasku
        [HttpPost]
        public async Task<ActionResult<Invoice>> PostInvoice([FromBody] Invoice invoice)
        {
            _context.Invoice.Add(invoice);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetInvoice), new { id = invoice.Id }, invoice);
        }

        // DELETE: Invoice/5
        // Poista lasku
        [HttpDelete("{id}")]
        public async Task<ActionResult<Invoice>> DeleteInvoice(int id)
        {
            var invoice = await _context.Invoice.FirstOrDefaultAsync(i => i.Id == id);
            if (invoice == null)
            {
                return NotFound();
            }

            _context.Invoice.Remove(invoice);
            await _context.SaveChangesAsync();

            return invoice;
        }

        private bool InvoiceExists(int id)
        {
            return _context.Invoice.Any(e => e.Id == id);
        }
    }
}
