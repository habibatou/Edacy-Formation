namespace GestionProduits.Models
{
    public class Produit
    {
        public int Id { get; set; }
        public string Nom { get; set; }
        public string Description { get; set; }
        public decimal Prix{ get; set; }
        public int CategorieId { get; set; }
        public string Code { get; set; }
        public bool Actif { get; set; }

        public Categorie Category { get; set; }


    }
}
