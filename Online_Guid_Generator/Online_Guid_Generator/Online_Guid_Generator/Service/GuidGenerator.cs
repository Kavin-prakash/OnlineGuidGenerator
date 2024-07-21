using Online_Guid_Generator.IService;

namespace Online_Guid_Generator.Service
{
    public class GuidGenerator:IGuidGenerator
    {
        public Guid ID { get; set; }

        public GuidGenerator()
        {
           this.ID = Guid.NewGuid();
        }

        public Guid GetGenerateGuid()
        {
            return ID;
        }
    }
}
