import { DatePickerDemo } from "@/components/ui/datePicker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { DateTimePicker24hForm } from "@/components/ui/date-time-picker";
import { BiChevronDown } from "react-icons/bi";
import classNames from "classnames";
import { Button } from "@/components/ui/button";

function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  console.log(data);
}

const handleDateChange = (selectedDate) => {
  setDate(selectedDate);
  const formattedDate = format(selectedDate, "yyyy-MM-dd");
  fetchPredictions(formattedDate);
  calculateWeekRange(selectedDate);
};

function AddBooking() {
  const [date, setDate] = useState(new Date());
  const [services, setServices] = useState([
    "Deep Cleaning",
    "Carpet Cleaning",
    "Window Cleaning",
    "Upholstery Cleaning"
  ]);
  const [selectedService, setSelectedService] = useState(null);
  const [isSelecterOpened, setIsSelecterOpened] = useState(false);

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setIsSelecterOpened(false);
  };

  return (
    <div className="flex justify-center">
      <form className="w-2/3 py-8 flex flex-col gap-y-8" onSubmit={handleSubmit}>
      <h2>Add Booking</h2>
        <Label>Name</Label>
        <Input></Input>
        <Label>Address</Label>
        <Input></Input>
        <Label>Enter your date & time (24h)</Label>
        <DateTimePicker24hForm />
        <Label>Service Type</Label>

        <div className="w-auto font-normal h-80">
          <div
            className="bg-white w-full p-2 flex items-center justify-between border rounded cursor-pointer"
            onClick={() => setIsSelecterOpened(!isSelecterOpened)}
          >
            <span>{selectedService ?? 'Select Service'}</span>
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
                key={service}
                className={classNames({
                  "p-2 text-sm hover:bg-gray-200 hover:text-black ": true,
                  "bg-gray-100 text-black ": service === selectedService,
                })}
                onClick={() => handleServiceClick(service)}
              >
                {service}
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
