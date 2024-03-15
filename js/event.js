//img place
const editImg = `<svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="EditIcon" aria-label="fontSize small"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>`;
const deleteImg = `<svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="DeleteIcon" aria-label="fontSize small"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>`;
const saveImg = `<svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21,20V8.414a1,1,0,0,0-.293-.707L16.293,3.293A1,1,0,0,0,15.586,3H4A1,1,0,0,0,3,4V20a1,1,0,0,0,1,1H20A1,1,0,0,0,21,20ZM9,8h4a1,1,0,0,1,0,2H9A1,1,0,0,1,9,8Zm7,11H8V15a1,1,0,0,1,1-1h6a1,1,0,0,1,1,1Z"/></svg>`;
const cancelImg = `<svg focusable="false" aria-hidden="true" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M19.587 16.001l6.096 6.096c0.396 0.396 0.396 1.039 0 1.435l-2.151 2.151c-0.396 0.396-1.038 0.396-1.435 0l-6.097-6.096-6.097 6.096c-0.396 0.396-1.038 0.396-1.434 0l-2.152-2.151c-0.396-0.396-0.396-1.038 0-1.435l6.097-6.096-6.097-6.097c-0.396-0.396-0.396-1.039 0-1.435l2.153-2.151c0.396-0.396 1.038-0.396 1.434 0l6.096 6.097 6.097-6.097c0.396-0.396 1.038-0.396 1.435 0l2.151 2.152c0.396 0.396 0.396 1.038 0 1.435l-6.096 6.096z"></path></svg>`;
const addImg = `<svg focusable viewBox="0 0 24 24" aria-hidden="true xmlns="http://www.w3.org/2000/svg"><path d="M12 6V18M18 12H6" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

// json server has to be in a different folder

const eventAPIs = (function () {
  const API_URL = 'http://localhost:3000/event';

  async function getEvents() {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  }

  //add
  async function addEvent(newEvent) {
    return fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEvent),
    }).then((res) => res.json());
  }

  //edit
  async function editEvent(id) {
    return fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEvent),
    }).then((res) => res.json());
  }

  //delete
  async function deleteEvent(id) {
    return fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    }).then((res) => res.json());
  }

  return {
    getEvents,
    addEvent,
    editEvent,
    deleteEvent,
  };
})();

class EventsView {
  constructor() {
    this.table = document.querySelector('.tableBody');
    this.eventInput = document.querySelector('#new-event');
    this.eventstart = document.querySelector('#new-event-start');
    this.eventEnd = document.querySelector('#new-event-end');
    this.eventEdit = document.querySelector('.event-list');
    this.eventDelete = document.querySelector('.event-list');
    this.eventDelete = document.querySelector('.event-list');
    this.eventDelete = document.querySelector('.event-list');
  }

  clearInput() {
    this.eventInput.value = '';
    this.eventStart.value = '';
    this.eventEnd.value = '';
  }
  //render
  renderTable(events) {
    const tableBody = document.getElementById('tableBody');
    events.forEach((event) => {
      const row = document.createElement('tr');
      row.setAttribute('id', `${event.id}`);
      const nameCell = document.createElement('th');
      idCell.textContent = event.eventName;
      const startCell = document.createElement('td');
      startCell.innerHTML = `
      <p class="open">${event.startDate}</p>
      <input class="close" type="date" id="start-time" name="meeting-time" />
      `;
      const endCell = document.createElement('td');
      endCell.textContent = event.endDate;
      //add actions cell:add, edit, and delete
      const actionsCell = document.createElement('td');
      const addButton = document.createElement('button');
      addButton.textContent = addImg;
      addButton.classList.add('btn-add');

      //edit
      const editButton = document.createElement('button');
      editButton.textContent = editImg;
      editButton.classList.add('btn-edit');
      editButton.addEventListener('click', () => {
        // Implement edit functionality here
        console.log('edit');
      });

      //delete
      const deleteButton = document.createElement('button');
      deleteButton.textContent = deleteImg;
      deleteButton.classList.add('btn-delete');
      deleteButton.addEventListener('click', () => {
        // Delete row
        row.remove();
      });

      actionsCell.appendChild(addButton);
      actionsCell.appendChild(editButton);
      actionsCell.appendChild(deleteButton);

      row.appendChild(nameCell);
      row.appendChild(titleCell);
      row.appendChild(actionsCell);
      tableBody.appendChild(row);
    });
  }

  removeEventElem(id) {
    document.getElementById(id).remove();
  }

  renderNewEvent(newEvent) {
    this.EventList.appendChild(this.createEventElement(newEvent));
  }

  createEventElement(event) {
    const table = document.getElementById('table-container');
    var newRow = table.insertRow();
    newRow.setAttribute('id', event.id);
    newRow.innerHTML = `<tr>
    <th>event name</th>
    <form>
    <td class>
      <input type="date" id="start-time" name="meeting-time" />
    </td>
    <td>
      <input type="date" id="end-time" name="meeting-time" />
    </td>
    <td>
      <button type="submit" id="submit" class="edit close">${editImg}</button>
      <button type="submit" id="save" class="submit open">${saveImg}</button>
      <button id="btn-delete" class="delete close">${deleteImg}</button>
      <button id="btn-delete" class="cancel open">${cancelImg}</button>
    </form>
    </td>
  </tr>`;
    return eventElement;
  }
}

class EventsModel {
  #events;
  constructor(events = []) {
    this.#events = events;
  }

  getEvents() {
    return this.#events;
  }

  setEvents(newEvents) {
    this.#events = newEvents;
  }

  addEvent(newEvent) {
    this.#events.push(newEvent);
  }

  deleteEvent(id) {
    this.#events = this.#events.filter((Event) => Event.id !== id);
  }
}

class EventsController {
  constructor(view, model) {
    this.view = view;
    this.model = model;
    this.init();
  }

  init() {
    this.setUpEvents();
    this.fetchEvents();
  }

  setUpEvents() {
    this.setUpSubmitEvent();
    this.setUpDeleteEvent();
  }

  async fetchEvents() {
    const events = await eventAPIs.getEvents();
    this.model.setEvents(events);
    this.view.renderEvents(events);
  }

  setUpDeleteEvent() {
    //event delegation
    this.view.eventList.addEventListener('click', async (e) => {
      const elem = e.target;
      if (elem.classList.contains('event-delete-btn')) {
        const eventElem = elem.parentElement.parentElement;
        const deleteId = eventElem.id;
        await eventAPIs.deleteEvent(deleteId);
        this.model.deleteEvent(deleteId);
        this.view.removeEventElem(deleteId);
      }
    });
  }

  setUpSubmitEvent() {
    this.view.newEventForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const input = this.view.eventInput;
      const eventName = input.value;
      if (!eventName) {
        return;
      }

      const newEvent = await eventAPIs.addEvent({
        eventName,
      });
      this.model.addEvent(newEvent);
      //   console.log(this.model.getEvents());
      this.view.renderNewEvent(newEvent);
      this.view.clearInput();
    });
  }
}

const EventsViews = new EventsView();
const EventsModels = new EventsModel();
const EventsControllers = new EventsController(EventsViews, EventsModels);
