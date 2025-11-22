import { format } from "date-fns";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  Timestamp,
  updateDoc,
} from "./firebase";
import { getFirebaseServices, firebaseEnabled } from "./firebase";

export const collections = {
  users: "Users",
  inbox: "InboxDocuments",
  events: "Events",
  conversations: "Conversations",
  vault: "VaultFiles",
};

export type EventItem = {
  id?: string;
  title: string;
  date: string;
  priority: "haute" | "normale" | "basse";
  relatedDocId?: string;
  createdAt?: string;
};

export const fetchEvents = async (userId?: string): Promise<EventItem[]> => {
  if (!firebaseEnabled || !userId) {
    return [
      {
        id: "sample-1",
        title: "Déclaration d'impôts",
        date: format(new Date().setDate(new Date().getDate() + 5), "yyyy-MM-dd"),
        priority: "haute",
        createdAt: new Date().toISOString(),
      },
      {
        id: "sample-2",
        title: "Renouvellement passeport",
        date: format(new Date().setDate(new Date().getDate() + 20), "yyyy-MM-dd"),
        priority: "normale",
        createdAt: new Date().toISOString(),
      },
    ];
  }
  const { db } = getFirebaseServices();
  const q = query(
    collection(db, collections.events),
    orderBy("date", "asc"),
  );
  const snap = await getDocs(q);
  return snap.docs
    .filter((d) => d.data().userId === userId)
    .map((d) => ({ id: d.id, ...(d.data() as EventItem) }));
};

export const addEvent = async (userId: string, payload: EventItem) => {
  if (!firebaseEnabled) return payload;
  const { db } = getFirebaseServices();
  await addDoc(collection(db, collections.events), {
    ...payload,
    userId,
    createdAt: Timestamp.now(),
  });
};

export const deleteEvent = async (eventId: string) => {
  if (!firebaseEnabled) return;
  const { db } = getFirebaseServices();
  await deleteDoc(doc(db, collections.events, eventId));
};

export const updateEvent = async (eventId: string, payload: Partial<EventItem>) => {
  if (!firebaseEnabled) return;
  const { db } = getFirebaseServices();
  await updateDoc(doc(db, collections.events, eventId), payload);
};
