using System.Diagnostics;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using u24581705_HW01.Models;

namespace u24581705_HW01.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult rideHistory()
        {
            return View();
        }

        public IActionResult Manage()
        {
            return View();
        }

        public IActionResult Booking()
        {
            return View();
        }
        public IActionResult Book(string service)
        {
            ViewBag.Service = service;
            var model = new BookingViewModel
            {
                Service = service
            };

            return View(model);
        }
        public IActionResult addDriver()
        {
            return View();
        }

        public IActionResult BookingConfirmed()
        {
            var model = new Booking
            {
                GUID = "1",
                Date = "Today",
                Time = "Now",
                Address = "Here",
                Name = "Lorem",
                Number = "0000",
                Type = "Car",
                Registration = "Yes"
            };
            return View(model);
        }

        public IActionResult saveDriver(string firstName, string lastName, string phone, string service, IFormFile image)
        {
            if(image != null && image.Length > 0)
            {
                string basedir = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Images", "Driver");
                Directory.CreateDirectory(basedir);

                string filepath = Path.Combine(basedir, image.FileName);
                if (firstName != null && lastName != null && phone != null && service != null && firstName.Length > 0 && lastName.Length > 0 && phone.Length > 0 && service.Length > 0)
                {
                    if (!System.IO.File.Exists(filepath))
                    {
                        using (var stream = new FileStream(filepath, FileMode.Create))
                        {
                            image.CopyTo(stream);
                        }
                    }
                    
                    string json = JsonSerializer.Serialize(new
                    {
                        firstName = firstName,
                        lastName = lastName,
                        phone = phone,
                        service = service,
                        image = image.FileName
                    });

                    TempData["json"] = json;
                    return RedirectToAction("AddDriver");
                }
                else
                {
                    return RedirectToAction("AddDriver");
                }
            }
            return RedirectToAction("AddDriver");
        }

        public IActionResult EditDriver(string driver)
        {
            var driverJson = JsonSerializer.Deserialize<Driver>(driver);
            Console.Write(driverJson);
            return View(driverJson);
        }

        public IActionResult updateDriver(string firstName, string lastName, string phone, string service, IFormFile image)
        {
            if (firstName != null && lastName != null && phone != null && service != null && firstName.Length > 0 && lastName.Length > 0 && phone.Length > 0 && service.Length > 0)
            {
                if (image != null && image.Length > 0)
                {
                    string basedir = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Images", "Driver");
                    Directory.CreateDirectory(basedir);

                    string filepath = Path.Combine(basedir, image.FileName);
                    if (!System.IO.File.Exists(filepath))
                    {
                        using (var stream = new FileStream(filepath, FileMode.Create))
                        {
                            image.CopyTo(stream);
                        }
                    }
                }

                string json = JsonSerializer.Serialize(new
                {
                    firstName = firstName,
                    lastName = lastName,
                    phone = phone,
                    service = service,
                    image = image?.FileName
                });

                TempData["json"] = json;
                return RedirectToAction("EditDriver", "Home", new {Driver = json});
            }
            else
            {
                return RedirectToAction("EditDriver");
            }
        }

        public IActionResult AddVehicle()
        {
            return View();
        }

        public IActionResult saveVehicle(string type, string registration,string service, IFormFile image)
        {
            if (image != null && image.Length > 0)
            {
                string basedir = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Images", "Vehicle");
                Directory.CreateDirectory(basedir);

                string filepath = Path.Combine(basedir, image.FileName);
                if (type != null && registration != null && service != null && type.Length > 0 && registration.Length > 0 && service.Length > 0)
                {
                    if (!System.IO.File.Exists(filepath))
                    {
                        using (var stream = new FileStream(filepath, FileMode.Create))
                        {
                            image.CopyTo(stream);
                        }
                    }

                    string json = JsonSerializer.Serialize(new
                    {
                        type = type,
                        registration = registration,
                        service = service,
                        image = image.FileName
                    });

                    TempData["json"] = json;
                    return RedirectToAction("AddVehicle");
                }
                else
                {
                    return RedirectToAction("AddVehicle");
                }
            }
            return RedirectToAction("AddVehicle");
        }

        public IActionResult EditVehicle(string vehicle)
        {
            var vehicleJson = JsonSerializer.Deserialize<Vehicle>(vehicle);
            return View(vehicleJson);
        }

        public IActionResult updateVehicle(string type, string registration, string service, IFormFile image)
        {
            if (type != null && registration != null && service != null && type.Length > 0 && registration.Length > 0 && service.Length > 0)
            {
                if (image != null && image.Length > 0)
                {
                    string basedir = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Images", "Vehicle");
                    Directory.CreateDirectory(basedir);

                    string filepath = Path.Combine(basedir, image.FileName);
                    if (!System.IO.File.Exists(filepath))
                    {
                        using (var stream = new FileStream(filepath, FileMode.Create))
                        {
                            image.CopyTo(stream);
                        }
                    }
                }

                string json = JsonSerializer.Serialize(new
                {
                    type = type,
                    registration = registration,
                    service = service,
                    image = image?.FileName
                });

                TempData["json"] = json;
                return RedirectToAction("EditVehicle", "Home", new { Vehicle = json });
            }
            else
            {
                return RedirectToAction("EditVehicle");
            }
        }

        public IActionResult saveBooking(string fullName, string phone, string datetime, string reason, string vehicle, string driver, string address, string driverName, string vehicleType, string driverImage, string vehicleImage)
        {
            string guid = Guid.NewGuid().ToString();
            string[] dates = datetime.Split(" ");
            var json = JsonSerializer.Serialize(new
            {
                guid = guid,
                date = dates[0],
                time = dates[1],
                address = address,
                driverImage = driverImage,
                driverName = driverName,
                phone = driver,
                vehicleImage = vehicleImage,
                type = vehicleType,
                registration = vehicle,
                sos = false
            });

            TempData["json"] = json;
            return RedirectToAction("Book");
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
