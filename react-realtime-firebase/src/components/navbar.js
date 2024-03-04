export default function Navbar() {
    return (
        <nav className="nav">
            <a href="/" className="link">Home</a>
            <ul>
                <li>
                    <a href="/login" className="link">Login</a>
                </li>
                <li>
                    <a href="/about" className="link">About</a>
                </li>
            </ul>
        </nav>
    )
}