// //initialize svg img
// const editImg = ` <svg
//     focusable='false'
//     aria-hidden='true'
//     viewBox='0 0 24 24'
//     data-testid='EditIcon'
//     aria-label='fontSize small'
//   >
//     <path d='M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z'></path>
//   </svg>`;
// const deleteImg = ` <svg
//     focusable='false'
//     aria-hidden='true'
//     viewBox='0 0 24 24'
//     data-testid='DeleteIcon'
//     aria-label='fontSize small'
//   >
//     <path d='M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z'></path>
//   </svg>`;
// const saveImg = `<svg
//     focusable='false'
//     aria-hidden='true'
//     viewBox='0 0 24 24'
//     xmlns='http://www.w3.org/2000/svg'
//   >
//     <path d='M21,20V8.414a1,1,0,0,0-.293-.707L16.293,3.293A1,1,0,0,0,15.586,3H4A1,1,0,0,0,3,4V20a1,1,0,0,0,1,1H20A1,1,0,0,0,21,20ZM9,8h4a1,1,0,0,1,0,2H9A1,1,0,0,1,9,8Zm7,11H8V15a1,1,0,0,1,1-1h6a1,1,0,0,1,1,1Z' />
//   </svg>`;
// const cancelImg = `<svg
//     focusable='false'
//     aria-hidden='true'
//     viewBox='0 0 32 32'
//     version='1.1'
//     xmlns='http://www.w3.org/2000/svg'
//   >
//     <path d='M19.587 16.001l6.096 6.096c0.396 0.396 0.396 1.039 0 1.435l-2.151 2.151c-0.396 0.396-1.038 0.396-1.435 0l-6.097-6.096-6.097 6.096c-0.396 0.396-1.038 0.396-1.434 0l-2.152-2.151c-0.396-0.396-0.396-1.038 0-1.435l6.097-6.096-6.097-6.097c-0.396-0.396-0.396-1.039 0-1.435l2.153-2.151c0.396-0.396 1.038-0.396 1.434 0l6.096 6.097 6.097-6.097c0.396-0.396 1.038-0.396 1.435 0l2.151 2.152c0.396 0.396 0.396 1.038 0 1.435l-6.096 6.096z'></path>
//   </svg>`;
// const addImg = ` <svg
//     focusable
//     viewBox='0 0 24 24'
//     aria-hidden='true'
//     xmlns='http://www.w3.org/2000/svg'
//   >
//     <path
//       d='M12 6V18M18 12H6'
//       stroke='#FFFFFF'
//       stroke-width='4'
//       stroke-linecap='round'
//       stroke-linejoin='round'
//     />
//   </svg>`;

