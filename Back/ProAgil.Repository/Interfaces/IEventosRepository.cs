using ProAgil.Domain;
using System.Threading.Tasks;

namespace ProAgil.Data.Interfaces
{
    public interface IEventosRepository
    {
        Task<Evento[]> GetAllEventoByTemaAsync(string tema, bool includePalestrantes = false);
        Task<Evento[]> GetAllEventoAsync(bool includePalestrantes = false);
        Task<Evento> GetEventoByIdAsync(int eventoId, bool includePalestrantes = false);
    }
}
