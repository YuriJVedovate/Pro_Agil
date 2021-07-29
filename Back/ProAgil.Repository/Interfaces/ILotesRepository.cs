using ProAgil.Domain;
using System;
using System.Collections.Generic;

using System.Text;
using System.Threading.Tasks;

namespace ProAgil.Business.Interfaces
{
    public interface ILotesRepository
    {
        Task<Lote[]> GetLotesByEventoIdAsync(int eventoId);
        Task<Lote> GetLoteByIdsAsync(int eventoId, int loteId);
    }
}
