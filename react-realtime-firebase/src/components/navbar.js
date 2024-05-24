export default function Navbar() {
    const uid = localStorage.getItem('auth');
    var detailUrl = `/detail/${uid}`;

    let logbutton
    let text
    let form
    let formText
    if (uid === null | uid === "" ) {
        logbutton = '/login';
         text = "Login"
    }else{
        logbutton = '/logout';
        text = " logout"
        form = '/form'
        formText = "Add"
    }
    
    return (
        <nav className="nav">
            <a href="/" className="link">Home</a>
            <ul>
                <li>
                    <a href="/about" className="link">About</a>
                </li>
                <li>
                    <a href={form} className="link">{formText}</a>
                </li>
                <li>
                    <a href={detailUrl} className="link">Detail</a>
                </li>
            </ul>
            <a href={logbutton} className="link">{text}</a>

        </nav>
    )
}