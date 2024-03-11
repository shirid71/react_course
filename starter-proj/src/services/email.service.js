import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const emailService = {
    query,
    save,
    remove,
    getById,
    createEmail,
    getDefaultFilter,
    getNextEmail
}

const STORAGE_KEY = 'emails'

_createEmails()

async function query(filterBy) {
    let emails = await storageService.query(STORAGE_KEY)
    if (filterBy) {
        console.log("FILTER is SET and is: ",filterBy)
        return _filterBy(emails, filterBy)
    }
    return emails
}


function getById(id) {
    const email = storageService.get(STORAGE_KEY, id)
    email.isRead = true
    save(email)
    return email
}

function remove(id) {
    return storageService.remove(STORAGE_KEY, id)
}

function save(emailToSave) {
    if (emailToSave.id) {
        return storageService.put(STORAGE_KEY, emailToSave)
    } else {
        emailToSave.isOn = false
        return storageService.post(STORAGE_KEY, emailToSave)
    }
}

function getDefaultFilter() {
    return {
        // isRead: false
    }
}

function createEmail(id, subject = 'test', body = 'testing', 
isRead = false, isStarred= false, sentAt = new Date(), removedAt=null,
from = 'xxx@gmail.com', to='yyy@gmail.com') {
    return {
        id,
        subject,
        body,
        isRead,
        isStarred,
        sentAt,
        removedAt,
        from,
        to
    }
}

function _createEmails() {
    let emails = utilService.loadFromStorage(STORAGE_KEY)
    if (!emails || !emails.length) {
        emails = [
            _createSampleMail("id1", "test1", "testing emails id1"),
            _createSampleMail("id2", "test2", "testing emails id2"),
            _createSampleMail("id3", "test3", "testing emails id3"),
            _createSampleMail("id4", "test4", "testing emails id4"),
            _createSampleMail("id5", "test5", "testing emails id5"),
            _createSampleMail("id6", "test6", "testing emails id6"),
            _createSampleMail("id7", "test7", "testing emails id7"),
            _createSampleMail("id8", "test8", "testing emails id8"),
        ]
        utilService.saveToStorage(STORAGE_KEY, emails)
    }
}

async function getNextEmail(mailId) {
    const emails = await storageService.query(STORAGE_KEY)
    const currentId = emails.findIndex(item => item.id === mailId);
  // If the current ID is not found or it's the last item in the list, return null
  if (currentId === -1 || currentId === emails.length - 1) 
    return null;
    // Otherwise, return the ID of the next object in the list
  return emails[currentId + 1].id;
  }

function _createSampleMail (id, subject, body) {

    const from = generateRandomEmail()
    return {
        id:id,
        subject: subject,
        body: `${body} from ${from}`,
        isRead:getRandomAnswer(true, false),
        isStarred: getRandomAnswer(true, false),
        sentAt : new Date(),
        removedAt: null, //for later use
        from: from,
        to: generateRandomEmail()
    }
}


function getRandomAnswer(option1, option2) {
    // Generate a random number between 0 and 1
    const randomNum = Math.random();
  
    // If the random number is less than 0.5, return option1, otherwise return option2
    if (randomNum < 0.5) {
      return option1;
    } else {
      return option2;
    }
  }


  function generateRandomEmail() {
    // Array of possible characters for the username part of the email
    const usernameChars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    
    // Generate a random username of length 8
    let username = '';
    for (let i = 0; i < 8; i++) {
      username += usernameChars.charAt(Math.floor(Math.random() * usernameChars.length));
    }
    
    // Array of common email domains
    const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com'];
    
    // Choose a random domain from the array
    const domain = domains[Math.floor(Math.random() * domains.length)];
    
    // Concatenate username and domain to form the email address
    const email = username + '@' + domain;
    
    return email;
  }

  function _filterBy(emails, filterBy) {
    let { isRead, isStarred, subject, body, sentAt, from, to } = filterBy
    let status
    if(isRead === undefined || isRead === '')
        status = ''
    else
        status = isRead ? 'read' : 'unread'

    switch (status) {
        case 'read':
            emails = emails.filter(email => email.isRead)
            break;
        case 'unread':
            emails = emails.filter(email => !email.isRead)
            break
        default:
            emails = emails
    }
    //sanitize removed emails
    emails = emails?.filter(email => email.removedAt == undefined )
    if(subject)
        return  emails?.filter(email => email.subject.toLowerCase().includes(subject.toLowerCase()))
    return emails
}

