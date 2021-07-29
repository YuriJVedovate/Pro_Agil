using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProAgil.Business.Interfaces;
using ProAgil.Domain.Dtos;
using System;
using System.Threading.Tasks;

namespace ProAgil.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LotesController : ControllerBase
    {

        private readonly ILotesServices _lotesServices;
        public LotesController(ILotesServices lotesServices)
        {
            _lotesServices = lotesServices;

        }

        [HttpGet("{eventoId}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetAsync(int eventoId)
        {
            try
            {
                var lotes = await _lotesServices.GetLotesByEventoIdAsync(eventoId);
                if (lotes == null) return NoContent();

                return Ok(lotes);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuperar lotes. Erro: {ex.Message}");
            }
        }

        [HttpPut("{eventoId}")]
        [AllowAnonymous]
        public async Task<IActionResult> PutAsync(int eventoId, LoteDto[] models)
        {
            try
            {
                var lotes = await _lotesServices.SaveLotesAsync(eventoId, models);
                if (lotes == null) return NoContent();
                return Ok(lotes);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar salvar lotes. Erro: {ex.Message}");
            }
        }

        [HttpDelete("{eventoId}/{loteId}")]
        [AllowAnonymous]
        public async Task<IActionResult> DeleteAsync(int eventoId, int loteId)
        {
            try
            {
                var lote = await _lotesServices.GetLoteByIdsAsync(eventoId, loteId);
                if (lote == null) return NoContent();

                return await _lotesServices.DeleteLoteAsync(lote.EventoId, lote.Id) ? Ok(new { message = "Deletado" }) : throw new Exception("Ocorreu um problema ao tentar deletar o Lote.");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar deletar o lote. Erro: {ex.Message}");
            }
        }
    }
}
