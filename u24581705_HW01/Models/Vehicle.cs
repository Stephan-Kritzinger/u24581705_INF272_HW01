using System.Text.Json.Serialization;

namespace u24581705_HW01.Models
{
    public class Vehicle
    {
        [JsonPropertyName("type")]
        public string Type { get; set; }

        [JsonPropertyName("registration")]
        public string Registration { get; set; }

        [JsonPropertyName("service")]
        public string Service { get; set; }

        [JsonPropertyName("image")]
        public string Image { get; set; }
    }
}
