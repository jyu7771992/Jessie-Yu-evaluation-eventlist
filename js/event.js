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
