
export class BookFilter extends React.Component {

    state = {
        filterBy: {
            title: '',
            minPrice: '',
            maxPrice: ''
        }
    }

    inputRef = React.createRef()

    componentDidMount() {
        this.inputRef.current.focus()
    }

    handleChange = ({ target }) => {
        const value = (target.type === 'number') ? +target.value : target.value
        const field = target.name
        this.setState((prevState) => ({ filterBy: { ...prevState.filterBy, [field]: value } }), () => {
            this.props.onSetFilter(this.state.filterBy)
        })
    }

    onFilter = (ev) => {
        ev.preventDefault()
        this.props.onSetFilter(this.state.filterBy)
    }


    render() {
        const { title, minPrice, maxPrice } = this.state.filterBy
        return <section className="book-filter">
            <form onSubmit={this.onFilter}>
                <div><label htmlFor="by-title"></label>
                    <input type="text" id="by-title" placeholder="Title" name="title"
                        value={title} onChange={this.handleChange} ref={this.inputRef} />
                </div>

                <div><label htmlFor="by-minPrice"></label>
                    <input type="number" id="by-minPrice" placeholder="Min-price" name="minPrice"
                        value={minPrice} onChange={this.handleChange} />
                </div>

                <div><label htmlFor="by-maxPrice"></label>
                    <input type="number" id="by-maxPrice" placeholder="Max-price" name="maxPrice"
                        value={maxPrice} onChange={this.handleChange} />
                </div>

                <div><button className="filter-books">FILTER!</button></div>
            </form>
        </section>
    }
}