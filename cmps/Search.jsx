import { EmailService } from "../apps/email/services/email-service.js";
import { NoteService } from "../apps/note/services/note-service.js";
import { bookService } from "../apps/book/services/book-service.js";

export class Search extends React.Component { 

    onSearchChange = (e) => {
        if (this.props.whereToSearch === 'emails') {
            EmailService.genQuery(e.target.value, this.props.whereToSearch).then((searchResults) => {
                this.props.updateSearchResults(this.props.whereToSearch, searchResults)
            }).catch(error => {
                console.error(error);
            });
        } else if (this.props.whereToSearch === 'notes') {
            NoteService.genQuery(e.target.value, this.props.whereToSearch).then((searchResults) => {
                this.props.updateSearchResults(this.props.whereToSearch, searchResults)
            }).catch(error => {
                console.error(error);
            });
        } else if (this.props.whereToSearch === 'books') {
            bookService.genQuery(e.target.value, this.props.whereToSearch).then((searchResults) => {
                this.props.updateSearchResults(this.props.whereToSearch, searchResults)
            }).catch(error => {
                console.error(error);
            });
        }
    };
    render() {
        return (
            <section>
                    <div className="search-form-container"></div>
                    <form className="search-form">
                        <input
                            type="search"
                            className="form-control"
                            onChange={(e) => this.onSearchChange(e)}
                            ref={this.props.searchTerm}
                            placeholder="Search for "{...this.props.whereToSearch}
                            aria-label="Search"
                        />
                    </form> 
            </section>
        );
    }
}
