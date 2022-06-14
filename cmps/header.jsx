const { Link, NavLink, withRouter } = ReactRouterDOM;
import { Search } from "./Search.jsx";
import { eventBusService } from "../services/event-bus-service.js";

export class Header extends React.Component {
 state = {
      whereToSearch: '',
      searchResults: [],
      searchTerm: ''
    }

  componentDidMount = () => {
    eventBusService.on('whereToSearch', (whereToSearch) => {
      this.setState({ whereToSearch })
    });
  }

  updateSearchResults = (whereToSearch, searchResults) => {
    switch (whereToSearch) {
      case 'books':
        this.setState({ searchResults });
        eventBusService.emit('searchResultsBooks', searchResults);
        break;
      case 'notes':
        this.setState({ searchResults });
        eventBusService.emit('searchResultsNotes', searchResults);
        break;
      case 'emails':
        this.setState({ searchResults });
        //emit change in searchResults
        eventBusService.emit('searchResultsEmails', searchResults);
        break;
    }
  }

  render() {
    const { whereToSearch, searchResults, searchTerm } = this.state
    return (
      <header>
        <div className="header">
          <div className="header-container">
            <div className="logo-container">
            <img src="assets/img/logoPng.png" className="logo-img"/>
            </div>
              <div className="search-form-container"><Search whereToSearch={whereToSearch} updateSearchResults={this.updateSearchResults} searchTerm={searchTerm} /></div>
            <ul className="nav-bar">
              <li className="nav-link-home"><NavLink to="/" exact>Home</NavLink></li>
              <li className="nav-link-email"><NavLink to="/email">Mail</NavLink></li>
              <li className="nav-link-notes"><NavLink to="/note">Notes</NavLink></li>
              <li className="nav-link-books"><NavLink to="/book">Books</NavLink></li>
              <li className="nav-link-about"><NavLink to="/about">About</NavLink></li>
            </ul>
          </div>
        </div>
      </header>
    );
  }
}
Header = withRouter(Header);












