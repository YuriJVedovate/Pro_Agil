using System;
using System.ComponentModel.DataAnnotations;

namespace ProAgil.Domain.Dtos
{
    public class LoteDto
    {
        public int Id { get; set; }

        public string Nome { get; set; }

        public decimal Preco { get; set; }

        public string DataInicio { get; set; }

        public string DataFim { get; set; }

        [Range(1, 10000, ErrorMessage = "{0} s é entre 1 e 10000")]
        public int Quantidade { get; set; }

        public int EventoId { get; set; }
        public EventoDto Evento { get; set; }
    }
}
