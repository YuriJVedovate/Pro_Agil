using System.Collections.Generic;

namespace ProAgil.Domain
{
    public class Palestrante
    {

        public int Id { get; set; }
        public string Nome { get; set; }
        public string Miniurriculo { get; set; }
        public string ImagemURL { get; set; }
        public string Telefone { get; set; }
        public string Email { get; set; }
        public List<RedeSocial> RedesSociais { get;}
        public List<PalestranteEvento> PalestrantesEventos { get;}
    }
}