const API_URL = 'http://localhost:3000/event';

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
    this.addEvent = document.querySelector('.add-event');
    this.tableBodyList = document.querySelector('.tableBodyList');
  }

  //render events
  renderEvents(events) {
    //console.log(events);
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
    <th scope="row">
      <p class="event-text-name open">${event.eventName}</p>
      <input type="text" class="input-event-name close" value="${event.eventName}"/>
    </th>
    <td class>
      <p class="event-text-start open">${event.startDate}</p>
      <input class="start-date-input close" type="date" id="start-time" name="meeting-time" value="${event.startDate}"/>
    </td>
    <td>
      <p class="event-text-end open">${event.endDate}</p>
      <input class="end-date-input close" type="date" id="end-time" name="meeting-time" value="${event.endDate}"/>
    </td>
    <td>
      <button class="btn-add close"></button>
      <button class="btn-edit open"></button>
      <button class="btn-save close"></button>
      <button class="btn-delete open"></button>
      <button class="btn-cancel close"></button>
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

  //fix issues:Done
  setUpDeleteEvent() {
    //event delegation
    this.view.tableBodyList.addEventListener('click', async (e) => {
      const elem = e.target;
      if (elem.classList.contains('btn-delete')) {
        const eventElem = elem.parentElement.parentElement;
        const deleteId = eventElem.id;
        await eventAPIs.deleteEvent(deleteId);
        this.model.deleteEvent(deleteId);
        this.view.removeEventElem(deleteId);
      }
    });
  }
  //fix issues:Done
  setUpAddEvent() {
    this.view.addEvent.addEventListener('click', async () => {
      //get the current element
      const newEventElem = document.createElement('tr');
      newEventElem.classList.add('row');
      newEventElem.innerHTML = `
      <th scope="row">
      <p class="event-text-name close"></p>
      <input type="text" class="input-event-name" /></th>
      <td>
        <p class="event-text-start close"></p>
        <input type="date" class="start-date-input" name="meeting-time" />
      </td>
      <td>
      <p class="event-text-end close"></p>
        <input type="date" class="end-date-input" name="meeting-time" />
      </td>
      <td>
        <button class="btn-add open"></button>
        <button class="btn-edit close"></button>
        <button class="btn-save close"></button>
        <button class="btn-delete close"></button>
        <button class="btn-cancel open"></button>
      </td>
      `;
      //add the new event item
      this.view.tableBodyList.appendChild(newEventElem);

      //click save button
      const addBtn = newEventElem.querySelector('.btn-add');
      addBtn.addEventListener('click', async () => {
        //get all className of inputs
        const eventNameInput = newEventElem.querySelector('.input-event-name');
        const startDateInput = newEventElem.querySelector('.start-date-input');
        const endDateInput = newEventElem.querySelector('.end-date-input');

        const eventName = eventNameInput.value.trim();
        const startDate = startDateInput.value;
        const endDate = endDateInput.value;
        //check if the start date and the end date sis not a valid range
        if (eventName !== null || startDate !== null || endDate !== null) {
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
            return;
          } else {
            const newEvent = await eventAPIs.addEvent({
              eventName,
              startDate,
              endDate,
            });
            this.model.addEvent(newEvent);
            this.view.renderNewEvent(newEvent);
          }

          newEventElem.remove();
        } else {
          alert('The input could not be blank!');
          return;
        }
      });
    });
  }
  //fix issues:Done
  setUpSaveEvent() {
    this.view.tableBodyList.addEventListener('click', async (e) => {
      const element = e.target;
      if (element.classList.contains('btn-save')) {
        const eventElem = element.closest('tr');
        const elementID = eventElem.getAttribute('id'); //revise DOM manipulation
        const eventNameInput = eventElem.querySelector('.input-event-name');
        const startDateInput = eventElem.querySelector('.start-date-input');
        const endDateInput = eventElem.querySelector('.end-date-input');

        const updateNameVal = eventNameInput
          ? eventNameInput.value.trim()
          : null;
        const updateStartVal = startDateInput ? startDateInput.value : null;
        const updateEndVal = endDateInput ? endDateInput.value : null;

        if (
          updateNameVal !== null &&
          updateStartVal !== null &&
          updateEndVal !== null
        ) {
          await eventAPIs.editEvent(elementID, {
            eventName: updateNameVal,
            startDate: updateStartVal,
            endDate: updateEndVal,
          });
          //fix issues: check the input is valid and is not null
          if (eventNameInput !== null) {
            const eventNameTxt = document.querySelector('.event-text-name');
            eventNameTxt.textContent = updateNameVal;
            eventNameInput.classList.remove('open');
            eventNameInput.classList.add('close');
            eventNameTxt.classList.remove('close');
            eventNameTxt.classList.add('open');
          }
          //fix issues: check the start date and the end date is valid and is not null
          if (startDateInput !== null && endDateInput !== null) {
            const startDateText = document.querySelector('.event-text-start');
            startDateText.textContent = updateStartVal;
            startDateText.classList.remove('close');
            startDateText.classList.add('open');
            startDateInput.classList.remove('open');
            startDateInput.classList.add('close');

            const endDateText = document.querySelector('.event-text-end');
            endDateText.textContent = updateEndVal;
            endDateText.classList.remove('close');
            endDateText.classList.add('open');
            endDateInput.classList.remove('open');
            endDateInput.classList.add('close');
          }
        } else {
          alert('The input could not be blank!');
          return;
        }
      }
    });
  }
  //fix issues:Done
  setUpEditEvent() {
    this.view.tableBodyList.addEventListener('click', async (e) => {
      const element = e.target;
      if (element.classList.contains('btn-edit')) {
        const eventElem = element.closest('tr');
        console.log(eventElem);
        //define the action buttons open or close
        const eventNameText = eventElem.querySelector('.event-text-name');
        const eventNameInput = eventElem.querySelector('.input-event-name');
        eventNameText.classList.remove('open');
        eventNameText.classList.add('close');
        eventNameInput.classList.remove('close');
        eventNameInput.classList.add('open');

        const startDateText = eventElem.querySelector('.event-text-start');
        const startDateInput = eventElem.querySelector('.start-date-input');
        startDateText.classList.remove('open');
        startDateText.classList.add('close');
        startDateInput.classList.remove('close');
        startDateInput.classList.add('open');

        const endDateText = eventElem.querySelector('.event-text-end');
        const endDateInput = eventElem.querySelector('.end-date-input');
        endDateText.classList.remove('open');
        endDateText.classList.add('close');
        endDateInput.classList.remove('close');
        endDateInput.classList.add('open');

        const saveBtn = eventElem.querySelector('.btn-save');
        saveBtn.classList.remove('close');
        saveBtn.classList.add('open');
        const editBtn = eventElem.querySelector('.btn-edit');
        editBtn.classList.remove('open');
        editBtn.classList.add('close');

        e.target.classList.add('open');
      }
    });
  }
}

const eventsViews = new EventsView();
const eventsModels = new EventsModel();
const eventsControllers = new EventsController(eventsViews, eventsModels);
