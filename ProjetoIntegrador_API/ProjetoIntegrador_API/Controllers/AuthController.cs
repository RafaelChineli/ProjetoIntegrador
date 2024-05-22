using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System;
using ProjetoIntegrador_API.Models;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;

    public AuthController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost("signup")]
    public async Task<IActionResult> Signup([FromBody] User user)
    {
        if (await _context.Users.AnyAsync(u => u.Email == user.Email))
        {
            return BadRequest(new { message = "Email already exists." });
        }

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return Ok(new { message = "User created successfully." });
    }

    [HttpPost("signin")]
    public async Task<IActionResult> Signin([FromBody] User login)
    {
        var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == login.Email && u.Password == login.Password);

        if (user == null)
        {
            return Unauthorized(new { message = "Invalid credentials." });
        }

        return Ok(new { message = "Login successful." });
    }
}
