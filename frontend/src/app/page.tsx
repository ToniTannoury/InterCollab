import Carousel from "@/components/Carousel";
import { cookies } from 'next/headers';
import SearchUserInput from "@/components/SearchUserInput";
import BottomHomeComponent from "@/components/BottomHomeComponent";
import RoomCard from "@/components/RoomCard";
import TopRooms from "@/components/TopRooms";

interface UserData {
  id: number;
  username: string;
}

interface RoomData {
  id: number;
  name: string;
}

export async function getUser(): Promise<UserData | undefined> {
  try {
    const token = cookies().get('token');

    if (!token) {
      return undefined;
    }

    const res = await fetch("http://16.171.116.7:5000/api/users/me", {
      headers: {
        "Authorization": `Bearer ${token!.value}`
      }
    });

    if (!res.ok) {
      return undefined;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export async function getTop5RoomsByTotalParticipants(): Promise<RoomData[]> {
  try {
    const token = cookies().get('token');

    if (!token) {
      return [];
    }

    const res = await fetch("http://localhost:5000/api/rooms/getTop5RoomsByTotalParticipants", {
      headers: {
        "Authorization": `Bearer ${token!.value}`
      }
    });

    if (!res.ok) {
      return [];
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function Home() {
  const user = await getUser();
  const rooms = await getTop5RoomsByTotalParticipants();

  return (
    <div>
      <div className="flex flex-col my-3">
        <h1 className="month-header text-3xl font-extrabold text-center text-ICblue">
          Rooms Of The Month
        </h1>
        <h4 className="font-base text-gray-600 text-center mb-3">Check out the most attended or viewed rooms</h4>
      </div>
      <div>
        <TopRooms />
      </div>
      <div className="flex gap-10">
        <BottomHomeComponent />
      </div>
    </div>
  );
}
