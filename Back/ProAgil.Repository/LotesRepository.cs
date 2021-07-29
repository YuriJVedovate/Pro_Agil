using Microsoft.EntityFrameworkCore;
using ProAgil.Business.Interfaces;
using ProAgil.Domain;
using ProAgil.Repository;
using System.Linq;
using System.Threading.Tasks;


namespace ProAgil.Business
{
    public class LotesRepository : ILotesRepository
    {
        private readonly ProAgilContext _context;

        public LotesRepository(ProAgilContext context)
        {
            _context = context;
            _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }

        public async Task<Lote> GetLoteByIdsAsync(int eventoId, int loteId)
        {
            IQueryable<Lote> query = _context.Lotes;
            query = query.AsNoTracking().Where(lote => lote.EventoId == eventoId && lote.Id == loteId);
            return await query.FirstOrDefaultAsync();
        }

        public async Task<Lote[]> GetLotesByEventoIdAsync(int eventoId)
        {
            IQueryable<Lote> query = _context.Lotes;
            query = query.AsNoTracking().Where(lote => lote.EventoId == eventoId);
            return await query.ToArrayAsync();
        }
    }
}
