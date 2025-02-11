import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
const formatTime = (timeString: string) => {
  const [hours, minutes] = timeString.split(":");
  const formattedHours = Number(hours) % 12 || 12;
  const formattedMinutes = minutes;
  const period = Number(hours) < 12 ? "AM" : "PM";
  return `${formattedHours}:${formattedMinutes} ${period}`;
};
const ViewSlots = () => {
  const { slots, setSlots } = useAuth();
  const handleDeleteSlot = async (id: string) => {
    const response = await fetch(`http://localhost:3001/staff/slot/${id}`, {
      method: "DELETE",
    });
    const result = await response.json();
    if (result.status) {
      toast.success(result.message);
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:3001/staff/slots");
          const result = await response.json();
          if (result.status) {
            setSlots(result.slots);
          } else {
            console.log(result.message);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="overflow-auto my-5 max-h-80 p-2">
      <table className="min-w-full border relative">
        <thead className="bg-white border-b sticky -top-3">
          <tr>
            <th className="text-sm font-medium text-gray-900 p-3 text-left">
              #
            </th>
            <th className="text-sm font-medium text-gray-900 p-3 text-left">
              Label
            </th>
            <th className="text-sm font-medium text-gray-900 p-3 text-left">
              Start Time
            </th>
            <th className="text-sm font-medium text-gray-900 p-3 text-left">
              End Time
            </th>
            <th className="text-sm font-medium text-gray-900 p-3 text-left">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {slots &&
            slots.length > 0 &&
            slots.map(
              (
                slot: {
                  _id: string;
                  staffId: string;
                  label: string;
                  start_time: string;
                  end_time: string;
                },
                index
              ) => (
                <tr
                  key={slot._id}
                  className="odd:bg-gray-100 even:bg-gray-300 border-b "
                >
                  <td className="text-sm text-gray-900 font-light p-3 whitespace-nowrap">
                    {index + 1}
                  </td>
                  <td className="text-sm text-gray-900 font-light p-3 whitespace-nowrap">
                    {slot.label}
                  </td>
                  <td className="text-sm text-gray-900 font-light p-3 whitespace-nowrap">
                    {formatTime(slot.start_time)}
                  </td>
                  <td className="text-sm text-gray-900 font-light p-3 whitespace-nowrap">
                    {formatTime(slot.end_time)}
                  </td>
                  <td className="text-sm text-gray-900 font-light p-3 whitespace-nowrap">
                    <img
                      onClick={() => handleDeleteSlot(slot._id)}
                      src="../../../public/images/trash-can.svg"
                      className="w-6 cursor-pointer"
                    />
                  </td>
                </tr>
              )
            )}
        </tbody>
      </table>
    </div>
  );
};
export default ViewSlots;
