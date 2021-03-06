using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProAgil.Domain.Identity
{
    public class User : IdentityUser<int>
    {
        [Column(TypeName = "varchar")]
        public string FullName { get; set; }

        public List<UserRole> UserRoles { get; set; }
    }
}
