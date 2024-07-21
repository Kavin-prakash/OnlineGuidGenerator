using Microsoft.AspNetCore.Mvc;
using Online_Guid_Generator.IService;
using Online_Guid_Generator.ViewModel;

namespace Online_Guid_Generator.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GuidGeneratorController : ControllerBase
    {

        private readonly IGuidGenerator _generator;


        public GuidGeneratorController(IGuidGenerator generator)
        {
            _generator = generator;
        }

        ///<summary>
        ///Generating Guid using Transient Service LifeTime
        ///</summary>
        ///<response code="200">Success</response>

        [HttpGet]
        [Route("GuidGenerator")]
        public ActionResult<GuidGenerator> GetGuid()
        {

            GuidGenerator generator = new GuidGenerator()

            {
                GetGuidGenerator = _generator.GetGenerateGuid().ToString()
        };

         
            return Ok(generator);
          
        }
    }
}
