import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Pencil, Trash } from "lucide-react";
import { Link } from "react-router-dom";

function BookingCard(props) {
  return (
    <Card className="transform transition duration-300 hover:scale-105">
      <CardHeader>
        <CardTitle>{props.booking.service.name}</CardTitle>
        <CardDescription>{props.booking.dateTime}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{props.booking.name}</p>
        <p>{props.booking.address}</p>
      </CardContent>
      <CardFooter className="gap-x-4">
        <div className="flex justify-end w-full">
          <div className="flex gap-6">
          <Pencil
              className="cursor-pointer text-green-700"
              onClick={(e) => {
                e.preventDefault(); 
                props.onEdit(props.booking._id);
              }}
            />
            <Trash
              className="cursor-pointer text-red-500"
              onClick={(e) => {
                e.preventDefault();
                props.onDelete(props.booking._id);
              }}
            />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default BookingCard;