import { storageService } from '../../../services/storage-service.js'
import { utilService } from '../../../services/util-service.js'


export const EmailService = {
    query,
    removeEmail,
    getNextEmailId,
    getEmailById,
    saveToStorage,
    addSentEmail,
    getEmails,
    saveToDrafts,
    setReadState,
    saveToSentEmails,
    genQuery,
    queryFolderFilter,
    moveEmailToBin,
    setStarredState
}
const KEY = 'emailsDB'

let emailsData = getEmails()

const filterBy = {
    folder: 'inbox/sent/trash/draft',
    txt: '',
    isRead: true,
    isStared: true,
    labels: ['important', 'romantic']
}

function query() {
    return new Promise((resolve, reject) => {
        emailsData = _loadFromStorage(KEY)
        let emailSequenceNum = _loadFromStorage(KEY)
        if (!emailsData) {
            if (!emailSequenceNum) {
                emailSequenceNum = 100
            } else {
                parseInt(emailSequenceNum)
            }
            emailsData = createEmails(emailSequenceNum)
            console.log('emails from query', emailsData)
        }
        resolve(emailsData)
    })
}


function queryFolderFilter(filterBy, folder) {
    return new Promise((resolve, reject) => {
        emailsData = _loadFromStorage(KEY)
        let emailSequenceNum = _loadFromStorage(KEY)
        if (!emailsData) {
            if (!emailSequenceNum) {
                emailSequenceNum = 100
            }
            else {
                parseInt(emailSequenceNum)
            }
            emailsData = createEmails(emailSequenceNum)

            if (folder) {
                emailsData = emailsData.filter(email => emailsData.folder === folder)
            }

            if (filterBy) {
                let { folder } = filterBy
                emails = emails.filter(email =>
                    emailsData.folder.toLowerCase().includes(folder.toLowerCase()))
            }
            resolve(emailsData)
        }
    })
}

function genQuery(searchTerm, whereToSearch, searchFields = undefined) {
    return new Promise((resolve, reject) => {
        try {
            let data = _loadFromStorage(whereToSearch.toString() + 'DB')
            if (!data) {
                resolve([])
            }
            else {
                resolve(data.filter(datum => (datum.body && datum.body.includes(searchTerm)) ||
                    (datum.info && datum.info.title && datum.info.title.includes(searchTerm))))
            }
        }
        catch (error) {
            reject(error)
        }
    })
}

function createEmails(emailSequenceNum) {
    const emails = []
    for (let i = 0; i < emailsData.length; i++) {
        if (!emailsData) return emailsData
        else emails.push(_createEmail(emailsData[i], emailSequenceNum))
        emailSequenceNum++
        console.log('emailsData', emailsData[i])
    }
    saveToStorage('emailSeqNumDB', emailSequenceNum)
    return emails
}

function _createEmail(email, emailSequenceNum) {
    return {
        email: {
            id: `e${emailSequenceNum}`,
            sender: 'Someone Someday',
            from: 'name@gmail.com',
            subject: utilService.makeLorem(size = 15),
            body: utilService.makeLorem(size = 100),
            isRead: false,
            sentAt: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            sentTime: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            sentDate: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            starred: false,
            isLabeled: false,
            sentEmail: 'user@appsus.com',
            fullName: 'Mahatma Appsus',
            sentTo: 'momo@momo.com',
            folder: 'inbox/sent/bin/draft'
        }
    }
}

function getEmailById(emailId) {
    let emails = _loadFromStorage(KEY)
    if (!emails) {
        emails = emailsData
    }
    const index = emails.findIndex(email => email.id === emailId)
    return Promise.resolve(emails[index])
}

function removeEmail(emailId) {
    emailsData = _loadFromStorage(KEY)
    emailsData = emailsData.filter(email => email.id !== emailId)
    saveToStorage(KEY, emailsData)
    return Promise.resolve()
}

function moveEmailToBin(emailId) {
    emailsData = _loadFromStorage(KEY)
    const index = emailsData.findIndex(email => email.id === emailId)
    emailsData[index].folder = 'bin'
    return Promise.resolve(emailsData)
}

function getNextEmailId(emailId) {
    const emails = _loadFromStorage(KEY)
    const emailIdx = emails.findIndex(email => emailId === email.id)
    const nextEmailIdx = (emailIdx + 1 === emails.length) ? 0 : emailIdx + 1
    return emails[nextEmailIdx].id
}

