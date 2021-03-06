const { Link, NavLink, withRouter } = ReactRouterDOM

function _Footer(props) {
    return <footer className="main-footer">
        <p className="footer-title footer-copyright">┬ęCopyright 2022</p>
        <p className="footer-title footer-names">Sharon Bello || Rinat Brandes</p>
    </footer>
}

export const Footer = withRouter(_Footer)
