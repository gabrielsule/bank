using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Models;
using Microsoft.AspNetCore.Cors;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CardController : ControllerBase
    {
        private readonly ApiContext _context;

        public CardController(ApiContext context)
        {
            _context = context;
        }

        [HttpGet("{card}")]
        public ActionResult<CardModel> GetCard(string card)
        {
            var query = (from cards in _context.Card
                         where cards.Card == card
                         && cards.Locked == false
                         select cards).SingleOrDefault();


            if (query == null)
            {
                return NotFound();
            }

            return Ok(query);
        }

        [HttpPost]
        public ActionResult GetPin(PinModel pinModel)
        {
            var query = (from cards in _context.Card
                         where cards.Id == pinModel.IdCard
                         && cards.Pin == pinModel.Pin
                         && cards.Locked == false
                         select cards).Count();

            if (query == 0)
            {
                return NotFound();
            }

            return Ok();
        }

        [HttpPut("{id}")]
        public ActionResult PutCard(Guid id)
        {
            try
            {
                var query = (from cards in _context.Card
                             where cards.Id == id
                             && cards.Locked == false
                             select cards).FirstOrDefault();

                query.Locked = true;

                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClientModelExists(id))
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

        private bool ClientModelExists(Guid id)
        {
            return _context.Card.Any(e => e.Id == id);
        }
    }
}
