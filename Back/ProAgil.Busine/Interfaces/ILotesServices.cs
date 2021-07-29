using ProAgil.Domain;
using ProAgil.Domain.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProAgil.Business.Interfaces
{
    public interface ILotesServices
    {
        Task<LoteDto[]> SaveLotesAsync(int eventoId, LoteDto[] models);
        Task<bool> DeleteLoteAsync(int eventoId, int loteId);
        Task<LoteDto[]> GetLotesByEventoIdAsync(int eventoId);
        Task<LoteDto> GetLoteByIdsAsync(int eventoId, int loteId);
    }
}
