export class LongText extends React.Component {

    state = {
        isShortTxt: true,
        isFullTxtShown: false
    }

    componentDidMount = () => {
        if (this.props.text.length > 100) this.setState({isShortTxt:false})
        //At the first time that the this cmp is render, we declares if the txt is short or long.
    }

    onToggleShownTxt = () => {
        this.setState({ isFullTxtShown: !this.state.isFullTxtShown })
        //Just toggling the isFullTxtShown variable by the user click (The user will be able to click only if the "isShortTxt" === true)
    }

    get txtToShow(){
        const { text } = this.props
        const { isFullTxtShown, isShortTxt } = this.state
        return ((isShortTxt) || (!isShortTxt && isFullTxtShown)) ? text : text.substring(0, 72) + '...'
        // I could give up for this getter and just render the short if, but by convention that is the place to use the "get" function.
    }

    render() {
        const { isFullTxtShown, isShortTxt } = this.state
        return <span className="long-text">{this.txtToShow}
            {/* {!isShortTxt && //This button will be shown only if the text from the props is longer then XXX chars.
                <button className="show-btn" onClick={this.onToggleShownTxt}>
                    {isFullTxtShown ? 'Read less' : 'Read more' /*The text that will appear on the button.*/}
                {/* </button>}} */}
        </span>
    }

}

// export class LongText extends React.Component {

//     state = {
//         isShown: false
// }

// onClick = () => {
// // const {isShown} = this.state
// this.setState({isShown: !this.state.isShown})
// }

// render() {
//     const {isShown} = this.state
//     const {text} = this.props
//     const shoretened = text.substring(0,100) + '...'
//     const isShort = (text.length < 100)
//     return <span className="long-text">
//     {isShort && text } 
//     {!isShown && !isShort && shoretened } 
//     {isShown && !isShort && text}
//     {!isShort && <button className="show-btn" onClick={this.onClick}> 
//     {!isShown && 'More'}
//     {isShown && 'Less'}
//     </button>}
//     </span>
// }

// }