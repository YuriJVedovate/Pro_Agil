using ProAgil.Domain;
using System.Threading.Tasks;

namespace ProAgil.Data.Interfaces
{
    public interface IPalestrantesRepository
    {
        Task<Palestrante[]> GetAllPalestrantesAsyncByName(string nome, bool includeEventos = false);
        Task<Palestrante> GetPalestranteAsyncById(int PalestranteId, bool includeEventos = false);
    }
}
