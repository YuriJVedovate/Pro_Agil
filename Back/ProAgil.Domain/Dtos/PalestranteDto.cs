using System.Collections.Generic;

namespace ProAgil.Domain.Dtos
{
    public class PalestranteDto
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Miniurriculo { get; set; }
        public string ImagemURL { get; set; }
        public string Telefone { get; set; }
        public string Email { get; set; }
        public IEnumerable<RedeSocialDto> RedesSociais { get; }
        public IEnumerable<EventoDto> Eventos { get; }
    }
}
