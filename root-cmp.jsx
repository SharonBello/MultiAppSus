
import { Header } from './cmps/header.jsx'
import { About } from './pages/app-about.jsx'
import { Home } from './pages/app-home.jsx'
import { Footer } from './cmps/footer.jsx'
import { UserMsg } from './cmps/user-msg.jsx'
import { EmailIndex } from './apps/email/pages/email-index.jsx'
import { NoteApp } from './apps/note/pages/note-index.jsx'
import { EmailDetails } from './apps/email/pages/email-details.jsx'
import { BookApp } from './apps/book/pages/book-app.jsx'
import { BookDetails } from './apps/book/pages/book-details.jsx';

const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export function App() {
    return <Router>
        <section className="app-container">
        <Header/>
            <Switch>
                <Route exact path="/book" component={BookApp} />
                <Route exact path="/email" component={EmailIndex} />
                <Route path="/email/:emailId" component={EmailDetails} /> 
                <Route path="/book/:bookId" component={BookDetails} /> 
                <Route path="/note" component={NoteApp} />
                <Route path="/about" component={About} />
                <Route path="/" component={Home} />
            </Switch>
        <Footer/>
        </section>
        <UserMsg/>
    </Router>
}

