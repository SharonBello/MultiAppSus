
export class EmailFilter extends React.Component {
   
        options = [{
            value: 'all',
            label: 'All Mail'
        }, {
            value: 'read',
            label: 'Read Mail'
        }, {
            value: 'unread',
            label: 'Unread Mail'
        }]
        state = { selectedFilter: { value: 'all', label: 'All Mail' } 
    }
    

    onFilterChange = (value) => {
        console.log(value);
    }
    render() {
        return (
            <section>
                <select
                    value={this.state.selectedFilter}
                    onChange={e => this.onFilterChange(e.target.value)}>
                    {this.options.map(o => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                </select>
            </section>
        );
    }
}
