import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";
import { DateTimePicker24hForm } from "@/components/ui/date-time-picker";
import { BiChevronDown } from "react-icons/bi";
import classNames from "classnames";
import { Button } from "@/components/ui/button";
import { getServices } from "@/lib/api/services";
import { createBooking } from "@/lib/api/bookings";
import Swal from "sweetalert2";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

function AddBooking() {
  const { isLoaded, isSignedIn, user } = useAuth();
  const [date, setDate] = useState(new Date());
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [isSelecterOpened, setIsSelecterOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getServices()
      .then((data) => {
        setIsError(false);
        setServices(data);
      })
      .catch((error) => {
        setIsError(true);
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleServiceClick = (service) => {
    setSelectedService(service.name);
    setFormData({ ...formData, service: service._id }); // Store the _id
    setIsSelecterOpened(false);
  };

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    dateTime: "",
    service: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.name || !formData.address || !formData.dateTime || !formData.service) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Fields',
        text: 'Please fill all fields before submitting.',
      });
      return;
    }

    try {
      createBooking({
        name: formData.name,
        address: formData.address,
        dateTime: formData.dateTime,
        service: formData.service,
      });
      Swal.fire({
        icon: 'success',
        title: 'Booking Submitted!',
        text: 'Your job booking has been submitted successfully.',
        timer: 3000, 
        showConfirmButton: false,
      }).then(() => {
        navigate("/");
      });

      setFormData({
        name: "",
        address: "",
        dateTime: "",
        service: "",
      });

    } catch (error) {
      console.error(error);
    }
    console.log(formData);
  };

  if (!isSignedIn) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <div className="flex justify-center">
      <form className="w-2/3 py-8 flex flex-col gap-y-8" onSubmit={handleSubmit}>
        <h2>Add Booking</h2>
        <Label>Name</Label>
        <Input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />

        <Label>Address</Label>
        <Input
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        />

        <Label>Enter your date & time (24h)</Label>
        <DateTimePicker24hForm
          selectedDate={formData.dateTime}
          onDateTimeChange={(date) => setFormData({ ...formData, dateTime: date })}
        />

        <Label>Service Type</Label>

        <div className="w-auto font-normal h-80">
          <div
            className="bg-white w-full p-2 flex items-center justify-between border rounded cursor-pointer"
            onClick={() => setIsSelecterOpened(!isSelecterOpened)}
          >
            <span>{selectedService ?? "Select Service"}</span>
            <BiChevronDown size={20} className={classNames({ "rotate-180": isSelecterOpened })} />
          </div>

          <ul
            className={classNames({
              "bg-gray-50 mt-2 overflow-y-auto max-h-0": true,
              "max-h-60": isSelecterOpened,
            })}
          >
            {services.map((service) => (
              <li
                key={service._id}
                className={classNames({
                  "p-2 text-sm hover:bg-gray-200 hover:text-black ": true,
                  "bg-gray-100 text-black ": service.name === selectedService,
                })}
                onClick={() => handleServiceClick(service)}
              >
                {service.name}
              </li>
            ))}
          </ul>
          <Button className="mt-6">Submit</Button>
        </div>
      </form>
    </div>
  );
}

export default AddBooking;
