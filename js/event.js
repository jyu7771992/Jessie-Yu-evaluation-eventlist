//initialize svg img
const editImg = ` <svg
    focusable='false'
    aria-hidden='true'
    viewBox='0 0 24 24'
    data-testid='EditIcon'
    aria-label='fontSize small'
  >
    <path d='M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z'></path>
  </svg>`;
const deleteImg = ` <svg
    focusable='false'
    aria-hidden='true'
    viewBox='0 0 24 24'
    data-testid='DeleteIcon'
    aria-label='fontSize small'
  >
    <path d='M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z'></path>
  </svg>`;
const saveImg = `<svg
    focusable='false'
    aria-hidden='true'
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='M21,20V8.414a1,1,0,0,0-.293-.707L16.293,3.293A1,1,0,0,0,15.586,3H4A1,1,0,0,0,3,4V20a1,1,0,0,0,1,1H20A1,1,0,0,0,21,20ZM9,8h4a1,1,0,0,1,0,2H9A1,1,0,0,1,9,8Zm7,11H8V15a1,1,0,0,1,1-1h6a1,1,0,0,1,1,1Z' />
  </svg>`;
const cancelImg = `<svg
    focusable='false'
    aria-hidden='true'
    viewBox='0 0 32 32'
    version='1.1'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='M19.587 16.001l6.096 6.096c0.396 0.396 0.396 1.039 0 1.435l-2.151 2.151c-0.396 0.396-1.038 0.396-1.435 0l-6.097-6.096-6.097 6.096c-0.396 0.396-1.038 0.396-1.434 0l-2.152-2.151c-0.396-0.396-0.396-1.038 0-1.435l6.097-6.096-6.097-6.097c-0.396-0.396-0.396-1.039 0-1.435l2.153-2.151c0.396-0.396 1.038-0.396 1.434 0l6.096 6.097 6.097-6.097c0.396-0.396 1.038-0.396 1.435 0l2.151 2.152c0.396 0.396 0.396 1.038 0 1.435l-6.096 6.096z'></path>
  </svg>`;
const addImg = ` <svg
    focusable
    viewBox='0 0 24 24'
    aria-hidden='true'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M12 6V18M18 12H6'
      stroke='#FFFFFF'
      stroke-width='4'
      stroke-linecap='round'
      stroke-linejoin='round'
    />
  </svg>`;

const API_URL = 'http://localhost:3000/event';

// document.addEventListener('DOMContentLoaded', async () => {
//   const EventModel = new EventsModel();
//   const events = await EventModel.fetchEvents();
//   renderEvents(events);
// });

// const addEvent = document.getElementById('add-event-btn');
// addEvent.addEventListener('click', addNewRow);

// function addNewRow() {
//   const tableBodyList = document.getElementById('tableBodyList');
//   const row = document.createElement('tr');
//   row.setAttribute('id', `123`);
//   const nameCell = document.createElement('th');
//   nameCell.innerHTML = `
//       <p class="close"></p>
//       <input class="open" type="text" id="name" name="name" />
//       `;
//   const startCell = document.createElement('td');
//   startCell.innerHTML = `
//       <p class="close"></p>
//       <input class="open" type="date" id="start-time" name="start-date" />
//       `;
//   const endCell = document.createElement('td');
//   endCell.innerHTML = `
//   <p class="close"></p>
//   <input class="open" type="date" id="end-time" name="end-date" />
//   `;
//   //add actions cell:add, edit, and delete
//   const actionsCell = document.createElement('td');
//   const addButton = document.createElement('button');
//   addButton.classList.add('btn-add');
//   addButton.innerHTML = addImg;

//   //edit
//   const editButton = document.createElement('button');
//   editButton.classList.add('btn-edit close');
//   editButton.innerHTML = editImg;
//   editButton.addEventListener('click', () => {
//     // Implement edit functionality here
//     console.log('edit');
//   });

//   //delete
//   const deleteButton = document.createElement('button');
//   deleteButton.classList.add('btn-delete close');
//   deleteButton.innerHTML = deleteImg;
//   deleteButton.addEventListener('click', () => {
//     // Delete row
//     row.remove();
//   });
//   const saveButton = document.createElement('button');
//   saveButton.classList.add('btn-save');
//   saveButton.innerHTML = saveImg;
//   saveButton.addEventListener('click', () => {
//     // Delete row
//     row.remove();
//   });

//   actionsCell.appendChild(addButton);
//   actionsCell.appendChild(editButton);
//   actionsCell.appendChild(deleteButton);

//   row.appendChild(nameCell);
//   row.appendChild(startCell);
//   row.appendChild(endCell);
//   row.appendChild(actionsCell);
//   tableBodyList.appendChild(row);
// }

// json server has to be in a different folder

const eventAPIs = (function () {
  const API_URL = 'http://localhost:3000/events';

  async function getEvents() {
    return fetch(API_URL).then((res) => res.json());
  }

  //add
  async function addEvent(newEvent) {
    return fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEvent),
    })
      .then((res) => res.json())
      .then((event) => console.log(event));
  }

  //edit
  async function editEvent(id, updatedData) {
    return fetch(`${API_URL}/${id}`, {
      //json-server : making a PATCH Request to Update Data
      //https://www.dhiwise.com/post/how-to-use-json-server-in-frontend-development
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then((event) => console.log(event)); //check the data
  }

  //delete
  async function deleteEvent(id) {
    return fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then(() => console.log('event deleted'));
  }

  return {
    getEvents,
    addEvent,
    editEvent,
    deleteEvent,
  };
})();

//View
class EventsView {
  constructor() {
    this.addEvent = document.getElementById('add-event-btn');
    this.tableBodyList = document.querySelector('.tableBodyList');
  }

