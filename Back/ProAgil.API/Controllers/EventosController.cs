using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProAgil.Business.Interfaces;
using ProAgil.Domain.Dtos;
using System;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace ProAgil.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventosController : ControllerBase
    {
        private readonly IEventosServices _eventosServices;
        private readonly IWebHostEnvironment _hostEnvironment;

        public EventosController(IEventosServices eventosServices, IWebHostEnvironment hostEnvironment)
        {
            _eventosServices = eventosServices;
            _hostEnvironment = hostEnvironment;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAsync()
        {
            try
            {
                var eventos = await _eventosServices.GetAllEventoAsync(true);
                if (eventos == null) return NoContent();

                return Ok(eventos);

            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuperar eventos. Erro: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetByIdAsync(int id)
        {
            try
            {
                var evento = await _eventosServices.GetEventoByIdAsync(id, true);
                if (evento == null) return NoContent();

                return Ok(evento);

            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuperar evento. Erro: {ex.Message}");
            }
        }

        [HttpGet("/tema/{tema}")]
        [Authorize]
        public async Task<IActionResult> GetByTemaAsync(string tema)
        {
            try
            {
                var eventos = await _eventosServices.GetAllEventoByTemaAsync(tema, true);
                if (eventos == null) return NoContent();

                return Ok(eventos);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuperar eventos. Erro: {ex.Message}");
            }
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> PostAsync(EventoDto model)
        {
            try
            {
                var eventos = await _eventosServices.AddEventos(model);
                if (eventos == null) return BadRequest("Erro ao tentar ingressar evento!");

                return Ok(eventos);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar ingressar o evento. Erro: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> PutAsync(int id, EventoDto model)
        {
            try
            {
                var evento = await _eventosServices.UpdateEventos(id, model);
                if (evento == null) BadRequest("Evento não Atualizado");

                return Ok(evento);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar atualizar o evento. Erro: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            try
            {
                var evento = await _eventosServices.GetEventoByIdAsync(id);
                if (evento == null) return NoContent();

                if (await _eventosServices.DeleteEventos(id)) {

                    DeletarImagem(evento.ImagemURL);
                    return Ok(new { message = "Deletado" });
                }

                return BadRequest("Evento não deletado");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar deletar o evento. Erro: {ex.Message}");
            }
        }

        [HttpPost("upload/{eventoId}")]
        [Authorize]
        public async Task<IActionResult> UploadAsync(int eventoId)
        {
            try
            {
                var evento = await _eventosServices.GetEventoByIdAsync(eventoId, true);
                if (evento == null) return NoContent();

                var file = Request.Form.Files[0];
                if (file.Length > 0)
                {
                    DeletarImagem(evento.ImagemURL);
                    evento.ImagemURL = await SalvarImagem(file);
                }
                return Ok(await _eventosServices.UpdateEventos(eventoId, evento));


            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"{ex.Message}");
            }

            return BadRequest("Erro ao tentar realizar upload");

        }

        [NonAction]
        public void DeletarImagem(string imagem)
        {
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, @"Resources/images", imagem);
            if (System.IO.File.Exists(imagePath))
                System.IO.File.Delete(imagePath);
        }

        [NonAction]
        public async Task<string> SalvarImagem(IFormFile imagem)
        {
            string nomeImagem = new string(Path.GetFileNameWithoutExtension(imagem.FileName).Take(10).ToArray()).Replace(' ', '-');
            nomeImagem = $"{nomeImagem}{DateTime.UtcNow.ToString("yymmssfff")}{Path.GetExtension(imagem.FileName)}";

            var imagemPath = Path.Combine(_hostEnvironment.ContentRootPath, @"Resources/images", nomeImagem);

            using (var fileStream = new FileStream(imagemPath, FileMode.Create))
            {
                await imagem.CopyToAsync(fileStream);
            }
                return nomeImagem;
        }
    }
}

