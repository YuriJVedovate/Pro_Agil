using ProAgil.Domain.Dtos;
using System.Threading.Tasks;

namespace ProAgil.Business.Interfaces
{
    public interface IEventosServices
    {
        Task<EventoDto> AddEventos(EventoDto model);
        Task<EventoDto> UpdateEventos( int eventoId, EventoDto model);
        Task<bool> DeleteEventos(int eventoId);
        Task<EventoDto[]> GetAllEventoAsync(bool includePalestrantes = false);
        Task<EventoDto[]> GetAllEventoByTemaAsync(string tema, bool includePalestrantes = false);
        Task<EventoDto> GetEventoByIdAsync(int eventoId, bool includePalestrantes = false);
    }
}
