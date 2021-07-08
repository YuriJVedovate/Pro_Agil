using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProAgil.Domain.Dtos
{
    public class EventoDto
    {
        
        public int Id { get; set; }

        [Required(ErrorMessage = "Campo {0} obrigatório")]
        public string Local { get; set; }

        [Required(ErrorMessage = "Campo {0} obrigatório")]
        public string DataEvento { get; set; }

        [Required(ErrorMessage = "Campo {0} obrigatório")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Campo {0} permite de 3 a 100 caracteres")]
        public string Tema { get; set; }

        [Required(ErrorMessage = "Campo {0} obrigatório")]
        [Range(1, 10000, ErrorMessage = "{0} é entre 1 e 10000")]
        public int QuantidadePessoas { get; set; }

        [Required(ErrorMessage = "Campo {0} obrigatório")]
        public string ImagemURL { get; set; }

        [Required(ErrorMessage = "Campo {0} obrigatório")]
        [Phone]
        public string Telefone { get; set; }

        [Required(ErrorMessage = "Campo {0} obrigatório")]
        [EmailAddress]
        public string Email { get; set; }

        public List<LoteDto> Lotes { get; set; }

        public List<RedeSocialDto> RedesSociais { get; set; }

        public List<PalestranteDto> Palestrantes { get; set; }

    }
}
