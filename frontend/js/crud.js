// crud.js - This should be linked in your HTML file

// Base API URL
const API_BASE_URL = 'http://localhost:5000/api'; // Update with your backend URL

// DOM Elements
const eventsTable = document.getElementById('eventsTable');
const createEventForm = document.getElementById('createEventForm');
const updateEventForm = document.getElementById('updateEventForm');
const saveEventBtn = document.getElementById('saveEventBtn');
const updateEventSaveBtn = document.getElementById('updateEventSaveBtn');
const readEventsBtn = document.getElementById('readEventsBtn');
const updateEventBtn = document.getElementById('updateEventBtn');
const deleteEventBtn = document.getElementById('deleteEventBtn');

// Selected event ID
let selectedEventId = null;

// Token management (if you're using authentication)
let authToken = localStorage.getItem('token');

// =============== Event Handlers ===============

// Load events when page loads
document.addEventListener('DOMContentLoaded', loadEvents);

// Read Events button
readEventsBtn.addEventListener('click', loadEvents);

// Save new event
saveEventBtn.addEventListener('click', createEvent);

// Update event
updateEventSaveBtn.addEventListener('click', updateSelectedEvent);

// Delete event
deleteEventBtn.addEventListener('click', deleteSelectedEvent);

// Select event from table
eventsTable.addEventListener('click', (e) => {
    if (e.target.classList.contains('select-event')) {
        const row = e.target.closest('tr');
        selectedEventId = row.dataset.id;
        updateEventBtn.disabled = false;
        deleteEventBtn.disabled = false;
        
        // Highlight selected row
        document.querySelectorAll('#eventsTable tr').forEach(r => {
            r.classList.remove('table-primary');
        });
        row.classList.add('table-primary');
    }
    
    if (e.target.classList.contains('edit-event')) {
        const row = e.target.closest('tr');
        selectedEventId = row.dataset.id;
        populateUpdateForm(row);
    }
});

// =============== API Functions ===============

// Load all events
async function loadEvents() {
    try {
        const response = await fetch(`${API_BASE_URL}/events`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch events');
        }
        
        const events = await response.json();
        renderEventsTable(events);
    } catch (error) {
        console.error('Error loading events:', error);
        alert('Error loading events. Please try again.');
    }
}

// Create new event
async function createEvent() {
    const eventData = {
        title: document.getElementById('eventName').value,
        description: document.getElementById('eventDescription').value,
        category: document.getElementById('eventCategory').value,
        event_date: document.getElementById('eventDate').value,
        location: document.getElementById('eventLocation').value,
        image_url: document.getElementById('eventImage').value || null
    };

    try {
        const response = await fetch(`${API_BASE_URL}/events`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(eventData)
        });
        
        if (!response.ok) {
            throw new Error('Failed to create event');
        }
        
        const newEvent = await response.json();
        
        // Close modal and reset form
        bootstrap.Modal.getInstance(document.getElementById('createEventModal')).hide();
        createEventForm.reset();
        
        // Reload events
        loadEvents();
        
        alert('Event created successfully!');
    } catch (error) {
        console.error('Error creating event:', error);
        alert('Error creating event. Please try again.');
    }
}

// Update event
async function updateSelectedEvent() {
    if (!selectedEventId) return;

    const eventData = {
        title: document.getElementById('updateEventName').value,
        description: document.getElementById('updateEventDescription').value,
        category: document.getElementById('updateEventCategory').value,
        event_date: document.getElementById('updateEventDate').value,
        location: document.getElementById('updateEventLocation').value,
        image_url: document.getElementById('updateEventImage').value || null
    };

    try {
        const response = await fetch(`${API_BASE_URL}/events/${selectedEventId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(eventData)
        });
        
        if (!response.ok) {
            throw new Error('Failed to update event');
        }
        
        // Close modal and reset form
        bootstrap.Modal.getInstance(document.getElementById('updateEventModal')).hide();
        updateEventForm.reset();
        
        // Reload events
        loadEvents();
        
        alert('Event updated successfully!');
    } catch (error) {
        console.error('Error updating event:', error);
        alert('Error updating event. Please try again.');
    }
}

// Delete event
async function deleteSelectedEvent() {
    if (!selectedEventId || !confirm('Are you sure you want to delete this event?')) return;

    try {
        const response = await fetch(`${API_BASE_URL}/events/${selectedEventId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to delete event');
        }
        
        // Reset selection
        selectedEventId = null;
        updateEventBtn.disabled = true;
        deleteEventBtn.disabled = true;
        
        // Reload events
        loadEvents();
        
        alert('Event deleted successfully!');
    } catch (error) {
        console.error('Error deleting event:', error);
        alert('Error deleting event. Please try again.');
    }
}

// Get single event details
async function getEventDetails(eventId) {
    try {
        const response = await fetch(`${API_BASE_URL}/events/${eventId}`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch event details');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error fetching event details:', error);
        return null;
    }
}

// =============== Helper Functions ===============

// Render events in the table
function renderEventsTable(events) {
    const tbody = eventsTable.querySelector('tbody');
    tbody.innerHTML = '';
    
    events.forEach(event => {
        const row = document.createElement('tr');
        row.dataset.id = event.id;
        
        row.innerHTML = `
            <td>${event.id}</td>
            <td>${event.title}</td>
            <td>${event.category}</td>
            <td>${new Date(event.event_date).toLocaleDateString()}</td>
            <td>${event.location}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary select-event me-2">Select</button>
                <button class="btn btn-sm btn-outline-warning edit-event" data-bs-toggle="modal" data-bs-target="#updateEventModal">Edit</button>
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

// Populate update form with selected event data
async function populateUpdateForm(row) {
    const eventId = row.dataset.id;
    const event = await getEventDetails(eventId);
    
    if (event) {
        document.getElementById('updateEventId').value = event.id;
        document.getElementById('updateEventName').value = event.title;
        document.getElementById('updateEventDescription').value = event.description;
        document.getElementById('updateEventCategory').value = event.category;
        document.getElementById('updateEventDate').value = event.event_date.split('T')[0]; // Format date for input
        document.getElementById('updateEventLocation').value = event.location;
        document.getElementById('updateEventImage').value = event.image_url || '';
    }
}