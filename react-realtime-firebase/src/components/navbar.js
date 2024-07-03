export default function Navbar() {
    const uid = localStorage.getItem('auth');
    const role = localStorage.getItem('currentUID')
    var detailUrl = `/detail/${uid}`;
    
    if( uid !== "" && role === ""){
        window.location.reload()
    }

    let logbutton
    let text
    let form
    let formText
    let detail
    if (uid === null || uid === "" ) {
        logbutton = '/login';
        text = "Login"
    }else{
        if (role === "owner" || role === "writer") {
            form = '/form'
            formText = "Add"
        }
        detail = 'detail'
        logbutton = '/logout';
        text = " logout"
    }
    
    return (
        <nav className="nav">
            <ul>
            <a href="/" className="link">Home</a>
              <a href="/about" className="link">About</a>            
              <a href={form} className="link">{formText}</a>
              <a href={detailUrl} className="link">{detail}</a>
            <a href={logbutton} className="link">{text}</a>
            </ul>

        </nav>
    )
}