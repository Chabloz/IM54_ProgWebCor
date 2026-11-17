import { getNode, getNodes, cloneTemplate, forEach, on } from './utils/dom.js';
import { strToDate, dateToFrCh, dateToHours } from './utils/date.js';
import { schedules } from './utils/schedule.js';

function isAfterNow(event) {
  return strToDate(event.end) > new Date();
}

function compare(event1, event2) {
  return event1.start.localeCompare(event2.start);
}

function loadSchedule(classId) {
  const xmlDom = schedules[classId];
  const events = getNodes('VEVENT', xmlDom);
  const courses = [];
  for (const event of events) {
    const start = getNode('DTSTART', event)?.textContent ?? '';
    const end = getNode('DTEND', event)?.textContent ?? '';
    const course = getNode('SUMMARY', event)?.textContent ?? '';
    const room = getNode('LOCATION', event)?.textContent ?? '';
    courses.push({start, end, course, room});
  }
  const coursesFutur = courses.filter(isAfterNow);
  const coursesOrdered = coursesFutur.toSorted(compare);
  return coursesOrdered;
}

function makeDom(courses) {
  const nodes = [];
  for (const course of courses) {
    const tmpl = cloneTemplate('#course-template');
    console.log(course.start);
    getNode('.date', tmpl).textContent = dateToFrCh(strToDate(course.start));
    getNode('.start', tmpl).textContent = dateToHours(strToDate(course.start));
    getNode('.end', tmpl).textContent = dateToHours(strToDate(course.end));
    getNode('.course', tmpl).textContent = course.course;
    getNode('.room', tmpl).textContent = course.room;
    nodes.push(tmpl);
  }
  getNode('#schedule').replaceChildren(...nodes);
}

function switchTheme() {
 const theme = getNode('body').dataset.theme;
 const themeNew = theme === 'light' ? 'dark' : 'light';
 getNode('body').dataset.theme = themeNew;
 localStorage.setItem('theme', themeNew);
}

function loadDefaultTheme() {
  if (localStorage.getItem('theme')) {
    getNode('body').dataset.theme = localStorage.getItem('theme');
    return;
  }

  const themeOs = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  localStorage.setItem('theme', themeOs);
  getNode('body').dataset.theme = themeOs;
}

on('.btn-schedule', 'click', (el) => {
  forEach('.btn-schedule', el => el.classList.remove('selected'));
  el.classList.add('selected');
  const courses = loadSchedule(el.dataset.classId);
  makeDom(courses);
});

on('#theme-toggle', 'click', switchTheme);
loadDefaultTheme();



