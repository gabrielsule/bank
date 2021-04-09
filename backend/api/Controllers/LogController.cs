using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Models;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LogController : ControllerBase
    {
        private readonly ApiContext _context;

        public LogController(ApiContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<LogModel> GetLogModels()
        {
            return Ok(_context.LogModels.ToList());
        }

        [HttpPost]
        public ActionResult<LogModel> PostLogModel(LogModel logModel)
        {
            _context.LogModels.Add(logModel);

            _context.SaveChanges();

            return Ok();
        }
    }
}
