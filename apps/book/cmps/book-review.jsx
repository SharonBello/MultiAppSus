import { bookService } from "../services/book-service.js"

export class BookReview extends React.Component {

    state = {
        book: this.props.book,
        review: {
            username: '',
            rate: '',
            date: '',
            reviewTxt: ''
        }
    }

    usernameRef = React.createRef()
    rateRef = React.createRef()
    dateRef = React.createRef()
    messageRef = React.createRef()

    onAddReview = (ev) => {
        ev.preventDefault()
        this.setState({
            review: {
                username: this.usernameRef.current.value,
                rate: this.rateRef.current.value,
                date: this.dateRef.current.value,
                reviewTxt: this.messageRef.current.value,
            }
        })
    }

    handleChange = ({ target }) => {
        const value = target.value
        const stateKey = target.name
        this.setState((prevState) => ({ review: { ...prevState.review, [stateKey]: value } }), () => {
        })
    }

    render() {
        const { username, rate, date, reviewTxt } = this.state.review
        return <section className="reviews">

            <form className="flex column align-center" onSubmit={this.onAddReview}>

                <div>
                    <label htmlFor="username">Name
                        <input ref={this.usernameRef} type="text" id="username" name="username"
                            value={username} placeholder="Your name" onChange={this.handleChange} />
                    </label>
                </div>

                <div>
                    <label htmlFor="rate">
                        <select ref={this.rateRef} value={rate} type="select" id="rate" name="rate" onChange={this.handleChange}>
                            <option value="1">1 Star!</option>
                            <option value="2">2 Stars!</option>
                            <option value="3">3 Stars!</option>
                            <option value="4">4 Stars!</option>
                            <option value="5">5 Stars!</option>
                        </select>
                    </label>
                </div>

                <div>
                    <label htmlFor="date">Date
                        <input ref={this.dateRef} value={date} name="date" type="date" onChange={this.handleChange} />
                    </label>
                </div>

                <div>
                    <label htmlFor="reviewTxt">Message
                        <textarea id="reviewTxt" ref={this.messageRef} value={reviewTxt} name="reviewTxt" cols="20" rows="5" onChange={this.handleChange} />
                    </label>
                </div>

                <button>Save Review!</button>
            </form>
        </section>
    }
}
