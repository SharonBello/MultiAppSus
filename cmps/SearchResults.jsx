export class SearchResults extends React.Component {
 
  renderResults = () => {
    const searchResults = this.props.searchResults;
    let htmlContent;
    if (searchResults && searchResults[0] && searchResults[0].body) {
      htmlContent = searchResults.map((result, index) => <li key={index}><h3 className="search-result flex-row">{result.body}</h3></li>)
    }
    return (
      <div className="search-results">
        {htmlContent}
      </div>
    );
  }

  render() {
    if (!this.props.searchResults) return;
    else {
      return (<ul>{this.renderResults()}</ul>);
    }
  }
}
