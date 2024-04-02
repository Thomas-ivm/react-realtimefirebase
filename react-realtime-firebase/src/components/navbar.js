export default function Navbar() {
    return (
        <nav className="nav">
            <a href="/" className="link">Home</a>
            <ul>
                <li>
                    <a href="/about" className="link">About</a>
                </li>
                <li>
                    <a href="/form" className="link">Add</a>
                </li>
                <li>
                    <a href="/detail" className="link">Detail</a>
                </li>
            </ul>
            <a href="/login" className="link">Login</a>

        </nav>
    )
}