using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Models;

namespace api.Contrllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly ApiContext _context;

        public AccountController(ApiContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public ActionResult<AccountModel> GetAccount(Guid id)
        {
            var accountModel = _context.Account.Find(id);

            if (accountModel == null)
            {
                return NotFound();
            }

            return accountModel;
        }

        // PUT: api/UsAccount/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAccountModel(Guid id, AccountModel accountModel)
        {
            if (id != accountModel.Id)
            {
                return BadRequest();
            }

            _context.Entry(accountModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AccountModelExists(id))
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

        // POST: api/UsAccount
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<AccountModel>> PostAccountModel(AccountModel accountModel)
        {
            _context.Account.Add(accountModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAccountModel", new { id = accountModel.Id }, accountModel);
        }

        // DELETE: api/UsAccount/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAccountModel(Guid id)
        {
            var accountModel = await _context.Account.FindAsync(id);
            if (accountModel == null)
            {
                return NotFound();
            }

            _context.Account.Remove(accountModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AccountModelExists(Guid id)
        {
            return _context.Account.Any(e => e.Id == id);
        }
    }
}
