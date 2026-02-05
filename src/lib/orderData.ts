import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function fetchOrderData() {
  const pathname = typeof window !== "undefined" ? window.location.pathname : "";
  const orderId = pathname.startsWith("/") ? pathname.slice(1) : pathname;

  if (!orderId) {
    console.log("fetchOrderData: no orderId found in pathname");
    return null;
  }

  try {
    const docRef = doc(db, "submissions", orderId);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const data = snap.data();
      console.log("Fetched order data:", data);
      return data;
    }
    console.log("No document found for orderId:", orderId);
    return null;
  } catch (error) {
    console.error("Error fetching order data:", error);
    throw error;
  }
}
