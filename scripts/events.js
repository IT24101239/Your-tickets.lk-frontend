// Base URL for API endpoints
const baseUrl = 'http://localhost:8080';

// Model class for Event
class Event {
  constructor(id, name, description, startDateTime, endDateTime, venue, price, imageUrl) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.startDateTime = startDateTime;
    this.endDateTime = endDateTime;
    this.venue = venue;
    this.price = price;
    this.imageUrl = imageUrl;
  }
  static fromJSON(json) {
    return new Event(
      json.id,
      json.name,
      json.description,
      json.startDateTime,
      json.endDateTime,
      json.venue,
      json.price,
      json.imageUrl
    );
  }
}

// Render the list of event cards in the container with id "events-container"
function renderEventsList(events) {
  const container = document.getElementById('events-container');
  if (!container) return;
  container.innerHTML = events
    .map(event => `
      <div class="bg-white rounded shadow overflow-hidden">
        <img src="${event.imageUrl}" alt="${event.name}" class="w-full h-48 object-cover">
        <div class="p-4">
          <h3 class="font-bold text-xl mb-2">${event.name}</h3>
          <p class="text-gray-600 text-sm mb-2">${new Date(event.startDateTime).toLocaleDateString()}</p>
          <p class="text-gray-600 text-sm mb-2">${event.venue}</p>
          <p class="text-gray-800 font-semibold">${event.price ? `$${event.price}` : 'Free'}</p>
          <a href="events.html?id=${event.id}" class="mt-2 inline-block text-primary hover:underline">View Details</a>
        </div>
      </div>
    `)
    .join('');
}

// Fetch all events
function fetchAllEvents() {
  fetch(`${baseUrl}/api/events`)
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(events => {
      console.log('All events:', events);
      renderEventsList(events);
      // ...code to update the UI with events...
    })
    .catch(error => {
      console.error('Error fetching events:', error);
    });
}

// Fetch an event by ID with an optional callback to update the UI
function fetchEventById(id, callback) {
  fetch(`${baseUrl}/api/events/${id}`)
    .then(response => {
      if (!response.ok) throw new Error('Error fetching event by ID');
      return response.json();
    })
    .then(data => {
      const event = Event.fromJSON(data);
      console.log('Event details:', event);
      if (callback) callback(event);
    })
    .catch(error => {
      console.error('Error fetching event by ID:', error);
    });
}

// Create a new event
function createEvent(eventData) {
  fetch(`${baseUrl}/api/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(eventData)
  })
    .then(response => {
      if (!response.ok) throw new Error('Error creating event');
      return response.json();
    })
    .then(newEventData => {
      const newEvent = Event.fromJSON(newEventData);
      console.log('Event created:', newEvent);
      // ...code to add new event to the UI...
    })
    .catch(error => {
      console.error('Error creating event:', error);
    });
}

// Update an existing event by ID
function updateEvent(id, eventData) {
  fetch(`${baseUrl}/api/events/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(eventData)
  })
    .then(response => {
      if (!response.ok) throw new Error('Error updating event');
      return response.json();
    })
    .then(updatedEventData => {
      const updatedEvent = Event.fromJSON(updatedEventData);
      console.log('Event updated:', updatedEvent);
      // ...code to update the event in the UI...
    })
    .catch(error => {
      console.error('Error updating event:', error);
    });
}

// Delete an event by ID
function deleteEvent(id) {
  // Add confirmation alert
  if (!confirm("Are you sure you want to delete this event?")) return;
  fetch(`${baseUrl}/api/events/${id}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (!response.ok) throw new Error('Error deleting event');
      console.log(`Event with id ${id} deleted successfully.`);
      // Reload the page after deletion
      window.location.reload();
    })
    .catch(error => {
      console.error('Error deleting event:', error);
    });
}

// Function to update the page with the event details (using the Event model)
function updateEventDetails(event) {
  const imageEl = document.getElementById('event-image');
  const dateEl = document.getElementById('event-date');
  const timeEl = document.getElementById('event-time');
  const titleEl = document.getElementById('event-title');
  const venueEl = document.getElementById('event-venue');
  const descEl = document.getElementById('event-description');
  const priceEl = document.getElementById('event-price');

  if (imageEl) imageEl.src = event.imageUrl;
  if (dateEl) dateEl.innerText = new Date(event.startDateTime).toLocaleDateString();
  if (timeEl) timeEl.innerText = new Date(event.startDateTime).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
  if (titleEl) titleEl.innerText = event.name;
  if (venueEl) venueEl.innerText = event.venue;
  if (descEl) descEl.innerText = event.description;
  if (priceEl) priceEl.innerText = event.price ? `$${event.price}` : '';
}

// On DOMContentLoaded, check for both event details and events container
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('event-image')) {
    const params = new URLSearchParams(window.location.search);
    const eventId = params.get('id');
    if (eventId) {
      fetchEventById(eventId, updateEventDetails);
    }
  }
  if (document.getElementById('events-container')) {
    fetchAllEvents();
  }
});