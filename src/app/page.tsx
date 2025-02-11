
import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect immediately from "/" to "/public"
  redirect('/public');
}
