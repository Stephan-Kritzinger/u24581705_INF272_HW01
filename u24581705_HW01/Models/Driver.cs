using System.Text.Json.Serialization;

namespace u24581705_HW01.Models
{
    public class Driver
    {
        [JsonPropertyName("image")]
        public string Image { get; set; }

        [JsonPropertyName("firstName")]
        public string FirstName { get; set; }

        [JsonPropertyName("lastName")]
        public string LastName { get; set; }

        [JsonPropertyName("phone")]
        public string Phone { get; set; }

        [JsonPropertyName("service")]
        public string Service { get; set; }
    }
}