  //render events
  renderEvents(events) {
    console.log(events);
    this.tableBodyList.innerHTML = ''; //clear it first
    //delete the redundant code
    events.map((event) => {
      this.renderNewEvent(event);
    });
  }

  removeEventElem(id) {
    document.getElementById(id).remove();
  }

  renderNewEvent(newEvent) {
    this.tableBodyList.appendChild(this.createEventElement(newEvent));
  }

  createEventElement(event) {
    //create the new element
    const eventRow = document.createElement('tr');
    eventRow.classList.add('row');
    eventRow.setAttribute('id', event.id);
    //instead of using insert row, changing innerHTML instead
    eventRow.innerHTML = `
    <th>${event.eventName}</th>
    <td class>
      <p class="event-start-date-text">${event.startDate}</p>
      <input class="close" type="date" id="start-time" name="meeting-time" value="${event.startDate}"/>
    </td>
    <td>
    <p class="event-end-date-text">${event.endDate}</p>
      <input class="close" type="date" id="end-time" name="meeting-time" value="${event.endDate}"/>
    </td>
    <td>
      <button id="edit" class="btn-edit open">${editImg}</button>
      <button id="save" class="btn-add close">${saveImg}</button>
      <button id="btn-delete" class="btn-delete open">${deleteImg}</button>
      <button id="btn-cancel" class="btn-cancel close">${cancelImg}</button>
    </td>
  `;
    return eventRow;
  }
}

//Model
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
    this.#events = this.#events.filter((event) => event.id !== id);
  }
}

//controller
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
    this.setUpAddEvent();
    this.setUpSaveEvent();
    this.setUpDeleteEvent();
    this.setUpEditEvent();
  }

  async fetchEvents() {
    const events = await eventAPIs.getEvents();
    this.model.setEvents(events);
    this.view.renderEvents(events);
  }

  setUpDeleteEvent() {
    //event delegation
    this.view.tableBodyList.addEventListener('click', async (e) => {
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

  setUpAddEvent() {
    this.view.addEvent.addEventListener('click', async () => {
      const newEventElem = document.createElement('tr');
      newEventElem.innerHTML = `
      <th><input type="text" class="input-event-name"></th>
      <td class>
        <p class="close"></p>
        <input type="date" id="new-start-time" name="meeting-time" />
      </td>
      <td>
      <p class="close"></p>
        <input type="date" id="new-end-time" name="meeting-time" />
      </td>
      <td>
        <button type="submit" class="new-edit-btn close">${editImg}</button>
        <button type="submit" class="new-save-btn open">${saveImg}</button>
        <button class="new-delete-btn close">${deleteImg}</button>
        <button class="new-cancel-btn open">${cancelImg}</button>
      </td>
      `;
      //add the new event item
      this.view.eventList.appendChild(newEventElem);

      //click save button
      const saveBtn = newEventElem.querySelector('.new-save-btn');
      saveBtn.addEventListener('click', async () => {
        const eventNameInput = newEventElem.querySelector('.new-event-name');
        const startDateInput = newEventElem.querySelector('.new-start-time');
        const endDateInput = newEventElement.querySelector('.new-end-time');

        const eventName = eventNameInput.value.trim();
        const startDate = startDateInput.value;
        const endDate = endDateInput.value;

        if (eventName == null || startDate == null || endDate == null) {
          alert('The input could not be blank!');
          return;
        }

        //check if the start date and the end date sis not a valid range
        let splitStart = startDate.split('-');
        let splitEnd = endDate.split('-');

        let fromDate = Date.parse(
          Date.parse(splitStart[0], splitStart[1] - 1, splitStart[2])
        );
        let toDate = Date.parse(
          Date.parse(splitEnd[0], splitEnd[1] - 1, splitEnd[2])
        );

        if (fromDate < toDate) {
          alert(
            'The end date of the event cannot be earlier than the start date.'
          );
        }

        const newEvent = await eventAPIs.addEvent({
          eventName,
          startDate,
          endDate,
        });
        this.model.addEvent(newEvent);
        this.view.renderNewEvent(newEvent);
        newEventElement.remove();
      });
    });
  }

  setUpSaveEvent() {
    this.view.tableBodyList.addEventListener('submit', async (e) => {
      e.preventDefault();
      const element = e.target;
      //if(element.classList)
      const elementID = element.getElementById('id');
      const input = this.view.eventInput;
      const eventName = input.value;
      if (!eventName) {
        return;
      }

      const newEvent = await eventAPIs.addEvent({
        eventName,
      });

      this.model.addEvent(newEvent);
      this.view.renderNewEvent(newEvent);
      this.view.clearInput();
    });
  }

  setUpEditEvent() {
    this.view.tableBodyList.addEventListener('click', async (e) => {
      const element = e.target;
      if (element.classList.contains('edit-event-btn')) {
        const eventElem = elem.closest('tr');

        const eventNameText = eventElem.querySelector('.event-name-text');
        const eventNameInput = eventElem.querySelector('.event-name-input');
        eventNameText.style.display = 'none';
        eventNameInput.style.display = '';

        const startDateText = eventElem.querySelector('.start-date-text');
        const startDateInput = eventElem.querySelector('.start-date-input');
        startDateText.style.display = 'none';
        startDateInput.style.display = '';

        const endDateText = eventElem.querySelector('.end-date-text');
        const endDateInput = eventElem.querySelector('.end-date-input');
        endDateText.style.display = 'none';
        endDateInput.style.display = '';

        eventElem.querySelector('.save-event-btn').style.display = '';
        // elem.style.display = 'none';
        e.target.style.display = 'none';
      }
    });
  }
}

const eventsViews = new EventsView();
const eventsModels = new EventsModel();
const eventsControllers = new EventsController(eventsViews, eventsModels);