function addSentEmail() {
    let emails = _loadFromStorage(KEY)
    const email = _createEmail(emailsData.id, emailsData.subject, emailsData.body, emailsData.sender, emailsData.sentAt)
    emails = [email, ...emailsData]
    return Promise.resolve(emails)
}

function saveToDrafts(email) {
    let idx = getEmailById(email.id)
    if (idx !== -1) {
        emailsData.splice(idx, 1)
    }
    emailsData.push(email)
    return emailsData;
}

function setReadState(emails) {
    // storageService.saveToStorage(KEY, emails)
    return Promise.resolve()
}

function setStarredState(emails) {
    // storageService.saveToStorage(KEY, emails)
    return Promise.resolve()
}

function saveToStorage(key, value) {
    storageService.saveToStorage(key, value)
}

function _loadFromStorage(key) {
    return storageService.loadFromStorage(key)
}

function saveToSentEmails(emails, email) {
    return new Promise((resolve, reject) => {
        emails.push(email)
        // storageService.saveToStorage(KEY, emails)
        resolve(emails)
    })
}

function getEmails() {
    let storage = _loadFromStorage(KEY)
    if (storage) return storage
    else {
        let emails = [{
            id: 'e100',
            sender: utilService.makeLoremSmall(2),
            from: utilService.createRandEmailAddress(),
            subject: 'Miss you!',
            body: "going out is fun",
            isRead: false,
            sentAt: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            sentTime: Date.now(),
            sentDate: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            starred: false,
            isLabeled: false,
            sentEmail: 'user@appsus.com',
            fullName: 'Mahatma Appsus',
            sentTo: 'momo@momo.com',
            folder: 'inbox'
        },
        {
            id: 'e101',
            sender: utilService.makeLoremSmall(2),
            from: utilService.createRandEmailAddress(),
            subject: 'Miss you!',
            body: "doron is cool",
            isRead: false,
            sentAt: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            sentTime: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            sentDate: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            starred: false,
            isLabeled: false,
            sentEmail: 'user@appsus.com',
            fullName: 'Mahatma Appsus',
            sentTo: 'momo@momo.com',
            folder: 'sent'
        },
        {
            id: 'e102',
            sender: utilService.makeLoremSmall(2),
            from: utilService.createRandEmailAddress(),
            subject: 'Miss you!',
            body: "coding acadmey rules!",
            isRead: false,
            sentAt: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            sentTime: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            sentDate: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            starred: false,
            isLabeled: false,
            sentEmail: 'user@appsus.com',
            fullName: 'Mahatma Appsus',
            sentTo: 'momo@momo.com',
            folder: 'sent'
        },
        {
            id: 'e103',
            sender: utilService.makeLoremSmall(2),
            from: utilService.createRandEmailAddress(),
            subject: 'Miss you!',
            body: "starred coding acadmey rules!",
            isRead: false,
            sentAt: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            sentTime: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            sentDate: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            starred: true,
            isLabeled: false,
            sentEmail: 'user@appsus.com',
            fullName: 'Mahatma Appsus',
            sentTo: 'momo@momo.com',
            folder: 'starred'
        },
        {
            id: 'e104',
            sender: utilService.makeLoremSmall(2),
            from: utilService.createRandEmailAddress(),
            subject: 'Miss you!',
            body: "draft coding acadmey rules!",
            isRead: false,
            sentAt: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            sentTime: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            sentDate: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            starred: false,
            isLabeled: false,
            sentEmail: 'user@appsus.com',
            fullName: 'Mahatma Appsus',
            sentTo: 'momo@momo.com',
            folder: 'drafts'
        },
        {
            id: 'e105',
            sender: utilService.makeLoremSmall(2),
            from: utilService.createRandEmailAddress(),
            subject: 'Miss you!',
            body: "important coding acadmey rules!",
            isRead: false,
            sentAt: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            sentTime: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            sentDate: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            starred: false,
            isLabeled: false,
            sentEmail: 'user@appsus.com',
            fullName: 'Mahatma Appsus',
            sentTo: 'momo@momo.com',
            folder: 'important'
        },
        {
            id: 'e106',
            sender: utilService.makeLoremSmall(2),
            from: utilService.createRandEmailAddress(),
            subject: 'Miss you!',
            body: "bin coding acadmey rules!",
            isRead: false,
            sentAt: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            sentTime: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            sentDate: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            starred: false,
            isLabeled: false,
            sentEmail: 'user@appsus.com',
            fullName: 'Mahatma Appsus',
            sentTo: 'momo@momo.com',
            folder: 'bin'
        },
        {
            id: 'e107',
            sender: utilService.makeLoremSmall(2),
            from: utilService.createRandEmailAddress(),
            subject: 'Miss you!',
            body: "going out is fun",
            isRead: false,
            sentAt: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            sentTime: Date.now(),
            sentDate: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            starred: false,
            isLabeled: false,
            sentEmail: 'user@appsus.com',
            fullName: 'Mahatma Appsus',
            sentTo: 'momo@momo.com',
            folder: 'inbox'
        },
        {
            id: 'e108',
            sender: utilService.makeLoremSmall(2),
            from: utilService.createRandEmailAddress(),
            subject: utilService.makeLoremMedium(5),
            body: utilService.makeLoremLarge(50),
            isRead: false,
            sentAt: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            sentTime: Date.now(),
            sentDate: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            starred: false,
            isLabeled: false,
            sentEmail: 'user@appsus.com',
            fullName: 'Mahatma Appsus',
            sentTo: utilService.createRandEmailAddress(),
            folder: 'inbox'
        },
        {
            id: 'e109',
            sender: utilService.makeLoremSmall(2),
            from: utilService.createRandEmailAddress(),
            subject: utilService.makeLoremMedium(5),
            body: utilService.makeLoremLarge(50),
            isRead: false,
            sentAt: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            sentTime: Date.now(),
            sentDate: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            starred: false,
            isLabeled: false,
            sentEmail: 'user@appsus.com',
            fullName: 'Mahatma Appsus',
            sentTo: utilService.createRandEmailAddress(),
            folder: 'inbox'
        },
        {
            id: 'e110',
            sender: utilService.makeLoremSmall(2),
            from: utilService.createRandEmailAddress(),
            subject: utilService.makeLoremMedium(5),
            body: utilService.makeLoremLarge(50),
            isRead: false,
            sentAt: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            sentTime: Date.now(),
            sentDate: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            starred: false,
            isLabeled: false,
            sentEmail: 'user@appsus.com',
            fullName: 'Mahatma Appsus',
            sentTo: utilService.createRandEmailAddress(),
            folder: 'inbox'
        },
        {
            id: 'e111',
            sender: utilService.makeLoremSmall(2),
            from: utilService.createRandEmailAddress(),
            subject: utilService.makeLoremMedium(5),
            body: utilService.makeLoremLarge(50),
            isRead: false,
            sentAt: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            sentTime: Date.now(),
            sentDate: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            starred: false,
            isLabeled: false,
            sentEmail: 'user@appsus.com',
            fullName: 'Mahatma Appsus',
            sentTo: utilService.createRandEmailAddress(),
            folder: 'inbox'
        },
        {
            id: 'e112',
            sender: utilService.makeLoremSmall(2),
            from: utilService.createRandEmailAddress(),
            subject: utilService.makeLoremMedium(5),
            body: utilService.makeLoremLarge(50),
            isRead: false,
            sentAt: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            sentTime: Date.now(),
            sentDate: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            starred: false,
            isLabeled: false,
            sentEmail: 'user@appsus.com',
            fullName: 'Mahatma Appsus',
            sentTo: utilService.createRandEmailAddress(),
            folder: 'inbox'
        },
        {
            id: 'e113',
            sender: utilService.makeLoremSmall(2),
            from: utilService.createRandEmailAddress(),
            subject: utilService.makeLoremMedium(5),
            body: utilService.makeLoremLarge(50),
            isRead: false,
            sentAt: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            sentTime: Date.now(),
            sentDate: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            starred: false,
            isLabeled: false,
            sentEmail: 'user@appsus.com',
            fullName: 'Mahatma Appsus',
            sentTo: utilService.createRandEmailAddress(),
            folder: 'sent'
        },
        {
            id: 'e114',
            sender: utilService.makeLoremSmall(2),
            from: utilService.createRandEmailAddress(),
            subject: utilService.makeLoremMedium(5),
            body: utilService.makeLoremLarge(50),
            isRead: false,
            sentAt: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            sentTime: Date.now(),
            sentDate: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            starred: false,
            isLabeled: false,
            sentEmail: 'user@appsus.com',
            fullName: 'Mahatma Appsus',
            sentTo: utilService.createRandEmailAddress(),
            folder: 'inbox'
        },
        {
            id: 'e115',
            sender: utilService.makeLoremSmall(2),
            from: utilService.createRandEmailAddress(),
            subject: utilService.makeLoremMedium(5),
            body: utilService.makeLoremLarge(50),
            isRead: true,
            sentAt: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            sentTime: Date.now(),
            sentDate: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            starred: false,
            isLabeled: false,
            sentEmail: 'user@appsus.com',
            fullName: 'Mahatma Appsus',
            sentTo: utilService.createRandEmailAddress(),
            folder: 'sent'
        },
        {
            id: 'e116',
            sender: utilService.makeLoremSmall(2),
            from: utilService.createRandEmailAddress(),
            subject: utilService.makeLoremMedium(5),
            body: utilService.makeLoremLarge(50),
            isRead: true,
            sentAt: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            sentTime: Date.now(),
            sentDate: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            starred: false,
            isLabeled: false,
            sentEmail: 'user@appsus.com',
            fullName: 'Mahatma Appsus',
            sentTo: utilService.createRandEmailAddress(),
            folder: 'drafts'
        },
        {
            id: 'e117',
            sender: utilService.makeLoremSmall(2),
            from: utilService.createRandEmailAddress(),
            subject: utilService.makeLoremMedium(5),
            body: utilService.makeLoremLarge(50),
            isRead: false,
            sentAt: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            sentTime: Date.now(),
            sentDate: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            starred: false,
            isLabeled: false,
            sentEmail: 'user@appsus.com',
            fullName: 'Mahatma Appsus',
            sentTo: utilService.createRandEmailAddress(),
            folder: 'starred'
        },
        {
            id: 'e118',
            sender: utilService.makeLoremSmall(2),
            from: utilService.createRandEmailAddress(),
            subject: utilService.makeLoremMedium(5),
            body: utilService.makeLoremLarge(50),
            isRead: true,
            sentAt: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            sentTime: Date.now(),
            sentDate: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            starred: false,
            isLabeled: false,
            sentEmail: 'user@appsus.com',
            fullName: 'Mahatma Appsus',
            sentTo: utilService.createRandEmailAddress(),
            folder: 'bin'
        },
        {
            id: 'e119',
            sender: utilService.makeLoremSmall(2),
            from: utilService.createRandEmailAddress(),
            subject: utilService.makeLoremMedium(5),
            body: utilService.makeLoremLarge(50),
            isRead: false,
            sentAt: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            sentTime: Date.now(),
            sentDate: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            starred: false,
            isLabeled: false,
            sentEmail: 'user@appsus.com',
            fullName: 'Mahatma Appsus',
            sentTo: utilService.createRandEmailAddress(),
            folder: 'important'
        },
        {
            id: 'e120',
            sender: utilService.makeLoremSmall(2),
            from: utilService.createRandEmailAddress(),
            subject: utilService.makeLoremMedium(5),
            body: utilService.makeLoremLarge(50),
            isRead: true,
            sentAt: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            sentTime: Date.now(),
            sentDate: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            starred: false,
            isLabeled: false,
            sentEmail: 'user@appsus.com',
            fullName: 'Mahatma Appsus',
            sentTo: utilService.createRandEmailAddress(),
            folder: 'sent'
        },
        {
            id: 'e121',
            sender: utilService.makeLoremSmall(2),
            from: utilService.createRandEmailAddress(),
            subject: 'Miss you!',
            body: "doron is cool",
            isRead: false,
            sentAt: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            sentTime: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            sentDate: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            starred: false,
            isLabeled: false,
            sentEmail: 'user@appsus.com',
            fullName: 'Mahatma Appsus',
            sentTo: 'momo@momo.com',
            folder: 'sent'
        },
        {
            id: 'e122',
            sender: utilService.makeLoremSmall(2),
            from: utilService.createRandEmailAddress(),
            subject: 'Miss you!',
            body: "coding acadmey rules!",
            isRead: false,
            sentAt: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            sentTime: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            sentDate: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            starred: false,
            isLabeled: false,
            sentEmail: 'user@appsus.com',
            fullName: 'Mahatma Appsus',
            sentTo: 'momo@momo.com',
            folder: 'sent'
        },
        {
            id: 'e123',
            sender: utilService.makeLoremSmall(2),
            from: utilService.createRandEmailAddress(),
            subject: 'Miss you!',
            body: "starred coding acadmey rules!",
            isRead: false,
            sentAt: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            sentTime: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            sentDate: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            starred: true,
            isLabeled: false,
            sentEmail: 'user@appsus.com',
            fullName: 'Mahatma Appsus',
            sentTo: 'momo@momo.com',
            folder: 'starred'
        },
        {
            id: 'e124',
            sender: utilService.makeLoremSmall(2),
            from: utilService.createRandEmailAddress(),
            subject: 'Miss you!',
            body: "draft coding acadmey rules!",
            isRead: false,
            sentAt: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            sentTime: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            sentDate: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            starred: false,
            isLabeled: false,
            sentEmail: 'user@appsus.com',
            fullName: 'Mahatma Appsus',
            sentTo: 'momo@momo.com',
            folder: 'drafts'
        },
        {
            id: 'e125',
            sender: utilService.makeLoremSmall(2),
            from: utilService.createRandEmailAddress(),
            subject: 'Miss you!',
            body: "important coding acadmey rules!",
            isRead: false,
            sentAt: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            sentTime: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            sentDate: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            starred: false,
            isLabeled: false,
            sentEmail: 'user@appsus.com',
            fullName: 'Mahatma Appsus',
            sentTo: 'momo@momo.com',
            folder: 'important'
        },
        {
            id: 'e126',
            sender: utilService.makeLoremSmall(2),
            from: utilService.createRandEmailAddress(),
            subject: 'Miss you!',
            body: "bin coding acadmey rules!",
            isRead: false,
            sentAt: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            sentTime: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            sentDate: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            starred: false,
            isLabeled: false,
            sentEmail: 'user@appsus.com',
            fullName: 'Mahatma Appsus',
            sentTo: 'momo@momo.com',
            folder: 'bin'
        },
        {
            id: 'e127',
            sender: utilService.makeLoremSmall(2),
            from: utilService.createRandEmailAddress(),
            subject: 'Miss you!',
            body: "going out is fun",
            isRead: false,
            sentAt: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            sentTime: Date.now(),
            sentDate: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            starred: false,
            isLabeled: false,
            sentEmail: 'user@appsus.com',
            fullName: 'Mahatma Appsus',
            sentTo: 'momo@momo.com',
            folder: 'inbox'
        },
        {
            id: 'e128',
            sender: utilService.makeLoremSmall(2),
            from: utilService.createRandEmailAddress(),
            subject: utilService.makeLoremMedium(5),
            body: utilService.makeLoremLarge(50),
            isRead: false,
            sentAt: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            sentTime: Date.now(),
            sentDate: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            starred: false,
            isLabeled: false,
            sentEmail: 'user@appsus.com',
            fullName: 'Mahatma Appsus',
            sentTo: utilService.createRandEmailAddress(),
            folder: 'inbox'
        },
        {
            id: 'e129',
            sender: utilService.makeLoremSmall(2),
            from: utilService.createRandEmailAddress(),
            subject: utilService.makeLoremMedium(5),
            body: utilService.makeLoremLarge(50),
            isRead: false,
            sentAt: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            sentTime: Date.now(),
            sentDate: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            starred: false,
            isLabeled: false,
            sentEmail: 'user@appsus.com',
            fullName: 'Mahatma Appsus',
            sentTo: utilService.createRandEmailAddress(),
            folder: 'inbox'
        },
        {
            id: 'e130',
            sender: utilService.makeLoremSmall(2),
            from: utilService.createRandEmailAddress(),
            subject: utilService.makeLoremMedium(5),
            body: utilService.makeLoremLarge(50),
            isRead: false,
            sentAt: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            sentTime: Date.now(),
            sentDate: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            starred: false,
            isLabeled: false,
            sentEmail: 'user@appsus.com',
            fullName: 'Mahatma Appsus',
            sentTo: utilService.createRandEmailAddress(),
            folder: 'inbox'
        },
        {
            id: 'e131',
            sender: utilService.makeLoremSmall(2),
            from: utilService.createRandEmailAddress(),
            subject: utilService.makeLoremMedium(5),
            body: utilService.makeLoremLarge(50),
            isRead: false,
            sentAt: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            sentTime: Date.now(),
            sentDate: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            starred: false,
            isLabeled: false,
            sentEmail: 'user@appsus.com',
            fullName: 'Mahatma Appsus',
            sentTo: utilService.createRandEmailAddress(),
            folder: 'inbox'
        },
        {
            id: 'e132',
            sender: utilService.makeLoremSmall(2),
            from: utilService.createRandEmailAddress(),
            subject: utilService.makeLoremMedium(5),
            body: utilService.makeLoremLarge(50),
            isRead: false,
            sentAt: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            sentTime: Date.now(),
            sentDate: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            starred: false,
            isLabeled: false,
            sentEmail: 'user@appsus.com',
            fullName: 'Mahatma Appsus',
            sentTo: utilService.createRandEmailAddress(),
            folder: 'inbox'
        },
        {
            id: 'e133',
            sender: utilService.makeLoremSmall(2),
            from: utilService.createRandEmailAddress(),
            subject: utilService.makeLoremMedium(5),
            body: utilService.makeLoremLarge(50),
            isRead: false,
            sentAt: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            sentTime: Date.now(),
            sentDate: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            starred: false,
            isLabeled: false,
            sentEmail: 'user@appsus.com',
            fullName: 'Mahatma Appsus',
            sentTo: utilService.createRandEmailAddress(),
            folder: 'sent'
        },
        {
            id: 'e134',
            sender: utilService.makeLoremSmall(2),
            from: utilService.createRandEmailAddress(),
            subject: utilService.makeLoremMedium(5),
            body: utilService.makeLoremLarge(50),
            isRead: false,
            sentAt: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            sentTime: Date.now(),
            sentDate: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            starred: false,
            isLabeled: false,
            sentEmail: 'user@appsus.com',
            fullName: 'Mahatma Appsus',
            sentTo: utilService.createRandEmailAddress(),
            folder: 'inbox'
        },
        {
            id: 'e135',
            sender: utilService.makeLoremSmall(2),
            from: utilService.createRandEmailAddress(),
            subject: utilService.makeLoremMedium(5),
            body: utilService.makeLoremLarge(50),
            isRead: true,
            sentAt: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            sentTime: Date.now(),
            sentDate: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            starred: false,
            isLabeled: false,
            sentEmail: 'user@appsus.com',
            fullName: 'Mahatma Appsus',
            sentTo: utilService.createRandEmailAddress(),
            folder: 'sent'
        },
        {
            id: 'e136',
            sender: utilService.makeLoremSmall(2),
            from: utilService.createRandEmailAddress(),
            subject: utilService.makeLoremMedium(5),
            body: utilService.makeLoremLarge(50),
            isRead: true,
            sentAt: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            sentTime: Date.now(),
            sentDate: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            starred: false,
            isLabeled: false,
            sentEmail: 'user@appsus.com',
            fullName: 'Mahatma Appsus',
            sentTo: utilService.createRandEmailAddress(),
            folder: 'drafts'
        },
        {
            id: 'e137',
            sender: utilService.makeLoremSmall(2),
            from: utilService.createRandEmailAddress(),
            subject: utilService.makeLoremMedium(5),
            body: utilService.makeLoremLarge(50),
            isRead: false,
            sentAt: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            sentTime: Date.now(),
            sentDate: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            starred: false,
            isLabeled: false,
            sentEmail: 'user@appsus.com',
            fullName: 'Mahatma Appsus',
            sentTo: utilService.createRandEmailAddress(),
            folder: 'starred'
        },
        {
            id: 'e138',
            sender: utilService.makeLoremSmall(2),
            from: utilService.createRandEmailAddress(),
            subject: utilService.makeLoremMedium(5),
            body: utilService.makeLoremLarge(50),
            isRead: true,
            sentAt: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            sentTime: Date.now(),
            sentDate: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            starred: false,
            isLabeled: false,
            sentEmail: 'user@appsus.com',
            fullName: 'Mahatma Appsus',
            sentTo: utilService.createRandEmailAddress(),
            folder: 'bin'
        },
        {
            id: 'e139',
            sender: utilService.makeLoremSmall(2),
            from: utilService.createRandEmailAddress(),
            subject: utilService.makeLoremMedium(5),
            body: utilService.makeLoremLarge(50),
            isRead: false,
            sentAt: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            sentTime: Date.now(),
            sentDate: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            starred: false,
            isLabeled: false,
            sentEmail: 'user@appsus.com',
            fullName: 'Mahatma Appsus',
            sentTo: utilService.createRandEmailAddress(),
            folder: 'important'
        },
        {
            id: 'e140',
            sender: utilService.makeLoremSmall(2),
            from: utilService.createRandEmailAddress(),
            subject: utilService.makeLoremMedium(5),
            body: utilService.makeLoremLarge(50),
            isRead: true,
            sentAt: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            sentTime: Date.now(),
            sentDate: new Date().toLocaleDateString('en-uk', { day: 'numeric', month: "short" }),
            starred: false,
            isLabeled: false,
            sentEmail: 'user@appsus.com',
            fullName: 'Mahatma Appsus',
            sentTo: utilService.createRandEmailAddress(),
            folder: 'sent'
        }]
        storageService.saveToStorage(KEY, emails)
        return emails
    }
}
