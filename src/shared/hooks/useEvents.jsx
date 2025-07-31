import { useState, useEffect } from 'react';
import { getMyEvents, createEvent, updateEvent, deleteEvent } from '../../services/api';

export const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await getMyEvents();
      setEvents(response.data.events || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const create = async (data) => {
    const res = await createEvent(data);
    await fetchEvents();
    return res;
  };

  const update = async (id, data) => {
    await updateEvent(id, data);
    await fetchEvents();
  };

  const remove = async (id) => {
    await deleteEvent(id);
    await fetchEvents();
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return { events, loading, create, update, remove };
};